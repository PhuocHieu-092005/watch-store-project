// src/main/java/com/luxurywatches/backend/dto/TopSellingProductDTO.java

package com.luxurywatches.backend.dto;

import lombok.Data;

@Data
public class TopSellingProductDTO {
    private String productName;
    private Long totalQuantity;

    // Constructor này đã đúng, nhưng để rõ ràng hơn, có thể thêm @SuppressWarnings
    // nếu IDE của bạn cảnh báo về kiểu dữ liệu
    public TopSellingProductDTO(String productName, Long totalQuantity) {
        this.productName = productName;
        this.totalQuantity = totalQuantity;
    }
}