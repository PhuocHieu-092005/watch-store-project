// src/components/Carousel.jsx

import React from "react";

// 1. IMPORT 3 ẢNH BANNER CỦA BẠN TỪ THƯ MỤC ASSETS
// (Hãy chắc chắn rằng tên file ở đây khớp với tên file bạn đã đặt)
import banner1 from "../../src/assets/images/banner1.png";
import banner2 from "../../src/assets/images/banner2.png";
import banner3 from "../../src/assets/images/banner3.png";

export default function Carousel() {
  return (
    <div className="carousel w-full">
      {/* Slide 1 */}
      <div id="slide1" className="carousel-item relative w-full">
        <img
          src={banner1} // <-- THAY ĐỔI 1
          className="w-full"
        />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide3" className="btn btn-circle">
            ❮
          </a>{" "}
          {/* Sửa: trỏ về slide cuối (3) */}
          <a href="#slide2" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>

      {/* Slide 2 */}
      <div id="slide2" className="carousel-item relative w-full">
        <img
          src={banner2} // <-- THAY ĐỔI 2
          className="w-full"
        />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide1" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide3" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>

      {/* Slide 3 */}
      <div id="slide3" className="carousel-item relative w-full">
        <img
          src={banner3} // <-- THAY ĐỔI 3
          className="w-full"
        />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide2" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide1" className="btn btn-circle">
            ❯
          </a>{" "}
          {/* Sửa: trỏ về slide đầu (1) */}
        </div>
      </div>

      {/* Tôi đã xóa Slide 4 gốc đi để khớp với 3 ảnh của bạn */}
    </div>
  );
}
