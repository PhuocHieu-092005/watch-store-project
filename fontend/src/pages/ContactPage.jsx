// File: src/pages/ContactPage.jsx (Phiên bản nâng cấp bản đồ)

import React from "react";

const ContactPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.");
    e.target.reset();
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="container mx-auto px-4 py-20 sm:py-28">
        {/* Tiêu đề */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold">
            Liên Hệ Với Chúng Tôi
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
            Chúng tôi luôn sẵn lòng lắng nghe. Vui lòng điền vào biểu mẫu bên
            dưới hoặc sử dụng thông tin liên hệ để kết nối với APEX.
          </p>
        </div>

        {/* ===== BỐ CỤC MỚI: TÁCH BẢN ĐỒ VÀ FORM RA 2 CỘT RIÊNG ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Cột trái: CHỈ CÓ BẢN ĐỒ */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Tìm Chúng Tôi Trên Bản Đồ
            </h2>
            {/* Tăng chiều cao tối thiểu cho bản đồ */}
            <div className="w-full h-full min-h-[500px] rounded-lg overflow-hidden shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.447913076134!2d106.7030498758826!3d10.77698928937213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f443834b869%3A0x37a85873722a1011!2zTmjDoCBow6F0IFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaA!5e0!3m2!1svi!2s!4v1699841819779!5m2!1svi!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Cột phải: THÔNG TIN LIÊN HỆ + FORM */}
          <div className="space-y-10">
            {/* Thông tin liên hệ giờ nằm ở đây */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                Thông Tin Cửa Hàng
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <div className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-3 mt-1 text-indigo-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>
                    123 Đường Đồng Khởi, Phường Bến Nghé, Quận 1, Thành phố Hồ
                    Chí Minh
                  </span>
                </div>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-3 text-indigo-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span>hieufreefire@apexwatches.vn</span>
                </div>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-3 text-indigo-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>(+84) 28 3812 3456</span>
                </div>
              </div>
            </div>

            {/* Form liên hệ */}
            <div className="bg-white dark:bg-gray-800 p-8 sm:p-10 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-6">
                Gửi Tin Nhắn Cho Chúng Tôi
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-md border border-transparent focus:ring-2 focus:ring-indigo-500 transition"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-md border border-transparent focus:ring-2 focus:ring-indigo-500 transition"
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium mb-2"
                  >
                    Chủ đề
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-md border border-transparent focus:ring-2 focus:ring-indigo-500 transition"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Nội dung tin nhắn
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    required
                    className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-md border border-transparent focus:ring-2 focus:ring-indigo-500 transition"
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105"
                  >
                    Gửi Tin Nhắn
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
