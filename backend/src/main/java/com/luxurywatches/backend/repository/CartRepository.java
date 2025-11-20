package com.luxurywatches.backend.repository;

import com.luxurywatches.backend.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    // Tìm giỏ hàng dựa trên ID của người dùng
    Optional<Cart> findByUserId(Long userId);
}