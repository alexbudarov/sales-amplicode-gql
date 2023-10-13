package com.sample.salesra.order;

import com.sample.salesra.product.Product;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * DTO for {@link OrderLine}
 */
public class OrderLineDto implements Serializable {
    private Long id;
    private OrderDto order;
    private BigDecimal quantity;
    private Product product;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public OrderDto getOrder() {
        return order;
    }

    public void setOrder(OrderDto order) {
        this.order = order;
    }

    public BigDecimal getQuantity() {
        return quantity;
    }

    public void setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}