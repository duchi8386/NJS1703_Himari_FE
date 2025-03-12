import React, { useState } from "react";
import { Modal, Form, Input, message } from "antd";

const { TextArea } = Input;

const BodyAdd = ({ isOpen, onClose, onAddBodyPart }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleCreate = () => {
    form.validateFields()
      .then(values => {
        setLoading(true);
        
        // Create new body part object
        const newBodyPart = {
          id: Date.now(), // Sử dụng timestamp làm id tạm thời
          bodyPartName: values.bodyPartName,
          description: values.description
        };

        // Giả lập API call
        setTimeout(() => {
          onAddBodyPart(newBodyPart);
          handleCancel();
          setLoading(false);
        }, 500);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="Thêm bộ phận cơ thể mới"
      open={isOpen}
      onCancel={handleCancel}
      okText="Thêm mới"
      onOk={handleCreate}
      okButtonProps={{ loading: loading }}
      maskClosable={false}
      width={600}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="bodyPartName"
          label="Tên bộ phận cơ thể"
          rules={[{ required: true, message: "Vui lòng nhập tên bộ phận cơ thể" }]}
        >
          <Input placeholder="Nhập tên bộ phận cơ thể" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Mô tả"
          rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
        >
          <TextArea rows={4} placeholder="Nhập mô tả cho bộ phận cơ thể" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default BodyAdd;