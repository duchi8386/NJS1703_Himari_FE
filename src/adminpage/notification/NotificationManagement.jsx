import React, { useState, useEffect } from "react";
import { Button, message, Input } from "antd";
import {  SearchOutlined, ReloadOutlined, UserOutlined, GlobalOutlined } from "@ant-design/icons";
import NotificationTable from "./NotificationComponents/NotificationTable";
import SendToUserModal from "./NotificationComponents/SendToUserModal";
import SendToAllModal from "./NotificationComponents/SendToAllModal";
// Import your actual API service
import NotificationAPI from "../../service/api/notificationApi";

const NotificationManagement = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isSendToUserModalVisible, setIsSendToUserModalVisible] = useState(false);
  const [isSendToAllModalVisible, setIsSendToAllModalVisible] = useState(false);
  const [currentNotification, setCurrentNotification] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [searchText, setSearchText] = useState('');
  const [newestFirst, setNewestFirst] = useState(true);
  const [users, setUsers] = useState([]);
  
  // Fetch notifications when component mounts or pagination/search changes
  useEffect(() => {
    fetchNotifications(pagination.current, pagination.pageSize);
  }, [pagination.current, pagination.pageSize]);

  // Fetch users khi component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to fetch notifications from API
  const fetchNotifications = async (page = pagination.current, pageSize = pagination.pageSize) => {
    try {
      setLoading(true);
      
      const response = await NotificationAPI.getAllNotifications(page, pageSize, {
        searchText,
        newestFirst
      });
      
      if (response?.statusCode === 200 && response?.data) {
        const { data, metaData } = response.data;
        setNotifications(data || []);
        setPagination({
          ...pagination,
          current: metaData.currentPage,
          pageSize: metaData.pageSize,
          total: metaData.totalCount,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '50', '100'],
        });
      } else {
        message.error("Không thể tải danh sách thông báo");
        setNotifications([]);
        setPagination({
          current: 1,
          pageSize: 10,
          total: 0,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '50', '100'],
        });
      }
    } catch (error) {
      console.error("Lỗi khi tải danh sách thông báo:", error);
      message.error("Không thể tải danh sách thông báo");
      setNotifications([]);
      setPagination({
        current: 1,
        pageSize: 10,
        total: 0,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50', '100'],
      });
    } finally {
      setLoading(false);
    }
  };

  // Function để lấy danh sách users
  const fetchUsers = async () => {
    try {
      const response = await NotificationAPI.getAllUsers(1, 100); // Lấy 100 users
      if (response?.statusCode === 200 && response?.data?.data) {
        // Transform data từ API để phù hợp với format cần thiết
        const transformedUsers = response.data.data.map(user => ({
          id: user.id,
          name: user.fullName || 'Không có tên',
          email: user.email || 'Không có email'
        }));
        setUsers(transformedUsers);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      message.error("Không thể tải danh sách người dùng");
    }
  };


  // Function to handle sending notification to specific users
  const handleSendToUser = async (values) => {
    try {
      setLoading(true);
      
      if (!values.userIds || values.userIds.length === 0) {
        message.error('Vui lòng chọn ít nhất một người dùng!');
        return;
      }

      await NotificationAPI.sendToUsers({
        title: values.title,
        message: values.message,
        userIds: values.userIds
      });
      
      message.success('Gửi thông báo thành công');
      setIsSendToUserModalVisible(false);
      setSelectedUsers([]);
      
      // Tự động refresh danh sách thông báo
      await fetchNotifications(1, pagination.pageSize, {
        searchText,
        newestFirst
      });
      
    } catch (error) {
      console.error("Error sending notification:", error);
      message.error('Không thể gửi thông báo: ' + (error.message || 'Đã có lỗi xảy ra'));
    } finally {
      setLoading(false);
    }
  };

  // Function to handle sending notification to all users
  const handleSendToAll = async (values) => {
    try {
      setLoading(true);
      
      const response = await NotificationAPI.sendToAllUsers({
        title: values.title,
        message: values.message
      });
      
      if (response.statusCode === 200) {
        message.success('Gửi thông báo thành công');
        setIsSendToAllModalVisible(false);
        
        // Tự động refresh danh sách thông báo
        await fetchNotifications(1, pagination.pageSize, {
          searchText,
          newestFirst
        });
      } else {
        message.error(response.message || 'Không thể gửi thông báo');
      }
      
    } catch (error) {
      console.error("Error sending notification to all users:", error);
      message.error('Không thể gửi thông báo');
    } finally {
      setLoading(false);
    }
  };

  // Handle table pagination change
  const handleTableChange = (newPagination, filters, sorter) => {
    setPagination({
      ...pagination,
      current: newPagination.current,
      pageSize: newPagination.pageSize
    });
    fetchNotifications(newPagination.current, newPagination.pageSize);
  };

  // Handle search
  const handleSearch = (value) => {
    setSearchText(value);
    setPagination(prev => ({ ...prev, current: 1 }));
    fetchNotifications(1, pagination.pageSize, {
      searchText: value,
      newestFirst
    });
  };

  // Thêm hàm handleResetFilters
  const handleResetFilters = () => {
    setSearchText('');
    setNewestFirst(true);
    setPagination(prev => ({ ...prev, current: 1 }));
    fetchNotifications(1, pagination.pageSize);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Quản lý thông báo</h2>
        <div className="flex gap-2">
          <Button
            type="primary"
            onClick={() => {
              setCurrentNotification(null);
              setIsSendToUserModalVisible(true);
            }}
            className="h-9 rounded"
            icon={<UserOutlined />}
          >
            Thêm thông báo cho người dùng
          </Button>

          <Button
            type="primary"
            onClick={() => {
              setCurrentNotification(null);
              setIsSendToAllModalVisible(true);
            }}
            className="h-9 rounded"
            icon={<GlobalOutlined />}
          >
            Thêm thông báo cho tất cả người dùng
          </Button>
        </div>
      </div>
      
      <div className="bg-white p-4 mb-6 rounded-lg shadow flex items-center space-x-4 flex-wrap">
        <Input.Search
          placeholder="Tìm kiếm theo tiêu đề hoặc nội dung"
          allowClear
          enterButton
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onSearch={handleSearch}
          style={{ width: 300 }}
        />

        <Button 
          icon={<ReloadOutlined />} 
          onClick={handleResetFilters}
          title="Làm mới"
        >
          Làm mới
        </Button>
      </div>

      <NotificationTable
        notifications={notifications}
        loading={loading}
        // onDelete={handleDeleteNotification}
        pagination={pagination}
        onChange={handleTableChange}
      />

      {/* Modal gửi cho người dùng cụ thể */}
      <SendToUserModal
        isOpen={isSendToUserModalVisible}
        onClose={() => {
          setIsSendToUserModalVisible(false);
          setSelectedUsers([]);
          setCurrentNotification(null);
        }}
        onSendToUser={handleSendToUser}
        notification={currentNotification}
        users={users}
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
        loading={loading}
      />

      {/* Modal gửi cho tất cả người dùng */}
      <SendToAllModal
        isOpen={isSendToAllModalVisible}
        onClose={() => {
          setIsSendToAllModalVisible(false);
          setCurrentNotification(null);
        }}
        onSendToAll={handleSendToAll}
        notification={currentNotification}
        loading={loading}
      />
    </div>
  );
};

export default NotificationManagement;