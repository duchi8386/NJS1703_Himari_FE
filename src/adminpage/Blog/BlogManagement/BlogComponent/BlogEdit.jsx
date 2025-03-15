import React, { useEffect, useState, useMemo } from 'react';
import { Modal, Form, Input, Select, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import BlogAPI from '../../../../service/api/blogAPI';
import ImageUploadBlog from '../../../../components/ImageUploadBlog/ImageUploadBlog';

const { Option } = Select;

const BlogEdit = ({
  isOpen,
  onClose,
  onSuccess,
  blog,
  categories = [],
  loadingCategories = false
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [blogContent, setBlogContent] = useState('');
  const [uploading, setUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [existingImage, setExistingImage] = useState('');
  const [imageFile, setImageFile] = useState(null); // Add missing state variable for imageFile

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

  // Update form when blog data changes or modal opens
  useEffect(() => {
    if (isOpen && blog) {
      // Set form values based on the blog data from API
      form.setFieldsValue({
        title: blog.title,
        category: blog.blogCategoryId, // Using the field from the response
      });

      // Set content in the quill editor
      if (quill && blog.content) {
        quill.clipboard.dangerouslyPasteHTML(blog.content);
        setBlogContent(blog.content);
      }

      // Set image preview if available
      if (blog.image) {
        setExistingImage(blog.image);
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
        setExistingImage('');
      }

      // Reset preview image and image file when modal opens
      setPreviewImage('');
      setImageFile(null);
    }
  }, [isOpen, blog, form, quill]);

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
      let finalImageUrl = existingImage;
      if (imageFile) { // Use imageFile state instead of fileList
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
        blogCategoryId: values.category, // Using categoryBlogId for the API request
        content: blogContent,
        image: finalImageUrl,
      };

      try {
        await BlogAPI.UpdateBlog(blogData);
        message.success('Blog updated successfully');

        // Reset preview image and image file after successful update
        setPreviewImage('');
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

  const handleImageChange = (file) => {
    setImageFile(file);
    if (file) {
      // Create a preview URL for the selected file
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      // Don't clear existing image, just keep it for reference
      // setExistingImage(''); - Remove this line
    } else {
      setPreviewImage('');
    }
  };

  return (
    <Modal
      title="Edit Blog"
      open={isOpen}
      onCancel={() => {
        // Also reset preview image when canceling
        setPreviewImage('');
        setImageFile(null);
        onClose();
      }}
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
          // disabled={loadingCategories}
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
            value={existingImage}  // Use value instead of defaultImage to match component props
          />

          {/* Simplified image preview logic */}
          {previewImage && (
            <div style={{ marginTop: 8 }}>
              <img src={previewImage} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
              <p>New image selected (not yet uploaded)</p>
            </div>
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default BlogEdit;