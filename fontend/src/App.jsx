// File: src/App.jsx (Phiên bản cuối cùng, sửa lỗi một cách thông minh)

import React from "react";
// BƯỚC 1: Import thêm 'useLocation' từ react-router-dom
import { Outlet, useLocation } from "react-router-dom";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Cart from "./components/Cart";
import { CartProvider } from "./context/CartContext";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  // BƯỚC 2: Lấy thông tin về đường dẫn hiện tại
  const { pathname } = useLocation();

  // BƯỚC 3: Kiểm tra xem trang hiện tại có phải là trang chủ hay không
  // Trang chủ có pathname là "/"
  const isHomePage = pathname === "/";

  return (
    <CartProvider>
      <ScrollToTop />
      <div>
        <Header />
        {/* BƯỚC 4: Áp dụng class một cách có điều kiện */}
        <main className={isHomePage ? "" : "pt-3"}>
          <Outlet />
        </main>
        <Footer />
        <Cart />
      </div>
    </CartProvider>
  );
}

export default App;
