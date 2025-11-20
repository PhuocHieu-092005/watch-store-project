package com.luxurywatches.backend.controller;

import com.luxurywatches.backend.dto.AddItemToCartRequest;
import com.luxurywatches.backend.dto.CartDTO;
import com.luxurywatches.backend.entity.User; // Quan trọng: Import User entity
import com.luxurywatches.backend.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
// @CrossOrigin(origins = "http://localhost:5173")
public class CartController {

    @Autowired
    private CartService cartService;

    // === THAY ĐỔI: Tích hợp Spring Security và đổi tên endpoint ===
    @PostMapping("/items")
    @PreAuthorize("isAuthenticated()") // Chỉ user đã đăng nhập mới được gọi
    public ResponseEntity<CartDTO> addItemToCart(
            @AuthenticationPrincipal User user, // Tự động lấy user đã đăng nhập
            @RequestBody AddItemToCartRequest request) {

        CartDTO cartDTO = cartService.addItemToCart(user.getId(), request);
        return ResponseEntity.ok(cartDTO);
    }

    // === THAY ĐỔI: Tích hợp Spring Security ===
    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<CartDTO> getCart(@AuthenticationPrincipal User user) {
        CartDTO cartDTO = cartService.getCartByUserId(user.getId());
        return ResponseEntity.ok(cartDTO);
    }

    // === ENDPOINT MỚI: Xóa item khỏi giỏ hàng ===
    @DeleteMapping("/items/{cartItemId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<CartDTO> removeItemFromCart(
            @AuthenticationPrincipal User user,
            @PathVariable Long cartItemId) {

        CartDTO updatedCart = cartService.removeItemFromCart(user.getId(), cartItemId);
        return ResponseEntity.ok(updatedCart);
    }
}