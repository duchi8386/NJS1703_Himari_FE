import React, { useState, useEffect } from "react";
import { Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CategoryTable from "./CategoryComponent/CategoryTable";
import CategoryAdd from "./CategoryComponent/CategoryAdd";
import CategoryEdit from "./CategoryComponent/CategoryEdit";
import CategoryAPI from "../../service/api/CategoryAPI";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Lấy danh sách các danh mục gốc (parent categories)
  const parentCategories = categories.filter(cat => cat.parentCategoryId === null);

  // States for modal visibility
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  // Fetch all categories when component mounts or pagination changes
  useEffect(() => {
    fetchCategories(pagination.current, pagination.pageSize);
  }, [pagination.current, pagination.pageSize]);

  // Function to fetch categories from API
  const fetchCategories = async (page, pageSize) => {
    try {
      setLoading(true);
      const response = await CategoryAPI.getAllCategory(page, pageSize);
      // console.log(response)
      if (response.data && response.data.data) {
        // Correctly access the categories array
        setCategories(response.data.data.data || []);

        // Correctly set pagination values from metaData
        setPagination({
          current: response.data.data.metaData?.currentPage || 1,
          pageSize: response.data.data.metaData?.pageSize || 10,
          total: response.data.data.metaData?.totalCount || 0,
        });
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      message.error("Không thể tải danh sách danh mục");
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
      const response = await CategoryAPI.createCatrgory(newCategory);

      if (response.data) {
        message.success("Thêm danh mục thành công");
        // Refresh categories list to get updated data
        fetchCategories(pagination.current);
      }
    } catch (error) {
      console.error("Error creating category:", error);
      message.error("Không thể thêm danh mục");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle update category
  const handleUpdateCategory = async (updatedCategory) => {
    try {
      setLoading(true);
      const response = await CategoryAPI.updateCategory(updatedCategory);

      if (response.data) {
        message.success("Cập nhật danh mục thành công");
        // Refresh categories list to get updated data
        fetchCategories(pagination.current);
      }
    } catch (error) {
      console.error("Error updating category:", error);
      message.error("Không thể cập nhật danh mục");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle delete category
  const handleDeleteCategory = async (categoryId) => {
    // Kiểm tra xem danh mục có phải là parent của danh mục khác không
    const hasChildren = categories.some(cat => cat.parentCategoryId === categoryId);
    if (hasChildren) {
      message.error("Không thể xóa danh mục này vì có danh mục con!");
      return;
    }

    try {
      setLoading(true);
      await CategoryAPI.deleteCategory(categoryId);
      message.success("Xóa danh mục thành công");
      // Refresh categories list to get updated data
      fetchCategories(pagination.current);
    } catch (error) {
      console.error("Error deleting category:", error);
      message.error("Không thể xóa danh mục");
    } finally {
      setLoading(false);
    }
  };

  // Xử lý thay đổi phân trang
  const handleTableChange = (newPagination) => {
    // Update both page number and page size
    setPagination({
      ...pagination,
      current: newPagination.current,
      pageSize: newPagination.pageSize
    });
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
        loading={loading}
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