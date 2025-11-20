// src/components/admin/ProductFormModal.jsx (Phiên bản cuối cùng, truyền dữ liệu ngược về cha)

import React, { useState, useEffect } from "react";
import apiClient from "../../api";

const ProductFormModal = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    stockQuantity: 0,
    imageUrl: "",
    categoryId: "",
  });
  const [categories, setCategories] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Lấy danh sách categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiClient.get("/api/categories");
        setCategories(response.data);
        if (!product && response.data.length > 0) {
          setFormData((prev) => ({ ...prev, categoryId: response.data[0].id }));
        }
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    fetchCategories();
  }, [product]);

  // Điền dữ liệu vào form khi ở chế độ sửa hoặc reset khi thêm mới
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price || 0,
        stockQuantity: product.stockQuantity || 0,
        imageUrl: product.imageUrl || "",
        categoryId: product.categoryId || "",
      });
    } else {
      setFormData({
        name: "",
        description: "",
        price: 0,
        stockQuantity: 0,
        imageUrl: "",
        categoryId: categories.length > 0 ? categories[0].id.toString() : "",
      });
    }
    setSelectedFile(null);
  }, [product, categories]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setFormData((prev) => ({ ...prev, imageUrl: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const categoryIdNum = parseInt(formData.categoryId, 10);
    if (isNaN(categoryIdNum)) {
      alert("Vui lòng chọn một thương hiệu hợp lệ.");
      return;
    }

    setIsSaving(true);

    const productData = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price) || 0,
      stockQuantity: parseInt(formData.stockQuantity, 10) || 0,
      categoryId: categoryIdNum,
      imageUrl: selectedFile ? "" : formData.imageUrl,
    };

    try {
      let savedProduct;

      if (product) {
        const response = await apiClient.put(
          `/api/products/${product.id}`,
          productData
        );
        savedProduct = response.data;
      } else {
        const response = await apiClient.post("/api/products", productData);
        savedProduct = response.data;
      }

      let finalUpdatedProduct = savedProduct;

      if (selectedFile && savedProduct && savedProduct.id) {
        const uploadFormData = new FormData();
        uploadFormData.append("file", selectedFile);

        const uploadResponse = await apiClient.post(
          `/api/products/${savedProduct.id}/upload-image`,
          uploadFormData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        finalUpdatedProduct = uploadResponse.data;
      }

      alert("Lưu sản phẩm thành công!");
      onSave(finalUpdatedProduct);
    } catch (error) {
      console.error(
        "Lỗi chi tiết khi lưu sản phẩm:",
        error.response?.data || error.message
      );
      alert("Đã xảy ra lỗi. Vui lòng kiểm tra lại thông tin và thử lại.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box w-11/12 max-w-3xl">
        <h3 className="font-bold text-lg">
          {product ? "Chỉnh Sửa Sản Phẩm" : "Thêm Sản Phẩm Mới"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Tên sản phẩm"
            className="input input-bordered w-full"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Mô tả"
            className="textarea textarea-bordered w-full"
          ></textarea>
          <div className="grid grid-cols-2 gap-4">
            <input
              name="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              placeholder="Giá"
              className="input input-bordered w-full"
              required
            />
            <input
              name="stockQuantity"
              type="number"
              value={formData.stockQuantity}
              onChange={handleChange}
              placeholder="Số lượng kho"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Tải ảnh lên (ưu tiên)</span>
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="file-input file-input-bordered w-full"
              accept="image/*"
            />
          </div>
          <div className="divider">HOẶC</div>
          <input
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Hoặc dán đường dẫn hình ảnh vào đây"
            className="input input-bordered w-full"
            disabled={!!selectedFile}
          />
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option disabled value="">
              Chọn thương hiệu
            </option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <div className="modal-action">
            <button
              type="button"
              onClick={onClose}
              className="btn"
              disabled={isSaving}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSaving}
            >
              {isSaving ? "Đang lưu..." : "Lưu"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;
