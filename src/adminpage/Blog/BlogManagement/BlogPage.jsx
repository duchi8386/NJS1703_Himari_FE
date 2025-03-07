import { useState } from 'react';
import { Button, Modal, Image, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import BlogTable from './BlogComponent/BlogTable';
import BlogAdd from './BlogComponent/BlogAdd';
import BlogEdit from './BlogComponent/BlogEdit';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: 'Spring Fashion Trends 2025',
      category: 'Fashion',
      author: 'John Smith',
      image: 'https://source.unsplash.com/random/800x400/?fashion',
      status: 'Published',
      createdAt: '2025-02-20',
      content: 'This is a sample content for Spring Fashion Trends 2025.',
    },
    {
      id: 2,
      title: 'Eco-friendly Home Décor Ideas',
      category: 'Lifestyle',
      author: 'Sarah Johnson',
      image: 'https://source.unsplash.com/random/800x400/?home',
      status: 'Draft',
      createdAt: '2025-02-18',
      content: 'This is a sample content for Eco-friendly Home Décor Ideas.',
    },
    {
      id: 3,
      title: 'Summer Travel Destinations 2025',
      category: 'Travel',
      author: 'Michael Wong',
      image: 'https://source.unsplash.com/random/800x400/?travel',
      status: 'Published',
      createdAt: '2025-02-15',
      content: 'This is a sample content for Summer Travel Destinations 2025.',
    },
  ]);

  // Sample categories for form selection
  const categories = [
    { id: 1, name: 'Fashion' },
    { id: 2, name: 'Lifestyle' },
    { id: 3, name: 'Travel' },
    { id: 4, name: 'Technology' },
    { id: 5, name: 'Food' },
  ];

  // States for modal visibility
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);

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
  const handleAddBlog = (newBlog) => {
    setBlogs([...blogs, newBlog]);
  };

  // Function to handle update blog
  const handleUpdateBlog = (updatedBlog) => {
    const updatedBlogs = blogs.map(blog => 
      blog.id === updatedBlog.id ? updatedBlog : blog
    );
    setBlogs(updatedBlogs);
  };

  // Function to handle delete blog
  const handleDeleteBlog = (blogId) => {
    setBlogs(blogs.filter(blog => blog.id !== blogId));
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
        onEdit={showEditModal}
        onDelete={handleDeleteBlog}
        onView={showViewModal}
      />
      
      <BlogAdd 
        isOpen={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        onAddBlog={handleAddBlog}
        categories={categories}
      />

      <BlogEdit 
        isOpen={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        onUpdateBlog={handleUpdateBlog}
        blog={currentBlog}
        categories={categories}
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
                By {currentBlog.author} on {currentBlog.createdAt}
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