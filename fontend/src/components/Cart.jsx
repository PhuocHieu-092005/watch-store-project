// src/components/Cart.jsx

import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { isCartOpen, cartItems, subtotal, toggleCart, removeFromCart } =
    useCart();
  const formattedSubtotal = new Intl.NumberFormat("vi-VN").format(subtotal);

  if (!isCartOpen) return null;

  return (
    <div className="drawer drawer-end drawer-open fixed inset-0 z-50 pointer-events-none">
      <input
        id="my-drawer-4"
        type="checkbox"
        className="drawer-toggle"
        checked={isCartOpen}
        readOnly
      />
      <div className="drawer-side pointer-events-auto">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
          onClick={toggleCart}
        ></label>
        <div className="menu p-4 w-96 min-h-full bg-base-200 text-base-content flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Cart ({cartItems.length})</h2>
            <button onClick={toggleCart} className="btn btn-ghost btn-circle">
              ✕
            </button>
          </div>
          <div className="flex-grow overflow-y-auto">
            {cartItems.length === 0 ? (
              <div className="text-center mt-20">
                <p>Your cart is empty.</p>
              </div>
            ) : (
              <ul className="space-y-4">
                {cartItems.map((item) => {
                  // === LOGIC SỬA LỖI HIỂN THỊ ẢNH ===
                  const imageUrl = item.imageUrl?.startsWith("/")
                    ? `https://watch-store-project.onrender.com`
                    : item.imageUrl;

                  return (
                    <li key={item.id}>
                      <div className="flex flex-row items-start space-x-4 relative bg-base-300 p-2 rounded-lg">
                        <img
                          src={imageUrl}
                          alt={item.productName}
                          className="w-20 h-20 rounded object-cover flex-shrink-0"
                        />
                        <div className="flex-grow">
                          <p className="font-semibold mb-1 pr-6">
                            {item.productName}
                          </p>
                          <div className="flex justify-between items-center text-sm">
                            <p>Số lượng: {item.quantity}</p>
                            <p className="font-bold">
                              {new Intl.NumberFormat("vi-VN").format(
                                item.price * item.quantity
                              )}{" "}
                              $
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="btn btn-ghost btn-circle btn-sm absolute top-1 right-1"
                        >
                          ✕
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          {cartItems.length > 0 && (
            <div className="border-t border-gray-700 pt-4 mt-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Subtotal</span>
                <span>{formattedSubtotal} $</span>
              </div>
              <Link
                to="/checkout"
                onClick={toggleCart}
                className="btn btn-warning w-full mt-4"
              >
                Checkout
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
