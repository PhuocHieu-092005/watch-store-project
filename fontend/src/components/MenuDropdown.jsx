import React from "react";

export default function MenuDropdown() {
  return (
    // Bỏ hết các class gây lỗi, chỉ giữ lại những gì cần thiết
    <ul className="menu menu-horizontal px-1">
      <li>
        <a>Trang chủ</a>
      </li>
      <li>
        <details>
          <summary>Thương hiệu</summary>
          <ul className="p-2 bg-base-100 rounded-t-none shadow z-10">
            {/* z-10 để đảm bảo menu con nằm trên các nội dung khác */}
            <li>
              <a>Orient</a>
            </li>
            <li>
              <a>Seiko</a>
            </li>
            <li>
              <a>Tissot</a>
            </li>
            <li>
              <a>Rolex</a>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <a>Liên hệ</a>
      </li>
    </ul>
  );
}
