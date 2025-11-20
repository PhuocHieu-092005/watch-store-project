// src/pages/LoginPage.jsx

import React, { useState } from "react";
// Import thêm useLocation
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Lấy thông tin location
  const { login } = useAuth();

  // Lấy ra đường dẫn "from" từ state, nếu không có thì mặc định là trang chủ "/"
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(username, password);
      // Thay vì luôn điều hướng về "/", bây giờ chúng ta điều hướng về "from"
      navigate(from, { replace: true });
    } catch (err) {
      setError("Tên đăng nhập hoặc mật khẩu không đúng.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // ... phần JSX không thay đổi ...
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="card w-full max-w-sm shrink-0 bg-base-100 shadow-2xl">
        <form className="card-body" onSubmit={handleSubmit}>
          <h2 className="card-title text-center text-2xl">Đăng nhập</h2>
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
          <div className="form-control">
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
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn btn-warning"
              disabled={loading}
            >
              {loading ? "Đang xử lý..." : "Đăng nhập"}
            </button>
          </div>
          <p className="text-center mt-4">
            Chưa có tài khoản?{" "}
            <Link to="/register" className="link link-hover text-yellow-400">
              Đăng ký ngay
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
