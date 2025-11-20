// src/main.jsx

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Import các layout
import App from "./App.jsx";
import AdminLayout from "./layout/AdminLayout.jsx";

// Import các trang chung
import HomePage from "./pages/HomePage.jsx";
import ProductDetailPage from "./components/product/ProductDetailPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import OrderHistoryPage from "./pages/OrderHistoryPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import AboutUsPage from "./pages/AboutUsPage.jsx";
import MaterialDetailPage from "./pages/MaterialDetailPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";

import NotFoundPage from "./pages/NotFoundPage.jsx";

// Import các trang admin
import AdminProtectedRoute from "./components/AdminProtectedRoute.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import ProductManagement from "./pages/admin/ProductManagement.jsx";
import CategoryManagement from "./pages/admin/CategoryManagement.jsx";
import OrderManagement from "./pages/admin/OrderManagement.jsx";
import UserManagement from "./pages/admin/UserManagement.jsx";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App chứa Header và Footer
    children: [
      { index: true, element: <HomePage /> },
      { path: "products/:productId", element: <ProductDetailPage /> },
      { path: "category/:categoryId", element: <CategoryPage /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "my-orders", element: <OrderHistoryPage /> },
      { path: "search", element: <SearchPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "about", element: <AboutUsPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "materials/:materialSlug", element: <MaterialDetailPage /> },

      { path: "*", element: <NotFoundPage /> },
    ],
  },

  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    element: <AdminProtectedRoute />,
    children: [
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: "products", element: <ProductManagement /> },
          { path: "categories", element: <CategoryManagement /> },
          { path: "orders", element: <OrderManagement /> },
          { path: "users", element: <UserManagement /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
