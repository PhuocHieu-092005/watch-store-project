// src/components/admin/CategoryFormModal.jsx (Phiên bản nâng cấp, hỗ trợ cha-con)

import React, { useState, useEffect } from "react";

const CategoryFormModal = ({ category, allCategories, onClose, onSave }) => {
  // State giờ sẽ là một object để quản lý cả name và parentId
  const [formData, setFormData] = useState({
    name: "",
    parentId: "", // Dùng chuỗi rỗng cho lựa chọn "Danh mục gốc"
  });

  // Điền dữ liệu vào form khi ở chế độ sửa
  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || "",
        parentId: category.parentId || "", // Nếu parentId là null/undefined, nó sẽ là chuỗi rỗng
      });
    } else {
      // Reset form khi ở chế độ thêm mới
      setFormData({ name: "", parentId: "" });
    }
  }, [category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSend = {
      name: formData.name,
      // Chuyển chuỗi rỗng thành `null` mà backend yêu cầu cho danh mục gốc
      parentId: formData.parentId ? parseInt(formData.parentId, 10) : null,
    };
    onSave(dataToSend);
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">
          {category ? "Chỉnh Sửa Thương Hiệu" : "Thêm Thương Hiệu Mới"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Input cho Tên Thương Hiệu */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Tên Thương Hiệu</span>
            </label>
            <input
              type="text"
              name="name" // Thêm name
              value={formData.name}
              onChange={handleChange}
              placeholder="Ví dụ: Rolex, Submariner"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* === THÊM MỚI: Select để chọn Danh mục cha === */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Thuộc danh mục cha</span>
            </label>
            <select
              name="parentId" // Thêm name
              value={formData.parentId}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="">-- Là danh mục gốc --</option>
              {allCategories.map(
                (cat) =>
                  // Không cho phép một danh mục tự làm cha của chính nó
                  category?.id !== cat.id && (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  )
              )}
            </select>
          </div>

          <div className="modal-action">
            <button type="button" onClick={onClose} className="btn">
              Hủy
            </button>
            <button type="submit" className="btn btn-primary">
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryFormModal;
