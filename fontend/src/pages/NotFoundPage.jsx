// src/pages/NotFoundPage.jsx

import React from "react";
import { Link } from "react-router-dom";

// Bạn có thể thay link ảnh bên dưới bằng một ảnh 404 khác nếu muốn
const errorImage =
  "https://media.istockphoto.com/id/1404059706/vi/vec-to/trang-web-kh%C3%B4ng-t%C3%ACm-th%E1%BA%A5y-l%E1%BB%97i-404-oops-lo-l%E1%BA%AFng-nh%C3%A2n-v%E1%BA%ADt-robot-nh%C3%ACn-tr%E1%BB%99m-ra-ngo%C3%A0i-kh%C3%B4ng-gian.jpg?s=612x612&w=0&k=20&c=g6icPbXhyowk12g4wGbAcD3bEXY9mTmwkLvxPSpMHH4=";
const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center pt-20">
      <div className="max-w-md mx-auto">
        <img src={errorImage} alt="404 Not Found" className="w-full mb-8" />

        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Xin lỗi, chúng tôi không tìm thấy trang mà bạn cần!
        </h1>

        <p className="text-gray-600 mb-8">
          Đường dẫn có thể đã bị thay đổi hoặc không tồn tại.
        </p>

        <Link
          to="/"
          className="btn btn-warning text-white px-8 rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
        >
          Trở về trang chủ
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
