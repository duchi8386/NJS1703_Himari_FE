import axiosInstance from "../instance";

const ProductSymptomAPI = {
  getProductSymptom: async (pageIndex, pageSize) => {
    try {
      const response = await axiosInstance.get("/product-symptoms", {
        params: {
          "page-index": pageIndex,
          "page-size": pageSize,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching product symptom:", error);
    }
  },
  addProductSymptom: async (productId, listPartSymptomId) => {
    try {
      const response = await axiosInstance.post("/product-symptoms/bulk", {
        productId,
        listPartSymptomId,
      });
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
        productSymptom
      );
      return response.data;
    } catch (error) {
      console.error("Error updating product symptom:", error);
      throw error;
    }
  },
  deleteProductSymptom: async (id) => {
    try {
      const response = await axiosInstance.delete(`/product-symptoms/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting product symptom:", error);
      throw error;
    }
  },
  getProductSymptomsByProductId: async (productId) => {
    try {
      const response = await axiosInstance.get(
        `/product-symptoms/product/${productId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching product symptoms by product ID:", error);
      throw error;
    }
  },
};
export default ProductSymptomAPI;
