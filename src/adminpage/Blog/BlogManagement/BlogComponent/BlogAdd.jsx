import React, { useState } from 'react';
import { Modal, Form, Input, Select, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;

const BlogAdd = ({ 
  isOpen, 
  onClose, 
  onAddBlog, 
  categories = [] 
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  
  const handleAdd = () => {
    form.validateFields()
      .then(values => {
        // Create new blog object
        const newBlog = {
          id: Date.now(),
          ...values,
          image: fileList.length > 0 ? 
            URL.createObjectURL(fileList[0]) : 
            'https://source.unsplash.com/random/800x400/?blog',
          createdAt: new Date().toISOString().split('T')[0],
          author: 'Admin User'
        };
        
        onAddBlog(newBlog);
        message.success('Blog added successfully');
        handleCancel();
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };
  
  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    onClose();
  };
  
  const uploadProps = {
    onRemove: () => {
      setFileList([]);
    },
    beforeUpload: (file) => {
      setFileList([file]);
      return false;
    },
    fileList,
    listType: "picture",
    maxCount: 1
  };

  return (
    <Modal
      title="Add New Blog"
      open={isOpen}
      onCancel={handleCancel}
      okText="Add"
      onOk={handleAdd}
      maskClosable={false}
      width={700}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ status: 'Draft' }}
      >
        <Form.Item
          name="title"
          label="Blog Title"
          rules={[{ required: true, message: 'Please enter blog title' }]}
        >
          <Input placeholder="Enter blog title" />
        </Form.Item>
        
        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: 'Please select a category' }]}
        >
          <Select placeholder="Select category">
            {categories.map(category => (
              <Option key={category.id} value={category.name}>{category.name}</Option>
            ))}
          </Select>
        </Form.Item>
        
        <Form.Item
          name="content"
          label="Content"
          rules={[{ required: true, message: 'Please enter blog content' }]}
        >
          <TextArea rows={6} placeholder="Enter blog content" />
        </Form.Item>
        
        <Form.Item
          name="featured_image"
          label="Featured Image"
        >
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Select Image</Button>
          </Upload>
        </Form.Item>
        
        <Form.Item
          name="status"
          label="Status"
        >
          <Select defaultValue="Draft">
            <Option value="Draft">Draft</Option>
            <Option value="Published">Published</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default BlogAdd;