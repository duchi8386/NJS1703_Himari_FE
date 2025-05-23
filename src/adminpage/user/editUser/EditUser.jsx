import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';

const EditUser = ({ isOpen, onClose, onSubmit, userData }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (userData) {
      form.setFieldsValue({
        id: userData.id,
        email: userData.email,
        fullName: userData.fullName || userData.username,
        phoneNumber: userData.phoneNumber || '',
        province: userData.province || '',
        district: userData.district || '',
        ward: userData.ward || '',
        addressBonus: userData.addressBonus || '',
        avatarUrl: userData.avatarUrl || '',
        role: userData.role,
        status: userData.status,
      });
    }
  }, [userData, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSubmit({ ...values, id: userData?.id });
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <Modal
      title={<h3 className="text-lg font-semibold">Chỉnh sửa người dùng</h3>}
      open={isOpen}
      onCancel={onClose}
      className="min-w-[500px]"
      footer={[
        <Button
          key="back"
          onClick={onClose}
          className="min-w-[100px] bg-gray-100 hover:bg-gray-200"
        >
          Hủy
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleSubmit}
          className="min-w-[100px] bg-blue-500 hover:bg-blue-600"
        >
          Cập nhật
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        name="editUserForm"
        className="mt-4"
      >
        <Form.Item
          name="fullName"
          label={<span className="text-gray-700">Tên người dùng</span>}
          rules={[{ required: true, message: 'Vui lòng nhập tên người dùng!' }]}
        >
          <Input
            placeholder="Nhập tên người dùng"
            className="rounded-md"
          />
        </Form.Item>

        <Form.Item
          name="email"
          label={<span className="text-gray-700">Email</span>}
          rules={[
            { required: true, message: 'Vui lòng nhập email!' },
            { type: 'email', message: 'Email không hợp lệ!' }
          ]}
        >
          <Input
            disabled
            placeholder="Nhập email"
            className="rounded-md"
          />
        </Form.Item>

        <Form.Item
          name="phoneNumber"
          label={<span className="text-gray-700">Số điện thoại</span>}
          rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
        >
          <Input
            placeholder="Nhập số điện thoại"
            className="rounded-md"
          />
        </Form.Item>

        <Form.Item
          name="province"
          label={<span className="text-gray-700">Tỉnh/Thành phố</span>}
        >
          <Input
            placeholder="Nhập tỉnh/thành phố"
            className="rounded-md"
          />
        </Form.Item>

        <Form.Item
          name="district"
          label={<span className="text-gray-700">Quận/Huyện</span>}
        >
          <Input
            placeholder="Nhập quận/huyện"
            className="rounded-md"
          />
        </Form.Item>

        <Form.Item
          name="ward"
          label={<span className="text-gray-700">Phường/Xã</span>}
        >
          <Input
            placeholder="Nhập phường/xã"
            className="rounded-md"
          />
        </Form.Item>

        <Form.Item
          name="addressBonus"
          label={<span className="text-gray-700">Địa chỉ chi tiết</span>}
        >
          <Input
            placeholder="Nhập địa chỉ chi tiết"
            className="rounded-md"
          />
        </Form.Item>

        <Form.Item
          name="avatarUrl"
          label={<span className="text-gray-700">Ảnh đại diện URL</span>}
        >
          <Input
            placeholder="Nhập URL ảnh đại diện"
            className="rounded-md"
          />
        </Form.Item>

        {/* <Form.Item
          name="role"
          label={<span className="text-gray-700">Vai trò</span>}
          rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}
        >
          <Select 
            placeholder="Chọn vai trò"
            className="rounded-md"
          >
            <Select.Option value="admin">Admin</Select.Option>
            <Select.Option value="user">User</Select.Option>
          </Select>
        </Form.Item> */}

        {/* <Form.Item
          name="status"
          label={<span className="text-gray-700">Trạng thái</span>}
          rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
        >
          <Select
            placeholder="Chọn trạng thái"
            className="rounded-md"
          >
            <Select.Option value="active">Active</Select.Option>
            <Select.Option value="inactive">Inactive</Select.Option>
          </Select>
        </Form.Item> */}
      </Form>
    </Modal>
  );
};

export default EditUser;