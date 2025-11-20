// src/pages/HomePage.jsx (Phiên bản cuối cùng đã tích hợp khu vực Vật Liệu)

import React, { useRef } from "react";
import { Link } from "react-router-dom";
import ProductList from "../components/product/ProductList.jsx";
import { materialsData } from "../data/materials.js"; // <-- Import dữ liệu vật liệu

// Import ảnh cho bộ sưu tập (phần này vẫn giữ lại)
import menCollectionImage from "../assets/images/man.png";
import womenCollectionImage from "../assets/images/girl.png";

const HomePage = () => {
  const productListRef = useRef(null);

  const handleScrollToProducts = () => {
    productListRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* PHẦN 1: VIDEO HERO SECTION */}
      <div className="relative h-screen w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-10"
        >
          <source src="/videos/hero-background.mp4" type="video/mp4" />
        </video>
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-20"></div>
        <div className="relative z-30 flex flex-col items-start justify-end h-full text-white text-left p-8 sm:p-12 md:p-24">
          <h3 className="text-base font-light tracking-widest uppercase">
            OUR MISSION
          </h3>
          <h1 className="text-4xl md:text-6xl font-bold mt-2">
            The New Traditional
          </h1>
          <h2 className="text-3xl md:text-5xl font-light mt-1">
            Here to celebrate the craft
          </h2>
          <p className="mt-4 max-w-lg text-base">
            We honor the watchmaking's rich legacy by blending premium materials
            with contemporary design.
          </p>
          <button
            onClick={handleScrollToProducts}
            className="mt-6 px-8 py-3 bg-white text-black font-semibold uppercase tracking-wider hover:bg-gray-200 transition duration-300 rounded-lg"
          >
            Shop Now
          </button>
        </div>
      </div>

      {/* PHẦN 2: DANH SÁCH SẢN PHẨM CHÍNH */}
      <div ref={productListRef} className="container mx-auto px-4 py-16">
        <ProductList />
      </div>

      {/* PHẦN 3: KHÁM PHÁ VẬT LIỆU */}
      <div className="bg-white dark:bg-black py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Khám Phá Vật Liệu Chế Tác
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-4">
              Mỗi thành phần của đồng hồ APEX đều được lựa chọn từ những vật
              liệu cao cấp nhất, kết tinh từ tinh hoa kỹ thuật và nghệ thuật chế
              tác.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {materialsData.map((material) => (
              <Link
                key={material.id}
                to={`/materials/${material.slug}`}
                className="block group relative aspect-w-4 aspect-h-5 rounded-2xl overflow-hidden shadow-lg"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${material.cardImage})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="relative z-10 p-8 flex flex-col justify-end h-full text-white">
                  <h3 className="text-3xl font-bold">{material.name}</h3>
                  <p className="mt-2 text-gray-300">
                    {material.shortDescription}
                  </p>
                  <div className="mt-6 font-semibold flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Khám phá thêm{" "}
                    <span className="ml-2 transform group-hover:translate-x-1 transition-transform">
                      &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* PHẦN 4: TRẢI NGHIỆM APEX & BỘ SƯU TẬP */}
      <div className="bg-neutral text-white py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold">Trải nghiệm APEX</h2>
            <p className="text-lg text-gray-400 mt-4 leading-relaxed">
              Mỗi chiếc đồng hồ không chỉ là một tuyệt tác về kỹ thuật mà còn là
              một di sản. Khám phá sự kết hợp hoàn hảo giữa thiết kế vượt thời
              gian và công nghệ chế tác đỉnh cao từ Thụy Sĩ.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card Đồng Hồ Nam */}
            <Link
              to="/category/1"
              className="block group relative h-80 rounded-lg overflow-hidden"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${menCollectionImage})` }}
              ></div>
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-all"></div>
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
                <h3 className="text-3xl font-bold">Bộ Sưu Tập Nam</h3>
                <div className="mt-4 px-6 py-2 border border-white rounded-full group-hover:bg-white group-hover:text-black transition-colors duration-300">
                  Khám Phá
                </div>
              </div>
            </Link>

            {/* Card Đồng Hồ Nữ */}
            <Link
              to="/category/2"
              className="block group relative h-80 rounded-lg overflow-hidden"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${womenCollectionImage})` }}
              ></div>
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-all"></div>
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
                <h3 className="text-3xl font-bold">Bộ Sưu Tập Nữ</h3>
                <div className="mt-4 px-6 py-2 border border-white rounded-full group-hover:bg-white group-hover:text-black transition-colors duration-300">
                  Khám Phá
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
