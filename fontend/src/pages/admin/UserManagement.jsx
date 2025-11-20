// src/pages/admin/UserManagement.jsx

import React, { useState, useEffect } from "react";
import apiClient from "../../api";
import { useAuth } from "../../context/AuthContext";

// Component UserAvatar (Cải tiến để hiển thị ảnh thật nếu có)
const UserAvatar = ({ user }) => {
  if (user.avatarUrl) {
    return (
      <div className="avatar">
        <div className="mask mask-squircle w-12 h-12">
          <img src={user.avatarUrl} alt={user.fullName} />
        </div>
      </div>
    );
  }

  const initial = user.fullName
    ? user.fullName.charAt(0).toUpperCase()
    : user.username
    ? user.username.charAt(0).toUpperCase()
    : "?";

  return (
    <div className="avatar placeholder">
      <div className="bg-neutral text-neutral-content rounded-full w-12">
        <span>{initial}</span>
      </div>
    </div>
  );
};

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user: currentUser } = useAuth();

  // State cho phân trang
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const fetchUsers = async (page) => {
    try {
      setLoading(true);
      const response = await apiClient.get(
        `/api/admin/users?page=${page}&size=${pageSize}`
      );

      if (response.data && Array.isArray(response.data.content)) {
        setUsers(response.data.content);
        setTotalPages(response.data.totalPages);
      } else {
        setUsers([]);
        setTotalPages(0);
      }
    } catch (err) {
      setError(
        "Không thể tải danh sách người dùng. Vui lòng đảm bảo backend đã sẵn sàng và bạn có quyền Admin."
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  // --- HÀM XÓA VỚI THÔNG BÁO LỖI CHI TIẾT ---
  const handleDelete = async (userId, username) => {
    if (currentUser?.username === username) {
      alert("Bạn không thể tự xóa tài khoản của mình.");
      return;
    }
    if (
      window.confirm(
        `Bạn có chắc chắn muốn xóa người dùng "${username}" không?`
      )
    ) {
      try {
        await apiClient.delete(`/api/admin/users/${userId}`);
        alert("Xóa người dùng thành công!");

        // Tải lại danh sách sau khi xóa thành công
        fetchUsers(currentPage);
      } catch (err) {
        console.error("Lỗi khi xóa người dùng:", err);

        // Lấy lỗi chi tiết từ server (nếu có)
        const apiError = err.response?.data?.message || "Không rõ lỗi";

        // Hiển thị thông báo lỗi rõ ràng cho Admin
        alert(
          `Xóa người dùng thất bại! \n\nLý do: Người dùng này có thể đã có đơn hàng hoặc giỏ hàng. Không thể xóa người dùng có dữ liệu liên quan. \n\nChi tiết: ${apiError}`
        );
      }
    }
  };

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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản Lý Người Dùng</h1>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Người dùng</th>
              <th>Vai trò</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover">
                <td>
                  <div className="flex items-center gap-4">
                    <UserAvatar user={user} />
                    <div>
                      <div className="font-bold">
                        {user.fullName || user.username}
                      </div>
                      <div className="text-sm opacity-60">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span
                    className={`badge ${
                      user.role === "ADMIN" ? "badge-secondary" : "badge-ghost"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td>
                  {currentUser?.username !== user.username && (
                    <button
                      onClick={() => handleDelete(user.id, user.username)}
                      className="btn btn-sm btn-outline btn-error"
                    >
                      Xóa
                    </button>
                  )}
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

export default UserManagement;
