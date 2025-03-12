import React, { useEffect, useState, useMemo } from 'react';
import { Modal, Form, Input, Select, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';

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
  
  useEffect(() => {
    if (isOpen && blog) {
      form.setFieldsValue({
        title: blog.title,
        category: blog.category,
        status: blog.status || 'Draft',
      });
      
      // Set content in the quill editor
      if (quill && blog.content) {
        quill.clipboard.dangerouslyPasteHTML(blog.content);
        setBlogContent(blog.content);
      }
      
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
  }, [isOpen, blog, form, quill]);
  
  const handleUpdate = () => {
    form.validateFields()
      .then(values => {
        // Check if quill editor has content
        if (!blogContent || blogContent === '<p><br></p>') {
          message.error('Blog content is required');
          return;
        }
        
        // Handle image - in a real application, you would upload to a server first
        const imageUrl = fileList.length > 0 && fileList[0].originFileObj ? 
          URL.createObjectURL(fileList[0].originFileObj) : 
          (fileList.length > 0 ? fileList[0].url : blog.image);
        
        // Create updated blog object with the correct structure for API
        const updatedBlog = {
          id: blog.id,
          title: values.title,
          category: values.category, // For parent component to find category ID
          content: blogContent,
          image: imageUrl,
          // Remove status since it's not in the required request body
        };
        
        onUpdateBlog(updatedBlog);
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
      width={800}
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
            {Array.isArray(categories) ? categories.map(category => (
              <Option key={category.id || category._id} value={category.name}>{category.name}</Option>
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
            <Button icon={<UploadOutlined />}>Change Image</Button>
          </Upload>
        </Form.Item>
        
      </Form>
    </Modal>
  );
};

export default BlogEdit;