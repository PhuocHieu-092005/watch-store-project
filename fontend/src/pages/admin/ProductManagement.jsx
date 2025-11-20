// src/pages/admin/ProductManagement.jsx (Sử dụng component Pagination mới)

import React, { useState, useEffect } from "react";
import apiClient from "../../api";
import ProductFormModal from "../../pages/admin/ProductFormModal";
import Pagination from "../../pages/admin/Pagination";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async (page) => {
    try {
      setLoading(true);
      const response = await apiClient.get(
        `/api/products?page=${page}&size=${pageSize}`
      );
      if (response.data && Array.isArray(response.data.content)) {
        setProducts(response.data.content);
        setTotalPages(response.data.totalPages);
      } else {
        setProducts([]);
        setTotalPages(0);
      }
    } catch (err) {
      setError("Không thể tải danh sách sản phẩm.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveSuccess = (updatedProduct) => {
    handleCloseModal();
    const isEditing = products.some((p) => p.id === updatedProduct.id);
    if (isEditing) {
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === updatedProduct.id ? updatedProduct : p
        )
      );
    } else {
      fetchProducts(currentPage);
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
      try {
        await apiClient.delete(`/api/products/${productId}`);
        alert("Đã xóa sản phẩm thành công!");
        if (products.length === 1 && currentPage > 0) {
          setCurrentPage(currentPage - 1);
        } else {
          fetchProducts(currentPage);
        }
      } catch (err) {
        alert(
          "Xóa sản phẩm thất bại. Sản phẩm có thể đã nằm trong một đơn hàng cũ."
        );
        console.error(err);
      }
    }
  };

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản Lý Sản Phẩm</h1>
        <button onClick={handleOpenAddModal} className="btn btn-primary">
          Thêm Sản Phẩm Mới
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Hình ảnh</th>
              <th>Tên Sản Phẩm</th>
              <th>Giá</th>
              <th>Kho</th>
              <th>Thương hiệu</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const imageUrl = product.imageUrl?.startsWith("/")
                ? `http://localhost:8081${product.imageUrl}`
                : product.imageUrl;
              return (
                <tr key={product.id}>
                  <th>{product.id}</th>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        {product.imageUrl ? (
                          <img src={imageUrl} alt={product.name} />
                        ) : (
                          <div className="w-full h-full bg-gray-600 flex items-center justify-center text-xs text-white">
                            No Img
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="max-w-xs truncate">{product.name}</td>
                  <td>
                    {new Intl.NumberFormat("vi-VN").format(product.price)} $
                  </td>
                  <td>{product.stockQuantity}</td>
                  <td>{product.categoryName}</td>
                  <td className="space-x-2">
                    <button
                      onClick={() => handleOpenEditModal(product)}
                      className="btn btn-sm btn-info"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="btn btn-sm btn-error"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />

      {isModalOpen && (
        <ProductFormModal
          product={editingProduct}
          onClose={handleCloseModal}
          onSave={handleSaveSuccess}
        />
      )}
    </div>
  );
};

export default ProductManagement;
