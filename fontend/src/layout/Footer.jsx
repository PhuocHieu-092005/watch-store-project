// src/layout/Footer.jsx

import React from "react";
import { Link } from "react-router-dom";

// Icon mũi tên nhỏ
const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.5}
    stroke="currentColor"
    className="w-3 h-3 ml-1.5 inline-block opacity-70"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
    />
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content p-10">
      <div className="footer">
        {/* CỘT 1: THÔNG TIN THƯƠNG HIỆU */}
        <aside>
          <h6 className="footer-title opacity-100 font-bold">
            THE NEW TRADITIONAL®
          </h6>
          <p className="opacity-80">Here to celebrate the game.</p>
        </aside>

        {/* CỘT 2: QUICK LINKS (Dùng Link cho nội bộ) */}
        <nav>
          <h6 className="footer-title opacity-100 font-bold">QUICK LINKS</h6>

          <Link to="/" className="link link-hover opacity-80">
            Trang chủ <ArrowIcon />
          </Link>

          <Link to="/about" className="link link-hover opacity-80">
            Về chúng tôi <ArrowIcon />
          </Link>

          <Link to="/contact" className="link link-hover opacity-80">
            Liên hệ <ArrowIcon />
          </Link>

          {/* Các trang chưa làm thì để tạm dấu # */}
          <a href="#" className="link link-hover opacity-80">
            Chính sách bảo mật <ArrowIcon />
          </a>

          <a href="#" className="link link-hover opacity-80">
            Điều khoản dịch vụ <ArrowIcon />
          </a>
        </nav>

        {/* CỘT 3: JOIN US ON (Dùng thẻ a cho link ngoài) */}
        <nav>
          <h6 className="footer-title opacity-100 font-bold">JOIN US ON</h6>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="link link-hover opacity-80"
          >
            Instagram <ArrowIcon />
          </a>

          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="link link-hover opacity-80"
          >
            Facebook <ArrowIcon />
          </a>

          <a
            href="https://discord.com"
            target="_blank"
            rel="noreferrer"
            className="link link-hover opacity-80"
          >
            Discord <ArrowIcon />
          </a>
        </nav>
      </div>

      {/* PHẦN DƯỚI: THANH BẢN QUYỀN VÀ LOGO */}
      <div className="mt-10 pt-6 border-t border-neutral-focus flex flex-wrap justify-between items-center gap-4">
        {/* Phần bên trái: Dropdown và Copyright */}
        <div className="flex items-center gap-4">
          <div className="dropdown dropdown-top">
            <label
              tabIndex={0}
              className="btn btn-sm btn-outline border-neutral-content text-neutral-content normal-case"
            >
              United States (USD $)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 text-base-content"
            >
              <li>
                <a>Việt Nam (VND ₫)</a>
              </li>
              <li>
                <a>Europe (EUR €)</a>
              </li>
            </ul>
          </div>
          <p className="opacity-80 text-sm">© 2025 Luxury Watches</p>
        </div>

        {/* Phần bên phải: Logo */}
        <div>
          <p className="font-serif italic text-3xl opacity-90">
            Luxury Watches
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
