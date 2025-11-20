// src/layout/AdminLayout.jsx

import React from "react";
import { NavLink, Outlet } from "react-router-dom"; // Dùng NavLink để làm nổi bật link đang active

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-base-200 p-4">
        <NavLink to="/admin" className="text-2xl font-bold mb-6 block">
          Admin Dashboard
        </NavLink>
        <ul className="menu space-y-2">
          {/* Dùng NavLink thay cho Link */}
          {/* NavLink sẽ tự động thêm class 'active' khi URL khớp */}
          <li>
            <NavLink to="/admin" end>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/products">Quản lý Sản phẩm</NavLink>
          </li>
          <li>
            <NavLink to="/admin/categories">Quản lý Danh mục</NavLink>
          </li>
          <li>
            <NavLink to="/admin/orders">Quản lý Đơn hàng</NavLink>
          </li>
          <li>
            <NavLink to="/admin/users">Quản lý Người dùng</NavLink>
          </li>
        </ul>
      </aside>
      <main className="flex-grow p-8 bg-base-100">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
