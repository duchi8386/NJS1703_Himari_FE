import React, { useState, useEffect } from "react";
import UserTable from "./userTable/UserTable";
import { Button, message } from "antd";
import userAPI from "../../service/api/userAPI";

const UserManagement = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    pageIndex: 1,
    pageSize: 10,
    total: 0
  });

  // Fetch users data
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await userAPI.getUsers(
        pagination.pageIndex, 
        pagination.pageSize
      );
      
      // Update to match the actual API response structure
      if (response.data && response.data.data && response.data.data.data) {
        const userData = response.data.data.data;
        const metaData = response.data.data.metaData;
        
        // Add id property to each user for table key purposes if it doesn't exist
        const processedUsers = userData.map((user, index) => ({
          ...user,
          id: user.id || index + 1, // Use existing id or generate one
          status: user.status || 'active' // Default status if null
        }));
        
        setUsers(processedUsers);
        setPagination({
          pageIndex: metaData.currentPage,
          pageSize: metaData.pageSize,
          total: metaData.totalCount
        });
      }
    } catch (error) {
      message.error("Failed to fetch users data");
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.pageIndex, pagination.pageSize]);

  // Handle pagination changes
  const handleTableChange = (page, pageSize) => {
    setPagination({
      ...pagination,
      pageIndex: page,
      pageSize: pageSize
    });
  };

  // Handle add user
  const handleAddUser = (values) => {
    // Add user logic here
    // Will need to implement later if there's an API for it
    message.success("User added successfully");
    fetchUsers(); // Refresh the list
  };

  // Handle edit user
  const handleEditUser = async (userData) => {
    try {
      setLoading(true);
      // Transform data to match API format if needed
      const formattedData = {
        id: userData.id,
        email: userData.email,
        fullName: userData.fullName,
        phoneNumber: userData.phoneNumber,
        address: userData.address || "", 
        avatarUrl: userData.avatarUrl || ""
      };
      
      await userAPI.updateUser(formattedData);
      message.success("User updated successfully");
      fetchUsers(); // Refresh the list
    } catch (error) {
      message.error("Failed to update user");
      console.error("Error updating user:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete user
  const handleDeleteUser = async (userId) => {
    try {
      setLoading(true);
      await userAPI.deleteUser(userId);
      message.success("User deleted successfully");
      fetchUsers(); // Refresh the list
    } catch (error) {
      message.error("Failed to delete user");
      console.error("Error deleting user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Quản lý người dùng</h2>
      </div>

      <UserTable 
        users={users}
        loading={loading}
        pagination={pagination}
        onTableChange={handleTableChange}
        onDelete={handleDeleteUser}
        onEdit={handleEditUser}
      />
    </div>
  );
};

export default UserManagement;
