// src/pages/admin/CategoryManagement.jsx (Phiên bản cuối cùng)

import React, { useState, useEffect } from "react";
import apiClient from "../../api";
import CategoryFormModal from "../../pages/admin/CategoryFormModal"; // Sửa lại đường dẫn import cho đúng
import Pagination from "../admin/Pagination";

const CategoryManagement = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [displayedCategories, setDisplayedCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      // API này trả về danh sách phẳng, rất tốt cho việc hiển thị bảng và dropdown
      const response = await apiClient.get("/api/categories");
      setAllCategories(response.data);
      setTotalPages(Math.ceil(response.data.length / pageSize));
    } catch (err) {
      setError("Không thể tải danh sách thương hiệu.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const startIndex = currentPage * pageSize;
    const endIndex = startIndex + pageSize;
    setDisplayedCategories(allCategories.slice(startIndex, endIndex));
  }, [currentPage, allCategories, pageSize]);

  const handleOpenAddModal = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveCategory = async (categoryData) => {
    try {
      if (editingCategory) {
        await apiClient.put(
          `/api/categories/${editingCategory.id}`,
          categoryData
        );
        alert("Cập nhật thương hiệu thành công!");
      } else {
        await apiClient.post("/api/categories", categoryData);
        alert("Thêm thương hiệu thành công!");
      }
      handleCloseModal();
      fetchCategories(); // Tải lại toàn bộ danh sách để cập nhật cây danh mục
    } catch (err) {
      alert("Lưu thương hiệu thất bại. Tên có thể đã tồn tại.");
      console.error(err);
    }
  };

  const handleDelete = async (categoryId) => {
    if (
      window.confirm(
        "Bạn có chắc chắn muốn xóa thương hiệu này? (Lưu ý: Xóa danh mục cha sẽ xóa tất cả danh mục con)"
      )
    ) {
      try {
        await apiClient.delete(`/api/categories/${categoryId}`);
        alert("Đã xóa thương hiệu thành công!");
        fetchCategories();
      } catch (err) {
        alert(
          "Xóa thương hiệu thất bại. Có thể danh mục này đang được sử dụng bởi một sản phẩm."
        );
        console.error(err);
      }
    }
  };

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  // Hàm để tìm tên của category cha
  const getParentName = (parentId) => {
    if (!parentId)
      return <span className="text-gray-500 italic">Là danh mục gốc</span>;
    const parent = allCategories.find((cat) => cat.id === parentId);
    return parent ? parent.name : "Không rõ";
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản Lý Thương Hiệu</h1>
        <button onClick={handleOpenAddModal} className="btn btn-primary">
          Thêm Thương Hiệu Mới
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th className="w-1/6">ID</th>
              <th className="w-1/3">Tên Thương Hiệu</th>
              <th className="w-1/3">Danh mục cha</th> {/* Thêm cột mới */}
              <th className="w-1/6">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {displayedCategories.map((category) => (
              <tr key={category.id}>
                <th>{category.id}</th>
                <td>{category.name}</td>
                <td>{getParentName(category.parentId)}</td>{" "}
                {/* Hiển thị tên cha */}
                <td className="space-x-2">
                  <button
                    onClick={() => handleOpenEditModal(category)}
                    className="btn btn-sm btn-info"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="btn btn-sm btn-error"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />

      {isModalOpen && (
        <CategoryFormModal
          category={editingCategory}
          onClose={handleCloseModal}
          onSave={handleSaveCategory}
          allCategories={allCategories} // <-- TRUYỀN DANH SÁCH XUỐNG MODAL
        />
      )}
    </div>
  );
};

export default CategoryManagement;
