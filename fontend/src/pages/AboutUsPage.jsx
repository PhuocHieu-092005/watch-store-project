// File: src/pages/AboutUsPage.jsx (Phiên bản đã thay thế bằng video nền)

import React from "react";

const AboutUsPage = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* ===== PHẦN 1: HERO SECTION ===== */}
      <div className="relative h-screen flex items-end justify-start text-white">
        {/* BƯỚC 1: THAY THẾ DIV ẢNH NỀN BẰNG THẺ VIDEO */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          {/* Đường dẫn trỏ đến file trong thư mục 'public' */}
          <source src="/videos/aboutus.mp4" type="video/mp4" />
          Trình duyệt của bạn không hỗ trợ thẻ video.
        </video>

        {/* Lớp phủ tối màu (giữ nguyên) */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Nội dung trên Hero (giữ nguyên) */}
        <div className="relative z-10 p-8 sm:p-12 md:p-24 max-w-4xl">
          <p className="text-sm font-light tracking-widest uppercase mb-2">
            VỀ CHÚNG TÔI
          </p>
          <h1 className="text-5xl md:text-7xl font-bold">Đây là APEX</h1>
          <h2 className="text-4xl md:text-6xl font-light mt-1">
            Di Sản Vượt Thời Gian.
          </h2>
          <p className="mt-6 text-lg text-gray-300">
            Đẳng cấp, Tinh tế, Chính xác.
          </p>
        </div>
      </div>

      {/* ===== PHẦN 2: NỘI DUNG CHI TIẾT (giữ nguyên code bạn cung cấp) ===== */}
      <div className="py-20 sm:py-28 px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-4xl font-bold text-center mb-12">
            Câu Chuyện Về APEX
          </h2>
          <div className="text-lg leading-relaxed space-y-6 text-gray-600 dark:text-gray-400">
            <p>
              APEX không chỉ là một thương hiệu; đó là một niềm đam mê cháy bỏng
              với nghệ thuật chế tác đồng hồ, được khởi nguồn từ một xưởng chế
              tác nhỏ với giấc mơ lớn: tạo ra những cỗ máy thời gian hoàn mỹ,
              nơi di sản cổ điển giao thoa cùng tinh thần đổi mới.
            </p>
            <p>
              Chúng tôi tin rằng mỗi chiếc đồng hồ không chỉ là một công cụ đo
              đếm thời gian, mà còn là một tác phẩm nghệ thuật, một người bạn
              đồng hành ghi lại những khoảnh khắc quý giá nhất của cuộc đời. Vì
              vậy, từng chi tiết, từ bộ máy phức tạp bên trong đến mặt số tinh
              xảo bên ngoài, đều được các nghệ nhân của chúng tôi chăm chút tỉ
              mỉ với sự tận tâm và tay nghề đỉnh cao.
            </p>
            <p>
              Từ những bộ sưu tập cổ điển thanh lịch đến những thiết kế đương
              đại táo bạo, mỗi sản phẩm mang tên APEX đều là sự phản chiếu cho
              cam kết của chúng tôi về chất lượng vượt trội, cá tính độc đáo và
              hiệu suất bền bỉ.
            </p>
            <p className="font-bold text-gray-800 dark:text-gray-200 pt-4">
              Đây là APEX — Di Sản Vượt Thời Gian.
            </p>
          </div>
          {/* Chữ ký */}
          <div className="mt-16 text-right">
            <p className="font-serif italic text-4xl text-gray-700 dark:text-gray-400">
              HIEU
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
