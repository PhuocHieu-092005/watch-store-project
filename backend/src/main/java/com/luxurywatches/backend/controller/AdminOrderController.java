package com.luxurywatches.backend.controller;

import com.luxurywatches.backend.dto.OrderDTO;
import com.luxurywatches.backend.dto.PageResponseDTO; // <-- IMPORT MỚI
import com.luxurywatches.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest; // <-- IMPORT MỚI
import org.springframework.data.domain.Pageable; // <-- IMPORT MỚI
import org.springframework.data.domain.Sort; // <-- IMPORT MỚI
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin/orders")
@PreAuthorize("hasRole('ADMIN')")
public class AdminOrderController {

    @Autowired
    private OrderService orderService;

    // === THAY THẾ ENDPOINT CŨ BẰNG PHIÊN BẢN MỚI HỖ TRỢ PHÂN TRANG ===
    @GetMapping
    public ResponseEntity<PageResponseDTO<OrderDTO>> getAllOrders(
            @RequestParam(value = "page", defaultValue = "0", required = false) int page,
            @RequestParam(value = "size", defaultValue = "10", required = false) int size,
            @RequestParam(value = "sortBy", defaultValue = "orderDate", required = false) String sortBy,
            @RequestParam(value = "sortDir", defaultValue = "desc", required = false) String sortDir) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.fromString(sortDir), sortBy));
        return ResponseEntity.ok(orderService.getAllOrders(pageable));
    }
    // =================================================================

    @GetMapping("/{id}")
    public ResponseEntity<OrderDTO> getOrderById(@PathVariable Long id) {
        OrderDTO order = orderService.getOrderByIdForAdmin(id);
        return ResponseEntity.ok(order);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<OrderDTO> updateOrderStatus(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        String newStatus = payload.get("status");
        if (newStatus == null || newStatus.trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        OrderDTO updatedOrder = orderService.updateOrderStatus(id, newStatus);
        return ResponseEntity.ok(updatedOrder);
    }
}