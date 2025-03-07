import React, { useState, useEffect } from "react";
import { Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import BrandTable from "./BrandComponent/BrandTable";
import BrandAdd from "./BrandComponent/BrandAdd";
import BrandEdit from "./BrandComponent/BrandEdit";

const BrandPage = () => {
  const [brands, setBrands] = useState([
    {
      id: 1,
      brandName: "Loreal",
      description: "L'Oréal SA (L'Oréal) là nhà cung cấp các sản phẩm chăm sóc cá nhân.",
      image: "https://firebasestorage.googleapis.com/v0/b/little-joy-2c5d3.appspot.com/o/himari%2Floreal.png?alt=media&token=4bdf2161-97f6-4387-905c-44d8f05132f8"
    },
    {
      id: 2,
      brandName: "Cocoon ",
      description: "Cocoon tự hào là mỹ phẩm 100% thuần chay từ thực vật Việt Nam.",
      image: "https://firebasestorage.googleapis.com/v0/b/little-joy-2c5d3.appspot.com/o/himari%2FThi%E1%BA%BFt%20k%E1%BA%BF%20ch%C6%B0a%20c%C3%B3%20t%C3%AAn%20(1).png?alt=media&token=4bdf6db7-d2f5-470f-8adf-bcefde630347"
    },
    {
      id: 3,
      brandName: "Bioderma ",
      description: "BIODERMA là thương hiệu dược mỹ phẩm trong lĩnh vực chăm sóc sức khỏe.",
      image: "https://firebasestorage.googleapis.com/v0/b/little-joy-2c5d3.appspot.com/o/himari%2FThi%E1%BA%BFt%20k%E1%BA%BF%20ch%C6%B0a%20c%C3%B3%20t%C3%AAn%20(2).png?alt=media&token=dce50201-6276-42af-bda3-d6e7e189dc60"
    },
    {
      id: 4,
      brandName: "Cerave",
      description: "Tất cả các sản phẩm CeraVe đều chứa ceramides, thành phần thiết yếu giúp tạo nên hàng rào dưỡng ẩm khỏe mạnh cho da.",
      image: "https://firebasestorage.googleapis.com/v0/b/little-joy-2c5d3.appspot.com/o/himari%2FThi%E1%BA%BFt%20k%E1%BA%BF%20ch%C6%B0a%20c%C3%B3%20t%C3%AAn%20(4).png?alt=media&token=d29f9521-3035-495f-ba0d-128ea8a70a5d"
    },
    {
      id: 5,
      brandName: "La Roche-Posay",
      description: "La Roche-Posay nổi tiếng với những thành phần lành tính, an toàn và thân thiện với mọi loại da, đặc biệt là làn da mụn hoặc da nhạy cảm.",
      image: "https://firebasestorage.googleapis.com/v0/b/little-joy-2c5d3.appspot.com/o/himari%2FThi%E1%BA%BFt%20k%E1%BA%BF%20ch%C6%B0a%20c%C3%B3%20t%C3%AAn%20(5).png?alt=media&token=f124acb2-d591-492b-8a9f-978e41349d28"
    },
    {
      id: 6,
      brandName: "Klairs",
      description: "Klairs - thương hiệu mỹ phẩm Hàn Quốc với các dòng sản phẩm hoàn toàn từ thiên nhiên.",
      image: "https://firebasestorage.googleapis.com/v0/b/little-joy-2c5d3.appspot.com/o/himari%2FThi%E1%BA%BFt%20k%E1%BA%BF%20ch%C6%B0a%20c%C3%B3%20t%C3%AAn%20(7).png?alt=media&token=57e71b5d-1760-43b7-a68f-50a53b68525e"
    },
    {
      id: 7,
      brandName: "Estee Lauder",
      description: "Thương hiệu mỹ phẩm cao cấp của Mỹ, nổi tiếng với các sản phẩm chăm sóc da và trang điểm chất lượng.",
      image: "https://firebasestorage.googleapis.com/v0/b/little-joy-2c5d3.appspot.com/o/himari%2FThi%E1%BA%BFt%20k%E1%BA%BF%20ch%C6%B0a%20c%C3%B3%20t%C3%AAn%20(4).png?alt=media&token=d29f9521-3035-495f-ba0d-128ea8a70a5d"
    },
    {
      id: 8,
      brandName: "Kiehl's",
      description: "Thương hiệu mỹ phẩm Mỹ với lịch sử lâu đời, chuyên cung cấp các sản phẩm chăm sóc da từ thiên nhiên.",
      image: "https://firebasestorage.googleapis.com/v0/b/little-joy-2c5d3.appspot.com/o/himari%2FThi%E1%BA%BFt%20k%E1%BA%BF%20ch%C6%B0a%20c%C3%B3%20t%C3%AAn%20(4).png?alt=media&token=d29f9521-3035-495f-ba0d-128ea8a70a5d"
    },
    {
      id: 9,
      brandName: "Clinique",
      description: "Thương hiệu mỹ phẩm Mỹ được kiểm nghiệm bởi các bác sĩ da liễu, không chứa chất gây dị ứng.",
      image: "https://firebasestorage.googleapis.com/v0/b/little-joy-2c5d3.appspot.com/o/himari%2FThi%E1%BA%BFt%20k%E1%BA%BF%20ch%C6%B0a%20c%C3%B3%20t%C3%AAn%20(4).png?alt=media&token=d29f9521-3035-495f-ba0d-128ea8a70a5d"
    },
    {
      id: 10,
      brandName: "Paula's Choice",
      description: "Thương hiệu mỹ phẩm Mỹ nổi tiếng với các sản phẩm chăm sóc da không chứa hương liệu và chất gây dị ứng.",
      image: "https://firebasestorage.googleapis.com/v0/b/little-joy-2c5d3.appspot.com/o/himari%2FThi%E1%BA%BFt%20k%E1%BA%BF%20ch%C6%B0a%20c%C3%B3%20t%C3%AAn%20(4).png?alt=media&token=d29f9521-3035-495f-ba0d-128ea8a70a5d"
    }
  ]);

  // States for modal visibility
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentBrand, setCurrentBrand] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 16,
  });

  // Function to show edit modal
  const showEditModal = (brand) => {
    setCurrentBrand(brand);
    setIsEditModalVisible(true);
  };

  // Function to handle add brand
  const handleAddBrand = (newBrand) => {
    setBrands([...brands, newBrand]);
    message.success("Thêm thương hiệu thành công");
  };

  // Function to handle update brand
  const handleUpdateBrand = (updatedBrand) => {
    const updatedBrands = brands.map(brand => 
      brand.id === updatedBrand.id ? updatedBrand : brand
    );
    setBrands(updatedBrands);
    message.success("Cập nhật thương hiệu thành công");
  };

  // Function to handle delete brand
  const handleDeleteBrand = (brandId) => {
    setBrands(brands.filter(brand => brand.id !== brandId));
    message.success("Xóa thương hiệu thành công");
  };
  
  // Xử lý thay đổi phân trang
  const handleTableChange = (pagination) => {
    setPagination(pagination);
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