import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Select, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;

const BlogEdit = ({ 
  isOpen, 
  onClose, 
  onUpdateBlog, 
  blog, 
  categories = [] 
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  
  useEffect(() => {
    if (isOpen && blog) {
      form.setFieldsValue({
        title: blog.title,
        category: blog.category,
        content: blog.content || '',
        status: blog.status || 'Draft',
      });
      
      // Set image preview if available
      if (blog.image) {
        setFileList([
          {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: blog.image,
          }
        ]);
      } else {
        setFileList([]);
      }
    }
  }, [isOpen, blog, form]);
  
  const handleUpdate = () => {
    form.validateFields()
      .then(values => {
        // Create updated blog object
        const updatedBlog = {
          ...blog,
          ...values,
          image: fileList.length > 0 && fileList[0].originFileObj ? 
            URL.createObjectURL(fileList[0].originFileObj) : 
            (fileList.length > 0 ? fileList[0].url : blog.image),
        };
        
        onUpdateBlog(updatedBlog);
        message.success('Blog updated successfully');
        onClose();
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };
  
  const uploadProps = {
    onRemove: () => {
      setFileList([]);
    },
    beforeUpload: (file) => {
      setFileList([{
        uid: '-1',
        name: file.name,
        status: 'done',
        originFileObj: file,
      }]);
      return false;
    },
    fileList,
    listType: "picture",
    maxCount: 1
  };

  return (
    <Modal
      title="Edit Blog"
      open={isOpen}
      onCancel={onClose}
      okText="Update"
      onOk={handleUpdate}
      maskClosable={false}
      width={700}
    >
      <Form
        form={form}
        layout="vertical"
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
            <Button icon={<UploadOutlined />}>Change Image</Button>
          </Upload>
        </Form.Item>
        
        <Form.Item
          name="status"
          label="Status"
        >
          <Select>
            <Option value="Draft">Draft</Option>
            <Option value="Published">Published</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default BlogEdit;