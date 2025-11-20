package com.luxurywatches.backend.repository;

import com.luxurywatches.backend.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

    // === PHẦN THÊM VÀO ===
    /**
     * Tự động tạo và thực thi câu lệnh kiểm tra (SELECT COUNT > 0)
     * xem có bất kỳ OrderItem nào tham chiếu đến một productId cụ thể không.
     * Trả về true nếu có, false nếu không.
     */
    boolean existsByProductId(Long productId);
    // ======================
}