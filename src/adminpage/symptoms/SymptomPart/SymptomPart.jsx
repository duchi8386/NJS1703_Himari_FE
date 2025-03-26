import React, { useState, useEffect } from "react";
import { Button, message, Input, Space } from "antd";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import SympTable from "./SymptomPartComponent/SympTable";
import SympAdd from "./SymptomPartComponent/SympAdd";
import SympEdit from "./SymptomPartComponent/SympEdit";
import partSymptomAPI from "../../../service/api/partSymptom";
import BodyPartAPI from "../../../service/api/bodyPart";

const { Search } = Input;

const SymptomPart = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [bodyParts, setBodyParts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentSymptom, setCurrentSymptom] = useState(null);

  // Updated pagination state with better defaults
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50', '100'],
  });

  // Thêm states cho search và sort
  const [searchText, setSearchText] = useState('');
  const [newestFirst, setNewestFirst] = useState(true);

  // Fetch symptoms data using the API with pagination
  const fetchSymptoms = async (page = pagination.current, pageSize = pagination.pageSize) => {
    setLoading(true);
    try {
      const response = await partSymptomAPI.getPartSymptoms(page, pageSize, {
        searchText,
        newestFirst
      });

      if (response?.data?.data) {
        const { data, metaData } = response.data;
        setSymptoms(data);
        setPagination({
          ...pagination,
          current: metaData.currentPage,
          pageSize: metaData.pageSize,
          total: metaData.totalCount,
        });
      } else {
        message.error("Định dạng dữ liệu không hợp lệ");
      }
    } catch (error) {
      message.error("Không thể tải dữ liệu triệu chứng: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  const fetchBodyParts = async () => {
    try {
      const response = await BodyPartAPI.getBodyParts(1, 20);
      console.log(response);
      if (response && response.data) {
        setBodyParts(response.data.data);
      }
    } catch (error) {
      message.error("Không thể tải dữ liệu bộ phận cơ thể: " + error.message);
    }
  }

  useEffect(() => {
    fetchSymptoms();
    fetchBodyParts();
  }, []);

  // Function to show edit modal
  const showEditModal = (symptom) => {
    setCurrentSymptom(symptom);
    setIsEditModalVisible(true);
  };

  // Function to handle add symptom using API
  const handleAddSymptom = async (newSymptom) => {
    setLoading(true);
    try {
      await partSymptomAPI.addPartSymptom(newSymptom);
      message.success("Thêm triệu chứng thành công");
      fetchSymptoms(pagination.current, pagination.pageSize);
      return Promise.resolve();
    } catch (error) {
      message.error("Không thể thêm triệu chứng: " + error.message);
      return Promise.reject(error);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle update symptom using API
  const handleUpdateSymptom = async (updatedSymptom) => {
    setLoading(true);
    try {
      await partSymptomAPI.updatePartSymptom(updatedSymptom);
      message.success("Cập nhật triệu chứng thành công");
      fetchSymptoms(pagination.current, pagination.pageSize);
      return Promise.resolve();
    } catch (error) {
      message.error("Không thể cập nhật triệu chứng: " + error.message);
      return Promise.reject(error);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle delete symptom using API
  const handleDeleteSymptom = async (id) => {
    setLoading(true);
    try {
      await partSymptomAPI.deletePartSymptom(id);
      message.success("Xóa triệu chứng thành công");
      // After deletion, we may need to adjust the current page
      // If we're on the last page and delete the last item, go to previous page
      const newPage =
        symptoms.length === 1 && pagination.current > 1
          ? pagination.current - 1
          : pagination.current;

      fetchSymptoms(newPage, pagination.pageSize);
    } catch (error) {
      message.error("Không thể xóa triệu chứng: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle pagination changes
  const handleTableChange = (newPagination, filters, sorter) => {
    // Extract the new pagination values
    const { current, pageSize } = newPagination;

    // Fetch data with the new pagination parameters
    fetchSymptoms(current, pageSize);
  };

  // Thêm hàm xử lý search
  const handleSearch = (value) => {
    setSearchText(value);
    setPagination(prev => ({ ...prev, current: 1 }));
    fetchSymptoms(1, pagination.pageSize);
  };

  // Thêm hàm reset filters
  const handleResetFilters = () => {
    setSearchText('');
    setNewestFirst(true);
    setPagination(prev => ({
      ...prev,
      current: 1
    }));
    fetchSymptoms(1, pagination.pageSize);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Quản lý Triệu chứng cơ thể</h2>
        <div>
          <Button
            type="primary"
            onClick={() => setIsAddModalVisible(true)}
            className="h-9 rounded"
            icon={<PlusOutlined />}
          >
            Thêm triệu chứng mới
          </Button>
        </div>
      </div>

      {/* Thêm phần Filter Section */}
      <div className="bg-white p-4 mb-6 rounded-lg shadow flex items-center space-x-4 flex-wrap">
        <Search
          placeholder="Tìm kiếm triệu chứng"
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

      <SympTable
        symptoms={symptoms}
        loading={loading}
        onEdit={showEditModal}
        onDelete={handleDeleteSymptom}
        pagination={pagination}
        onChange={handleTableChange}
        bodyParts={bodyParts}
      />

      <SympAdd
        isOpen={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        onAddSymptom={handleAddSymptom}
        bodyParts={bodyParts}
      />

      <SympEdit
        isOpen={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        onUpdateSymptom={handleUpdateSymptom}
        symptom={currentSymptom}
        bodyParts={bodyParts}
      />
    </div>
  );
};

export default SymptomPart;