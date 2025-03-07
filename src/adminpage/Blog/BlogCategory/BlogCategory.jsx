import { useState } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import BlogCategoryTable from './BlogCategoryComponent/BlogCategoryTable';
import BlogCategoryAdd from './BlogCategoryComponent/BlogCategoryAdd';
import BlogCategoryEdit from './BlogCategoryComponent/BlogCategoryEdit';

const BlogCategory = () => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'Fashion',
      description: 'Latest fashion trends and styles',
      slug: 'fashion',
      postCount: 12,
      active: true,
      order: 1
    },
    {
      id: 2,
      name: 'Lifestyle',
      description: 'Tips for better living and wellness',
      slug: 'lifestyle',
      postCount: 8,
      active: true,
      order: 2
    },
    {
      id: 3,
      name: 'Travel',
      description: 'Destinations and travel guides',
      slug: 'travel',
      postCount: 5,
      active: true,
      order: 3
    },
    {
      id: 4,
      name: 'Technology',
      description: 'Latest tech news and reviews',
      slug: 'technology',
      postCount: 7,
      active: false,
      order: 4
    },
    {
      id: 5,
      name: 'Food',
      description: 'Recipes and culinary experiences',
      slug: 'food',
      postCount: 9,
      active: true,
      order: 5
    }
  ]);

  // States for modal visibility
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);

  // Function to show edit modal
  const showEditModal = (category) => {
    setCurrentCategory(category);
    setIsEditModalVisible(true);
  };

  // Function to handle add category
  const handleAddCategory = (newCategory) => {
    setCategories([...categories, newCategory]);
  };

  // Function to handle update category
  const handleUpdateCategory = (updatedCategory) => {
    const updatedCategories = categories.map(category => 
      category.id === updatedCategory.id ? updatedCategory : category
    );
    setCategories(updatedCategories);
  };

  // Function to handle delete category
  const handleDeleteCategory = (categoryId) => {
    setCategories(categories.filter(category => category.id !== categoryId));
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
          >
            Thêm danh mục mới
          </Button>
        </div>
      </div>

      <BlogCategoryTable 
        categories={categories} 
        onEdit={showEditModal}
        onDelete={handleDeleteCategory}
      />
      
      <BlogCategoryAdd 
        isOpen={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        onAddCategory={handleAddCategory}
        categoriesLength={categories.length}
      />

      <BlogCategoryEdit 
        isOpen={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        onUpdateCategory={handleUpdateCategory}
        category={currentCategory}
      />
    </div>
  );
};

export default BlogCategory;