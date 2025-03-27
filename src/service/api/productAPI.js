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
  getProductById: async (productId) => {
    return axiosInstance.get(`/products/${productId}`);
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
  uploadToFirebase: async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return axiosInstance.post("/firebase/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  searchProducts: async (pageIndex, pageSize, keyword) => {
    return axiosInstance.get(`/products/search`, {
      params: {
        "page-index": pageIndex,
        "page-size": pageSize,
        "keyword": keyword
      },
    });
  },
};

export default ProductAPI;
