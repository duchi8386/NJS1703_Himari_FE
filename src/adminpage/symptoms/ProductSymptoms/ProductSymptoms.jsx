import React, { useState } from "react";
import { Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ProductSympTable from "./ProductSymptomComponent/ProductSympTable";
import ProductSympAdd from "./ProductSymptomComponent/ProductSympAdd";
import ProductSympEdit from "./ProductSymptomComponent/ProductSympEdit";

const ProductSymptoms = () => {
  // Dữ liệu mẫu cho liên kết sản phẩm-triệu chứng
  const [productSymptoms, setProductSymptoms] = useState([
    {
      id: 4,
      partSymptomId: 7,
      productId: 22,
      partSymptomName: "Mụn trứng cá",
      productName: "Sữa rửa mặt CeraVe",
      createdDate: "2025-03-05T14:49:50.78",
      updatedDate: null,
      isDeleted: false
    },
    {
      id: 5,
      partSymptomId: 8,
      productId: 22,
      partSymptomName: "Sạm da",
      productName: "Sữa rửa mặt CeraVe",
      createdDate: "2025-03-05T14:49:50.78",
      updatedDate: null,
      isDeleted: false
    },
    {
      id: 6,
      partSymptomId: 7,
      productId: 23,
      partSymptomName: "Mụn trứng cá",
      productName: "Tẩy tế bào chết Vedette",
      createdDate: "2025-03-05T14:49:50.78",
      updatedDate: null,
      isDeleted: false
    },
    {
      id: 7,
      partSymptomId: 8,
      productId: 23,
      partSymptomName: "Sạm da",
      productName: "Tẩy tế bào chết Vedette",
      createdDate: "2025-03-05T14:49:50.78",
      updatedDate: null,
      isDeleted: false
    },
    {
      id: 8,
      partSymptomId: 9,
      productId: 23,
      partSymptomName: "Nám, tàn nhang",
      productName: "Tẩy tế bào chết Vedette",
      createdDate: "2025-03-05T14:49:50.78",
      updatedDate: null,
      isDeleted: false
    },
    {
      id: 9,
      partSymptomId: 22,
      productId: 24,
      partSymptomName: "Khô da tay",
      productName: "Kem dưỡng ẩm Clinique",
      createdDate: "2025-03-05T14:49:50.78",
      updatedDate: null,
      isDeleted: false
    },
    {
      id: 10,
      partSymptomId: 26,
      productId: 24,
      partSymptomName: "Da chân khô",
      productName: "Kem dưỡng ẩm Clinique",
      createdDate: "2025-03-05T14:49:50.78",
      updatedDate: null,
      isDeleted: false
    },
    {
      id: 11,
      partSymptomId: 30,
      productId: 24,
      partSymptomName: "Khô da toàn thân",
      productName: "Kem dưỡng ẩm Clinique",
      createdDate: "2025-03-05T14:49:50.78",
      updatedDate: null,
      isDeleted: false
    },
    {
      id: 12,
      partSymptomId: 22,
      productId: 25,
      partSymptomName: "Khô da tay",
      productName: "Kem dưỡng ẩm Kiehl's",
      createdDate: "2025-03-05T14:49:50.78",
      updatedDate: null,
      isDeleted: false
    },
    {
      id: 13,
      partSymptomId: 26,
      productId: 25,
      partSymptomName: "Da chân khô",
      productName: "Kem dưỡng ẩm Kiehl's",
      createdDate: "2025-03-05T14:49:50.78",
      updatedDate: null,
      isDeleted: false
    }
  ]);

  // Dữ liệu mẫu cho sản phẩm (sẽ dùng trong Add và Edit)
  const [products, setProducts] = useState([
    { id: 22, name: "Sữa rửa mặt CeraVe" },
    { id: 23, name: "Tẩy tế bào chết Vedette" },
    { id: 24, name: "Kem dưỡng ẩm Clinique" },
    { id: 25, name: "Kem dưỡng ẩm Kiehl's" },
    { id: 26, name: "Kem chống nắng La Roche-Posay" },
    { id: 27, name: "Son dưỡng môi Laneige" },
    { id: 28, name: "Serum Vitamin C Klairs" },
    { id: 29, name: "Mặt nạ dưỡng ẩm Mediheal" }
  ]);

  // Dữ liệu mẫu cho triệu chứng (sẽ dùng trong Add và Edit)
  const [symptoms, setSymptoms] = useState([
    { id: 7, name: "Mụn trứng cá", bodyPartId: 8 },
    { id: 8, name: "Sạm da", bodyPartId: 8 },
    { id: 9, name: "Nám, tàn nhang", bodyPartId: 8 },
    { id: 10, name: "Nếp nhăn", bodyPartId: 8 },
    { id: 11, name: "Quầng thâm", bodyPartId: 9 },
    { id: 12, name: "Bọng mắt", bodyPartId: 9 },
    { id: 22, name: "Khô da tay", bodyPartId: 14 },
    { id: 26, name: "Da chân khô", bodyPartId: 16 },
    { id: 30, name: "Khô da toàn thân", bodyPartId: 15 }
  ]);

  const [loading, setLoading] = useState(false);

  // States for modal visibility
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentProductSymptom, setCurrentProductSymptom] = useState(null);

  // Pagination state
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 52,
    totalPages: 6,
    hasNext: true,
    hasPrevious: false
  });

  // Giả lập việc tải dữ liệu
  const fetchProductSymptoms = () => {
    setLoading(true);
    
    // Giả lập độ trễ mạng
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  // Function to show edit modal
  const showEditModal = (productSymptom) => {
    setCurrentProductSymptom(productSymptom);
    setIsEditModalVisible(true);
  };

  // Function to handle add product-symptom link
  const handleAddProductSymptom = (newProductSymptom) => {
    setLoading(true);
    
    // Giả lập độ trễ mạng
    setTimeout(() => {
      setProductSymptoms([...productSymptoms, newProductSymptom]);
      message.success("Thêm liên kết sản phẩm-triệu chứng thành công");
      setLoading(false);
    }, 500);
  };

  // Function to handle update product-symptom link
  const handleUpdateProductSymptom = (updatedProductSymptom) => {
    setLoading(true);
    
    // Giả lập độ trễ mạng
    setTimeout(() => {
      const updatedItems = productSymptoms.map(item => 
        item.id === updatedProductSymptom.id ? updatedProductSymptom : item
      );
      setProductSymptoms(updatedItems);
      message.success("Cập nhật liên kết sản phẩm-triệu chứng thành công");
      setLoading(false);
    }, 500);
  };

  // Function to handle delete product-symptom link
  const handleDeleteProductSymptom = (id) => {
    setLoading(true);
    
    // Giả lập độ trễ mạng
    setTimeout(() => {
      setProductSymptoms(productSymptoms.filter(item => item.id !== id));
      message.success("Xóa liên kết sản phẩm-triệu chứng thành công");
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
        <h2 className="text-2xl font-bold">Quản lý liên kết sản phẩm - triệu chứng</h2>
        <div>
          <Button
            type="primary"
            onClick={() => setIsAddModalVisible(true)}
            className="h-9 rounded"
            icon={<PlusOutlined />}
          >
            Thêm liên kết mới
          </Button>
        </div>
      </div>

      <ProductSympTable
        productSymptoms={productSymptoms}
        loading={loading}
        onEdit={showEditModal}
        onDelete={handleDeleteProductSymptom}
        pagination={pagination}
        onChange={handleTableChange}
      />

      <ProductSympAdd
        isOpen={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        onAddProductSymptom={handleAddProductSymptom}
        products={products}
        symptoms={symptoms}
      />

      <ProductSympEdit
        isOpen={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        onUpdateProductSymptom={handleUpdateProductSymptom}
        productSymptom={currentProductSymptom}
        products={products}
        symptoms={symptoms}
      />
    </div>
  );
};

export default ProductSymptoms;