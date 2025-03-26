import React, { useEffect, useState, useCallback } from 'react';

// Nhập dữ liệu từ file riêng
import {
  revenueData,
  categoryData,
  orderStatusData,
  topProductsData,
  lowStockProductsData
} from './datasample/data';
import RevenueBarChart from './chart/RevenueBarChart';
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

  // Consolidate loading states into a single object
  const [loadingStates, setLoadingStates] = useState({
    revenue: true,
    orderStatus: true,
    lowStock: true,
    topProducts: true,
    overview: true
  });

  // Helper function to set loading state for a specific data type
  const setLoadingState = (dataType, isLoading) => {
    setLoadingStates(prev => ({ ...prev, [dataType]: isLoading }));
  };

  // Utility function for safe API calls
  const fetchDataSafely = async (apiCall, onSuccess, dataType) => {
    setLoadingState(dataType, true);
    try {
      const response = await apiCall();
      if (response && response.data) {
        onSuccess(response.data);
      }
      return response?.data;
    } catch (error) {
      console.error(`Error fetching ${dataType} data:`, error);
      return null;
    } finally {
      setLoadingState(dataType, false);
    }
  };

  const fetchOverviewData = useCallback(async () => {
    setLoadingState('overview', true);
    try {
      // Using Promise.all to fetch all data in parallel
      const [revenueResponse, newOrderResponse, newUserResponse, newProductResponse] = await Promise.all([
        DashboardAPI.getRevenue(),
        DashboardAPI.getNewOrder(),
        DashboardAPI.getNewUser(),
        DashboardAPI.getNewProduct()
      ]);

      // Update state with all fetched data
      setOverviewData({
        revenue: revenueResponse?.data || {
          revenue: "0.0M",
          percent: "0",
          isIncrease: true
        },
        newOrder: newOrderResponse?.data || {
          quantityOrder: 0,
          percent: 0,
          isIncrease: true
        },
        newUser: newUserResponse?.data || {
          quantityUser: 0,
          percent: 0,
          isIncrease: true
        },
        lowStockProducts: newProductResponse?.data || {
          quantityProduct: 0,
          percent: 3,
          isIncrease: false
        }
      });
    } catch (error) {
      console.error("Error fetching dashboard overview data:", error);
    } finally {
      setLoadingState('overview', false);
    }
  }, []);

  const fetchRevenueChartData = useCallback(async () => {
    await fetchDataSafely(
      DashboardAPI.revenueMonthChart,
      (data) => {
        const formattedData = data.map(item => ({
          name: item.month,
          revenue: item.revenue
        }));

        setData(prevData => ({
          ...prevData,
          revenue: formattedData
        }));
        // console.log("Revenue chart data:", formattedData);
      },
      'revenue'
    );
  }, []);

  const fetchOrderStatusData = useCallback(async () => {
    await fetchDataSafely(
      DashboardAPI.revenuePercentChart,
      (data) => {
        const formattedData = data.map(item => ({
          name: item.status,
          value: item.revenue
        }));

        setData(prevData => ({
          ...prevData,
          orderStatus: formattedData
        }));
        // console.log("Order status chart data:", formattedData);
      },
      'orderStatus'
    );
  }, []);

  const fetchLowStockData = useCallback(async () => {
    await fetchDataSafely(
      DashboardAPI.productLowQuantityChart,
      (data) => {
        const formattedData = data.map(item => ({
          id: item.id,
          name: item.productName,
          quantity: item.quantity,
          threshold: 10 // Default threshold
        }));

        setData(prevData => ({
          ...prevData,
          lowStockProducts: formattedData
        }));
        // console.log("Low stock products data:", formattedData);
      },
      'lowStock'
    );
  }, []);

  const fetchTopProductsData = useCallback(async () => {
    await fetchDataSafely(
      () => DashboardAPI.productfeaturedChart(1, 5),
      (responseData) => {
        if (responseData.data) {
          const formattedData = responseData.data
            .map(item => ({
              id: item.id,
              name: item.productName,
              revenue: item.price * (item.sold || 0)
            }))
            .sort((a, b) => b.revenue - a.revenue);

          setData(prevData => ({
            ...prevData,
            topProducts: formattedData
          }));
          // console.log("Top products data:", formattedData);
        }
      },
      'topProducts'
    );
  }, []);

  useEffect(() => {
    // Fetch all data in parallel
    Promise.all([
      fetchOverviewData(),
      fetchRevenueChartData(),
      fetchOrderStatusData(),
      fetchLowStockData(),
      fetchTopProductsData()
    ]);
  }, [fetchOverviewData, fetchRevenueChartData, fetchOrderStatusData, fetchLowStockData, fetchTopProductsData]);

  return (
    <div className="p-6 bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500 mt-1">Tổng quan hoạt động kinh doanh</p>
        </div>
      </div>

      {/* Overview Cards */}
      <OverviewCards overviewData={overviewData} isLoading={loadingStates.overview} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Biểu đồ cột - Doanh thu theo thời gian */}
        <RevenueBarChart data={data.revenue} isLoading={loadingStates.revenue} />

        {/* Biểu đồ tròn - Tỷ lệ đơn hàng */}
        <OrderStatusChart data={data.orderStatus} isLoading={loadingStates.orderStatus} />

        {/* Biểu đồ cột - Top sản phẩm bán chạy */}
        <TopProductsChart data={data.topProducts} isLoading={loadingStates.topProducts} />

        {/* Biểu đồ - Sản phẩm sắp hết hàng */}
        <LowStockChart data={data.lowStockProducts} isLoading={loadingStates.lowStock} />

        {/* Bảng sản phẩm sắp hết hàng cho thông tin chi tiết */}
        <div className="lg:col-span-2">
          <LowStockTable data={data.lowStockProducts} isLoading={loadingStates.lowStock} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;