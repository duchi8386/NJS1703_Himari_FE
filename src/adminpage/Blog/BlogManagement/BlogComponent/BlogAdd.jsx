import React, { useState, useMemo } from 'react';
import { Modal, Form, Input, Select, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';

const { Option } = Select;

const BlogAdd = ({ 
  isOpen, 
  onClose, 
  onAddBlog, 
  categories = [] 
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [blogContent, setBlogContent] = useState('');
  
  // React Quill setup
  const { quill, quillRef } = useQuill({
    theme: 'snow',
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ color: [] }, { background: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ align: [] }],
        ['link', 'image'],
        ['clean']
      ],
    },
  });

  // Track content changes when quill is ready
  useMemo(() => {
    if (quill) {
      quill.on('text-change', () => {
        setBlogContent(quill.root.innerHTML);
      });
    }
  }, [quill]);
  
  const handleAdd = () => {
    form.validateFields()
      .then(values => {
        // Check if quill editor has content
        if (!blogContent || blogContent === '<p><br></p>') {
          message.error('Blog content is required');
          return;
        }

        // Handle image - in a real application, you would upload to a server first
        const imageUrl = fileList.length > 0 ? 
          URL.createObjectURL(fileList[0]) : 
          'https://source.unsplash.com/random/800x400/?blog';

        // Create new blog object with the structure needed for the API
        const newBlog = {
          title: values.title,
          category: values.category, // This will be used to find the categoryId in the parent component
          content: blogContent,
          image: imageUrl,
          status: values.status || 'Draft'
        };
        
        onAddBlog(newBlog);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };
  
  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    if (quill) {
      quill.setText('');
    }
    setBlogContent('');
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
      width={800}
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
            {Array.isArray(categories) ? categories.map(category => (
              <Option key={category.id || category._id} value={category.name}>
                {category.name}
              </Option>
            )) : <Option value="default">No categories available</Option>}
          </Select>
        </Form.Item>
        
        <Form.Item
          label="Content"
          rules={[{ required: true, message: 'Please enter blog content' }]}
        >
          <div style={{ height: 300 }}>
            <div ref={quillRef} style={{ height: 250 }} />
          </div>
        </Form.Item>
        
        <Form.Item
          name="featured_image"
          label="Featured Image"
        >
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Select Image</Button>
          </Upload>
        </Form.Item>
        

      </Form>
    </Modal>
  );
};

export default BlogAdd;