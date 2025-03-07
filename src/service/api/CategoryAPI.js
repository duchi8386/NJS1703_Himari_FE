import axiosInstance from "../instance";

const CategoryAPI = {
  getAllCategory: async (page, pageSize = 10) => {
    return axiosInstance.get(`/categories`, {
      params: {
        "page-index": page,
        "page-size": pageSize,
      },
    });
  },
  getCategory: async (categoryId) => {
    return axiosInstance.get(`/categories/${categoryId}`);
  },
  getParentCategory: async (pageIndex, pageSize) => {
    return axiosInstance.get("/categories/parent", {
      params: {
        "page-index": pageIndex,
        "page-size": pageSize,
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
    });
  },
  createCatrgory: async (categoryData) => {
    return axiosInstance.post("/categories", categoryData);
  },
  updateCategory: async (categoryData) => {
    return axiosInstance.put(`/categories`, categoryData);
  },
  deleteCategory: async (categoryId) => {
    return axiosInstance.delete(`/categories/${categoryId}`);
  },
};

export default CategoryAPI;
