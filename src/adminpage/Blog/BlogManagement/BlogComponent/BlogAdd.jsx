import React, { useState, useMemo } from 'react';
import { Modal, Form, Input, Select, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import BlogAPI from '../../../../service/api/blogAPI';

const { Option } = Select;

const BlogAdd = ({ 
  isOpen, 
  onClose, 
  onSuccess, // Changed from onAddBlog to onSuccess callback
  categories = [] 
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [blogContent, setBlogContent] = useState('');
  const [uploading, setUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

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

  // Reset form when modal closes
  React.useEffect(() => {
    if (!isOpen) {
      form.resetFields();
      setFileList([]);
      setBlogContent('');
      setPreviewImage('');
      if (quill) {
        quill.setText('');
      }
    }
  }, [isOpen, form, quill]);

  const handleAdd = async () => {
    try {
      const values = await form.validateFields();
      
      // Check if quill editor has content
      if (!blogContent || blogContent === '<p><br></p>') {
        message.error('Blog content is required');
        return;
      }
      
      setUploading(true);
      
      // Handle image upload if there's a file
      let finalImageUrl = '';
      if (fileList.length > 0 && fileList[0].originFileObj) {
        try {
          const response = await BlogAPI.uploadToFirebase(fileList[0].originFileObj);
          if (response && response.data) {
            finalImageUrl = response.data.data;
            message.success('Image uploaded successfully');
          } else {
            message.error('Failed to upload image');
            setUploading(false);
            return;
          }
        } catch (error) {
          console.error("Error uploading image:", error);
          message.error('Failed to upload image');
          setUploading(false);
          return;
        }
      }
      
      // Get the current user ID from localStorage
      const userId = localStorage.getItem('userId') || 1; // Default to 1 if not available
      
      // Create new blog object with the correct structure for API
      const blogData = {
        title: values.title,
        blogCategoryId: values.category,
        content: blogContent,
        image: finalImageUrl,
        userId: parseInt(userId),
      };
      
      try {
        // Directly call the API here
        await BlogAPI.AddBlog(blogData);
        message.success('Blog added successfully');
        handleCancel(); // Reset and close the form
        onSuccess(); // Notify parent to refresh the list
      } catch (apiError) {
        console.error("API error:", apiError);
        message.error('Failed to add blog');
        setUploading(false);
      }
    } catch (info) {
      console.log('Validate Failed:', info);
      setUploading(false);
    }
  };
  
  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    if (quill) {
      quill.setText('');
    }
    setBlogContent('');
    setPreviewImage('');
    onClose();
  };
  
  const uploadProps = {
    onRemove: () => {
      setFileList([]);
      setPreviewImage('');
    },
    beforeUpload: (file) => {
      // Validate file type and size
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('You can only upload image files!');
        return Upload.LIST_IGNORE;
      }
      
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Image must be smaller than 2MB!');
        return Upload.LIST_IGNORE;
      }
      
      // Create preview for the selected image
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      
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
      title="Add New Blog"
      open={isOpen}
      onCancel={handleCancel}
      okText="Add"
      onOk={handleAdd}
      maskClosable={false}
      width={800}
      confirmLoading={uploading}
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
              <Option key={category.id || category._id} value={category.id || category._id}>
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
          {previewImage && (
            <div style={{ marginTop: 8 }}>
              <img src={previewImage} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
            </div>
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default BlogAdd;