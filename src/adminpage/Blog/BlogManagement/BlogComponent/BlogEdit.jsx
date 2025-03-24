import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Select, message, Card, Image, Typography } from 'antd';
import 'quill/dist/quill.snow.css';
import BlogAPI from '../../../../service/api/blogAPI';
import ImageUploadBlog from '../../../../components/ImageUploadBlog/ImageUploadBlog';

const { Option } = Select;
const { Text } = Typography;

// Create a QuillEditor component similar to the one used in BlogAdd
const QuillEditor = ({ onChange, initialContent }) => {
  const [quillLoaded, setQuillLoaded] = useState(false);
  const [quill, setQuill] = useState(null);

  // Create a ref to hold the div element
  const containerRef = React.useRef(null);

  useEffect(() => {
    let mounted = true;

    const loadQuill = async () => {
      try {
        // Dynamically import Quill
        const ReactQuill = await import('quill');

        if (!mounted) return;

        // Initialize Quill directly
        const quillInstance = new ReactQuill.default(containerRef.current, {
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

        setQuill(quillInstance);
        setQuillLoaded(true);

        // Set up the text-change handler
        quillInstance.on('text-change', () => {
          if (onChange) {
            onChange(quillInstance.root.innerHTML);
          }
        });
      } catch (error) {
        console.error("Failed to load Quill editor:", error);
      }
    };

    if (typeof window !== 'undefined' && !quillLoaded && containerRef.current) {
      loadQuill();
    }

    return () => {
      mounted = false;
    };
  }, [quillLoaded, onChange]);

  // Set initial content when quill is ready and content is provided
  useEffect(() => {
    if (quill && initialContent) {
      quill.clipboard.dangerouslyPasteHTML(initialContent);
    }
  }, [quill, initialContent]);

  return (
    <div style={{ height: 300 }}>
      <div ref={containerRef} style={{ height: 250 }} />
    </div>
  );
};

const BlogEdit = ({
  isOpen,
  onClose,
  onSuccess,
  blog,
  categories = [],
  loadingCategories = false
}) => {
  const [form] = Form.useForm();
  const [blogContent, setBlogContent] = useState('');
  const [uploading, setUploading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState('');

  // Update form when blog data changes or modal opens
  useEffect(() => {
    if (isOpen && blog) {
      // Set form values based on the blog data from API
      form.setFieldsValue({
        title: blog.title,
        category: blog.blogCategoryId,
      });

      // Set content for the editor
      setBlogContent(blog.content || '');
      setCurrentImageUrl(blog.image || '');
      setImageFile(null);
    }
  }, [isOpen, blog, form]);

  const handleContentChange = (content) => {
    setBlogContent(content);
  };

  const handleImageChange = (file) => {
    setImageFile(file);
  };

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();

      // Check if quill editor has content
      if (!blogContent || blogContent === '<p><br></p>') {
        message.error('Blog content is required');
        return;
      }

      setUploading(true);

      // Handle image upload if there's a new file
      let finalImageUrl = currentImageUrl;
      if (imageFile) {
        try {
          const response = await BlogAPI.uploadToFirebase(imageFile);
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

      // Create updated blog object with the correct structure for API
      const blogData = {
        id: blog.id,
        title: values.title,
        blogCategoryId: values.category,
        content: blogContent,
        image: finalImageUrl,
      };

      try {
        await BlogAPI.UpdateBlog(blogData);
        message.success('Blog updated successfully');
        setImageFile(null);
        onClose(); // Close the modal
        onSuccess(); // Notify parent to refresh the list
      } catch (apiError) {
        console.error("API error:", apiError);
        message.error('Failed to update blog');
      } finally {
        setUploading(false);
      }
    } catch (info) {
      console.log('Validate Failed:', info);
      setUploading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setImageFile(null);
    onClose();
  };

  return (
    <Modal
      title="Edit Blog"
      open={isOpen}
      onCancel={handleCancel}
      okText="Update"
      onOk={handleUpdate}
      maskClosable={false}
      width={800}
      confirmLoading={uploading}
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
          <Select
            placeholder="Select category"
            loading={loadingCategories}
          >
            {Array.isArray(categories) && categories.length > 0 ?
              categories.map(category => (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              )) :
              <Option value="default" disabled>No categories available</Option>
            }
          </Select>
        </Form.Item>

        <Form.Item
          label="Content"
          rules={[{ required: true, message: 'Please enter blog content' }]}
        >
          {typeof window !== 'undefined' && (
            <QuillEditor
              onChange={handleContentChange}
              initialContent={blog?.content || ''}
            />
          )}
          {typeof window === 'undefined' && (
            <div>Editor loading...</div>
          )}
        </Form.Item>

        {/* Display current image first for better visibility */}
        {currentImageUrl && (
          <Form.Item label="Current Image">
            <Card size="small" style={{ marginBottom: '20px' }}>
              <div style={{ textAlign: 'center' }}>
                <Image
                  src={currentImageUrl}
                  alt="Current blog image"
                  style={{ maxHeight: '200px', objectFit: 'contain' }}
                />
                <Text type="secondary" style={{ display: 'block', marginTop: '8px' }}>
                  Current blog image
                </Text>
              </div>
            </Card>
          </Form.Item>
        )}

        <Form.Item
          name="featured_image"
          label="Update Image"
        >
          <ImageUploadBlog
            onChange={handleImageChange}
            value={currentImageUrl}
            maxFileSize={2}
            acceptedFileTypes={['image/jpeg', 'image/png']}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default BlogEdit;