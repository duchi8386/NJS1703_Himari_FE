import React, { useEffect, useState } from "react";
import { Modal, Form, Input, message } from "antd";

const { TextArea } = Input;

const BodyEdit = ({ isOpen, onClose, onUpdateBodyPart, bodyPart }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && bodyPart) {
      form.setFieldsValue({
        bodyPartName: bodyPart.bodyPartName,
        description: bodyPart.description,
      });
    }
  }, [isOpen, bodyPart, form]);

  const handleUpdate = () => {
    form.validateFields()
      .then(values => {
        setLoading(true);
        
        // Create updated body part object
        const updatedBodyPart = {
          ...bodyPart,
          bodyPartName: values.bodyPartName,
          description: values.description
        };

        // Giả lập API call
        setTimeout(() => {
          onUpdateBodyPart(updatedBodyPart);
          onClose();
          setLoading(false);
        }, 500);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title="Chỉnh sửa bộ phận cơ thể"
      open={isOpen}
      onCancel={onClose}
      okText="Cập nhật"
      onOk={handleUpdate}
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

export default BodyEdit;