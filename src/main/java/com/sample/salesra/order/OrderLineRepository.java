package com.sample.salesra.order;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface OrderLineRepository extends JpaRepository<OrderLine, Long>, JpaSpecificationExecutor<OrderLine> {
}