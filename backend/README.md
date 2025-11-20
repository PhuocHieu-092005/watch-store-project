Dự án Backend Website Bán Đồng Hồ Cao Cấp
Đây là phần backend cho dự án website thương mại điện tử chuyên bán các sản phẩm đồng hồ cao cấp. Dự án được xây dựng bằng Spring Boot, Java 21 và sử dụng MySQL làm cơ sở dữ liệu.
Thành viên nhóm
Backend: Cao Quang Nhật
Frontend: Phan Phước Hiếu
Công nghệ sử dụng
Ngôn ngữ: Java 21
Framework: Spring Boot 3
Database: MySQL (Sử dụng qua XAMPP)
Bảo mật: Spring Security, JWT (JSON Web Tokens)
ORM: Spring Data JPA / Hibernate
Build Tool: Maven
Testing: JUnit 5, Mockito
Các chức năng chính
Chức năng cơ bản

Quản lý Người dùng: Đăng ký, đăng nhập và phân quyền (USER, ADMIN).

Quản lý Sản phẩm & Danh mục: CRUD (Tạo, Xem, Cập nhật, Xóa) cho sản phẩm và danh mục.

Quản lý Giỏ hàng: Thêm, xem, xóa sản phẩm trong giỏ hàng.

Quản lý Đơn hàng: Tạo đơn hàng từ giỏ hàng.
Chức năng nâng cao

API RESTful: Xây dựng hệ thống API theo chuẩn REST.

Bảo mật JWT: Toàn bộ API yêu cầu nghiệp vụ đều được bảo mật bằng JWT.

Tìm kiếm & Lọc sản phẩm: API cho phép tìm kiếm sản phẩm theo từ khóa, danh mục và khoảng giá.
Hướng dẫn cài đặt và chạy dự án
Yêu cầu
JDK 21 hoặc cao hơn.
Maven 3.8 hoặc cao hơn.
XAMPP với MySQL đã được khởi động.
Postman để test API.
Các bước thực hiện
Clone repository:
code
Bash
git clone [URL repository của bạn]
cd backend
Cấu hình Database:
Mở XAMPP Control Panel và khởi động Apache và MySQL.
Vào phpMyAdmin (http://localhost/phpmyadmin).
Tạo một database mới với tên là luxury_watches_db.
Cấu hình ứng dụng:
Mở file src/main/resources/application.properties.
Đảm bảo các thông tin kết nối database đã chính xác (đặc biệt là spring.datasource.username và spring.datasource.password).
Chạy ứng dụng:
Mở terminal tại thư mục gốc của dự án.
Gõ lệnh sau để Maven build và chạy dự án:
code
Bash
mvn spring-boot:run
Backend sẽ khởi động tại địa chỉ http://localhost:8080.
Dữ liệu mẫu (gồm người dùng, danh mục, sản phẩm) sẽ được tự động nạp vào database trong lần chạy đầu tiên.
Hướng dẫn sử dụng API (API Docs)
Dự án cung cấp các tài khoản mẫu để test:
User: username: user, password: password
Admin: username: admin, password: adminpass
Một số Endpoint chính:
Đăng nhập: POST /api/auth/signin
Lấy tất cả sản phẩm: GET /api/products
Tìm kiếm sản phẩm: GET /api/products/search?keyword=...&categoryId=...
Thêm vào giỏ hàng (yêu cầu token): POST /api/cart/items
Quy trình quản lý mã nguồn (Git)
Dự án sử dụng Git để quản lý mã nguồn và làm việc nhóm theo các quy tắc sau:
Nhánh chính: Sử dụng nhánh main (hoặc master) để chứa code đã ổn định.
Nhánh chức năng (Feature Branch): Mỗi khi phát triển một chức năng mới (ví dụ: feature/user-auth, feature/product-search), một nhánh mới sẽ được tạo ra từ nhánh main.
Pull Request (PR): Khi một chức năng đã hoàn thành trên nhánh của mình, lập trình viên sẽ tạo một Pull Request để yêu cầu gộp code vào nhánh main. Code trong PR sẽ được thành viên còn lại review (xem xét) trước khi được chấp thuận và gộp. Quy trình này đảm bảo chất lượng code và giảm thiểu lỗi.