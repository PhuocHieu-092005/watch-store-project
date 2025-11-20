// src/pages/admin/AdminDashboard.jsx (Phiên bản Pro)

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiClient from "../../api";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from "chart.js";
import { Line, Pie } from "react-chartjs-2";

// Đăng ký thêm ArcElement và BarElement cho các loại biểu đồ
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

// Component Card thống kê
const StatCard = ({ title, value }) => (
  <div className="stats shadow bg-base-200">
    <div className="stat">
      <div className="stat-title">{title}</div>
      <div className="stat-value text-primary">{value}</div>
    </div>
  </div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [lineChartData, setLineChartData] = useState(null);
  const [pieChartData, setPieChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Dùng Promise.all để gọi tất cả API cùng lúc, tăng hiệu năng
        const [statsRes, revenueRes, topProductsRes] = await Promise.all([
          apiClient.get("/api/admin/dashboard/stats"),
          apiClient.get("/api/admin/dashboard/revenue-by-date"),
          apiClient.get("/api/admin/dashboard/top-selling-products"),
        ]);

        // 1. Xử lý dữ liệu thống kê chung
        setStats(statsRes.data);

        // 2. Xử lý dữ liệu cho biểu đồ đường (doanh thu)
        const revenueData = revenueRes.data;
        const lineLabels = revenueData.map((d) =>
          new Date(d.date).toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
          })
        );
        const lineValues = revenueData.map((d) => d.totalRevenue);
        setLineChartData({
          labels: lineLabels,
          datasets: [
            {
              label: "Doanh thu (Đã giao)",
              data: lineValues,
              borderColor: "#fbbd23",
              backgroundColor: "rgba(251, 189, 35, 0.2)",
              fill: true,
              tension: 0.4,
            },
          ],
        });

        // 3. Xử lý dữ liệu cho biểu đồ tròn (sản phẩm bán chạy)
        const topProductsData = topProductsRes.data;
        const pieLabels = topProductsData.map((p) => p.productName);
        const pieValues = topProductsData.map((p) => p.totalQuantity);
        setPieChartData({
          labels: pieLabels,
          datasets: [
            {
              label: "Số lượng đã bán",
              data: pieValues,
              backgroundColor: [
                "#f87272",
                "#36d399",
                "#fbbd23",
                "#3abff8",
                "#a991f7",
              ],
              borderColor: "#1d232a",
              borderWidth: 2,
            },
          ],
        });
      } catch (err) {
        setError(
          "Không thể tải dữ liệu dashboard. Vui lòng đảm bảo backend hoạt động."
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) return <div>Đang tải dữ liệu dashboard...</div>;
  if (error) return <div className="text-red-500 font-bold p-8">{error}</div>;

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Doanh thu 7 ngày gần nhất (chỉ tính đơn đã giao)",
      },
    },
  };
  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "right" },
      title: { display: true, text: "Top 5 sản phẩm bán chạy" },
    },
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Tổng Doanh Thu"
          value={`${new Intl.NumberFormat("vi-VN").format(
            stats.totalRevenue
          )} $`}
        />
        <StatCard title="Tổng Đơn Hàng" value={stats.totalOrders} />
        <StatCard title="Số Khách Hàng" value={stats.totalUsers} />
        <StatCard title="Số Sản Phẩm" value={stats.totalProducts} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 card bg-base-200 shadow-xl p-4">
          {lineChartData && lineChartData.labels.length > 0 ? (
            <Line options={lineChartOptions} data={lineChartData} />
          ) : (
            <p className="text-center p-10">
              Chưa có đủ dữ liệu doanh thu để vẽ biểu đồ.
            </p>
          )}
        </div>
        <div className="lg:col-span-2 card bg-base-200 shadow-xl p-4 flex justify-center items-center">
          {pieChartData && pieChartData.labels.length > 0 ? (
            <Pie options={pieChartOptions} data={pieChartData} />
          ) : (
            <p className="text-center p-10">
              Chưa có dữ liệu sản phẩm bán chạy.
            </p>
          )}
        </div>
      </div>

      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">5 Đơn hàng gần đây nhất</h2>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Khách hàng</th>
                  <th>Ngày đặt</th>
                  <th>Trạng thái</th>
                  <th className="text-right">Tổng tiền</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders.map((order) => (
                  <tr key={order.id} className="hover">
                    <td>
                      <div className="font-bold">
                        {order.userFullName || order.username}
                      </div>
                      <div className="text-xs opacity-70">
                        User ID: {order.userId}
                      </div>
                    </td>
                    <td>{new Date(order.orderDate).toLocaleString("vi-VN")}</td>
                    <td>
                      <span className={`badge badge-sm badge-warning`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="text-right font-semibold">
                      {new Intl.NumberFormat("vi-VN").format(
                        order.finalTotalAmount
                      )}{" "}
                      $
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
