package com.luxurywatches.backend.dto;

public class CartItemDTO {
    // === THAY ĐỔI: Thêm ID của CartItem ===
    private Long id;
    // ======================================
    private Long productId;
    private String productName;
    private double price;
    private String imageUrl;
    private int quantity;

    // Getters and Setters

    // === GETTER & SETTER MỚI ===
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    // =============================

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}