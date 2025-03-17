import React from 'react';
import { Modal, Select, Form, Input, message } from 'antd';

const { Option } = Select;
const { TextArea } = Input;

const SendToUserModal = ({ 
  isOpen, 
  onClose, 
  onSendToUser, 
  users, 
  selectedUsers, 
  setSelectedUsers, 
  loading 
}) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      if (selectedUsers.length === 0) {
        message.error('Vui lòng chọn ít nhất một người dùng!');
        return;
      }

      const values = await form.validateFields();
      await onSendToUser({
        title: values.title,
        message: values.message,
        userIds: selectedUsers
      });
      form.resetFields();
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <Modal
      title="Gửi thông báo cho người dùng cụ thể"
      open={isOpen}
      onCancel={() => {
        form.resetFields();
        setSelectedUsers([]);
        onClose();
      }}
      onOk={handleSubmit}
      okText="Gửi thông báo"
      cancelText="Hủy"
      confirmLoading={loading}
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
      >
        <Form.Item
          name="title"
          label="Tiêu đề"
          rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
        >
          <Input placeholder="Nhập tiêu đề thông báo" />
        </Form.Item>

        <Form.Item
          name="message"
          label="Nội dung"
          rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}
        >
          <TextArea 
            rows={4} 
            placeholder="Nhập nội dung thông báo"
          />
        </Form.Item>
        
        <Form.Item
          label="Chọn người dùng"
          required
          help={`Đã chọn ${selectedUsers.length} người dùng`}
        >
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
                {user.name} {user.email ? `(${user.email})` : ''}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SendToUserModal;