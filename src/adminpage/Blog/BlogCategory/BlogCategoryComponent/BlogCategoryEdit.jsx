import React, { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';

const BlogCategoryEdit = ({ isOpen, onClose, onUpdateCategory, category, loading }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (isOpen && category) {
      form.setFieldsValue({
        name: category.name
      });
    }
  }, [isOpen, category, form]);

  const handleUpdate = () => {
    form.validateFields()
      .then(values => {
        // Create updated category object with only the required fields
        const updatedCategory = {
          id: category.id,
          name: values.name
        };
        
        onUpdateCategory(updatedCategory);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title="Edit Category"
      open={isOpen}
      onCancel={onClose}
      okText="Update"
      onOk={handleUpdate}
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

export default BlogCategoryEdit;