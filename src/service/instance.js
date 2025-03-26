import axios from "axios";

const API_BASE_URL = "https://wizlab.io.vn:9999/api/v1/";

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
        const refreshToken = localStorage.getItem("refreshToken");
        console.log("🔄 Đang refresh token với:", refreshToken);

        if (!refreshToken) {
          throw new Error("Không tìm thấy refresh token");
        }

        // Gọi API refresh token với refresh token dưới dạng string
        const response = await axios.post(
          `${API_BASE_URL}auth/refresh-token`,
          JSON.stringify(refreshToken),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // Lấy tokens mới từ response
        const { accessToken, refreshToken: newRefreshToken } =
          response.data.data;
        console.log("✅ Refresh token thành công");

        // Lưu tokens mới vào localStorage
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        // Cập nhật header cho request tiếp theo
        axiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`;
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        // Thử lại request ban đầu
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("❌ Refresh token thất bại:", refreshError);

        // Xóa tokens và chuyển về trang login
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("userRole");

        window.location.href = "/admin/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
