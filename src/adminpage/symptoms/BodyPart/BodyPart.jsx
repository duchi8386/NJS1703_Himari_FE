import React, { useState, useEffect } from "react";
import { Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import BodyTable from "./BodyPartComponent/BodyTable";
import BodyAdd from "./BodyPartComponent/BodyAdd";
import BodyEdit from "./BodyPartComponent/BodyEdit";
import BodyPartAPI from "../../../service/api/bodyPart";

const BodyPart = () => {
  const [bodyParts, setBodyParts] = useState([]);
  const [loading, setLoading] = useState(false);

  // States for modal visibility
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentBodyPart, setCurrentBodyPart] = useState(null);

  // Pagination state
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrevious: false
  });

  // Fetch body parts from API
  const fetchBodyParts = async () => {
    setLoading(true);
    try {
      const response = await BodyPartAPI.getBodyParts(pagination.current, pagination.pageSize);

      if (response && response.data) {
        // Update to match the actual API response structure
        setBodyParts(response.data.data);

        const metaData = response.data.metaData;
        setPagination({
          ...pagination,
          current: metaData.currentPage,
          pageSize: metaData.pageSize,
          total: metaData.totalCount,
          totalPages: metaData.totalPages,
          hasNext: metaData.hasNext,
          hasPrevious: metaData.hasPrevious
        });
      }
    } catch (error) {
      message.error("Không thể tải dữ liệu bộ phận cơ thể");
      console.error("Error fetching body parts:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load data on component mount and when pagination changes
  useEffect(() => {
    fetchBodyParts();
  }, [pagination.current, pagination.pageSize]);

  // Function to show edit modal
  const showEditModal = (bodyPart) => {
    setCurrentBodyPart(bodyPart);
    setIsEditModalVisible(true);
  };

  // Function to handle add body part
  const handleAddBodyPart = async (newBodyPart) => {
    setLoading(true);
    try {
      await BodyPartAPI.AddBodyPart(newBodyPart);
      message.success("Thêm bộ phận cơ thể thành công");
      fetchBodyParts(); // Reload data after adding
    } catch (error) {
      message.error("Không thể thêm bộ phận cơ thể");
      console.error("Error adding body part:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle update body part
  const handleUpdateBodyPart = async (updatedBodyPart) => {
    setLoading(true);
    try {
      await BodyPartAPI.UpdateBodyPart(updatedBodyPart);
      message.success("Cập nhật bộ phận cơ thể thành công");
      fetchBodyParts(); // Reload data after updating
    } catch (error) {
      message.error("Không thể cập nhật bộ phận cơ thể");
      console.error("Error updating body part:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle delete body part
  const handleDeleteBodyPart = async (id) => {
    setLoading(true);
    try {
      await BodyPartAPI.DeleteBodyPart(id);
      message.success("Xóa bộ phận cơ thể thành công");
      fetchBodyParts(); // Reload data after deleting
    } catch (error) {
      message.error("Không thể xóa bộ phận cơ thể");
      console.error("Error deleting body part:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle pagination changes
  const handleTableChange = (paginationData) => {
    setPagination({
      ...pagination,
      current: paginationData.current,
      pageSize: paginationData.pageSize,
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Quản lý bộ phận cơ thể</h2>
        <div>
          <Button
            type="primary"
            onClick={() => setIsAddModalVisible(true)}
            className="h-9 rounded"
            icon={<PlusOutlined />}
          >
            Thêm bộ phận cơ thể mới
          </Button>
        </div>
      </div>

      <BodyTable
        bodyParts={bodyParts}
        loading={loading}
        onEdit={showEditModal}
        onDelete={handleDeleteBodyPart}
        pagination={pagination}
        onChange={handleTableChange}
      />

      <BodyAdd
        isOpen={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        onAddBodyPart={handleAddBodyPart}
      />

      <BodyEdit
        isOpen={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        onUpdateBodyPart={handleUpdateBodyPart}
        bodyPart={currentBodyPart}
      />
    </div>
  );
};

export default BodyPart;
