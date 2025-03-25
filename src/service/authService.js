import axiosInstance from "./instance";

const AUTH_ENDPOINTS = {
  GOOGLE_LOGIN: "auth/login/google/oauth",
  DEVICE_TOKEN: "user-devices",
};

export const googleLogin = async (idToken) => {
  return axiosInstance.post(AUTH_ENDPOINTS.GOOGLE_LOGIN, idToken);
};

export const sendDeviceToken = async (userId, fcmToken) => {
  return axiosInstance.post(AUTH_ENDPOINTS.DEVICE_TOKEN, {
    userId,
    deviceToken: fcmToken,
  });
};

export const deleteDeviceToken = async (fcmToken) => {
  return axiosInstance.delete(AUTH_ENDPOINTS.DEVICE_TOKEN, {
    data: { deviceToken: fcmToken },
  });
};

// Thêm hàm refresh token
export const refreshUserToken = async (refreshToken) => {
  return axiosInstance.post("auth/refresh-token", { refreshToken });
};
