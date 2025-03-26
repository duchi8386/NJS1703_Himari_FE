import React, { useEffect, useState } from 'react';

// Nhập dữ liệu từ file riêng
import {
  revenueData,
  categoryData,
  orderStatusData,
  topProductsData,
  lowStockProductsData
} from './datasample/data';
import RevenueBarChart from './chart/RevenueBarChart';
import RevenueTrendChart from './chart/RevenueTrendChart';
import CategoryPieChart from './chart/CategoryPieChart';
import TopProductsChart from './chart/TopProductsChart';
import LowStockChart from './chart/LowStockChart';
import LowStockTable from './chart/LowStockTable';
import OrderStatusChart from './chart/OrderStatusChart';
import OverviewCards from './overview/OverviewCards';
import DashboardAPI from '../../service/api/dashboardAPI';

const Dashboard = () => {
  const [data, setData] = useState({
    revenue: revenueData,
    category: categoryData,
    orderStatus: orderStatusData,
    topProducts: topProductsData,
    lowStockProducts: lowStockProductsData
  });

  const [overviewData, setOverviewData] = useState({
    revenue: {
      revenue: "0.0M",
      percent: "0",
      isIncrease: true
    },
    newOrder: {
      quantityOrder: 0,
      percent: 0,
      isIncrease: true
    },
    newUser: {
      quantityUser: 0,
      percent: 0,
      isIncrease: true
    },
    lowStockProducts: {
      quantity: 0,
      percent: 3,
      isIncrease: false
    }
  });

  const fetchOverviewData = async () => {
    try {
      // Using Promise.all to fetch all data in parallel
      const [revenueResponse, newOrderResponse, newUserResponse] = await Promise.all([
        DashboardAPI.getRevenue(),
        DashboardAPI.getNewOrder(),
        DashboardAPI.getNewUser()
      ]);

      // Update state with all fetched data
      setOverviewData({
        revenue: revenueResponse.data || {
          revenue: "0.0M",
          percent: "0",
          isIncrease: true
        },
        newOrder: newOrderResponse.data || {
          quantityOrder: 0,
          percent: 0,
          isIncrease: true
        },
        newUser: newUserResponse.data || {
          quantityUser: 0,
          percent: 0,
          isIncrease: true
        },
        lowStockProducts: {
          quantity: data.lowStockProducts.length,
          percent: 3,
          isIncrease: false
        }
      });

      // console.log("Revenue data:", revenueResponse);
      // console.log("New Order data:", newOrderResponse);
      // console.log("New User data:", newUserResponse);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  }

  useEffect(() => {
    fetchOverviewData();
  }, []);

  return (
    <div className="p-6 bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500 mt-1">Tổng quan hoạt động kinh doanh</p>
        </div>
      </div>

      {/* Overview Cards */}
      <OverviewCards data={data.lowStockProducts} overviewData={overviewData} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Biểu đồ cột - Doanh thu theo thời gian */}
        <RevenueBarChart data={data.revenue} />

        {/* Biểu đồ đường - Xu hướng doanh thu */}
        <RevenueTrendChart data={data.revenue} />

        {/* Biểu đồ tròn - Tỷ lệ doanh thu theo danh mục */}
        <CategoryPieChart data={data.category} />

        {/* Biểu đồ tròn - Tỷ lệ đơn hàng */}
        <OrderStatusChart data={data.orderStatus} />

        {/* Biểu đồ cột - Top sản phẩm bán chạy */}
        <TopProductsChart data={data.topProducts} />

        {/* Biểu đồ - Sản phẩm sắp hết hàng */}
        <LowStockChart data={data.lowStockProducts} />

        {/* Bảng sản phẩm sắp hết hàng cho thông tin chi tiết */}
        <div className="lg:col-span-2">
          <LowStockTable data={data.lowStockProducts} />
        </div>
      </div>
    </div >
  );
};

export default Dashboard;