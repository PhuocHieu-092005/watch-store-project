// src/main/java/com/luxurywatches/backend/dto/RevenueByDateDTO.java

package com.luxurywatches.backend.dto;

import lombok.Data;
import java.time.LocalDate;
import java.util.Date; // <-- THÊM IMPORT NÀY

@Data
public class RevenueByDateDTO {
    private LocalDate date;
    private Double totalRevenue;

    // === SỬA LẠI CONSTRUCTOR ===
    // Constructor này nhận kiểu dữ liệu mà HQL/SQL trả về trực tiếp
    public RevenueByDateDTO(Date date, Double totalRevenue) {
        // Chuyển đổi từ java.util.Date (hoặc java.sql.Date) sang java.time.LocalDate
        this.date = new java.sql.Date(date.getTime()).toLocalDate();
        this.totalRevenue = totalRevenue;
    }
    // ===========================
}