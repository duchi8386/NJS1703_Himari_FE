import React, { useState, useEffect } from "react";
import { Button, message, Input } from "antd";
import { PlusOutlined, SearchOutlined, ReloadOutlined } from "@ant-design/icons";
import NotificationTable from "./NotificationComponents/NotificationTable";
import NotificationAdd from "./NotificationComponents/NotificationAdd";
import SendToUserModal from "./NotificationComponents/SendToUserModal";
import SendToAllModal from "./NotificationComponents/SendToAllModal";
// Import your actual API service
// import NotificationAPI from "../../service/api/NotificationAPI";

const NotificationManagement = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isSendToUserModalVisible, setIsSendToUserModalVisible] = useState(false);
  const [isSendToAllModalVisible, setIsSendToAllModalVisible] = useState(false);
  const [currentNotification, setCurrentNotification] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [searchKeyword, setSearchKeyword] = useState("");
  
  // Mock user data
  const users = [
    { id: 1, name: "Nguyễn Văn A", email: "nguyenvana@example.com" },
    { id: 2, name: "Trần Thị B", email: "tranthib@example.com" },
    { id: 3, name: "Lê Văn C", email: "levanc@example.com" },
    { id: 4, name: "Phạm Thị D", email: "phamthid@example.com" },
    { id: 5, name: "Hoàng Văn E", email: "hoangvane@example.com" },
  ];

  // Fetch notifications when component mounts or pagination changes
  useEffect(() => {
    fetchNotifications(pagination.current, pagination.pageSize, searchKeyword);
  }, [pagination.current, pagination.pageSize]);

  // Function to fetch notifications from API
  const fetchNotifications = async (page, pageSize, keyword = "") => {
    try {
      setLoading(true);
      
      // Replace this mock implementation with actual API call
      // const response = await NotificationAPI.getAllNotifications(page, pageSize, keyword);
      
      // Mock response for development
      setTimeout(() => {
        // Simulate API response
        const mockResponse = {
          data: {
            statusCode: 200,
            message: "Get list notification successfully",
            data: {
              data: [
                {
                  id: 32,
                  title: "Thông báo mới về ứng dụng",
                  titleUnsign: "thong-bao-moi-ve-ung-dung",
                  message: "Ứng dụng đã được cập nhật version 2.0, vui lòng cập nhật để sử dụng các tính năng mới",
                  href: "https://example.com/app",
                  createdDate: "2025-02-27T22:38:51.4977797",
                },
                {
                  id: 31,
                  title: "Khuyến mãi đặc biệt",
                  titleUnsign: "khuyen-mai-dac-biet",
                  message: "Giảm 50% tất cả sản phẩm nhân dịp sinh nhật cửa hàng",
                  href: null,
                  createdDate: "2025-02-25T10:15:20.4977797",
                }
              ],
              metaData: {
                totalCount: 2,
                pageSize: 10,
                currentPage: 1,
                totalPages: 1,
                hasNext: false,
                hasPrevious: false,
              },
            },
          }
        };
        
        // Filter by search term if provided
        let filteredData = [...mockResponse.data.data.data];
        if (keyword) {
          const keywordLower = keyword.toLowerCase();
          filteredData = filteredData.filter(
            item => item.title.toLowerCase().includes(keywordLower) || 
                   item.message.toLowerCase().includes(keywordLower)
          );
        }
        
        setNotifications(filteredData);
        setPagination({
          current: mockResponse.data.data.metaData.currentPage,
          pageSize: mockResponse.data.data.metaData.pageSize,
          total: mockResponse.data.data.metaData.totalCount,
        });
        
        setLoading(false);
      }, 1000);
      
    } catch (error) {
      console.error("Error fetching notifications:", error);
      message.error("Không thể tải danh sách thông báo");
      setLoading(false);
    }
  };

  // Function to show edit modal
  const showEditModal = (notification) => {
    setCurrentNotification(notification);
    setIsEditModalVisible(true);
  };

  // Function to handle add notification
  const handleAddNotification = async (newNotification) => {
    try {
      setLoading(true);
      
      // Replace with actual API call
      // const response = await NotificationAPI.createNotification(newNotification);
      
      // Mock implementation for development
      setTimeout(() => {
        message.success("Thêm thông báo thành công");
        // Refresh list
        fetchNotifications(pagination.current, pagination.pageSize, searchKeyword);
        setIsAddModalVisible(false);
        setLoading(false);
      }, 1000);
      
    } catch (error) {
      console.error("Error creating notification:", error);
      message.error("Không thể thêm thông báo");
      setLoading(false);
    }
  };

  // Function to handle update notification
  const handleUpdateNotification = async (updatedNotification) => {
    try {
      setLoading(true);
      
      // Replace with actual API call
      // const response = await NotificationAPI.updateNotification(updatedNotification);
      
      // Mock implementation for development
      setTimeout(() => {
        message.success("Cập nhật thông báo thành công");
        // Refresh list
        fetchNotifications(pagination.current, pagination.pageSize, searchKeyword);
        setIsEditModalVisible(false);
        setLoading(false);
      }, 1000);
      
    } catch (error) {
      console.error("Error updating notification:", error);
      message.error("Không thể cập nhật thông báo");
      setLoading(false);
    }
  };

  // Function to handle delete notification
  const handleDeleteNotification = async (notificationId) => {
    try {
      setLoading(true);
      
      // Replace with actual API call
      // await NotificationAPI.deleteNotification(notificationId);
      
      // Mock implementation for development
      setTimeout(() => {
        setNotifications(prevNotifications => 
          prevNotifications.filter(notification => notification.id !== notificationId)
        );
        message.success("Xóa thông báo thành công");
        setLoading(false);
      }, 1000);
      
    } catch (error) {
      console.error("Error deleting notification:", error);
      message.error("Không thể xóa thông báo");
      setLoading(false);
    }
  };

  // Function to show send to specific user modal
  const showSendToUserModal = (notification) => {
    setCurrentNotification(notification);
    setSelectedUsers([]);
    setIsSendToUserModalVisible(true);
  };

  // Function to show send to all users modal
  const showSendToAllModal = (notification) => {
    setCurrentNotification(notification);
    setIsSendToAllModalVisible(true);
  };

  // Function to handle sending notification to specific users
  const handleSendToUser = async () => {
    try {
      if (selectedUsers.length === 0) {
        message.warning("Vui lòng chọn ít nhất một người dùng");
        return;
      }

      setLoading(true);
      
      // Replace with actual API call
      // await NotificationAPI.sendToUsers(currentNotification.id, selectedUsers);
      
      // Mock implementation for development
      setTimeout(() => {
        message.success(`Đã gửi thông báo đến ${selectedUsers.length} người dùng`);
        setIsSendToUserModalVisible(false);
        setCurrentNotification(null);
        setSelectedUsers([]);
        setLoading(false);
      }, 1000);
      
    } catch (error) {
      console.error("Error sending notification to users:", error);
      message.error("Không thể gửi thông báo đến người dùng");
      setLoading(false);
    }
  };

  // Function to handle sending notification to all users
  const handleSendToAll = async () => {
    try {
      setLoading(true);
      
      // Replace with actual API call
      // await NotificationAPI.sendToAllUsers(currentNotification.id);
      
      // Mock implementation for development
      setTimeout(() => {
        message.success("Đã gửi thông báo đến tất cả người dùng");
        setIsSendToAllModalVisible(false);
        setCurrentNotification(null);
        setLoading(false);
      }, 1000);
      
    } catch (error) {
      console.error("Error sending notification to all users:", error);
      message.error("Không thể gửi thông báo đến tất cả người dùng");
      setLoading(false);
    }
  };

  // Handle close send to user modal
  const handleCloseSendToUserModal = () => {
    setIsSendToUserModalVisible(false);
    setCurrentNotification(null);
    setSelectedUsers([]);
  };

  // Handle close send to all modal
  const handleCloseSendToAllModal = () => {
    setIsSendToAllModalVisible(false);
    setCurrentNotification(null);
  };

  // Handle table pagination change
  const handleTableChange = (newPagination) => {
    setPagination({
      ...pagination,
      current: newPagination.current,
      pageSize: newPagination.pageSize
    });
  };

  // Handle search
  const handleSearch = (value) => {
    setSearchKeyword(value);
    fetchNotifications(1, pagination.pageSize, value);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Quản lý thông báo</h2>
        <div>
          <Button
            type="primary"
            onClick={() => setIsAddModalVisible(true)}
            className="h-9 rounded"
            icon={<PlusOutlined />}
          >
            Thêm thông báo mới
          </Button>
        </div>
      </div>
      
      <div className="mb-6 flex gap-4">
        <Input.Search
          placeholder="Tìm kiếm theo tiêu đề hoặc nội dung"
          onSearch={handleSearch}
          enterButton={<SearchOutlined />}
          style={{ width: 350 }}
          allowClear
          className="rounded"
        />
        <Button 
          icon={<ReloadOutlined />}
          onClick={() => {
            setSearchKeyword("");
            fetchNotifications(1, pagination.pageSize, "");
          }}
          className="rounded"
        >
          Làm mới
        </Button>
      </div>

      <NotificationTable
        notifications={notifications}
        loading={loading}
        onEdit={showEditModal}
        onDelete={handleDeleteNotification}
        onSendToUser={showSendToUserModal}
        onSendToAll={showSendToAllModal}
        pagination={pagination}
        onChange={handleTableChange}
      />

      <NotificationAdd
        isOpen={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        onAddNotification={handleAddNotification}
      />

      {/* Use the separated SendToUserModal component */}
      <SendToUserModal
        isOpen={isSendToUserModalVisible}
        onClose={handleCloseSendToUserModal}
        onSendToUser={handleSendToUser}
        notification={currentNotification}
        users={users}
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
        loading={loading}
      />

      {/* Use the separated SendToAllModal component */}
      <SendToAllModal
        isOpen={isSendToAllModalVisible}
        onClose={handleCloseSendToAllModal}
        onSendToAll={handleSendToAll}
        notification={currentNotification}
        loading={loading}
      />
    </div>
  );
};

export default NotificationManagement;