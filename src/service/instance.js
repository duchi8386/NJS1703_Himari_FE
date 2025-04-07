import axios from "axios";

const API_BASE_URL = "https://himari-api.wizlab.io.vn/api/v1/";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor cho request
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      await Promise.resolve(); // Ensure async completion
      return config;
    } catch (error) {
      console.error("❌ Lỗi thêm token vào header:", error);
      return Promise.reject(error);
    }
  },
  (error) => Promise.reject(error)
);

// Interceptor cho response
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await Promise.resolve(
          localStorage.getItem("refreshToken")
        );

        const response = await axios.post(
          `${API_BASE_URL}auth/refresh-token`,
          JSON.stringify(refreshToken),
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "*/*",
            },
          }
        );

        if (!response.data?.data) {
          throw new Error("Invalid refresh token response");
        }

        const { accessToken, refreshToken: newRefreshToken } =
          response.data.data;

        // Lưu tokens mới
        await Promise.all([
          localStorage.setItem("accessToken", accessToken),
          localStorage.setItem("refreshToken", newRefreshToken),
        ]);

        // Quan trọng: Cập nhật lại config cho request gốc
        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${accessToken}`,
        };

        // Thử lại request ban đầu với config đã cập nhật
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("❌ Refresh token thất bại:", refreshError);
        // Xóa tokens
        await Promise.all([
          localStorage.removeItem("accessToken"),
          localStorage.removeItem("refreshToken"),
        ]);
        // window.location.href = "/admin/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
