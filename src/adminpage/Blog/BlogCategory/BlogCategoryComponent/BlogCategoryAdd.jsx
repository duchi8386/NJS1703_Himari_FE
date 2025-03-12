import React from 'react';
import { Modal, Form, Input, message } from 'antd';

const BlogCategoryAdd = ({ isOpen, onClose, onAddCategory, loading }) => {
  const [form] = Form.useForm();

  const handleAdd = () => {
    form.validateFields()
      .then(values => {
        // Create new category object with only the required field
        const newCategory = {
          name: values.name
        };
        
        onAddCategory(newCategory);
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
      title="Add New Category"
      open={isOpen}
      onCancel={handleCancel}
      okText="Add"
      onOk={handleAdd}
      maskClosable={false}
      width={500}
      confirmLoading={loading}
    >
      <Form
        form={form}
        layout="vertical"
      >
        <Form.Item
          name="name"
          label="Category Name"
          rules={[{ required: true, message: 'Please enter category name' }]}
        >
          <Input placeholder="Enter category name" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default BlogCategoryAdd;