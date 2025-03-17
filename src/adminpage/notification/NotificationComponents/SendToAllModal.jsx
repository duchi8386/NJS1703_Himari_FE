import React from 'react';
import { Modal, Form, Input } from 'antd';

const { TextArea } = Input;

const SendToAllModal = ({ isOpen, onClose, onSendToAll, loading }) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await onSendToAll(values);
      form.resetFields();
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <Modal
      title="Gửi thông báo cho tất cả người dùng"
      open={isOpen}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      onOk={handleSubmit}
      okText="Xác nhận gửi cho tất cả"
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

        <div className="bg-yellow-50 p-3 rounded-md border border-yellow-200 mt-4">
          <p className="text-yellow-800">
            <strong>Lưu ý:</strong> Thông báo này sẽ được gửi đến <strong>tất cả khách hàng</strong> trong hệ thống. 
            Hành động này không thể hoàn tác.
          </p>
        </div>
      </Form>
    </Modal>
  );
};

export default SendToAllModal;