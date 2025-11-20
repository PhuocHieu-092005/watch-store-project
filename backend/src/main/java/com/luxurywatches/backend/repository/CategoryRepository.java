package com.luxurywatches.backend.repository;

import com.luxurywatches.backend.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    // Xóa bỏ phương thức findSelfAndAllChildrenIds(...) ở đây
}