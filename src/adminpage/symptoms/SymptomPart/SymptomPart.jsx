import React, { useState, useEffect } from "react";
import { Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import SympTable from "./SymptomPartComponent/SympTable";
import SympAdd from "./SymptomPartComponent/SympAdd";
import SympEdit from "./SymptomPartComponent/SympEdit";

const SymptomPart = () => {
  // Dữ liệu mẫu cho triệu chứng
  const [symptoms, setSymptoms] = useState([
    {
      id: 7,
      name: "Mụn trứng cá",
      bodyPartId: 8
    },
    {
      id: 8,
      name: "Sạm da",
      bodyPartId: 8
    },
    {
      id: 9,
      name: "Nám, tàn nhang",
      bodyPartId: 8
    },
    {
      id: 10,
      name: "Nếp nhăn",
      bodyPartId: 8
    },
    {
      id: 11,
      name: "Quầng thâm",
      bodyPartId: 9
    },
    {
      id: 12,
      name: "Bọng mắt",
      bodyPartId: 9
    },
    {
      id: 13,
      name: "Nếp nhăn khóe mắt",
      bodyPartId: 9
    },
    {
      id: 14,
      name: "Môi khô, nứt nẻ",
      bodyPartId: 10
    },
    {
      id: 15,
      name: "Thâm môi",
      bodyPartId: 10
    },
    {
      id: 16,
      name: "Lông mày thưa",
      bodyPartId: 11
    }
  ]);
  
  // Dữ liệu mẫu cho các bộ phận cơ thể
  const [bodyParts, setBodyParts] = useState([
    { id: 8, name: "Mặt" },
    { id: 9, name: "Mắt" },
    { id: 10, name: "Môi" },
    { id: 11, name: "Lông mày" },
    { id: 12, name: "Cổ" },
    { id: 13, name: "Tay" },
    { id: 14, name: "Chân" },
    { id: 15, name: "Toàn thân" }
  ]);

  const [loading, setLoading] = useState(false);

  // States for modal visibility
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentSymptom, setCurrentSymptom] = useState(null);

  // Pagination state
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 32,
    totalPages: 4,
    hasNext: true,
    hasPrevious: false
  });

  // Giả lập việc tải dữ liệu
  const fetchSymptoms = () => {
    setLoading(true);
    
    // Giả lập độ trễ mạng
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    fetchSymptoms();
  }, []);

  // Function to show edit modal
  const showEditModal = (symptom) => {
    setCurrentSymptom(symptom);
    setIsEditModalVisible(true);
  };

  // Function to handle add symptom
  const handleAddSymptom = (newSymptom) => {
    setLoading(true);
    
    // Giả lập độ trễ mạng
    setTimeout(() => {
      setSymptoms([...symptoms, newSymptom]);
      message.success("Thêm triệu chứng thành công");
      setLoading(false);
    }, 500);
  };

  // Function to handle update symptom
  const handleUpdateSymptom = (updatedSymptom) => {
    setLoading(true);
    
    // Giả lập độ trễ mạng
    setTimeout(() => {
      const updatedSymptoms = symptoms.map(symptom => 
        symptom.id === updatedSymptom.id ? updatedSymptom : symptom
      );
      setSymptoms(updatedSymptoms);
      message.success("Cập nhật triệu chứng thành công");
      setLoading(false);
    }, 500);
  };

  // Function to handle delete symptom
  const handleDeleteSymptom = (id) => {
    setLoading(true);
    
    // Giả lập độ trễ mạng
    setTimeout(() => {
      setSymptoms(symptoms.filter(symptom => symptom.id !== id));
      message.success("Xóa triệu chứng thành công");
      setLoading(false);
    }, 500);
  };

  // Handle pagination changes
  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Quản lý triệu chứng</h2>
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