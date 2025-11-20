// src/main/java/com/luxurywatches/backend/controller/DashboardController.java

package com.luxurywatches.backend.controller;

import com.luxurywatches.backend.dto.DashboardStatsDTO;
import com.luxurywatches.backend.dto.RevenueByDateDTO;
import com.luxurywatches.backend.dto.TopSellingProductDTO;
import com.luxurywatches.backend.repository.OrderRepository;
import com.luxurywatches.backend.repository.ProductRepository;
import com.luxurywatches.backend.repository.UserRepository;
import com.luxurywatches.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List; // <--- SỬA LỖI: THÊM DÒNG NÀY

@RestController
@RequestMapping("/api/admin/dashboard")
@PreAuthorize("hasRole('ADMIN')")
public class DashboardController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderRepository orderRepository;

    @GetMapping("/stats")
    public ResponseEntity<DashboardStatsDTO> getDashboardStats() {
        DashboardStatsDTO stats = new DashboardStatsDTO();

        stats.setTotalUsers(userRepository.count());
        stats.setTotalProducts(productRepository.count());

        var allOrders = orderService.getAllOrders(PageRequest.of(0, Integer.MAX_VALUE)).getContent();

        stats.setTotalOrders(allOrders.size());

        double totalRevenue = allOrders.stream()
                .filter(order -> order.getStatus().toString().equals("DELIVERED"))
                .mapToDouble(order -> order.getFinalTotalAmount())
                .sum();
        stats.setTotalRevenue(totalRevenue);

        var recentOrders = orderService.getAllOrders(PageRequest.of(0, 5, Sort.by("orderDate").descending())).getContent();
        stats.setRecentOrders(recentOrders);

        return ResponseEntity.ok(stats);
    }
    
    @GetMapping("/revenue-by-date")
    public ResponseEntity<List<RevenueByDateDTO>> getRevenueByDate() {
        LocalDateTime sevenDaysAgo = LocalDateTime.now().minusDays(7);
        return ResponseEntity.ok(orderRepository.findRevenueByDate(sevenDaysAgo));
    }

    @GetMapping("/top-selling-products")
    public ResponseEntity<List<TopSellingProductDTO>> getTopSellingProducts() {
        // Lưu ý: PageRequest.of(0, 5) sẽ lấy 5 sản phẩm đầu tiên
        return ResponseEntity.ok(orderRepository.findTopSellingProducts(PageRequest.of(0, 5)));
    }
}