import axiosInstance from "./instance";

const AUTH_ENDPOINTS = {
  GOOGLE_LOGIN: "auth/login/google/oauth",
  DEVICE_TOKEN: "user-devices",
};

export const googleLogin = async (idToken) => {
  return axiosInstance.post(AUTH_ENDPOINTS.GOOGLE_LOGIN, idToken);
};

// Thêm hàm refresh token
export const refreshUserToken = async (refreshToken) => {
  return axiosInstance.post("auth/refresh-token", { refreshToken });
};
