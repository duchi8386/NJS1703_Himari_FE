import React, { useState } from "react";
import { Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import BodyTable from "./BodyPartComponent/BodyTable";
import BodyAdd from "./BodyPartComponent/BodyAdd";
import BodyEdit from "./BodyPartComponent/BodyEdit";

const BodyPart = () => {
  // Dữ liệu mẫu cho các bộ phận cơ thể
  const [bodyParts, setBodyParts] = useState([
    {
      id: 8,
      bodyPartName: "Khuôn mặt",
      description: "Vùng da chính trên mặt, cần chăm sóc với sữa rửa mặt, kem dưỡng."
    },
    {
      id: 9,
      bodyPartName: "Mắt",
      description: "Vùng mắt nhạy cảm, thường được chăm sóc bằng kem dưỡng mắt, phấn mắt."
    },
    {
      id: 10,
      bodyPartName: "Môi",
      description: "Bộ phận quan trọng giúp tạo điểm nhấn trên khuôn mặt, dùng son môi, dưỡng môi."
    },
    {
      id: 11,
      bodyPartName: "Lông mày",
      description: "Giúp tạo hình gương mặt, thường được trang điểm bằng chì kẻ mày."
    },
    {
      id: 12,
      bodyPartName: "Lông mi",
      description: "Tạo điểm nhấn cho đôi mắt, thường được chăm sóc bằng mascara, dưỡng mi."
    },
    {
      id: 13,
      bodyPartName: "Cổ",
      description: "Vùng da nối liền với khuôn mặt, cần dưỡng ẩm và chống lão hóa."
    },
    {
      id: 14,
      bodyPartName: "Tay",
      description: "Bao gồm bàn tay và ngón tay, thường được chăm sóc bằng kem dưỡng tay."
    },
    {
      id: 15,
      bodyPartName: "Móng tay",
      description: "Bộ phận có thể trang trí bằng sơn móng, gel nail."
    },
    {
      id: 16,
      bodyPartName: "Chân",
      description: "Bao gồm bàn chân và bắp chân, thường dùng kem dưỡng da chân."
    },
    {
      id: 17,
      bodyPartName: "Móng chân",
      description: "Thường được trang trí với sơn móng chân, dưỡng móng."
    }
  ]);

  const [loading, setLoading] = useState(false);

  // States for modal visibility
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentBodyPart, setCurrentBodyPart] = useState(null);

  // Pagination state
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 15,
    totalPages: 2,
    hasNext: true,
    hasPrevious: false
  });

  // Giả lập việc tải dữ liệu
  const fetchBodyParts = () => {
    setLoading(true);
    
    // Giả lập độ trễ mạng
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  // Function to show edit modal
  const showEditModal = (bodyPart) => {
    setCurrentBodyPart(bodyPart);
    setIsEditModalVisible(true);
  };

  // Function to handle add body part
  const handleAddBodyPart = (newBodyPart) => {
    setLoading(true);
    
    // Giả lập độ trễ mạng
    setTimeout(() => {
      setBodyParts([...bodyParts, newBodyPart]);
      message.success("Thêm bộ phận cơ thể thành công");
      setLoading(false);
    }, 500);
  };

  // Function to handle update body part
  const handleUpdateBodyPart = (updatedBodyPart) => {
    setLoading(true);
    
    // Giả lập độ trễ mạng
    setTimeout(() => {
      const updatedBodyParts = bodyParts.map(bodyPart => 
        bodyPart.id === updatedBodyPart.id ? updatedBodyPart : bodyPart
      );
      setBodyParts(updatedBodyParts);
      message.success("Cập nhật bộ phận cơ thể thành công");
      setLoading(false);
    }, 500);
  };

  // Function to handle delete body part
  const handleDeleteBodyPart = (id) => {
    setLoading(true);
    
    // Giả lập độ trễ mạng
    setTimeout(() => {
      setBodyParts(bodyParts.filter(bodyPart => bodyPart.id !== id));
      message.success("Xóa bộ phận cơ thể thành công");
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