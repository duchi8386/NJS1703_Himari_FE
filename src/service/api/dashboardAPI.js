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
};

export default DashboardAPI;
