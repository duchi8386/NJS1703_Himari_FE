import axiosInstance from "../instance";

const CategoryAPI = {
  getAllCategory: async (page, pageSize = 10, filters = {}) => {
    return axiosInstance.get(`/categories`, {
      params: {
        "page-index": page,
        "page-size": pageSize,
        searchTerm: filters?.searchText || "",
        "newest-first": filters?.newestFirst ?? true,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  },
  getCategory: async (categoryId) => {
    return axiosInstance.get(`/categories/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  },
  getParentCategory: async (pageIndex, pageSize) => {
    return axiosInstance.get("/categories/parent", {
      params: {
        "page-index": pageIndex,
        "page-size": pageSize,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  },
  getCategoryByParentId: async (parentId, pageIndex, pageSize) => {
    return axiosInstance.get(`categories/parent/${parentId}/subcategories`, {
      params: {
        parentId: parentId,
        "page-index": pageIndex,
        "page-size": pageSize,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  },
  createCatrgory: async (categoryData) => {
    return axiosInstance.post("/categories", categoryData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  },
  updateCategory: async (categoryData) => {
    return axiosInstance.put(`/categories`, categoryData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  },
  deleteCategory: async (categoryId) => {
    return axiosInstance.delete(`/categories/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  },
  getCategoryById: async (categoryId) => {
    try {
      const response = await axiosInstance.get(`/categories/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching category details:", error);
      throw error;
    }
  },
};

export default CategoryAPI;
