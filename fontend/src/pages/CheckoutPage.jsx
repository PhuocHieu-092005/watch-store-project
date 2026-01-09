// src/pages/CheckoutPage.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import apiClient from "../api";

const CheckoutPage = () => {
  const { token } = useAuth();
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // --- HÀM XỬ LÝ ĐƯỜNG DẪN ẢNH (FIX LỖI) ---
  const getImageUrl = (url) => {
    if (!url) return "https://via.placeholder.com/150"; // Ảnh mặc định nếu không có URL
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url; // Nếu đã là URL đầy đủ thì giữ nguyên
    }
    return `https://watch-store-project.onrender.com`; // Nếu là đường dẫn tương đối thì ghép thêm localhost
  };
  // ------------------------------------------

  useEffect(() => {
    if (!token) {
      alert("Vui lòng đăng nhập để thanh toán.");
      navigate("/login");
    }

    // Kiểm tra giỏ hàng trống
    const timer = setTimeout(() => {
      if (cartItems.length === 0) {
        alert("Giỏ hàng của bạn đang trống.");
        navigate("/");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [token, cartItems, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!shippingAddress.trim()) {
      setError("Vui lòng nhập địa chỉ giao hàng.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await apiClient.post("/api/orders", {
        shippingAddress,
      });
      alert("Đặt hàng thành công! Cảm ơn bạn đã mua sắm.");
      clearCart();
      navigate("/");
    } catch (err) {
      setError("Đặt hàng thất bại. Vui lòng thử lại.");
      console.error("Lỗi khi đặt hàng:", err);
    } finally {
      setLoading(false);
    }
  };

  // --- TÍNH TOÁN TỔNG TIỀN ---
  const cartSubtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const vatAmount = cartSubtotal * 0.1; // VAT 10%
  const totalAmount = cartSubtotal + vatAmount;

  const formattedSubtotal = new Intl.NumberFormat("vi-VN").format(cartSubtotal);
  const formattedVat = new Intl.NumberFormat("vi-VN").format(vatAmount);
  const formattedTotal = new Intl.NumberFormat("vi-VN").format(totalAmount);

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-40">
        Đang chuyển hướng vì giỏ hàng trống...
      </div>
    );
  }

  return (
    <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 px-4 pb-8 pt-40">
      {/* CỘT BÊN TRÁI: FORM THÔNG TIN */}
      <div className="lg:pr-8">
        <h2 className="text-2xl font-bold mb-6">Thông tin giao hàng</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text">Họ và tên</span>
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Địa chỉ giao hàng</span>
            </label>
            <textarea
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              className="textarea textarea-bordered w-full"
              rows="3"
              placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
              required
            ></textarea>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="btn btn-warning w-full mt-6 font-bold text-lg"
            disabled={loading || cartItems.length === 0}
          >
            {loading ? "Đang xử lý..." : "Hoàn tất đơn hàng"}
          </button>
        </form>
      </div>

      {/* CỘT BÊN PHẢI: TÓM TẮT ĐƠN HÀNG */}
      <div className="bg-base-200 p-6 rounded-lg h-fit shadow-md">
        <h2 className="text-xl font-bold mb-4">Đơn hàng của bạn</h2>
        <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b border-base-300 pb-4 last:border-0"
            >
              <div className="flex items-center gap-4">
                <div className="avatar">
                  <div className="w-16 rounded border border-base-300 overflow-hidden bg-white">
                    {" "}
                    {/* Thêm bg-white để tránh ảnh png bị đen nền */}
                    {/* *** SỬA LỖI Ở ĐÂY: Dùng hàm getImageUrl *** */}
                    <img
                      src={getImageUrl(item.imageUrl)}
                      alt={item.productName}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-sm">
                    {item.productName || item.name}
                  </p>
                  <p className="text-xs opacity-70 mt-1">
                    Số lượng: {item.quantity}
                  </p>
                </div>
              </div>
              <p className="font-medium">
                {new Intl.NumberFormat("vi-VN").format(
                  item.price * item.quantity
                )}{" "}
                $
              </p>
            </div>
          ))}
        </div>

        <div className="divider"></div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Tạm tính</span>
            <span>{formattedSubtotal} $</span>
          </div>
          <div className="flex justify-between">
            <span>Phí vận chuyển</span>
            <span>Miễn phí</span>
          </div>
          <div className="flex justify-between opacity-70">
            <span>Thuế (VAT 10%)</span>
            <span>{formattedVat} $</span>
          </div>

          <div className="divider my-2"></div>

          <div className="flex justify-between font-bold text-xl mt-4">
            <span>Tổng cộng</span>
            <span className="text-warning">{formattedTotal} $</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
