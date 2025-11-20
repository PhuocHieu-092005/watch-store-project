// File: src/main/java/com/luxurywatches/backend/dto/ProductDTO.java

package com.luxurywatches.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List; // <-- THÊM DÒNG IMPORT NÀY

@Getter
@Setter
public class ProductDTO {
    private Long id;
    private String name;
    private String description;
    private double price;
    private double priceWithVat;
    private int stockQuantity;
    private String imageUrl;
    private Long categoryId;
    private String categoryName;

    // ===== THÊM 2 TRƯỜNG DỮ LIỆU MỚI VÀO ĐÂY =====
    private List<String> galleryImages;
    private List<SpecificationDTO> specifications;
}