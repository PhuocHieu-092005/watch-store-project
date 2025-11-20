// File: src/pages/ProfilePage.jsx (Phiên bản nâng cấp "Đẳng Cấp")

import React from "react";
import { useAuth } from "../context/AuthContext";

// Component Icon để tái sử dụng
const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-start py-4">
    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full mr-5">
      {icon}
    </div>
    <div className="flex-grow">
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <p className="font-semibold text-lg">{value || "Chưa có thông tin"}</p>
    </div>
  </div>
);

const ProfilePage = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <p className="text-white">Đang tải thông tin người dùng...</p>
      </div>
    );
  }

  return (
    // Nền xám cho cả trang để làm nổi bật thẻ thông tin
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen py-12 sm:py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Phần Avatar và Tên */}
        <div className="flex flex-col items-center mb-12">
          <div className="relative w-32 h-32 mb-4">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-5xl font-bold text-white shadow-lg">
              {user.username.charAt(0).toUpperCase()}
            </div>
            {/* Chấm xanh trạng thái online */}
            <span className="absolute bottom-1 right-1 block h-5 w-5 rounded-full bg-green-500 border-2 border-white dark:border-gray-800"></span>
          </div>
          <h1 className="text-4xl font-bold">{user.username}</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 capitalize text-lg">
            {user.roles?.[0]?.toLowerCase() || "USER"}
          </p>
        </div>

        {/* Thẻ thông tin chi tiết và các hành động */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-10">
          <h2 className="text-2xl font-semibold mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
            Thông tin chi tiết
          </h2>

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            <InfoRow
              label="Tên đăng nhập"
              value={user.username}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              }
            />
            <InfoRow
              label="Địa chỉ Email"
              value={user.email}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-500"
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
              }
            />
            <InfoRow
              label="Số điện thoại"
              value={user.phoneNumber}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-500"
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
              }
            />
          </div>

          {/* Các nút hành động */}
          <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row gap-4">
            <button className="w-full sm:w-auto flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105">
              Chỉnh sửa hồ sơ
            </button>
            <button className="w-full sm:w-auto flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg transition duration-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white">
              Đổi mật khẩu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
