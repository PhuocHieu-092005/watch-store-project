// src/pages/SearchPage.jsx

import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import apiClient from "../api";
import ProductCard from "../components/product/ProductCard";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const [products, setProducts] = useState([]);

  // --- STATE PHÂN TRANG ---
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0); // *** THÊM STATE NÀY ***

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Reset về trang 0 mỗi khi từ khóa tìm kiếm thay đổi
  useEffect(() => {
    setCurrentPage(0);
  }, [query]);

  useEffect(() => {
    if (!query) {
      setProducts([]);
      setTotalElements(0);
      setLoading(false);
      return;
    }

    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await apiClient.get("/api/products/search", {
          params: {
            keyword: query,
            page: currentPage,
            size: 8,
            sortBy: "id",
          },
        });

        if (response.data && response.data.content) {
          setProducts(response.data.content);
          setTotalPages(response.data.totalPages);
          // *** CẬP NHẬT STATE Ở ĐÂY ***
          setTotalElements(response.data.totalElements);

          if (response.data.pageNo !== undefined) {
            setCurrentPage(response.data.pageNo);
          }
        } else {
          setProducts([]);
          setTotalPages(0);
          setTotalElements(0);
        }
      } catch (err) {
        setError("Không tìm thấy sản phẩm hoặc đã có lỗi xảy ra.");
        console.error("Lỗi khi tìm kiếm:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query, currentPage]);

  // --- HÀM XỬ LÝ CHUYỂN TRANG ---
  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

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

  if (loading) return <div className="text-center py-40">Đang tìm kiếm...</div>;
  if (error)
    return <div className="text-center py-40 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 pb-8 pt-20">
      <h2 className="text-3xl font-bold text-center mb-2">
        Kết quả tìm kiếm cho "{query}"
      </h2>

      {/* *** SỬA LỖI Ở ĐÂY: Dùng state totalElements thay vì biến response *** */}
      <p className="text-center text-gray-400 mb-8">
        Tìm thấy {totalElements} sản phẩm.
      </p>

      {products.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* THANH PHÂN TRANG */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <div className="join">
                <button
                  onClick={() => handlePageChange(0)}
                  className="join-item btn"
                  disabled={currentPage === 0}
                >
                  «
                </button>
                {renderPageNumbers()}
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
      ) : (
        !loading && (
          <p className="text-center py-10">
            Không có sản phẩm nào phù hợp với từ khóa của bạn.
          </p>
        )
      )}
    </div>
  );
};

export default SearchPage;
