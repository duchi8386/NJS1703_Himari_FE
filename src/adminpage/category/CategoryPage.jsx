import React, { useState, useEffect } from "react";
import { Button, message, Input, Space } from "antd";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import CategoryTable from "./CategoryComponent/CategoryTable";
import CategoryAdd from "./CategoryComponent/CategoryAdd";
import CategoryEdit from "./CategoryComponent/CategoryEdit";
import CategoryAPI from "../../service/api/CategoryAPI";

const { Search } = Input;

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [parentCategories, setParentCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingParents, setLoadingParents] = useState(false);

  // States for modal visibility
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  // Thêm states mới
  const [searchText, setSearchText] = useState('');
  const [newestFirst, setNewestFirst] = useState(true);

  // Fetch all categories when component mounts or pagination changes
  useEffect(() => {
    fetchCategories(pagination.current, pagination.pageSize);
  }, [pagination.current, pagination.pageSize]);

  // Function to fetch categories from API
  const fetchCategories = async (page, pageSize) => {
    try {
      setLoading(true);
      const response = await CategoryAPI.getAllCategory(page, pageSize, {
        searchText,
        newestFirst
      });

      if (response.data && response.data.data) {
        setCategories(response.data.data.data || []);
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

  // Function to fetch parent categories
  const fetchParentCategories = async () => {
    try {
      setLoadingParents(true);
      const response = await CategoryAPI.getParentCategory(1, 20);
      console.log(response)
      if (response.data && response.data.data) {
        setParentCategories(response.data.data.data || []);
      }
    } catch (error) {
      console.error("Error fetching parent categories:", error);
      message.error("Không thể tải danh sách danh mục gốc");
    } finally {
      setLoadingParents(false);
    }
  };

  // Thêm hàm xử lý search
  const handleSearch = (value) => {
    setSearchText(value);
    setPagination(prev => ({ ...prev, current: 1 }));
    fetchCategories(1, pagination.pageSize);
  };

  // Thêm hàm reset filters
  const handleResetFilters = () => {
    setSearchText('');
    setNewestFirst(true);
    setPagination(prev => ({ ...prev, current: 1 }));
    fetchCategories(1, pagination.pageSize);
  };

  // Function to show edit modal
  const showEditModal = (category) => {
    fetchParentCategories();
    setCurrentCategory(category);
    setIsEditModalVisible(true);
  };

  // Function to handle add category modal
  const showAddModal = () => {
    fetchParentCategories();
    setIsAddModalVisible(true);
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
            onClick={showAddModal}
            className="h-9 rounded"
            icon={<PlusOutlined />}
          >
            Thêm danh mục mới
          </Button>
        </div>
      </div>

      {/* Thêm phần Filter Section */}
      <div className="bg-white p-4 mb-6 rounded-lg shadow flex items-center space-x-4 flex-wrap">
        <Search
          placeholder="Tìm kiếm theo tên danh mục"
          allowClear
          enterButton
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onSearch={handleSearch}
          style={{ width: 300 }}
        />

        <Button
          icon={<ReloadOutlined />}
          onClick={handleResetFilters}
          title="Làm mới"
        >
          Làm mới
        </Button>
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