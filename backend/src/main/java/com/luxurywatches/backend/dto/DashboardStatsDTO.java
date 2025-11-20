// src/main/java/com/luxurywatches/backend/dto/DashboardStatsDTO.java
package com.luxurywatches.backend.dto;

import lombok.Data;
import java.util.List;

@Data
public class DashboardStatsDTO {
    private long totalUsers;
    private long totalProducts;
    private long totalOrders;
    private double totalRevenue;
    private List<OrderDTO> recentOrders; // Tái sử dụng OrderDTO
}