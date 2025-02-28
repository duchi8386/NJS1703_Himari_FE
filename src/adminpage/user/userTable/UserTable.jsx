import  { useState } from 'react';
import { Button, Space, Table, Tag } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { mockUsers } from './mockData';
import AddUser from '../addUser/AddUser';
import EditUser from '../editUser/EditUser';

const UserTable = () => {
  const [data, setData] = useState(mockUsers);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên người dùng',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <Tag color={role === 'admin' ? 'red' : 'blue'}>
          {role.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="primary" 
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Sửa
          </Button>
          <Button 
            danger 
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  const handleEdit = (record) => {
    setSelectedUser(record);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id) => {
    console.log('Delete user:', id);
    // Thêm logic xử lý xóa user
  };

  const handleAddUser = (values) => {
    const newUser = {
      key: String(data.length + 1),
      id: data.length + 1,
      ...values
    };
    setData([...data, newUser]);
  };

  const handleEditSubmit = (values) => {
    const updatedData = data.map(item => 
      item.id === values.id ? { ...item, ...values } : item
    );
    setData(updatedData);
  };

  return (
    <div className="p-6">
      <Button 
        type="primary" 
        icon={<PlusOutlined />}
        onClick={() => setIsAddModalOpen(true)}
        className="mb-4 bg-blue-500 hover:bg-blue-600"
      >
        Thêm người dùng
      </Button>

      <div className="bg-white rounded-lg shadow">
        <Table 
          columns={columns} 
          dataSource={data}
          pagination={{
            total: data.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
        />
      </div>

      <AddUser
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddUser}
      />

      <EditUser
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedUser(null);
        }}
        onSubmit={handleEditSubmit}
        userData={selectedUser}
      />
    </div>
  );
};

export default UserTable;