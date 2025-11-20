package com.luxurywatches.backend.service;

import org.mockito.ArgumentCaptor;
import com.luxurywatches.backend.dto.ProductDTO;
import com.luxurywatches.backend.entity.Category;
import com.luxurywatches.backend.entity.Product;
import com.luxurywatches.backend.exception.ResourceNotFoundException;
import com.luxurywatches.backend.repository.CategoryRepository;
import com.luxurywatches.backend.repository.ProductRepository;
import com.luxurywatches.backend.repository.specification.ProductSpecification;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

// Báo cho JUnit 5 biết rằng chúng ta sẽ sử dụng Mockito trong class test này
@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    // @Mock: Tạo một đối tượng "giả" (mock) của ProductRepository.
    // Mọi lời gọi đến repository này sẽ được chúng ta kiểm soát.
    @Mock
    private ProductRepository productRepository;

    // @Mock: Tạo một mock cho CategoryRepository
    @Mock
    private CategoryRepository categoryRepository;

    // @Mock: Tạo một mock cho ProductSpecification
    @Mock
    private ProductSpecification productSpecification;

    // @InjectMocks: Tạo một instance thật của ProductService,
    // nhưng tự động "tiêm" (inject) các mock ở trên (productRepository, etc.) vào
    // nó.
    @InjectMocks
    private ProductService productService;

    // Khai báo các đối tượng mẫu để dùng lại trong các bài test
    private Category category;
    private Product product;
    private ProductDTO productDTO;

    // Phương thức này sẽ chạy TRƯỚC MỖI bài test (@Test)
    @BeforeEach
    void setUp() {
        // 1. Khởi tạo dữ liệu mẫu
        category = new Category("Rolex");
        category.setId(1L);

        product = new Product("Submariner", "A diver's watch", 10000.0, 10, "url", category);
        product.setId(1L);

        productDTO = new ProductDTO();
        productDTO.setId(1L);
        productDTO.setName("Submariner");
        productDTO.setCategoryId(1L);
        productDTO.setCategoryName("Rolex");
    }

    // === BÀI TEST THỨ NHẤT: Kịch bản thành công ===
    @Test
    void getProductById_whenProductExists_shouldReturnProductDTO() {
        // Arrange (Sắp xếp): "Dạy" cho mock repository phải làm gì.
        // "Khi ai đó gọi phương thức findById với ID là 1L,
        // thì hãy trả về một Optional chứa đối tượng product mẫu của chúng ta."
        when(productRepository.findById(1L)).thenReturn(Optional.of(product));

        // Act (Hành động): Gọi phương thức mà chúng ta muốn test.
        ProductDTO result = productService.getProductById(1L);

        // Assert (Khẳng định): Kiểm tra xem kết quả có đúng như mong đợi không.
        assertNotNull(result); // Kết quả không được null
        assertEquals(product.getId(), result.getId()); // ID phải khớp
        assertEquals(product.getName(), result.getName()); // Tên phải khớp
        assertEquals(category.getId(), result.getCategoryId()); // Category ID phải khớp

        // Verify (Xác minh): Đảm bảo rằng phương thức findById đã thực sự được gọi đúng
        // 1 lần.
        verify(productRepository, times(1)).findById(1L);
    }

    // === BÀI TEST THỨ HAI: Kịch bản thất bại ===
    @Test
    void getProductById_whenProductDoesNotExist_shouldThrowResourceNotFoundException() {
        // Arrange: "Dạy" cho mock repository.
        // "Khi ai đó gọi phương thức findById với ID là 99L (một ID không tồn tại),
        // thì hãy trả về một Optional rỗng."
        when(productRepository.findById(99L)).thenReturn(Optional.empty());

        // Act & Assert (Hành động & Khẳng định):
        // Chúng ta khẳng định rằng khi gọi productService.getProductById(99L),
        // một exception loại ResourceNotFoundException SẼ được ném ra.
        ResourceNotFoundException exception = assertThrows(
                ResourceNotFoundException.class,
                () -> {
                    productService.getProductById(99L);
                });

        // (Tùy chọn) Kiểm tra xem thông báo lỗi có đúng không.
        assertEquals("Product not found with id: 99", exception.getMessage());

        // Verify: Đảm bảo rằng phương thức findById vẫn được gọi 1 lần.
        verify(productRepository, times(1)).findById(99L);
    }

    // === BÀI TEST THỨ BA: Test chức năng tạo sản phẩm ===
    @Test
    void createProduct_whenCategoryExists_shouldSaveAndReturnProductDTO() {
        // Arrange (Sắp xếp)
        // 1. "Dạy" cho categoryRepository: Khi tìm category với ID 1L, hãy trả về
        // category mẫu.
        when(categoryRepository.findById(1L)).thenReturn(Optional.of(category));

        // 2. "Dạy" cho productRepository: Khi LƯU BẤT KỲ đối tượng Product nào,
        // hãy trả về đối tượng product mẫu của chúng ta.
        // Chúng ta dùng any(Product.class) vì đối tượng product được tạo MỚI bên trong
        // service,
        // nên chúng ta không thể biết chính xác nó là object nào để so sánh.
        when(productRepository.save(any(Product.class))).thenReturn(product);

        // Act (Hành động): Gọi phương thức cần test
        ProductDTO result = productService.createProduct(productDTO);

        // Assert (Khẳng định)
        assertNotNull(result);
        assertEquals(product.getId(), result.getId());

        // Verify (Xác minh)
        // Để kiểm tra xem đối tượng Product được lưu có đúng thông tin không,
        // chúng ta dùng một công cụ mạnh mẽ của Mockito là ArgumentCaptor.
        ArgumentCaptor<Product> productCaptor = ArgumentCaptor.forClass(Product.class);

        // Dòng này không chỉ xác minh phương thức save được gọi,
        // mà còn "bắt giữ" lại đối tượng Product đã được truyền vào nó.
        verify(productRepository).save(productCaptor.capture());

        // Lấy ra đối tượng đã bị "bắt giữ"
        Product capturedProduct = productCaptor.getValue();

        // Bây giờ, kiểm tra xem thông tin của sản phẩm bị bắt giữ có khớp với DTO không
        assertEquals(productDTO.getName(), capturedProduct.getName());
        assertEquals(productDTO.getDescription(), capturedProduct.getDescription());
        assertEquals(productDTO.getPrice(), capturedProduct.getPrice());
        assertEquals(category, capturedProduct.getCategory());
    }
}