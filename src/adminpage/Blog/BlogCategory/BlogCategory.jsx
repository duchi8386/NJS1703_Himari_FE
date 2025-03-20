import { useState, useEffect } from 'react';
import { Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import BlogCategoryTable from './BlogCategoryComponent/BlogCategoryTable';
import BlogCategoryAdd from './BlogCategoryComponent/BlogCategoryAdd';
import BlogCategoryEdit from './BlogCategoryComponent/BlogCategoryEdit';
import BlogAPI from '../../../service/api/blogAPI';

const BlogCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // States for modal visibility
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrevious: false
  });

  // Fetch categories when pagination or search query changes
  useEffect(() => {
    fetchCategories();
  }, [pagination.current, pagination.pageSize, searchQuery]);

  // Function to fetch categories
  const fetchCategories = async () => {
    setLoading(true);
    try {
      let response;
      if (searchQuery) {
        response = await BlogAPI.searchBlogCategory(searchQuery, pagination.current, pagination.pageSize);
      } else {
        response = await BlogAPI.GetBlogCategories(pagination.current, pagination.pageSize);
      }

      if (response && response.data) {
        setCategories(response.data.data || []);

        // Update pagination based on metadata
        if (response.data.metaData) {
          setPagination(prev => ({
            ...prev,
            current: response.data.metaData.currentPage,
            pageSize: response.data.metaData.pageSize,
            total: response.data.metaData.totalCount,
            totalPages: response.data.metaData.totalPages,
            hasNext: response.data.metaData.hasNext,
            hasPrevious: response.data.metaData.hasPrevious
          }));
        }
      } else {
        setCategories([]);
        message.warning('No categories found');
      }
    } catch (error) {
      message.error('Failed to fetch blog categories');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Function to show edit modal
  const showEditModal = (category) => {
    setCurrentCategory(category);
    setIsEditModalVisible(true);
  };

  // Function to handle add category
  const handleAddCategory = async (newCategory) => {
    try {
      setLoading(true);
      const response = await BlogAPI.AddBlogCategory(newCategory);
      if (response) {
        message.success('Category added successfully');
        await fetchCategories(); // Refresh the list
        setIsAddModalVisible(false);
      }
    } catch (error) {
      message.error('Failed to add category');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle update category
  const handleUpdateCategory = async (updatedCategory) => {
    try {
      setLoading(true);
      const response = await BlogAPI.UpdateBlogCategory(updatedCategory);
      if (response) {
        message.success('Category updated successfully');
        await fetchCategories(); // Refresh the list
        setIsEditModalVisible(false);
      }
    } catch (error) {
      message.error('Failed to update category');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle delete category
  const handleDeleteCategory = async (categoryId) => {
    try {
      setLoading(true);
      const result = await BlogAPI.DeleteBlogCategory(categoryId);
      if (result) {
        message.success('Category deleted successfully');
        await fetchCategories(); // Refresh the list
      }
    } catch (error) {
      message.error('Failed to delete category');
    } finally {
      setLoading(false);
    }
  };

  // Function to handle search
  const handleSearch = (value) => {
    setSearchQuery(value);
    // Reset to first page when searching
    setPagination(prev => ({
      ...prev,
      current: 1
    }));
  };

  // Handle pagination change
  const handleTableChange = (paginationData) => {
    setPagination(prev => ({
      ...prev,
      current: paginationData.current,
      pageSize: paginationData.pageSize,
    }));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Quản lý danh mục Blog</h2>
        <div>
          <Button
            type="primary"
            onClick={() => setIsAddModalVisible(true)}
            className="h-9 rounded"
            icon={<PlusOutlined />}
            loading={loading}
          >
            Thêm danh mục mới
          </Button>
        </div>
      </div>

      <BlogCategoryTable
        categories={categories}
        onEdit={showEditModal}
        onDelete={handleDeleteCategory}
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
        onSearch={handleSearch}
        searchQuery={searchQuery}
      />

      <BlogCategoryAdd
        isOpen={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        onAddCategory={handleAddCategory}
        categoriesLength={categories.length}
        loading={loading}
      />

      <BlogCategoryEdit
        isOpen={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        onUpdateCategory={handleUpdateCategory}
        category={currentCategory}
        loading={loading}
      />
    </div>
  );
};

export default BlogCategory;