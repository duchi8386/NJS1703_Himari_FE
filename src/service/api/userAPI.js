import axiosInstance from "../instance";

const userAPI = {
  getUsers: async (pageIndex, pageSize) => {
    return axiosInstance.get(`/users`, {
      params: {
        "page-index": pageIndex,
        "page-size": pageSize,
      },
    });
  },

  updateUser: async (userData) => {
    return axiosInstance.put(`/users`, userData);
  },

  deleteUser: async (userId) => {
    return axiosInstance.delete(`/users/${userId}`);
  },

  getUserById: async (userId) => {
    return axiosInstance.get(`/users/${userId}`);
  },
};

export default userAPI;
