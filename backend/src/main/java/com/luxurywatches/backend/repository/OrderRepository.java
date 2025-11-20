// src/main/java/com/luxurywatches/backend/repository/OrderRepository.java

package com.luxurywatches.backend.repository;

import com.luxurywatches.backend.dto.RevenueByDateDTO;
import com.luxurywatches.backend.dto.TopSellingProductDTO;
import com.luxurywatches.backend.entity.Order;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param; // <-- IMPORT THÊM

import java.time.LocalDateTime;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    // Tìm các đơn hàng của một user cụ thể
    List<Order> findByUserId(Long userId);

    // === PHẦN ĐÃ SỬA LỖI ===

    @Query("SELECT new com.luxurywatches.backend.dto.RevenueByDateDTO(CAST(o.orderDate AS date), SUM(o.finalTotalAmount)) " +
           "FROM Order o " +
           "WHERE o.status = com.luxurywatches.backend.entity.OrderStatus.DELIVERED AND o.orderDate >= :startDate " +
           "GROUP BY CAST(o.orderDate AS date) " +
           "ORDER BY CAST(o.orderDate AS date) ASC")
    List<RevenueByDateDTO> findRevenueByDate(@Param("startDate") LocalDateTime startDate);


    @Query("SELECT new com.luxurywatches.backend.dto.TopSellingProductDTO(oi.product.name, SUM(oi.quantity)) " +
           "FROM OrderItem oi " +
           "WHERE oi.order.status = com.luxurywatches.backend.entity.OrderStatus.DELIVERED " +
           "GROUP BY oi.product.name " +
           "ORDER BY SUM(oi.quantity) DESC")
    List<TopSellingProductDTO> findTopSellingProducts(Pageable pageable);

    // ======================
}