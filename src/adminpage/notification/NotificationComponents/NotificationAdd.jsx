import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { LinkOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const NotificationAdd = ({ isOpen, onClose, onSuccess, editingNotification }) => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const isEditing = !!editingNotification;

  useEffect(() => {
    if (editingNotification) {
      form.setFieldsValue({
        title: editingNotification.title,
        message: editingNotification.message,
        href: editingNotification.href || "",
      });
    } else {
      form.resetFields();
    }
  }, [editingNotification, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setSubmitting(true);

      // Create notification data object
      const notificationData = {
        title: values.title,
        message: values.message,
        href: values.href || null,
      };

      // Mock API call - replace with actual API call
      setTimeout(async () => {
        try {
          // Add your API call here
          // const response = await NotificationAPI.createNotification(notificationData);
          // or for editing:
          // const response = await NotificationAPI.updateNotification(editingNotification.id, notificationData);
          
          message.success(isEditing ? "Cập nhật thông báo thành công" : "Thêm thông báo mới thành công");
          form.resetFields();
          onSuccess();
          onClose();
        } catch (error) {
          console.error("Error:", error);
          message.error(isEditing ? "Không thể cập nhật thông báo" : "Không thể thêm thông báo");
        } finally {
          setSubmitting(false);
        }
      }, 1000);
    } catch (error) {
      console.error("Validation error:", error);
    }
  };

  return (
    <Modal
      title={isEditing ? "Chỉnh sửa thông báo" : "Thêm thông báo mới"}
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Hủy
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={submitting}
          onClick={handleSubmit}
        >
          {isEditing ? "Cập nhật" : "Thêm mới"}
        </Button>,
      ]}
      maskClosable={false}
      width={600}
    >
      <Form form={form} layout="vertical" className="mt-4">
        <Form.Item
          name="title"
          label="Tiêu đề thông báo"
          rules={[
            { required: true, message: "Vui lòng nhập tiêu đề thông báo" },
            { max: 100, message: "Tiêu đề không được quá 100 ký tự" },
          ]}
        >
          <Input placeholder="Nhập tiêu đề thông báo" />
        </Form.Item>

        <Form.Item
          name="message"
          label="Nội dung thông báo"
          rules={[
            { required: true, message: "Vui lòng nhập nội dung thông báo" },
            { max: 500, message: "Nội dung không được quá 500 ký tự" },
          ]}
        >
          <TextArea 
            rows={4} 
            placeholder="Nhập nội dung thông báo" 
            showCount 
            maxLength={500}
          />
        </Form.Item>

        <Form.Item
          name="href"
          label="Đường dẫn (tùy chọn)"
          rules={[
            {
              type: 'url',
              message: 'Vui lòng nhập đường dẫn hợp lệ!',
              validateTrigger: 'onBlur',
              warningOnly: true,
            },
          ]}
        >
          <Input 
            placeholder="Nhập đường dẫn (nếu có)" 
            prefix={<LinkOutlined />} 
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NotificationAdd;