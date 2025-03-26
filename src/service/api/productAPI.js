import axiosInstance from "../instance";

const ProductAPI = {
  getProducts: async (pageIndex, pageSize) => {
    return axiosInstance.get(`/products`, {
      params: {
        "page-index": pageIndex,
        "page-size": pageSize,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  },
  getProductById: async (productId) => {
    return axiosInstance.get(`/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  },
  AddProducts: async (productData) => {
    return axiosInstance.post("/products", productData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  },
  UpdateProducts: async (productData) => {
    return axiosInstance.put("/products", productData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  },
  DeleteProduct: async (productId) => {
    return axiosInstance.delete(`/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  },
  uploadToFirebase: async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return axiosInstance.post("/firebase/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  },
};

export default ProductAPI;
