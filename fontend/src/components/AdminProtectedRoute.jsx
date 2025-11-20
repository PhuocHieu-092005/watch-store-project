// src/components/AdminProtectedRoute.jsx

import React from "react";
import { useAuth } from "../context/AuthContext";
// Import thêm useLocation
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AdminProtectedRoute = () => {
  const { user, token, loading } = useAuth();
  const location = useLocation(); // Hook để lấy thông tin về URL hiện tại

  if (loading) {
    return (
      <div className="text-center py-20">Đang kiểm tra quyền truy cập...</div>
    );
  }

  if (token && user?.role === "ADMIN") {
    return <Outlet />;
  }

  // Khi điều hướng đến trang login, "gửi kèm" đường dẫn hiện tại (location.pathname)
  // để trang login biết cần quay lại đâu sau khi đăng nhập thành công.
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AdminProtectedRoute;
