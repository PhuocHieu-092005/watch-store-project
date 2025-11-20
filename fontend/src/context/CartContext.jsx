// src/context/CartContext.jsx

import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [finalTotalPrice, setFinalTotalPrice] = useState(0);

  const { token } = useAuth();
  const navigate = useNavigate();

  const updateCartState = (cartData) => {
    if (cartData && cartData.items) {
      setCartItems(cartData.items);
      setSubtotal(cartData.subtotal || 0);
      setFinalTotalPrice(cartData.finalTotalPrice || 0);
    } else {
      setCartItems([]);
      setSubtotal(0);
      setFinalTotalPrice(0);
    }
  };

  const fetchCart = async () => {
    if (!token) {
      updateCartState(null);
      return;
    }
    try {
      const response = await apiClient.get("/api/cart");
      updateCartState(response.data);
    } catch (error) {
      console.error("Không thể tải giỏ hàng:", error);
      updateCartState(null);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [token]);

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const addToCart = async (product, quantity, showNotification = true) => {
    if (!token) {
      alert("Vui lòng đăng nhập để thực hiện hành động này.");
      navigate("/login");
      throw new Error("User not logged in");
    }

    try {
      const response = await apiClient.post("/api/cart/items", {
        productId: product.id,
        quantity: quantity,
      });

      updateCartState(response.data);

      if (showNotification) {
        alert(`Đã thêm ${product.name} vào giỏ hàng!`);
      }

      return true; // Báo hiệu thành công
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      if (showNotification) {
        alert("Thêm sản phẩm thất bại. Vui lòng thử lại.");
      }
      throw error; // Ném lỗi ra để hàm gọi có thể xử lý
    }
  };

  const removeFromCart = async (cartItemId) => {
    if (!token) return;
    try {
      const response = await apiClient.delete(`/api/cart/items/${cartItemId}`);
      updateCartState(response.data);
    } catch (error) {
      console.error("Lỗi khi xóa khỏi giỏ hàng:", error);
    }
  };

  const clearCart = () => {
    updateCartState(null);
  };

  const value = {
    isCartOpen,
    cartItems,
    subtotal,
    finalTotalPrice,
    toggleCart,
    addToCart,
    removeFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  return useContext(CartContext);
};
