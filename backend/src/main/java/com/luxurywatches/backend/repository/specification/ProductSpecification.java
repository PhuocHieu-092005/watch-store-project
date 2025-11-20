package com.luxurywatches.backend.repository.specification;

import com.luxurywatches.backend.entity.Product;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ProductSpecification {

    public Specification<Product> findByCriteria(
            String keyword, Long categoryId, Double minPrice, Double maxPrice) {

        // Specification là một interface, ta dùng lambda expression để implement nó
        return (root, query, criteriaBuilder) -> {

            // Tạo một danh sách để chứa tất cả các điều kiện (predicate)
            List<Predicate> predicates = new ArrayList<>();

            // 1. Thêm điều kiện tìm kiếm theo keyword (nếu có)
            if (keyword != null && !keyword.trim().isEmpty()) {
                // Tìm keyword trong cả 'name' và 'description' của sản phẩm
                // Dùng lower() để tìm kiếm không phân biệt chữ hoa/thường
                Predicate namePredicate = criteriaBuilder.like(criteriaBuilder.lower(root.get("name")),
                        "%" + keyword.toLowerCase() + "%");
                Predicate descriptionPredicate = criteriaBuilder.like(criteriaBuilder.lower(root.get("description")),
                        "%" + keyword.toLowerCase() + "%");
                // Kết hợp 2 điều kiện trên bằng OR (tìm thấy trong tên HOẶC mô tả)
                predicates.add(criteriaBuilder.or(namePredicate, descriptionPredicate));
            }

            // 2. Thêm điều kiện lọc theo categoryId (nếu có)
            if (categoryId != null) {
                // Lấy ra category object từ product, rồi lấy id của category đó
                predicates.add(criteriaBuilder.equal(root.get("category").get("id"), categoryId));
            }

            // 3. Thêm điều kiện lọc theo giá tối thiểu (nếu có)
            if (minPrice != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("price"), minPrice));
            }

            // 4. Thêm điều kiện lọc theo giá tối đa (nếu có)
            if (maxPrice != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("price"), maxPrice));
            }

            // Kết hợp tất cả các điều kiện trong danh sách bằng AND
            // toArray(new Predicate[0]) là cách chuyển List thành Array
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}