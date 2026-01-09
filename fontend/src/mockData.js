// src/mockData.js
import axios from "axios";

// 1. DỮ LIỆU MẪU (Giữ nguyên)
export const mockProducts = [
  {
    id: 1,
    name: "Orient Sun & Moon Gen 4",
    brand: "Orient",
    price: 8500000,
    description:
      "Một mẫu đồng hồ cơ tự động tinh xảo với lịch ngày đêm độc đáo.",
    imageUrl:
      "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg",
    stock: 15,
  },
  {
    id: 2,
    name: "Seiko 5 Sport",
    brand: "Seiko",
    price: 6200000,
    description:
      "Dòng đồng hồ thể thao bền bỉ, phù hợp cho các hoạt động hàng ngày.",
    imageUrl:
      "https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg",
    stock: 20,
  },
  {
    id: 3,
    name: "Tissot Le Locle",
    brand: "Tissot",
    price: 15350000,
    description: "Vẻ đẹp cổ điển từ thương hiệu Thụy Sĩ danh tiếng.",
    imageUrl:
      "https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg",
    stock: 8,
  },
];

// 2. CẤU HÌNH KẾT NỐI API (Sửa lại cho đúng với Render)
// Tạo một instance của axios
const apiClient = axios.create({
  // QUAN TRỌNG: Trỏ thẳng về Render, không dùng localhost nữa
  baseURL: "https://watch-store-project.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Can thiệp vào mỗi request TRƯỚC KHI nó được gửi đi
apiClient.interceptors.request.use(
  (config) => {
    // Lấy token từ localStorage (nếu có chức năng đăng nhập)
    const token = localStorage.getItem("token");

    // Nếu có token, thêm nó vào header Authorization
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Xử lý lỗi nếu có
    return Promise.reject(error);
  }
);

// Xuất apiClient ra để các file khác dùng
export default apiClient;
