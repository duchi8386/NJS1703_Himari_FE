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

  // States for modal visibility
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);

  // Fetch blogs on component mount
  useEffect(() => {
    fetchBlogs();
  }, []);

  // Function to fetch blogs
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await BlogAPI.GetBlogs();
      console.log("blogs data:", response);
      const blogsData = response.data.data || [];
      setBlogs(blogsData);
      
      // After fetching blogs, get categories for each blog
      if (blogsData.length > 0) {
        fetchCategories(blogsData);
      }
    } catch (error) {
      message.error('Failed to fetch blogs');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch categories for each blog
  const fetchCategories = async (blogsData) => {
    try {
      // First get all categories
      const allCategoriesResponse = await BlogAPI.GetBlogCategories();
      console.log("allCategoriesResponse:", allCategoriesResponse);
      const allCategories = allCategoriesResponse.data || [];
      setCategories(allCategories);
      
      // Create a map for quick category lookup
      const categoryMap = new Map();
      
      // For each blog, fetch its specific category if needed
      const updatedBlogs = await Promise.all(blogsData.map(async (blog) => {
        if (!blog.blogCategoryId) return blog;
        
        // Check if we already fetched this category
        if (!categoryMap.has(blog.blogCategoryId)) {
          try {
            const categoryResponse = await BlogAPI.GetBlogCategoriesById(blog.blogCategoryId);
            console.log("categoryResponse:", categoryResponse);
            
            // Handle the specific response structure
            if (categoryResponse && categoryResponse.data) {
              // The data field directly contains the category object
              const categoryData = categoryResponse.data;
              categoryMap.set(blog.blogCategoryId, categoryData);
            }
          } catch (err) {
            console.error(`Error fetching category for blog ${blog.id}:`, err);
          }
        }
        
        // Assign category name to blog
        const categoryData = categoryMap.get(blog.blogCategoryId);
        return {
          ...blog,
          category: categoryData ? categoryData.name : 'Unknown Category'
        };
      }));
      
      // Update blogs with category information
      setBlogs(updatedBlogs);
      
    } catch (error) {
      message.error('Failed to fetch blog categories');
      console.error(error);
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

  // Function to handle add blog
  const handleAddBlog = async (newBlog) => {
    try {
      await BlogAPI.AddBlog(newBlog);
      message.success('Blog added successfully');
      fetchBlogs(); // Refresh blogs after adding
      setIsAddModalVisible(false);
    } catch (error) {
      message.error('Failed to add blog');
      console.error(error);
    }
  };

  // Function to handle update blog
  const handleUpdateBlog = async (updatedBlog) => {
    try {
      await BlogAPI.UpdateBlog(updatedBlog);
      message.success('Blog updated successfully');
      fetchBlogs(); // Refresh blogs after updating
      setIsEditModalVisible(false);
    } catch (error) {
      message.error('Failed to update blog');
      console.error(error);
    }
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
        onAddBlog={handleAddBlog}
        // categories={categories}
      />

      <BlogEdit 
        isOpen={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        onUpdateBlog={handleUpdateBlog}
        blog={currentBlog}
        // categories={categories}
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
              <Tag color="blue">{currentBlog.category}</Tag>
              <Tag color={currentBlog.status === 'Published' ? 'green' : 'orange'}>
                {currentBlog.status}
              </Tag>
              <span style={{ marginLeft: 8, color: '#666' }}>
                By {currentBlog.fullName} 
              </span>
            </div>
            <p>{currentBlog.content}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default BlogPage;