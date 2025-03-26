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
      console.error("Error fetching brands:", error);
      throw error;
    }
  },

  getBrand: async (brandId) => {
    try {
      const response = await axiosInstance.get(`/brands/${brandId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching brand detail:", error);
      throw error;
    }
  },

  createBrand: async (brandData) => {
    try {
      const response = await axiosInstance.post("/brands", brandData);
      return response.data;
    } catch (error) {
      console.error("Error creating brand:", error);
      throw error;
    }
  },

  updateBrand: async (brandData) => {
    try {
      const response = await axiosInstance.put("/brands", brandData);
      return response.data;
    } catch (error) {
      console.error("Error updating brand:", error);
      throw error;
    }
  },

  deleteBrand: async (brandId) => {
    try {
      const response = await axiosInstance.delete(`/brands/${brandId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting brand:", error);
      throw error;
    }
  },

  uploadToFirebase: async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return axiosInstance.post("/firebase/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  searchBrand: async (searchQuery, pageIndex, pageSize) => {
    try {
      const response = await axiosInstance.get("/brands", {
        params: {
          searchTerm: searchQuery,
          "page-index": pageIndex,
          "page-size": pageSize,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error searching brand:", error);
      throw error;
    }
  },
};

export default BrandAPI;
