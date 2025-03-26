import axiosInstance from "../instance";

const ProductSymptomAPI = {
  getProductSymptom: async (pageIndex, pageSize) => {
    try {
      const response = await axiosInstance.get("/product-symptoms", {
        params: {
          "page-index": pageIndex,
          "page-size": pageSize,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching product symptom:", error);
    }
  },
  addProductSymptom: async (productSymptom) => {
    try {
      const response = await axiosInstance.post(
        "/product-symptoms",
        productSymptom,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding product symptom:", error);
      throw error;
    }
  },
  updateProductSymptom: async (productSymptom) => {
    try {
      const response = await axiosInstance.put(
        "/product-symptoms",
        productSymptom,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating product symptom:", error);
      throw error;
    }
  },
  deleteProductSymptom: async (id) => {
    try {
      const response = await axiosInstance.delete(`/product-symptoms/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting product symptom:", error);
      throw error;
    }
  },
};
export default ProductSymptomAPI;
