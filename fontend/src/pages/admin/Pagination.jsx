// src/components/admin/Pagination.jsx

import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Hàm này tạo ra một dãy số trang để hiển thị, ví dụ: [1, '...', 4, 5, 6, '...', 10]
  const generatePageNumbers = () => {
    const pages = [];
    const pageNeighbours = 1; // Số lượng trang hiển thị bên cạnh trang hiện tại

    // Luôn hiển thị trang đầu tiên
    pages.push(1);

    // Dấu '...' ở đầu nếu cần
    if (currentPage > pageNeighbours + 1) {
      pages.push("...");
    }

    // Các trang ở giữa
    for (
      let i = Math.max(2, currentPage);
      i <= Math.min(totalPages - 1, currentPage + 2);
      i++
    ) {
      pages.push(i);
    }

    // Dấu '...' ở cuối nếu cần
    if (currentPage < totalPages - pageNeighbours - 2) {
      pages.push("...");
    }

    // Luôn hiển thị trang cuối cùng (nếu có nhiều hơn 1 trang)
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    // Dùng Set để loại bỏ các số trùng lặp (ví dụ: [1, 2, 3] thay vì [1, 1, 2, 3])
    return [...new Set(pages)];
  };

  const pageNumbers = generatePageNumbers();

  if (totalPages <= 1) {
    return null; // Không hiển thị phân trang nếu chỉ có 1 trang
  }

  return (
    <div className="join mt-8 flex justify-center">
      {/* Nút về trang đầu */}
      <button
        onClick={() => onPageChange(0)}
        disabled={currentPage === 0}
        className="join-item btn"
      >
        «
      </button>

      {/* Render các nút số trang */}
      {pageNumbers.map((page, index) => {
        if (page === "...") {
          return (
            <button
              key={`ellipsis-${index}`}
              className="join-item btn btn-disabled"
            >
              ...
            </button>
          );
        }
        return (
          <button
            key={page}
            onClick={() => onPageChange(page - 1)}
            className={`join-item btn ${
              currentPage === page - 1 ? "btn-warning" : ""
            }`}
          >
            {page}
          </button>
        );
      })}

      {/* Nút đến trang cuối */}
      <button
        onClick={() => onPageChange(totalPages - 1)}
        disabled={currentPage === totalPages - 1}
        className="join-item btn"
      >
        »
      </button>
    </div>
  );
};

export default Pagination;
