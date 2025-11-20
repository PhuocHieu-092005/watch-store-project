// File: src/components/ScrollToTop.jsx

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Component này không render ra bất cứ thứ gì
// Nó chỉ thực hiện một hành động (side effect)
const ScrollToTop = () => {
  // Lấy ra pathname (ví dụ: "/", "/about", "/materials/sapphire-crystal")
  const { pathname } = useLocation();

  // Sử dụng useEffect để thực hiện hành động mỗi khi pathname thay đổi
  useEffect(() => {
    // Cuộn cửa sổ trình duyệt lên vị trí (0, 0) - tức là trên cùng
    window.scrollTo(0, 0);
  }, [pathname]); // Mảng dependency: Chạy lại effect này mỗi khi pathname thay đổi

  return null; // Không cần render gì cả
};

export default ScrollToTop;
