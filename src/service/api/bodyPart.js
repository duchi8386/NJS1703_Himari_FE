import axiosInstance from "../instance";

const BodyPartAPI = {
  getBodyParts: async (pageIndex, pageSize) => {
    try {
      const response = await axiosInstance.get("/body-parts", {
        params: {
          "page-index": pageIndex,
          "page-size": pageSize,
        },
      });
      // The actual response contains data nested in data property
      return response.data;
    } catch (error) {
      console.error("Error fetching body part:", error);
      throw error;
    }
  },
  getBodyPart: async (id) => {
    try {
      const response = await axiosInstance.get(`/body-parts/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching body part:", error);
    }
  },
  AddBodyPart: async (bodyPart) => {
    try {
      const response = await axiosInstance.post("/body-parts", bodyPart);
      return response.data;
    } catch (error) {
      console.error("Error adding body part:", error);
      throw error;
    }
  },
  UpdateBodyPart: async (bodyPart) => {
    try {
      const response = await axiosInstance.put("/body-parts", bodyPart);
      return response.data;
    } catch (error) {
      console.error("Error updating body part:", error);
      throw error;
    }
  },
  DeleteBodyPart: async (id) => {
    try {
      const response = await axiosInstance.delete(`/body-parts/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting body part:", error);
      throw error;
    }
  },
  searchBodyPart: async (searchQuery, pageIndex, pageSize) => {
    try {
      const response = await axiosInstance.get("/body-parts", {
        params: {
          searchTerm: searchQuery,
          "page-index": pageIndex,
          "page-size": pageSize,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error searching body part:", error);
      throw error;
    }
  },
};
export default BodyPartAPI;
