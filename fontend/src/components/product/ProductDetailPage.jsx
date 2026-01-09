// File: src/components/product/ProductDetailPage.jsx

import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import apiClient from "../../api";
import { useCart } from "../../context/CartContext";

// Component con AccordionItem không đổi
const AccordionItem = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-700">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-5 text-left"
      >
        <span className="font-semibold text-lg">{title}</span>
        <span
          className={`transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="pb-5 pr-4 text-gray-400">{children}</div>
      </div>
    </div>
  );
};

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(`/api/products/${productId}`);
        setProduct(response.data);
      } catch (err) {
        setError("Không thể tải thông tin sản phẩm.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  // ===== KHÔI PHỤC CHÍNH XÁC LOGIC handleBuyNow TỪ CODE CŨ CỦA BẠN =====
  const handleBuyNow = async () => {
    if (product) {
      try {
        // Gọi lại chính xác hàm addToCart với 3 tham số như code cũ
        // Tham số 'false' có thể dùng để không hiển thị giỏ hàng
        const success = await addToCart(product, quantity, false);

        // Chỉ chuyển trang nếu việc thêm vào giỏ hàng thành công
        if (success) {
          navigate("/checkout");
        }
      } catch (error) {
        console.error("Buy Now bị hủy do addToCart thất bại:", error);
      }
    }
  };

  // Hàm xử lý "Add to Cart" thông thường
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  if (loading) return <div className="text-center py-20">Đang tải...</div>;
  if (error)
    return <div className="text-center py-20 text-red-500">{error}</div>;
  if (!product) return null;

  const finalImageUrl = product.imageUrl?.startsWith("/")
    ? `https://watch-store-project.onrender.com`
    : product.imageUrl || "";

  const specifications = product.specifications || [];

  return (
    <div className="bg-neutral-focus text-white min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="text-sm text-gray-400 mb-8">
          <Link to="/" className="hover:text-white">
            Trang chủ
          </Link>
          <span className="mx-2">&gt;</span>
          <Link
            to={`/category/${product.categoryId}`}
            className="hover:text-white"
          >
            {product.categoryName}
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="w-full aspect-square rounded-lg bg-neutral flex items-center justify-center overflow-hidden mb-4 shadow-xl">
              <img
                src={finalImageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="py-4">
            <p className="text-yellow-400 uppercase tracking-wider">
              {product.categoryName}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold my-3">
              {product.name}
            </h1>

            {/* *** SỬA LỖI Ở ĐÂY: Làm nổi bật giá *** */}
            <p className="text-5xl font-bold text-yellow-400 mb-6 drop-shadow-md">
              ${parseFloat(product.price).toLocaleString()}
            </p>
            {/* ************************************** */}

            <div className="prose prose-invert text-gray-300 mb-8">
              <p>{product.description}</p>
            </div>
            <div className="flex items-center space-x-4 mb-8">
              <div className="flex items-center border border-gray-600 rounded-md">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-4 py-3"
                >
                  -
                </button>
                <span className="px-4">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-4 py-3"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-transparent border border-yellow-400 text-yellow-400 font-bold py-3 rounded-md hover:bg-yellow-400 hover:text-black transition-colors duration-300"
              >
                Add to Cart
              </button>
            </div>
            <button
              onClick={handleBuyNow}
              className="w-full bg-yellow-400 text-black font-bold py-4 rounded-md hover:bg-yellow-500 transition-colors duration-300"
            >
              Buy It Now
            </button>
            <div className="mt-10 grid grid-cols-3 gap-4 text-center text-gray-400 text-sm">
              <div className="flex flex-col items-center">
                <p>✓ Cam kết xác thực</p>
              </div>
              <div className="flex flex-col items-center">
                <p>✓ Miễn phí vận chuyển</p>
              </div>
              <div className="flex flex-col items-center">
                <p>✓ Bảo hành 2 năm</p>
              </div>
            </div>
            <div className="mt-10">
              <AccordionItem title="Thông số kỹ thuật">
                <ul className="space-y-3">
                  {specifications.map((spec) => (
                    <li key={spec.label} className="flex justify-between">
                      <span>{spec.label}:</span>
                      <span className="font-semibold text-white">
                        {spec.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </AccordionItem>
              <AccordionItem title="Vận chuyển & Đổi trả">
                <p>
                  Miễn phí vận chuyển bảo hiểm toàn quốc. Thời gian giao hàng dự
                  kiến từ 2-5 ngày làm việc. Áp dụng chính sách đổi trả trong
                  vòng 7 ngày nếu có lỗi từ nhà sản xuất. Vui lòng giữ nguyên
                  tình trạng sản phẩm để được hỗ trợ.
                </p>
              </AccordionItem>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
