import React, { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Switch, message } from 'antd';

const BlogCategoryEdit = ({ isOpen, onClose, onUpdateCategory, category }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (isOpen && category) {  // Thay đổi từ visible sang isOpen
      form.setFieldsValue({
        name: category.name,
        description: category.description,
        slug: category.slug,
        order: category.order,
        active: category.active,
      });
    }
  }, [isOpen, category, form]);  // Thay đổi từ visible sang isOpen

  const handleUpdate = () => {
    form.validateFields()
      .then(values => {
        // Generate slug if not provided
        const slug = values.slug || values.name.toLowerCase().replace(/\s+/g, '-');
        
        // Create updated category object
        const updatedCategory = {
          ...category,
          ...values,
          slug,
        };
        
        onUpdateCategory(updatedCategory);
        message.success('Category updated successfully');
        onClose();  // Thay đổi từ onCancel sang onClose
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title="Edit Category"
      open={isOpen}  // Thay đổi từ visible sang isOpen
      onCancel={onClose}  // Thay đổi từ onCancel sang onClose
      okText="Update"
      onOk={handleUpdate}
      maskClosable={false}
      width={500}
    >
      {/* Form content không thay đổi */}
      <Form
        form={form}
        layout="vertical"
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

export default BlogCategoryEdit;