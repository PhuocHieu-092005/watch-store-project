// src/layout/Header.jsx

import React, { useState, useEffect } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import apiClient from "../api";
import logo from "../assets/images/Apex.jpg";

const Header = () => {
  const { toggleCart, cartItems } = useCart();
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  // --- STATE ---
  const [categories, setCategories] = useState([]);
  const [activeSubCategory, setActiveSubCategory] = useState(null);
  const [activeCollection, setActiveCollection] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [notifications, setNotifications] = useState([]);
  // *** THÊM STATE ĐẾM SỐ CHƯA ĐỌC ***
  const [unreadCount, setUnreadCount] = useState(0);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm.trim()}`);
      setSearchTerm("");
    }
  };

  // --- FETCH CATEGORIES ---
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiClient.get("/api/categories/tree");
        setCategories(response.data || []);
      } catch (error) {
        console.error("Không thể tải danh sách thương hiệu:", error);
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  // --- FETCH NOTIFICATIONS & TÍNH SỐ LƯỢNG CHƯA ĐỌC ---
  useEffect(() => {
    if (token) {
      const fetchNotifications = async () => {
        try {
          const response = await apiClient.get("/api/orders");
          const notifs = response.data
            .filter((order) =>
              ["CANCELLED", "DELIVERED", "SHIPPED"].includes(order.status)
            )
            .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));

          setNotifications(notifs);

          // *** LOGIC TÍNH SỐ CHƯA ĐỌC ***
          // Lấy số lượng đã đọc lần trước từ localStorage
          const readCount = parseInt(
            localStorage.getItem("readNotificationCount") || "0",
            10
          );
          // Số chưa đọc = Tổng số hiện tại - Số đã đọc lần trước
          const newUnread = Math.max(0, notifs.length - readCount);
          setUnreadCount(newUnread);
        } catch (error) {
          console.error("Lỗi tải thông báo:", error);
        }
      };
      fetchNotifications();
    }
  }, [token]);

  // *** HÀM XỬ LÝ KHI BẤM VÀO CHUÔNG ***
  const handleBellClick = () => {
    // Reset số chưa đọc về 0
    setUnreadCount(0);
    // Lưu tổng số lượng hiện tại vào localStorage (đánh dấu là đã xem hết)
    localStorage.setItem(
      "readNotificationCount",
      notifications.length.toString()
    );
  };

  const handleLogout = () => {
    logout();
    alert("Bạn đã đăng xuất.");
    navigate("/");
  };

  const totalCartItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // --- HELPER FUNCTIONS ---
  const getNotifColor = (status) => {
    if (status === "CANCELLED") return "text-red-400";
    if (status === "DELIVERED") return "text-green-400";
    return "text-blue-400";
  };

  const getNotifMessage = (order) => {
    if (order.status === "CANCELLED")
      return `Đơn hàng #${order.id} đã bị hủy 😞`;
    if (order.status === "DELIVERED")
      return `Đơn hàng #${order.id} đã giao thành công 🎉`;
    if (order.status === "SHIPPED")
      return `Đơn hàng #${order.id} đang được vận chuyển 🚚`;
    return `Đơn hàng #${order.id}: ${order.status}`;
  };

  // --- STYLES ---
  const menuLinkClass =
    "block w-full text-left p-2 rounded-md transition-colors duration-200";
  const activeMenuLinkClass = "bg-gray-900 text-white";
  const inactiveMenuLinkClass = "hover:bg-gray-700 hover:text-white";

  const getNavLinkClass = ({ isActive }) => {
    const baseClasses =
      "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300";
    const groupHoverClasses =
      "group-hover:bg-transparent group-hover:text-neutral-900";
    if (isActive) return `${baseClasses} text-white ${groupHoverClasses}`;
    return `${baseClasses} text-gray-300 ${groupHoverClasses}`;
  };

  return (
    <div className="fixed top-1 left-2 right-0 z-50 flex justify-center px-4">
      <div className="navbar group bg-neutral/80 backdrop-blur-sm text-white hover:bg-white hover:text-neutral-900 transition-all duration-300 rounded-full shadow-lg w-full max-w-7xl">
        <div className="navbar-start">
          <ul className="flex items-center space-x-1">
            <li>
              <NavLink to="/" className={getNavLinkClass}>
                Trang chủ
              </NavLink>
            </li>

            {/* MEGA MENU */}
            <li className="dropdown dropdown-hover">
              <summary
                tabIndex={0}
                role="button"
                className="px-4 py-2 rounded-full text-sm font-medium flex items-center cursor-pointer"
              >
                Thương hiệu
                <svg
                  className="fill-current w-4 h-4 ml-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </summary>
              <div
                tabIndex={0}
                className="dropdown-content z-[10] menu p-4 shadow bg-gray-800 text-gray-300 rounded-box w-max flex flex-row gap-4 mt-4"
              >
                <ul className="w-56 space-y-1">
                  {categories.map((l1Category) => (
                    <li key={l1Category.id}>
                      <Link
                        to={`/category/${l1Category.id}`}
                        className={`${menuLinkClass} font-bold ${
                          activeSubCategory === l1Category
                            ? activeMenuLinkClass
                            : inactiveMenuLinkClass
                        }`}
                        onMouseEnter={() => {
                          setActiveSubCategory(l1Category);
                          setActiveCollection(null);
                        }}
                      >
                        {l1Category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                {activeSubCategory && activeSubCategory.children && (
                  <ul className="w-56 space-y-1">
                    {activeSubCategory.children.map((l2Category) => (
                      <li key={l2Category.id}>
                        <Link
                          to={`/category/${l2Category.id}`}
                          className={`${menuLinkClass} ${
                            activeCollection === l2Category
                              ? activeMenuLinkClass
                              : inactiveMenuLinkClass
                          }`}
                          onMouseEnter={() => setActiveCollection(l2Category)}
                        >
                          {l2Category.name}{" "}
                          {l2Category.children &&
                            l2Category.children.length > 0 &&
                            " »"}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
                {activeCollection && activeCollection.children && (
                  <ul className="w-56 space-y-1 border-l border-gray-600 pl-4">
                    {activeCollection.children.map((l3Category) => (
                      <li key={l3Category.id}>
                        <Link
                          to={`/category/${l3Category.id}`}
                          className={`${menuLinkClass} ${inactiveMenuLinkClass}`}
                        >
                          {l3Category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>

            <li>
              <NavLink to="/contact" className={getNavLinkClass}>
                Liên hệ
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={getNavLinkClass}>
                Về Chúng Tôi
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="navbar-center">
          <Link
            to="/"
            className="text-3xl font-bold tracking-wider normal-case"
          >
            APEX
          </Link>
        </div>

        <div className="navbar-end">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center gap-2"
          >
            <div className="form-control mr-2">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input input-bordered w-24 md:w-auto bg-transparent group-hover:bg-gray-200 group-hover:text-black transition-colors"
              />
            </div>
            <button type="submit" className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </form>

          {token ? (
            <>
              {/* --- CHUÔNG THÔNG BÁO --- */}
              <div className="dropdown dropdown-end">
                {/* THÊM onClick={handleBellClick} vào đây 
                    để khi bấm vào chuông thì reset số về 0
                */}
                <label
                  tabIndex={0}
                  className="btn btn-ghost btn-circle"
                  onClick={handleBellClick}
                >
                  <div className="indicator">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                    {/* SỬA: Hiển thị số unreadCount thay vì chấm tròn 
                        badge-sm để số hiển thị rõ hơn
                    */}
                    {unreadCount > 0 && (
                      <span className="badge badge-sm badge-error indicator-item text-white">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                </label>

                <div
                  tabIndex={0}
                  className="dropdown-content z-[50] card card-compact w-80 p-2 shadow-xl bg-gray-800 text-gray-300 mt-4 rounded-box border border-gray-700"
                >
                  <div className="card-body">
                    <h3 className="font-bold text-lg mb-2 text-white border-b border-gray-600 pb-2">
                      Thông báo
                    </h3>
                    <ul className="menu p-0 max-h-[60vh] overflow-y-auto overflow-x-hidden custom-scrollbar">
                      {notifications.length === 0 ? (
                        <li className="disabled text-center py-4">
                          <a>Không có thông báo mới</a>
                        </li>
                      ) : (
                        notifications.map((order) => (
                          <li
                            key={order.id}
                            className="border-b border-gray-700 last:border-0"
                          >
                            <Link
                              to="/my-orders"
                              className="flex flex-col items-start py-3 hover:bg-gray-700 rounded-lg transition-colors"
                            >
                              <span
                                className={`font-bold text-sm ${getNotifColor(
                                  order.status
                                )} whitespace-normal break-words w-full`}
                              >
                                {getNotifMessage(order)}
                              </span>
                              <span className="text-xs opacity-60 mt-1">
                                {new Date(order.orderDate).toLocaleString(
                                  "vi-VN"
                                )}
                              </span>
                            </Link>
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                </div>
              </div>
              {/* ---------------------------------- */}

              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle">
                  <div className="w-10 rounded-full flex items-center justify-center bg-gray-700">
                    <span className="text-xl text-white">
                      {user?.username?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-base-content"
                >
                  <li>
                    {/* ĐÃ SỬA: Trỏ về đúng trang /profile */}
                    <Link to="/profile">Hồ Sơ</Link>
                  </li>
                  <li>
                    <Link to="/my-orders">Lịch sử mua hàng</Link>
                  </li>
                  {/* {user?.role === "ADMIN" && (
                    <li>
                      <Link to="/admin" className="justify-between">
                        Trang Quản Trị{" "}
                        <span className="badge badge-warning">Admin</span>
                      </Link>
                    </li>
                  )} */}
                  <li>
                    <button onClick={handleLogout}>Đăng xuất</button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <Link to="/login" className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </Link>
          )}
          <button onClick={toggleCart} className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {totalCartItems > 0 && (
                <span className="badge badge-sm badge-warning indicator-item">
                  {totalCartItems}
                </span>
              )}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
