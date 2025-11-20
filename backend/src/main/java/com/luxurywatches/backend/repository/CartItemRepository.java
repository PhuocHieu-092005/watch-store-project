package com.luxurywatches.backend.repository;

import com.luxurywatches.backend.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional; // <-- IMPORT MỚI

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    // === PHẦN THÊM VÀO ===
    /**
     * Tự động tạo và thực thi câu lệnh xóa tất cả các CartItem
     * có tham chiếu đến một productId cụ thể.
     * 
     * @Transactional đảm bảo thao tác này được thực hiện trong một giao dịch an
     *                toàn.
     */
    @Transactional
    void deleteByProductId(Long productId);
    // ======================
}