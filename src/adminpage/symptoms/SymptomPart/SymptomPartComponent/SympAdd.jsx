import React, { useState } from "react";
import { Modal, Form, Input, Select, message } from "antd";

const { Option } = Select;

const SympAdd = ({ isOpen, onClose, onAddSymptom, bodyParts }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleCreate = () => {
    form.validateFields()
      .then(values => {
        setLoading(true);
        
        // Create new symptom object
        const newSymptom = {
          id: Date.now(), // Sử dụng timestamp làm id tạm thời
          name: values.name,
          bodyPartId: values.bodyPartId
        };

        // Giả lập API call
        setTimeout(() => {
          onAddSymptom(newSymptom);
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
      title="Thêm triệu chứng mới"
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
          name="name"
          label="Tên triệu chứng"
          rules={[{ required: true, message: "Vui lòng nhập tên triệu chứng" }]}
        >
          <Input placeholder="Nhập tên triệu chứng" />
        </Form.Item>

        <Form.Item
          name="bodyPartId"
          label="Bộ phận cơ thể"
          rules={[{ required: true, message: "Vui lòng chọn bộ phận cơ thể" }]}
        >
          <Select placeholder="Chọn bộ phận cơ thể">
            {bodyParts.map(part => (
              <Option key={part.id} value={part.id}>{part.name}</Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SympAdd;