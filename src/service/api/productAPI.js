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
  AddProducts: async (productData) => {
    return axiosInstance.post("/products", productData);
  },
  UpdateProducts: async (productData) => {
    return axiosInstance.put("/products", productData);
  },
  DeleteProduct: async (productId) => {
    return axiosInstance.delete(`/products/${productId}`);
  },
};

export default ProductAPI;
