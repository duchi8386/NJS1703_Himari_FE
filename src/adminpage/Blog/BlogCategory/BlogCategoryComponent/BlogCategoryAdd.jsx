import React from 'react';
import { Modal, Form, Input, InputNumber, Switch, message } from 'antd';


const BlogCategoryAdd = ({ isOpen, onClose, onAddCategory, categoriesLength }) => {
  const [form] = Form.useForm();

  const handleAdd = () => {
    form.validateFields()
      .then(values => {
        // Generate slug if not provided
        const slug = values.slug || values.name.toLowerCase().replace(/\s+/g, '-');
        
        // Create new category object
        const newCategory = {
          id: Date.now(), // Use timestamp as a unique ID
          ...values,
          slug,
          postCount: 0,
        };
        
        onAddCategory(newCategory);
        message.success('Category added successfully');
        handleCancel();
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
      open={isOpen}  // Thay đổi từ visible sang isOpen
      onCancel={handleCancel}
      okText="Add"
      onOk={handleAdd}
      maskClosable={false}
      width={500}
    >
      {/* Form content không thay đổi */}
      <Form
        form={form}
        layout="vertical"
        initialValues={{ 
          active: true,
          order: categoriesLength + 1
        }}
      >
        {/* Form items không thay đổi */}
        <Form.Item
          name="name"
          label="Category Name"
          rules={[{ required: true, message: 'Please enter category name' }]}
        >
          <Input placeholder="Enter category name" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
        >
          <Input.TextArea rows={3} placeholder="Enter category description" />
        </Form.Item>

        <Form.Item
          name="slug"
          label="Slug"
          extra="Leave empty to generate automatically from name"
        >
          <Input placeholder="Enter slug" />
        </Form.Item>

        <Form.Item
          name="order"
          label="Display Order"
        >
          <InputNumber min={1} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="active"
          label="Status"
          valuePropName="checked"
        >
          <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default BlogCategoryAdd;