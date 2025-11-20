import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../api";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await apiClient.post("/api/auth/signup", {
        username,
        email,
        fullName,
        password,
      });
      alert("Đăng ký thành công! Vui lòng đăng nhập.");
      navigate("/login"); // Điều hướng đến trang đăng nhập
    } catch (err) {
      setError("Đăng ký thất bại. Tên đăng nhập hoặc email có thể đã tồn tại.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="card w-full max-w-sm shrink-0 bg-base-100 shadow-2xl">
        <form className="card-body" onSubmit={handleSubmit}>
          <h2 className="card-title text-center text-2xl">Đăng Ký</h2>
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
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Họ và Tên</span>
            </label>
            <input
              type="text"
              placeholder="full name"
              className="input input-bordered"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
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
            <button type="submit" className="btn btn-warning">
              Đăng Ký
            </button>
          </div>

          <p className="text-center mt-4">
            Đã có tài khoản?{" "}
            <Link to="/login" className="link link-hover text-yellow-400">
              Đăng nhập
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
