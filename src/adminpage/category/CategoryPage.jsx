import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CategoryTable from "./CategoryComponent/CategoryTable";
import CategoryAdd from "./CategoryComponent/CategoryAdd";
import CategoryEdit from "./CategoryComponent/CategoryEdit";

const CategoryPage = () => {
  const [categories, setCategories] = useState([
    {
      id: 18,
      categoryName: "Da",
      description: "Các sản phẩm chăm sóc da",
      parentCategoryId: null,
      parentCategoryName: null
    },
    {
      id: 19,
      categoryName: "Tóc",
      description: "Các sản phẩm chăm sóc tóc",
      parentCategoryId: null,
      parentCategoryName: null
    },
    {
      id: 20,
      categoryName: "Mặt",
      description: "Các sản phẩm làm đẹp cho khuôn mặt",
      parentCategoryId: null,
      parentCategoryName: null
    },
    {
      id: 21,
      categoryName: "Cơ thể",
      description: "Các sản phẩm chăm sóc cơ thể",
      parentCategoryId: null,
      parentCategoryName: null
    },
    {
      id: 22,
      categoryName: "Trang điểm",
      description: "Các sản phẩm trang điểm",
      parentCategoryId: null,
      parentCategoryName: null
    },
    {
      id: 23,
      categoryName: "Da mặt",
      description: "Các sản phẩm dưỡng da mặt",
      parentCategoryId: 18,
      parentCategoryName: "Da"
    },
    {
      id: 24,
      categoryName: "Da tay",
      description: "Các sản phẩm chăm sóc da tay",
      parentCategoryId: 18,
      parentCategoryName: "Da"
    },
    {
      id: 25,
      categoryName: "Da chân",
      description: "Các sản phẩm chăm sóc da chân",
      parentCategoryId: 18,
      parentCategoryName: "Da"
    },
    {
      id: 26,
      categoryName: "Dưỡng ẩm",
      description: "Sản phẩm giúp dưỡng ẩm cho da",
      parentCategoryId: 18,
      parentCategoryName: "Da"
    },
    {
      id: 27,
      categoryName: "Chống nắng",
      description: "Sản phẩm bảo vệ da khỏi tia UV",
      parentCategoryId: 18,
      parentCategoryName: "Da"
    }
  ]);

  // Lấy danh sách các danh mục gốc (parent categories)
  const parentCategories = categories.filter(cat => cat.parentCategoryId === null);

  // States for modal visibility
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 28,
  });

  // Function to show edit modal
  const showEditModal = (category) => {
    setCurrentCategory(category);
    setIsEditModalVisible(true);
  };

  // Function to handle add category
  const handleAddCategory = (newCategory) => {
    // Thêm parentCategoryName nếu có parentCategoryId
    if (newCategory.parentCategoryId) {
      const parentCategory = categories.find(cat => cat.id === newCategory.parentCategoryId);
      newCategory.parentCategoryName = parentCategory ? parentCategory.categoryName : null;
    }
    
    setCategories([...categories, newCategory]);
  };

  // Function to handle update category
  const handleUpdateCategory = (updatedCategory) => {
    // Cập nhật parentCategoryName nếu có parentCategoryId
    if (updatedCategory.parentCategoryId) {
      const parentCategory = categories.find(cat => cat.id === updatedCategory.parentCategoryId);
      updatedCategory.parentCategoryName = parentCategory ? parentCategory.categoryName : null;
    } else {
      updatedCategory.parentCategoryName = null;
    }
    
    const updatedCategories = categories.map(category => 
      category.id === updatedCategory.id ? updatedCategory : category
    );
    setCategories(updatedCategories);
  };

  // Function to handle delete category
  const handleDeleteCategory = (categoryId) => {
    // Kiểm tra xem danh mục có phải là parent của danh mục khác không
    const hasChildren = categories.some(cat => cat.parentCategoryId === categoryId);
    if (hasChildren) {
      message.error("Không thể xóa danh mục này vì có danh mục con!");
      return;
    }
    
    setCategories(categories.filter(category => category.id !== categoryId));
    message.success("Xóa danh mục thành công");
  };

  // Xử lý thay đổi phân trang
  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Quản lý danh mục sản phẩm</h2>
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

      <CategoryTable 
        categories={categories} 
        onEdit={showEditModal}
        onDelete={handleDeleteCategory}
        pagination={pagination}
        onChange={handleTableChange}
      />
      
      <CategoryAdd 
        isOpen={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        onAddCategory={handleAddCategory}
        parentCategories={parentCategories}
      />

      <CategoryEdit 
        isOpen={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        onUpdateCategory={handleUpdateCategory}
        category={currentCategory}
        parentCategories={parentCategories}
      />
    </div>
  );
};

export default CategoryPage;