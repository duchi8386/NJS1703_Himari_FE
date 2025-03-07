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
    // The userData should follow the required format
    // {id, email, fullName, phoneNumber, address, avatarUrl}
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
