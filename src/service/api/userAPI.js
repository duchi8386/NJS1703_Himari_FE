import axiosInstance from "../instance";

const userAPI = {
  getUsers: async (pageIndex, pageSize) => {
    return axiosInstance.get(`/users`, {
      params: {
        "page-index": pageIndex,
        "page-size": pageSize,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  },

  updateUser: async (userData) => {
    return axiosInstance.put(`/users`, userData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  },

  deleteUser: async (userId) => {
    return axiosInstance.delete(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  },

  getUserById: async (userId) => {
    return axiosInstance.get(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  },
};

export default userAPI;
