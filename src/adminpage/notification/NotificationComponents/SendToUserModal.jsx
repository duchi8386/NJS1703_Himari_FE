import React from 'react';
import { Modal, Select } from 'antd';

const { Option } = Select;

const SendToUserModal = ({ 
  isOpen, 
  onClose, 
  onSendToUser, 
  notification, 
  users, 
  selectedUsers, 
  setSelectedUsers, 
  loading 
}) => {
  return (
    <Modal
      title="Gửi thông báo cho người dùng cụ thể"
      open={isOpen}
      onCancel={() => {
        onClose();
      }}
      onOk={onSendToUser}
      okText="Gửi thông báo"
      cancelText="Hủy"
      confirmLoading={loading}
    >
      {notification && (
        <div>
          <div className="mb-4">
            <p className="font-medium mb-1">Thông báo:</p>
            <p className="text-blue-600 font-bold">{notification.title}</p>
          </div>
          
          <div className="mb-4">
            <p className="font-medium mb-1">Chọn người dùng:</p>
            <Select
              mode="multiple"
              placeholder="Chọn người dùng để gửi thông báo"
              style={{ width: '100%' }}
              value={selectedUsers}
              onChange={setSelectedUsers}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {users.map(user => (
                <Option key={user.id} value={user.id}>
                  {user.name} ({user.email})
                </Option>
              ))}
            </Select>
            <div className="mt-2 text-gray-500 text-sm">
              Đã chọn {selectedUsers.length} người dùng
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default SendToUserModal;