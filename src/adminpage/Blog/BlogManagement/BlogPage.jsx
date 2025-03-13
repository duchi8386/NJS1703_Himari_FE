import { useState, useEffect } from 'react';
import { Button, Modal, Image, Tag, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import BlogTable from './BlogComponent/BlogTable';
import BlogAdd from './BlogComponent/BlogAdd';
import BlogEdit from './BlogComponent/BlogEdit';
import BlogAPI from '../../../service/api/blogAPI';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);

  // States for modal visibility
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);

  // Fetch blogs and categories on component mount
  useEffect(() => {
    fetchBlogs();
    fetchAllCategories();
  }, []);

  // Function to fetch blogs
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await BlogAPI.GetBlogs(1, 20);
      console.log("blogs data:", response);
      
      if (response && response.data && response.data.data) {
        setBlogs(response.data.data);
      } else {
        setBlogs([]);
        console.error("Unexpected API response structure:", response);
      }
    } catch (error) {
      message.error('Failed to fetch blogs');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch all blog categories
  const fetchAllCategories = async () => {
    setLoadingCategories(true);
    try {
      // Get all categories - using a large pageSize to ensure we get all
      const response = await BlogAPI.GetBlogCategories(1, 20);
      // console.log("categories data:", response);
      if (response && response.data && response.data.data) {
        setCategories(response.data.data);
      } else {
        setCategories([]);
        console.error("Unexpected API response structure for categories:", response);
      }
    } catch (error) {
      message.error('Failed to fetch blog categories');
      console.error(error);
    } finally {
      setLoadingCategories(false);
    }
  };

  // Function to show edit modal
  const showEditModal = (blog) => {
    setCurrentBlog(blog);
    setIsEditModalVisible(true);
  };

  // Function to show view modal
  const showViewModal = (blog) => {
    setCurrentBlog(blog);
    setIsViewModalVisible(true);
  };

  // Function to handle delete blog
  const handleDeleteBlog = async (blogId) => {
    try {
      await BlogAPI.DeleteBlog(blogId);
      message.success('Blog deleted successfully');
      fetchBlogs(); // Refresh blogs after deletion
    } catch (error) {
      message.error('Failed to delete blog');
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Quản lý Blog</h2>
        <div>
          <Button
            type="primary"
            onClick={() => setIsAddModalVisible(true)}
            className="h-9 rounded"
            icon={<PlusOutlined />}
            loading={loadingCategories}
            disabled={loadingCategories}
          >
            Thêm bài viết mới
          </Button>
        </div>
      </div>

      <BlogTable 
        blogs={blogs} 
        loading={loading}
        onEdit={showEditModal}
        onDelete={handleDeleteBlog}
        onView={showViewModal}
      />
      
      <BlogAdd 
        isOpen={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        onSuccess={fetchBlogs}
        categories={categories}
        loadingCategories={loadingCategories}
      />

      <BlogEdit 
        isOpen={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        onSuccess={fetchBlogs}
        blog={currentBlog}
        categories={categories}
        loadingCategories={loadingCategories}
      />

      {/* View Blog Modal */}
      <Modal
        title="Blog Details"
        open={isViewModalVisible}
        onCancel={() => setIsViewModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsViewModalVisible(false)}>
            Close
          </Button>
        ]}
        width={800}
      >
        {currentBlog && (
          <div>
            <Image 
              src={currentBlog.image} 
              alt={currentBlog.title}
              style={{ width: '100%', height: 300, objectFit: 'cover', marginBottom: 16 }}
            />
            <h2 style={{ fontSize: 24, fontWeight: 'bold' }}>{currentBlog.title}</h2>
            <div style={{ marginBottom: 16 }}>
              <Tag color="blue">{currentBlog.categoryName}</Tag>
              <span style={{ marginLeft: 8, color: '#666' }}>
                By {currentBlog.fullName} 
              </span>
            </div>
            <div dangerouslySetInnerHTML={{ __html: currentBlog.content }}></div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default BlogPage;