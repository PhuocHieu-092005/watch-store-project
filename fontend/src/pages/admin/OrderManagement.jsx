// src/pages/admin/OrderManagement.jsx (phiên bản hoàn chỉnh, đã sửa lỗi và có phân trang)

import React, { useState, useEffect } from "react";
import apiClient from "../../api";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State cho phân trang
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10); // Hiển thị 10 đơn hàng mỗi trang

  const fetchOrders = async (page) => {
    try {
      setLoading(true);
      // API đã được backend sắp xếp sẵn đơn hàng mới nhất lên đầu
      const response = await apiClient.get(
        `/api/admin/orders?page=${page}&size=${pageSize}&sortBy=orderDate&sortDir=desc`
      );

      // === SỬA LỖI Ở ĐÂY: Lấy mảng orders từ thuộc tính "content" ===
      if (response.data && Array.isArray(response.data.content)) {
        setOrders(response.data.content);
        setTotalPages(response.data.totalPages);
      } else {
        setOrders([]);
        setTotalPages(0);
      }
    } catch (err) {
      setError(
        "Không thể tải danh sách đơn hàng. Vui lòng đảm bảo backend đã sẵn sàng và bạn có quyền Admin."
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await apiClient.put(`/api/admin/orders/${orderId}/status`, {
        status: newStatus,
      });
      // Cập nhật lại giao diện ngay lập tức
      setOrders(
        orders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
      alert("Cập nhật trạng thái thành công!");
    } catch (err) {
      alert("Cập nhật trạng thái thất bại.");
      console.error(err);
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "PENDING":
        return "badge-warning";
      case "PROCESSING":
        return "badge-info";
      case "SHIPPED":
        return "badge-primary";
      case "DELIVERED":
        return "badge-success";
      case "CANCELLED":
        return "badge-error";
      default:
        return "badge-ghost";
    }
  };

  // Hàm chuyển trang
  const handleNextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };
  const handlePrevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error)
    return <div className="text-red-500 font-bold text-lg">{error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Quản Lý Đơn Hàng</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>ID Đơn Hàng</th>
              <th>Ngày Đặt</th>
              <th>Khách Hàng (UserID)</th>
              <th className="max-w-xs">Địa chỉ</th>
              <th>Tổng Tiền</th>
              <th>Trạng Thái</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <th>#{order.id}</th>
                <td>{new Date(order.orderDate).toLocaleString("vi-VN")}</td>
                <td>User ID: {order.userId}</td>
                <td className="max-w-xs truncate">{order.shippingAddress}</td>
                <td>
                  {new Intl.NumberFormat("vi-VN").format(
                    order.finalTotalAmount
                  )}{" "}
                  $
                </td>
                <td>
                  <span
                    className={`badge ${getStatusBadgeColor(order.status)}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td>
                  <div className="dropdown dropdown-left">
                    <label tabIndex={0} className="btn btn-sm btn-outline">
                      Cập nhật
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu p-2 shadow bg-base-300 rounded-box w-52"
                    >
                      <li>
                        <a
                          onClick={() =>
                            handleStatusChange(order.id, "PROCESSING")
                          }
                        >
                          Đang xử lý
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() =>
                            handleStatusChange(order.id, "SHIPPED")
                          }
                        >
                          Đã giao hàng
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() =>
                            handleStatusChange(order.id, "DELIVERED")
                          }
                        >
                          Đã nhận hàng
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() =>
                            handleStatusChange(order.id, "CANCELLED")
                          }
                        >
                          Hủy đơn
                        </a>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="join mt-6 flex justify-center">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            className="join-item btn"
          >
            «
          </button>
          <button className="join-item btn">
            Page {currentPage + 1} of {totalPages}
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage >= totalPages - 1}
            className="join-item btn"
          >
            »
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
