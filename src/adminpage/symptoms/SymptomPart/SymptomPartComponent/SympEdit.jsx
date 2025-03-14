import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select, message } from "antd";

const { Option } = Select;

const SympEdit = ({ isOpen, onClose, onUpdateSymptom, symptom, bodyParts }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && symptom) {
      form.setFieldsValue({
        name: symptom.name,
        bodyPartId: symptom.bodyPartId,
      });
    }
  }, [isOpen, symptom, form]);

  const handleUpdate = () => {
    form.validateFields()
      .then(values => {
        setLoading(true);
        
        // Create updated symptom object
        const updatedSymptom = {
          ...symptom,
          name: values.name,
          bodyPartId: values.bodyPartId
        };

        // Call the API through parent component
        onUpdateSymptom(updatedSymptom)
          .then(() => {
            onClose();
          })
          .catch(() => {
            // Error handling is done in parent component
          })
          .finally(() => {
            setLoading(false);
          });
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title="Chỉnh sửa triệu chứng"
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

export default SympEdit;