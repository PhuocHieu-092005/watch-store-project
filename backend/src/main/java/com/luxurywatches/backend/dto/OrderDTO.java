package com.luxurywatches.backend.dto;

import com.luxurywatches.backend.entity.OrderStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class OrderDTO {
    private Long id;
    private Long userId;
    private LocalDateTime orderDate;
    private OrderStatus status;

    // === THAY ĐỔI CẤU TRÚC GIÁ ===
    private Double subtotal;
    private Double vatAmount;
    private Double finalTotalAmount;
    // =============================

    private String shippingAddress;
    private List<OrderItemDTO> orderItems;
}