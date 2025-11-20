// File: src/pages/MaterialDetailPage.jsx

import React from "react";
import { useParams, Link } from "react-router-dom";
import { materialsData } from "../data/materials.js";

const MaterialDetailPage = () => {
  const { materialSlug } = useParams();
  const material = materialsData.find((m) => m.slug === materialSlug);

  if (!material) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold">404 - Không Tìm Thấy Vật Liệu</h1>
        <p className="mt-4">Vật liệu bạn đang tìm kiếm không tồn tại.</p>
        <Link
          to="/"
          className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-md"
        >
          Quay về Trang Chủ
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* 1. HERO SECTION */}
      <div className="relative h-[80vh] text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${material.heroImage})` }}
        ></div>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative h-full flex flex-col justify-center items-center text-center px-4">
          <p className="text-sm uppercase tracking-widest">VẬT LIỆU CHẾ TÁC</p>
          <h1 className="text-5xl md:text-7xl font-bold mt-4">
            {material.title}
          </h1>
          <h2 className="text-4xl md:text-6xl font-light">
            {material.subtitle}
          </h2>
        </div>
      </div>

      {/* 2. "WHAT IS..." SECTION */}
      <div className="container mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div className="w-full h-96 rounded-lg overflow-hidden">
          <img
            src={material.mainImage}
            alt={material.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2>{material.whatIsTitle}</h2>
          <p>{material.whatIsDescription}</p>
        </div>
      </div>

      {/* 3. FEATURES SECTION */}
      <div className="bg-gray-50 dark:bg-black py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {material.features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="h-64 rounded-lg overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold mt-6">{feature.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. EXPLORE PRODUCTS SECTION (Placeholder) */}
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold mb-8">
          Khám Phá Sản Phẩm Sử Dụng {material.name}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          (Đây là khu vực để hiển thị các sản phẩm liên quan - cần tích hợp với
          backend)
        </p>
        <Link
          to="/"
          className="px-8 py-3 bg-indigo-600 text-white rounded-md font-semibold"
        >
          Xem tất cả sản phẩm
        </Link>
      </div>
    </div>
  );
};

export default MaterialDetailPage;
