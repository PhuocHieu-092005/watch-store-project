package com.luxurywatches.backend.service;

import com.luxurywatches.backend.dto.CategoryDTO;
import com.luxurywatches.backend.entity.Category;
import com.luxurywatches.backend.exception.ResourceNotFoundException;
import com.luxurywatches.backend.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public CategoryDTO createCategory(CategoryDTO categoryDTO) {
        Category category = new Category();
        category.setName(categoryDTO.getName());
        Category savedCategory = categoryRepository.save(category);
        return convertToDTO(savedCategory);
    }

    public List<CategoryDTO> getAllCategories() {
        return categoryRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<CategoryDTO> getCategoryTree() {
        List<Category> allCategories = categoryRepository.findAll();
        List<CategoryDTO> allCategoryDTOs = allCategories.stream().map(this::convertToDTO).collect(Collectors.toList());
        Map<Long, CategoryDTO> categoryMap = allCategoryDTOs.stream()
                .collect(Collectors.toMap(CategoryDTO::getId, dto -> dto));
        List<CategoryDTO> categoryTree = new ArrayList<>();
        for (CategoryDTO dto : allCategoryDTOs) {
            if (dto.getParentId() != null) {
                CategoryDTO parentDto = categoryMap.get(dto.getParentId());
                if (parentDto != null) {
                    if (parentDto.getChildren() == null) {
                        parentDto.setChildren(new ArrayList<>());
                    }
                    parentDto.getChildren().add(dto);
                }
            } else {
                categoryTree.add(dto);
            }
        }
        return categoryTree;
    }

    public CategoryDTO updateCategory(Long id, CategoryDTO categoryDTO) {
        Category existingCategory = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));
        existingCategory.setName(categoryDTO.getName());
        Category updatedCategory = categoryRepository.save(existingCategory);
        return convertToDTO(updatedCategory);
    }

    public void deleteCategory(Long id) {
        if (!categoryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Category not found with id: " + id);
        }
        categoryRepository.deleteById(id);
    }

    // === PHƯƠNG THỨC MỚI CẦN THÊM VÀO ĐỂ SỬA LỖI ===
    /**
     * Lấy ra đối tượng Category Entity đầy đủ từ database.
     * Dùng để các service khác (như ProductService) có thể sử dụng.
     * 
     * @param id ID của category cần tìm.
     * @return Đối tượng Category.
     */
    public Category getCategoryEntityById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));
    }
    // ===============================================

    public List<Long> findSelfAndAllChildrenIds(Long categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + categoryId));
        List<Long> ids = new ArrayList<>();
        collectAllChildrenIds(category, ids);
        return ids;
    }

    private void collectAllChildrenIds(Category category, List<Long> ids) {
        ids.add(category.getId());
        if (category.getChildren() != null && !category.getChildren().isEmpty()) {
            for (Category child : category.getChildren()) {
                collectAllChildrenIds(child, ids);
            }
        }
    }

    private CategoryDTO convertToDTO(Category category) {
        CategoryDTO dto = new CategoryDTO();
        dto.setId(category.getId());
        dto.setName(category.getName());
        if (category.getParent() != null) {
            dto.setParentId(category.getParent().getId());
        }
        return dto;
    }
}