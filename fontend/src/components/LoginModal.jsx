import React, { useState } from "react";
import apiClient from "../api";
import { useCart } from "../context/CartContext"; // Chúng ta có thể dùng context sau này để lưu thông tin user

// Component nhận vào 2 props:
// isOpen: Biến true/false để quyết định có hiển thị modal không
// onClose: Một hàm để ra lệnh "đóng modal lại" từ bên ngoài
const LoginModal = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Nếu không mở, không render gì cả
  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn form tự reload trang
    setError(""); // Xóa lỗi cũ

    try {
      // Gọi API đăng nhập
      const response = await apiClient.post("/api/auth/signin", {
        username,
        password,
      });

      // Lấy token từ response
      const token = response.data.token;

      // Lưu "chìa khóa" vào localStorage
      localStorage.setItem("token", token);

      alert("Đăng nhập thành công!"); // Thông báo thành công (tạm thời)
      onClose(); // Đóng modal lại
      window.location.reload(); // Tải lại trang để header cập nhật
    } catch (err) {
      console.error("Login failed:", err);
      setError("Tên đăng nhập hoặc mật khẩu không đúng.");
    }
  };

  return (
    // Đây là component Modal của daisyUI
    <dialog id="login_modal" className="modal modal-open">
      <div className="modal-box">
        <form method="dialog">
          {/* Nút X để đóng modal */}
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={onClose}
          >
            ✕
          </button>
        </form>

        <h3 className="font-bold text-2xl mb-4 text-center">Đăng nhập</h3>

        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Tên đăng nhập</span>
            </label>
            <input
              type="text"
              placeholder="username"
              className="input input-bordered"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">Mật khẩu</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Hiển thị lỗi nếu có */}
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}

          <div className="form-control mt-6">
            <button type="submit" className="btn btn-warning">
              Đăng nhập
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default LoginModal;
