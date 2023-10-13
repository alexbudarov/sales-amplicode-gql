package com.sample.salesra.order;

import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = "spring", uses = {OrderMapper.class})
public interface OrderMapper {
    Order toEntity(OrderDto orderDto);

    OrderDto toDto(Order order);

    Order update(OrderDto orderDto, @MappingTarget Order order);

    OrderLine toEntity(OrderLineDto orderLineDto);

    OrderLineDto toDto(OrderLine orderLine);

    OrderLine update(OrderLineDto orderLineDto, @MappingTarget OrderLine orderLine);
}