package com.sample.salesra.order;

import com.amplicode.core.graphql.annotation.GraphQLId;
import com.amplicode.core.graphql.paging.OffsetPageInput;
import com.amplicode.core.graphql.paging.ResultPage;
import com.sample.salesra.order.OrderMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.criteria.Predicate;
import javax.validation.Valid;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Controller
public class OrderController {
    private final OrderRepository crudRepository;
    private final OrderMapper mapper;

    public OrderController(OrderRepository crudRepository, OrderMapper mapper) {
        this.crudRepository = crudRepository;
        this.mapper = mapper;
    }

    @MutationMapping(name = "deleteOrder")
    @Transactional
    public void delete(@GraphQLId @Argument @NonNull Long id) {
        Order entity = crudRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(String.format("Unable to find entity by id: %s ", id)));

        crudRepository.delete(entity);
    }

    @QueryMapping(name = "orderList")
    @Transactional(readOnly = true)
    @NonNull
    public ResultPage<OrderDto> findAll(@Argument OrderFilter filter, @Argument("sort") List<OrderOrderByInput> sortInput, @Argument("page") OffsetPageInput pageInput) {
        Specification<Order> specification = createFilter(filter);
        Pageable page = Optional.ofNullable(pageInput)
                .map(p -> PageRequest.of(p.getNumber(), p.getSize()).withSort(createSort(sortInput)))
                .orElseGet(() -> PageRequest.ofSize(20).withSort(createSort(sortInput)));
        Page<Order> pageData = crudRepository.findAll(specification, page);
        return ResultPage.page(pageData.getContent().stream().map(mapper::toDto).collect(Collectors.toList()), pageData.getTotalElements());
    }

    @QueryMapping(name = "order")
    @Transactional(readOnly = true)
    @NonNull
    public OrderDto findById(@GraphQLId @Argument @NonNull Long id) {
        return crudRepository.findById(id)
                .map(mapper::toDto)
                .orElseThrow(() -> new RuntimeException(String.format("Unable to find entity by id: %s ", id)));
    }

    @MutationMapping(name = "updateOrder")
    @Transactional
    @NonNull
    public OrderDto update(@Argument @NonNull @Valid OrderDto input) {
        if (input.getId() != null) {
            if (!crudRepository.existsById(input.getId())) {
                throw new RuntimeException(
                        String.format("Unable to find entity by id: %s ", input.getId()));
            }
        }
        Order entity = new Order();
        mapper.update(input, entity);
        entity = crudRepository.save(entity);
        return mapper.toDto(entity);
    }

    protected Sort createSort(List<OrderOrderByInput> sortInput) {
        if (sortInput == null || sortInput.isEmpty()) {
            return Sort.unsorted();
        }
        List<Sort.Order> orders = sortInput.stream()
                .map(item -> {
                    Sort.Direction direction;
                    if (item.getDirection() == SortDirection.ASC) {
                        direction = Sort.Direction.ASC;
                    } else {
                        direction = Sort.Direction.DESC;
                    }
                    switch (item.getProperty()) {
                        case DATE:
                            return Sort.Order.by("date").with(direction);
                        case NUMBER:
                            return Sort.Order.by("number").with(direction);
                        default:
                            return null;
                    }
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
        return Sort.by(orders);
    }

    static class OrderOrderByInput {

        private OrderOrderByProperty property;
        private SortDirection direction;

        public OrderOrderByProperty getProperty() {
            return property;
        }

        public void setProperty(OrderOrderByProperty property) {
            this.property = property;
        }

        public SortDirection getDirection() {
            return direction;
        }

        public void setDirection(SortDirection direction) {
            this.direction = direction;
        }
    }

    public enum SortDirection {ASC, DESC}

    public enum OrderOrderByProperty {DATE, NUMBER}

    protected Specification<Order> createFilter(OrderFilter filter) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (filter != null) {
                if (filter.number != null) {
                    predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("number")), "%" + filter.number.toLowerCase() + "%"));
                }
                if (filter.dateMin != null) {
                    predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("date"), filter.dateMin));
                }
                if (filter.customerName != null) {
                    predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("customer").get("name")), "%" + filter.customerName.toLowerCase() + "%"));
                }
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }

    static class OrderFilter {

        private String number;
        private LocalDate dateMin;
        private String customerName;

        public String getNumber() {
            return number;
        }

        public void setNumber(String number) {
            this.number = number;
        }

        public LocalDate getDateMin() {
            return dateMin;
        }

        public void setDateMin(LocalDate dateMin) {
            this.dateMin = dateMin;
        }

        public String getCustomerName() {
            return customerName;
        }

        public void setCustomerName(String customerName) {
            this.customerName = customerName;
        }
    }
}