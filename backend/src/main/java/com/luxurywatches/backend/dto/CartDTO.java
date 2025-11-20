package com.luxurywatches.backend.dto;

import java.util.List;

public class CartDTO {
    private List<CartItemDTO> items;

    // === THAY ĐỔI CẤU TRÚC GIÁ ===
    private double subtotal;
    private double vatAmount;
    private double finalTotalPrice;
    // =============================

    // Getters and Setters
    public List<CartItemDTO> getItems() {
        return items;
    }

    public void setItems(List<CartItemDTO> items) {
        this.items = items;
    }

    // === GETTER VÀ SETTER MỚI ===
    public double getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(double subtotal) {
        this.subtotal = subtotal;
    }

    public double getVatAmount() {
        return vatAmount;
    }

    public void setVatAmount(double vatAmount) {
        this.vatAmount = vatAmount;
    }

    public double getFinalTotalPrice() {
        return finalTotalPrice;
    }

    public void setFinalTotalPrice(double finalTotalPrice) {
        this.finalTotalPrice = finalTotalPrice;
    }
    // =============================
}