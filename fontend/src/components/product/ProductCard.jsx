// src/components/product/ProductCard.jsx

import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(product.price);

  // === LOGIC SỬA LỖI HIỂN THỊ ẢNH ===
  const imageUrl = product.imageUrl?.startsWith("/")
    ? `http://localhost:8081${product.imageUrl}`
    : product.imageUrl;

  return (
    <Link
      to={`/products/${product.id}`}
      className="card group w-full shadow-lg rounded-2xl overflow-hidden relative block"
      style={{ aspectRatio: "3/4" }}
    >
      <figure className="absolute inset-0">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gray-700 flex items-center justify-center">
            <span className="text-gray-400">No Image</span>
          </div>
        )}
      </figure>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
      <div className="card-body p-5 flex flex-col justify-end relative text-white h-full">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-white/70 mb-1">
            {product.categoryName}
          </p>
          <h2 className="text-lg font-bold text-white truncate transition-colors duration-300 group-hover:text-amber-300">
            {product.name}
          </h2>
          {/* <p className="text-xl font-semibold text-amber-400 mt-2">
            {formattedPrice}
          </p> */}
        </div>
      </div>
      <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transform transition-all duration-300 ease-in-out translate-y-4 group-hover:translate-y-0">
        <div className="btn btn-circle btn-sm bg-white/90 backdrop-blur-sm border-none text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
