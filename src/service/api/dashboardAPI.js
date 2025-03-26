import axiosInstance from "../instance";

const DashboardAPI = {
  getRevenue: async () => {
    try {
      const response = await axiosInstance.get("/dashboard/revenue");
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getNewOrder: async () => {
    try {
      const response = await axiosInstance.get("/dashboard/new-order");
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getNewUser: async () => {
    try {
      const response = await axiosInstance.get("/dashboard/new-user");
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getNewProduct: async () => {
    try {
      const response = await axiosInstance.get("/dashboard/new-product");
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  revenueMonthChart: async () => {
    try {
      const response = await axiosInstance.get("/dashboard/revenue-month");
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  revenuePercentChart: async () => {
    try {
      const response = await axiosInstance.get("/dashboard/revenue-percent");
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  productLowQuantityChart: async () => {
    try {
      const response = await axiosInstance.get(
        "/dashboard/product-low-quantity"
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  productfeaturedChart: async (pageIndex, pageSize) => {
    try {
      const response = await axiosInstance.get("/products/featured", {
        params: {
          "page-index": pageIndex,
          "page-size": pageSize,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

export default DashboardAPI;
