// src/pages/CategoryPage.jsx

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductList from "../components/product/ProductList";
import apiClient from "../api";

const CategoryPage = () => {
  const { categoryId } = useParams();

  const [categoryName, setCategoryName] = useState("");
  const [loadingName, setLoadingName] = useState(true);

  // Effect này CHỈ để lấy tên danh mục (Đồng hồ Nam, Rolex...)
  useEffect(() => {
    const fetchCategoryName = async () => {
      setLoadingName(true);
      try {
        const response = await apiClient.get("/api/categories/tree");

        const findName = (categories, id) => {
          for (const cat of categories) {
            if (cat.id.toString() === id) return cat.name;
            if (cat.children) {
              const found = findName(cat.children, id);
              if (found) return found;
            }
          }
          return null;
        };

        const name = findName(response.data, categoryId);
        setCategoryName(name || "Sản phẩm");
      } catch (e) {
        console.error("Không thể tải tên danh mục:", e);
        setCategoryName("Sản phẩm");
      } finally {
        setLoadingName(false);
      }
    };

    fetchCategoryName();
  }, [categoryId]);

  return (
    /* *** SỬA LỖI Ở ĐÂY ***
       Thay "py-8" thành "pb-8 pt-32".
       pt-32 sẽ đẩy nội dung xuống dưới, tránh bị Header che mất.
    */
    <div className="container mx-auto px-4 pb-8 pt-20">
      <h2 className="text-3xl font-bold text-center mb-8">
        {loadingName ? "Đang tải..." : categoryName}
      </h2>

      <ProductList categoryId={categoryId} />
    </div>
  );
};

export default CategoryPage;
