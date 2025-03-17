import React, { useState, useMemo } from 'react';
import { Modal, Form, Input, Select, Button, message } from 'antd';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import BlogAPI from '../../../../service/api/blogAPI';
import ImageUploadBlog from '../../../../components/ImageUploadBlog/ImageUploadBlog';

const { Option } = Select;

const BlogAdd = ({
  isOpen,
  onClose,
  onSuccess, // Changed from onAddBlog to onSuccess callback
  categories = []
}) => {
  const [form] = Form.useForm();
  const [blogContent, setBlogContent] = useState('');
  const [uploading, setUploading] = useState(false);
  const [blogImage, setBlogImage] = useState(null);

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
      setBlogContent('');
      setBlogImage(null);
      if (quill) {
        quill.setText('');
      }
    }
  }, [isOpen, form, quill]);

  const handleImageChange = (file) => {
    setBlogImage(file);
  };

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
      if (blogImage) {
        try {
          const response = await BlogAPI.uploadToFirebase(blogImage);
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
        setUploading(false); // Reset loading state before closing the modal
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
    if (quill) {
      quill.setText('');
    }
    setBlogContent('');
    setBlogImage(null);
    setUploading(false); // Also ensure uploading is reset when canceling
    onClose();
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
          <ImageUploadBlog
            onChange={handleImageChange}
            maxFileSize={2}
            value=""
            acceptedFileTypes={['image/jpeg', 'image/png']}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default BlogAdd;