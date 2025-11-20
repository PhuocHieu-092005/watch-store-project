package com.luxurywatches.backend.repository;

import com.luxurywatches.backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List; // <-- IMPORT MỚI

public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {

    // === PHẦN THÊM VÀO ===
    /**
     * Tự động tạo câu lệnh SQL 'SELECT ... FROM products WHERE category_id IN
     * (...)'.
     * 
     * @param categoryIds Một danh sách các ID của danh mục.
     * @return Một danh sách các sản phẩm thuộc các danh mục đó.
     */
    List<Product> findByCategoryIdIn(List<Long> categoryIds);
    // ======================
}