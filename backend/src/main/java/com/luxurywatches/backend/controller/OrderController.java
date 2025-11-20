package com.luxurywatches.backend.controller;

import com.luxurywatches.backend.dto.OrderDTO;
import com.luxurywatches.backend.entity.User; // Import User entity
import com.luxurywatches.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    // API để tạo đơn hàng từ giỏ hàng
    // Endpoint: POST http://localhost:8080/api/orders
    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<OrderDTO> createOrder(@AuthenticationPrincipal User user,
            @RequestBody Map<String, String> payload) {
        String shippingAddress = payload.get("shippingAddress");
        OrderDTO createdOrder = orderService.createOrder(user.getId(), shippingAddress);
        return new ResponseEntity<>(createdOrder, HttpStatus.CREATED);
    }

    // API để lấy lịch sử đơn hàng của người dùng đang đăng nhập
    // Endpoint: GET http://localhost:8080/api/orders
    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<OrderDTO>> getMyOrders(@AuthenticationPrincipal User user) {
        List<OrderDTO> orders = orderService.getOrdersByUser(user.getId());
        return ResponseEntity.ok(orders);
    }
}