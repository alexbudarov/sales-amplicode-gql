package com.sample.salesra.order;

import com.amplicode.core.graphql.annotation.GraphQLId;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Controller
public class OrderLineController {
    private final OrderLineRepository crudRepository;
    private final OrderMapper mapper;

    public OrderLineController(OrderLineRepository crudRepository, OrderMapper mapper) {
        this.crudRepository = crudRepository;
        this.mapper = mapper;
    }

    @MutationMapping(name = "deleteOrderLine")
    @Transactional
    public void delete(@GraphQLId @Argument @NonNull Long id) {
        OrderLine entity = crudRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(String.format("Unable to find entity by id: %s ", id)));

        crudRepository.delete(entity);
    }

    @QueryMapping(name = "orderLineList")
    @Transactional(readOnly = true)
    @NonNull
    public List<OrderLineDto> findAll(@Argument OrderLineFilter filter, @Argument("sort") List<OrderLineOrderByInput> sortInput) {
        Specification<OrderLine> specification = createFilter(filter);
        Sort sort = createSort(sortInput);
        return crudRepository.findAll(specification, sort).stream().map(mapper::toDto).collect(Collectors.toList());
    }

    @QueryMapping(name = "orderLine")
    @Transactional(readOnly = true)
    @NonNull
    public OrderLineDto findById(@GraphQLId @Argument @NonNull Long id) {
        return crudRepository.findById(id)
                .map(mapper::toDto)
                .orElseThrow(() -> new RuntimeException(String.format("Unable to find entity by id: %s ", id)));
    }

    @MutationMapping(name = "updateOrderLine")
    @Transactional
    @NonNull
    public OrderLineDto update(@Argument @NonNull OrderLineDto input) {
        if (input.getId() != null) {
            if (!crudRepository.existsById(input.getId())) {
                throw new RuntimeException(
                        String.format("Unable to find entity by id: %s ", input.getId()));
            }
        }
        OrderLine entity = new OrderLine();
        mapper.update(input, entity);
        entity = crudRepository.save(entity);
        return mapper.toDto(entity);
    }

    protected Sort createSort(List<OrderLineOrderByInput> sortInput) {
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
                        case PRODUCT_NAME:
                            return Sort.Order.by("product.name").with(direction);
                        case PRODUCT_PRICE:
                            return Sort.Order.by("product.price").with(direction);
                        default:
                            return null;
                    }
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
        return Sort.by(orders);
    }

    static class OrderLineOrderByInput {

        private OrderLineOrderByProperty property;
        private SortDirection direction;

        public OrderLineOrderByProperty getProperty() {
            return property;
        }

        public void setProperty(OrderLineOrderByProperty property) {
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

    public enum OrderLineOrderByProperty {PRODUCT_NAME, PRODUCT_PRICE}

    protected Specification<OrderLine> createFilter(OrderLineFilter filter) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (filter != null) {
                if (filter.orderId != null) {
                    predicates.add(criteriaBuilder.equal(root.get("order").get("id"), filter.orderId));
                }
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }

    static class OrderLineFilter {

        private Long orderId;

        public Long getOrderId() {
            return orderId;
        }

        public void setOrderId(Long orderId) {
            this.orderId = orderId;
        }
    }
}