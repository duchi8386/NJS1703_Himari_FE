import axiosInstance from "../instance";

const NotificationAPI = {
  // Lấy danh sách thông báo với phân trang và tìm kiếm
  getAllNotifications: async (pageIndex, pageSize, filters = {}) => {
    try {
      const response = await axiosInstance.get("/notifications/system", {
        params: {
          "page-index": pageIndex,
          "page-size": pageSize,
          searchTerm: filters?.searchText || "",
          "newest-first": filters?.newestFirst ?? true,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching notifications:", error);
      throw error;
    }
  },

  // Gửi thông báo cho người dùng cụ thể
  sendToUsers: async (data) => {
    try {
      // Gửi thông báo cho từng user
      const promises = data.userIds.map((userId) =>
        axiosInstance.post(`/notifications/push/${userId}`, {
          title: data.title,
          message: data.message,
        })
      );

      // Đợi tất cả các request hoàn thành
      const results = await Promise.allSettled(promises);

      // Kiểm tra kết quả
      const failedRequests = results.filter(
        (result) => result.status === "rejected"
      );
      if (failedRequests.length > 0) {
        console.error("Một số thông báo không gửi được:", failedRequests);
        throw new Error("Không thể gửi thông báo cho một số người dùng");
      }

      return { statusCode: 200 };
    } catch (error) {
      console.error("Error sending notification:", error);
      throw error;
    }
  },

  // Gửi thông báo cho tất cả người dùng
  sendToAllUsers: async (data) => {
    try {
      const response = await axiosInstance.post("/notifications/push", {
        title: data.title,
        message: data.message,
      });
      return response.data;
    } catch (error) {
      console.error("Error sending notification to all users:", error);
      throw error;
    }
  },

  // Thêm method để lấy danh sách users
  getAllUsers: async (pageIndex, pageSize) => {
    try {
      const response = await axiosInstance.get("/users", {
        params: {
          "page-index": pageIndex,
          "page-size": pageSize,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },
};

export default NotificationAPI;
