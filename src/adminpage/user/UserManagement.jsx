import React, { useState } from "react";
import UserTable from "./userTable/UserTable";
import { Button } from "antd";
import AddUser from "./addUser/AddUser";

const UserManagement = () => {
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Quản lý người dùng</h2>
        <div>
          <Button
            type="primary"
            onClick={() => setIsAddModalOpen(true)}
            className="h-9 rounded"
          >
            + Thêm người dùng mới
          </Button>
        </div>
      </div>

      <UserTable />
      <AddUser
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      
      />

    </div>
  );
};

export default UserManagement;
