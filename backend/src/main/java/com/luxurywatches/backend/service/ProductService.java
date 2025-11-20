package com.luxurywatches.backend.service;

import com.luxurywatches.backend.dto.PageResponseDTO;
import com.luxurywatches.backend.dto.ProductDTO;
import com.luxurywatches.backend.dto.SpecificationDTO; // <-- THÊM DÒNG IMPORT NÀY
import com.luxurywatches.backend.entity.Category;
import com.luxurywatches.backend.entity.Product;
import com.luxurywatches.backend.exception.ResourceNotFoundException;
import com.luxurywatches.backend.repository.CartItemRepository;
import com.luxurywatches.backend.repository.OrderItemRepository;
import com.luxurywatches.backend.repository.ProductRepository;
import com.luxurywatches.backend.repository.specification.ProductSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays; // <-- THÊM DÒNG IMPORT NÀY
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private ProductSpecification productSpecification;
    @Autowired
    private CartItemRepository cartItemRepository;
    @Autowired
    private OrderItemRepository orderItemRepository;

    @Value("${app.vat-rate}")
    private double vatRate;

    public ProductDTO createProduct(ProductDTO productDTO) {
        Category category = categoryService.getCategoryEntityById(productDTO.getCategoryId());
        Product product = new Product();
        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setPrice(productDTO.getPrice());
        product.setStockQuantity(productDTO.getStockQuantity());
        product.setImageUrl(productDTO.getImageUrl());
        product.setCategory(category);
        Product savedProduct = productRepository.save(product);
        return convertToDTO(savedProduct);
    }

    public ProductDTO getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        return convertToDTO(product);
    }

    public ProductDTO updateProduct(Long id, ProductDTO productDTO) {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        Category category = categoryService.getCategoryEntityById(productDTO.getCategoryId());
        existingProduct.setName(productDTO.getName());
        existingProduct.setDescription(productDTO.getDescription());
        existingProduct.setPrice(productDTO.getPrice());
        existingProduct.setStockQuantity(productDTO.getStockQuantity());
        existingProduct.setImageUrl(productDTO.getImageUrl());
        existingProduct.setCategory(category);
        Product updatedProduct = productRepository.save(existingProduct);
        return convertToDTO(updatedProduct);
    }

    @Transactional
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ResourceNotFoundException("Product not found with id: " + id);
        }
        if (orderItemRepository.existsByProductId(id)) {
            throw new IllegalStateException(
                    "Cannot delete product with id: " + id + " because it exists in past orders.");
        }
        cartItemRepository.deleteByProductId(id);
        productRepository.deleteById(id);
    }

    @Transactional
    public ProductDTO updateProductImage(Long productId, String imageUrl) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + productId));
        product.setImageUrl(imageUrl);
        Product updatedProduct = productRepository.save(product);
        return convertToDTO(updatedProduct);
    }

    public PageResponseDTO<ProductDTO> getAllProducts(Pageable pageable) {
        return searchProducts(null, null, null, null, pageable);
    }

    public PageResponseDTO<ProductDTO> searchProducts(String keyword, Long categoryId, Double minPrice, Double maxPrice,
            Pageable pageable) {
        Page<Product> productPage;
        Specification<Product> spec = productSpecification.findByCriteria(keyword, null, minPrice, maxPrice);

        if (categoryId != null) {
            List<Long> allCategoryIds = categoryService.findSelfAndAllChildrenIds(categoryId);
            Specification<Product> categorySpec = (root, query, criteriaBuilder) -> root.get("category").get("id")
                    .in(allCategoryIds);
            productPage = productRepository.findAll(spec.and(categorySpec), pageable);
        } else {
            productPage = productRepository.findAll(spec, pageable);
        }

        List<ProductDTO> productDTOs = productPage.getContent().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());

        PageResponseDTO<ProductDTO> response = new PageResponseDTO<>();
        response.setContent(productDTOs);
        response.setPageNo(productPage.getNumber());
        response.setPageSize(productPage.getSize());
        response.setTotalElements(productPage.getTotalElements());
        response.setTotalPages(productPage.getTotalPages());
        response.setLast(productPage.isLast());

        return response;
    }

    private ProductDTO convertToDTO(Product product) {
        ProductDTO dto = new ProductDTO();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setPrice(product.getPrice());
        double priceWithVat = product.getPrice() * (1 + vatRate);
        dto.setPriceWithVat(Math.round(priceWithVat * 100.0) / 100.0);
        dto.setStockQuantity(product.getStockQuantity());
        dto.setImageUrl(product.getImageUrl());
        if (product.getCategory() != null) {
            dto.setCategoryId(product.getCategory().getId());
            dto.setCategoryName(product.getCategory().getName());
        }

        // ===== BẮT ĐẦU PHẦN CODE MỚI ĐƯỢC THÊM VÀO =====

        // 1. Thêm dữ liệu mẫu cho galleryImages
        // Bạn cần đảm bảo các file ảnh này tồn tại trong thư mục public/images/gallery/ trên frontend
        List<String> gallery = Arrays.asList(
                product.getImageUrl(), // Lấy ảnh chính làm ảnh đầu tiên
                "gallery/sub-side.png",
                "gallery/sub-clasp.png",
                "gallery/sub-back.png"
        );
        dto.setGalleryImages(gallery);

        // 2. Thêm dữ liệu mẫu cho specifications
        // Dữ liệu này sẽ giống nhau cho mọi sản phẩm, để đơn giản hóa.
        // Trong tương lai, bạn có thể lưu chúng trong database.
        List<SpecificationDTO> specs = Arrays.asList(
                new SpecificationDTO("Mã tham chiếu", "APEX-" + product.getId()),
                new SpecificationDTO("Bộ máy", "APEX Calibre A-32, tự lên dây"),
                new SpecificationDTO("Dự trữ năng lượng", "Khoảng 72 giờ"),
                new SpecificationDTO("Chất liệu vỏ", "Thép 904L / Vàng 18k"),
                new SpecificationDTO("Đường kính", "41 mm"),
                new SpecificationDTO("Mặt kính", "Sapphire chống trầy xước"),
                new SpecificationDTO("Kháng nước", "Lên đến 300 mét / 1,000 feet")
        );
        dto.setSpecifications(specs);

        // ===== KẾT THÚC PHẦN CODE MỚI =====

        return dto;
    }
}