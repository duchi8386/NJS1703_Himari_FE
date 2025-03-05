import axiosInstance from "../instance";

const CategoryAPI = {
  getAllCategory: async (page) => {
    return axiosInstance.get(`/categories`, {
      params: {
        "page-index": page,
        "page-size": 50,
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
};

export default CategoryAPI;
