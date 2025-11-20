package com.luxurywatches.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "products")
@Getter
@Setter
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(length = 2000)
    private String description;

    @Column(nullable = false)
    private double price;

    private int stockQuantity;

    private String imageUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    // === PHẦN THÊM VÀO ĐỂ SỬA LỖI ===
    // Constructor không tham số (cần thiết cho JPA/Hibernate)
    public Product() {
    }

    // Constructor đầy đủ tham số (dùng cho DataSeeder)
    public Product(String name, String description, double price, int stockQuantity, String imageUrl,
            Category category) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.stockQuantity = stockQuantity;
        this.imageUrl = imageUrl;
        this.category = category;
    }
    // =================================
}