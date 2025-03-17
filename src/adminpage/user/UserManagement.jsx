import React, { useState, useEffect } from "react";
import UserTable from "./userTable/UserTable";
import { Button, message } from "antd";
import userAPI from "../../service/api/userAPI";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    pageIndex: 1,
    pageSize: 20,
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
      // console.log("Users data:", response);
      // Update to match the actual API response structure
      if (response.data && response.data.data && response.data.data.data) {
        const userData = response.data.data.data;
        const metaData = response.data.data.metaData;

        // Process users with their address information for display
        const processedUsers = userData.map(user => ({
          ...user,
          // Create a combined address field for display in the table
          address: [user.province, user.district, user.ward, user.addressBonus]
            .filter(Boolean)
            .join(', '),
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

  // Handle edit user
  const handleEditUser = async (userData) => {
    try {
      setLoading(true);
      // Format data to match the required API request body
      const formattedData = {
        id: userData.id,
        email: userData.email,
        fullName: userData.fullName,
        phoneNumber: userData.phoneNumber || "",
        province: userData.province || "",
        district: userData.district || "",
        ward: userData.ward || "",
        addressBonus: userData.addressBonus || "",
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
