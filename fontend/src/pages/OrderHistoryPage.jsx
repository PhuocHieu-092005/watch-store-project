// src/pages/OrderHistoryPage.jsx

import React, { useState, useEffect } from "react";
import apiClient from "../api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get("/api/orders");
        setOrders(
          response.data.sort(
            (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
          )
        );
      } catch (err) {
        setError("Không thể tải lịch sử đơn hàng.");
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token, navigate]);

  // --- HÀM MỚI: Lấy màu sắc dựa trên trạng thái đơn hàng ---
  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "badge-warning"; // Màu vàng (Chờ xử lý)
      case "PROCESSING":
        return "badge-info"; // Màu xanh dương (Đang xử lý)
      case "SHIPPED":
        return "badge-primary"; // Màu tím/chính (Đã gửi)
      case "DELIVERED":
        return "badge-success"; // Màu xanh lá (Đã nhận)
      case "CANCELLED":
        return "badge-error"; // Màu đỏ (Đã hủy)
      default:
        return "badge-ghost";
    }
  };

  if (loading)
    return (
      <div className="text-center py-20">Đang tải lịch sử đơn hàng...</div>
    );
  if (error)
    return <div className="text-center py-20 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Lịch Sử Mua Hàng</h1>
      {orders.length === 0 ? (
        <p>Bạn chưa có đơn hàng nào.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="card-title">Đơn hàng #{order.id}</h2>
                    <p className="text-sm opacity-70">
                      Ngày đặt:{" "}
                      {new Date(order.orderDate).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                  {/* SỬA MÀU BADGE TRẠNG THÁI */}
                  <div className={`badge ${getStatusColor(order.status)}`}>
                    {order.status}
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  {order.orderItems.map((item) => (
                    <div
                      key={item.productId}
                      className="flex justify-between items-center text-sm"
                    >
                      <p>
                        {item.productName} (x{item.quantity})
                      </p>
                      <p>
                        {new Intl.NumberFormat("vi-VN").format(
                          item.price * item.quantity
                        )}{" "}
                        $
                      </p>
                    </div>
                  ))}
                </div>

                <div className="divider my-0"></div>

                <div className="flex justify-end items-center font-bold text-lg mt-2">
                  <span>Tổng cộng:</span>
                  <span className="ml-2">
                    {/* SỬA LỖI NaN: Dùng đúng tên biến 'finalTotalAmount' từ Backend */}
                    {new Intl.NumberFormat("vi-VN").format(
                      order.finalTotalAmount
                    )}{" "}
                    $
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;
