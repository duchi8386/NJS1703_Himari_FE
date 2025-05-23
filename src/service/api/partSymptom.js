import axiosInstance from "../instance";

const partSymptomAPI = {
  getPartSymptoms: async (pageIndex, pageSize, filters = {}) => {
    try {
      const response = await axiosInstance.get("/part-symptoms", {
        params: {
          "page-index": pageIndex,
          "page-size": pageSize,
          searchTerm: filters?.searchText || "",
          "newest-first": filters?.newestFirst ?? true,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching part symptoms:", error);
      throw error;
    }
  },
  getPartSymptomById: async (partSymptomId) => {
    try {
      const response = await axiosInstance.get(
        `/part-symptoms/${partSymptomId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching part symptom by ID:", error);
      throw error;
    }
  },
  addPartSymptom: async (partSymptom) => {
    try {
      const response = await axiosInstance.post("/part-symptoms", partSymptom);
      return response.data;
    } catch (error) {
      console.error("Error adding part symptom:", error);
      throw error;
    }
  },
  updatePartSymptom: async (partSymptom) => {
    try {
      const response = await axiosInstance.put("/part-symptoms", partSymptom);
      return response.data;
    } catch (error) {
      console.error("Error updating part symptom:", error);
      throw error;
    }
  },
  deletePartSymptom: async (id) => {
    try {
      const response = await axiosInstance.delete(`/part-symptoms/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting part symptom:", error);
      throw error;
    }
  },
};

export default partSymptomAPI;
