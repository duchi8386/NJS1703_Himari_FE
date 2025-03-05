import axiosInstance from "../instance";

const ProductAPI = {
  getProducts: async (pageIndex, pageSize) => {
    return axiosInstance.get(`/products`, {
      params: {
        "page-index": pageIndex,
        "page-size": pageSize,
      },
    });
  },
};

export default ProductAPI;
