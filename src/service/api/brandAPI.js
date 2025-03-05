import axiosInstance from "../instance";

const BrandAPI = {
  getBrands: async (pageIndex, pageSize) => {
    try {
      const response = await axiosInstance.get("/brands", {
        params: {
          "page-index": pageIndex,
          "page-size": pageSize,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching consults:", error);
      return [];
    }
  },
  getBrand: async (brandId) => {
    return axiosInstance.get(`/brands/${brandId}`);
  },
};
export default BrandAPI;
