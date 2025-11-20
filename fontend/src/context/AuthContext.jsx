// src/context/AuthContext.jsx

import React, { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import apiClient from "../api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  // Thêm state loading, mặc định là true khi app vừa tải
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      if (token) {
        localStorage.setItem("token", token);
        const decodedUser = jwtDecode(token);

        // BƯỚC QUAN TRỌNG ĐỂ KIỂM TRA: In ra để xem backend có trả về role không
        console.log("DECODED USER FROM TOKEN:", decodedUser);

        // Backend của Nhật phải trả về role trong token. Ví dụ: { sub: 'admin', role: 'ADMIN' }
        setUser({ username: decodedUser.sub, role: decodedUser.role });
      } else {
        localStorage.removeItem("token");
        setUser(null);
      }
    } catch (error) {
      // Nếu token không hợp lệ, xóa nó đi
      console.error("Invalid token:", error);
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      // Sau khi kiểm tra xong, dù thành công hay thất bại, báo là đã hết loading
      setLoading(false);
    }
  }, [token]);

  const login = async (username, password) => {
    const response = await apiClient.post("/api/auth/signin", {
      username,
      password,
    });
    setToken(response.data.token);
    return response;
  };

  const register = async (username, email, fullName, password) => {
    return await apiClient.post("/api/auth/signup", {
      username,
      email,
      fullName,
      password,
    });
  };

  const logout = () => {
    setToken(null);
  };

  // Thêm 'loading' vào giá trị của context
  const value = { token, user, loading, login, logout, register };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
