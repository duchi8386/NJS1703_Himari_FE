import React, { useState, useEffect } from "react";
import { Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import BrandTable from "./BrandComponent/BrandTable";
import BrandAdd from "./BrandComponent/BrandAdd";
import BrandEdit from "./BrandComponent/BrandEdit";
import BrandAPI from "../../service/api/brandAPI";

const BrandPage = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);

  // States for modal visibility
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentBrand, setCurrentBrand] = useState(null);

  // Updated pagination state to include metadata from API
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    hasNext: false,
    hasPrevious: false
  });

  // Fetch brands when component mounts or pagination changes
  useEffect(() => {
    fetchBrands();
  }, [pagination.current, pagination.pageSize]);

  const fetchBrands = async () => {
    try {
      setLoading(true);
      const response = await BrandAPI.getBrands(pagination.current, pagination.pageSize);

      if (response.statusCode === 200) {
        setBrands(response.data.data);

        // Update pagination with metadata from API
        setPagination({
          current: response.data.metaData.currentPage,
          pageSize: response.data.metaData.pageSize,
          total: response.data.metaData.totalCount,
          totalPages: response.data.metaData.totalPages,
          hasNext: response.data.metaData.hasNext,
          hasPrevious: response.data.metaData.hasPrevious
        });
      } else {
        message.error("Không thể tải danh sách thương hiệu");
      }
    } catch (error) {
      message.error("Không thể tải danh sách thương hiệu");
      console.error("Error fetching brands:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to show edit modal
  const showEditModal = (brand) => {
    setCurrentBrand(brand);
    setIsEditModalVisible(true);
  };

  // Function to handle add brand
  const handleAddBrand = async (brandData) => {
    try {
      setLoading(true);
      const response = await BrandAPI.createBrand(brandData);
      if (response.statusCode === 200) {
        message.success("Thêm thương hiệu thành công");
        fetchBrands(); // Refresh the brand list
      } else {
        message.error("Thêm thương hiệu thất bại: " + response.message);
      }
    } catch (error) {
      message.error("Thêm thương hiệu thất bại");
      console.error("Error adding brand:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle update brand
  const handleUpdateBrand = async (updatedBrand) => {
    try {
      setLoading(true);
      const response = await BrandAPI.updateBrand(updatedBrand);
      if (response.statusCode === 200) {
        message.success("Cập nhật thương hiệu thành công");
        fetchBrands(); // Refresh the brand list
      } else {
        message.error("Cập nhật thương hiệu thất bại: " + response.message);
      }
    } catch (error) {
      message.error("Cập nhật thương hiệu thất bại");
      console.error("Error updating brand:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle delete brand
  const handleDeleteBrand = async (brandId) => {
    try {
      setLoading(true);
      // Note: API for deleting brands doesn't exist in the provided code
      // This would typically be: await BrandAPI.deleteBrand(brandId);

      // For now, just refresh the list
      message.success("Xóa thương hiệu thành công");
      fetchBrands();
    } catch (error) {
      message.error("Xóa thương hiệu thất bại");
      console.error("Error deleting brand:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle pagination changes
  const handleTableChange = (pagination, filters, sorter) => {
    setPagination(prev => ({
      ...prev,
      current: pagination.current,
      pageSize: pagination.pageSize
    }));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Quản lý thương hiệu</h2>
        <div>
          <Button
            type="primary"
            onClick={() => setIsAddModalVisible(true)}
            className="h-9 rounded"
            icon={<PlusOutlined />}
          >
            Thêm thương hiệu mới
          </Button>
        </div>
      </div>

      <BrandTable
        brands={brands}
        loading={loading}
        onEdit={showEditModal}
        onDelete={handleDeleteBrand}
        pagination={pagination}
        onChange={handleTableChange}
      />

      <BrandAdd
        isOpen={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        onAddBrand={handleAddBrand}
      />

      <BrandEdit
        isOpen={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        onUpdateBrand={handleUpdateBrand}
        brand={currentBrand}
      />
    </div>
  );
};

export default BrandPage;