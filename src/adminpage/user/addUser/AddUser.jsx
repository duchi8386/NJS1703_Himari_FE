import React from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';

const AddUser = ({ isOpen, onClose, onSubmit }) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
      form.resetFields();
      onClose();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <Modal
      title="Thêm người dùng mới"
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Hủy
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Thêm
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        name="addUserForm"
      >
        <Form.Item
          name="username"
          label="Tên người dùng"
          rules={[{ required: true, message: 'Vui lòng nhập tên người dùng!' }]}
        >
          <Input placeholder="Nhập tên người dùng" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Vui lòng nhập email!' },
            { type: 'email', message: 'Email không hợp lệ!' }
          ]}
        >
          <Input placeholder="Nhập email" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Số điện thoại"
          rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
        >
          <Input placeholder="Nhập số điện thoại" />
        </Form.Item>

        <Form.Item
          name="role"
          label="Vai trò"
          rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}
        >
          <Select placeholder="Chọn vai trò">
            <Select.Option value="admin">Admin</Select.Option>
            <Select.Option value="user">User</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="status"
          label="Trạng thái"
          rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
        >
          <Select placeholder="Chọn trạng thái">
            <Select.Option value="active">Active</Select.Option>
            <Select.Option value="inactive">Inactive</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddUser;