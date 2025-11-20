// src/components/product/ProductList.jsx

import React, { useState, useEffect } from "react";
import apiClient from "../../api";
import ProductCard from "./ProductCard";

// Component nhận categoryId làm prop (nếu có)
function ProductList({ categoryId }) {
  const [products, setProducts] = useState([]);

  // State phân trang
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Reset trang về 0 mỗi khi categoryId thay đổi để tránh lỗi đang ở trang 2 của danh mục A
    // mà chuyển sang danh mục B chỉ có 1 trang.
    setCurrentPage(0);
  }, [categoryId]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        let response;

        // Logic gọi API:
        if (categoryId) {
          // Nếu có categoryId -> Gọi API tìm kiếm theo danh mục
          response = await apiClient.get("/api/products/search", {
            params: {
              categoryId: categoryId,
              page: currentPage,
              size: 8, // Số lượng sản phẩm mỗi trang
              sortBy: "id",
            },
          });
        } else {
          // Nếu không có categoryId -> Gọi API lấy tất cả sản phẩm
          response = await apiClient.get("/api/products", {
            params: {
              page: currentPage,
              size: 8,
              sortBy: "id",
            },
          });
        }

        if (response.data && Array.isArray(response.data.content)) {
          setProducts(response.data.content);
          setTotalPages(response.data.totalPages);
          // Nếu backend trả về pageNo khác với currentPage (do logic nào đó), cập nhật lại
          if (response.data.pageNo !== undefined) {
            setCurrentPage(response.data.pageNo);
          }
        } else {
          console.error("Dữ liệu trả về không phải định dạng mong muốn!");
          setProducts([]);
          setTotalPages(0);
        }
      } catch (err) {
        setError("Không thể tải danh sách sản phẩm.");
        console.error("Lỗi nghiêm trọng khi gọi API:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    // useEffect chạy lại khi currentPage HOẶC categoryId thay đổi
  }, [currentPage, categoryId]);

  if (loading)
    return <div className="text-center py-10">Đang tải sản phẩm...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">Lỗi: {error}</div>;

  // Hàm xử lý chuyển trang
  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  // Hàm render các nút số trang
  const renderPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 3;
    let startPage = Math.max(0, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage === 0) {
      endPage = Math.min(totalPages - 1, startPage + maxPagesToShow - 1);
    }
    if (currentPage === totalPages - 1) {
      startPage = Math.max(0, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`join-item btn ${i === currentPage ? "btn-warning" : ""}`}
        >
          {i + 1}
        </button>
      );
    }
    return pages;
  };

  return (
    <>
      {/* Danh sách sản phẩm */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.length > 0
          ? products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          : !loading && (
              <p className="col-span-4 text-center">
                Không tìm thấy sản phẩm nào.
              </p>
            )}
      </div>

      {/* Thanh phân trang (chỉ hiện nếu có nhiều hơn 1 trang) */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-12">
          <div className="join">
            {/* Nút về trang đầu */}
            <button
              onClick={() => handlePageChange(0)}
              className="join-item btn"
              disabled={currentPage === 0}
            >
              «
            </button>

            {/* Các số trang */}
            {renderPageNumbers()}

            {/* Nút đến trang cuối */}
            <button
              onClick={() => handlePageChange(totalPages - 1)}
              className="join-item btn"
              disabled={currentPage === totalPages - 1 || totalPages === 0}
            >
              »
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductList;
