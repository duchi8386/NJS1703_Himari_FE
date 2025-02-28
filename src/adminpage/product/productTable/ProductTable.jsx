import React, { useState } from 'react';
import { Table, Switch, Button, Space, Image } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import AddProduct from '../addProduct/AddProduct';
import EditProduct from '../editProduct/EditProduct';
import { mockProducts } from './mockData';

const ProductTable = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [data, setData] = useState(mockProducts);

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => <Image src={image} alt="product" width={50} />,
    },
    {
      title: 'Product Name',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `$${price}`,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => (
        <Switch checked={record.status === 'Active'} />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button 
            type="primary" 
            icon={<EditOutlined />} 
            onClick={() => handleEdit(record)}
          />
          <Button 
            danger 
            icon={<DeleteOutlined />} 
          />
        </Space>
      ),
    },
  ];

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  return (
    <div className="p-6">
      <Table 
        columns={columns} 
        dataSource={data}
        className="bg-white rounded-lg shadow"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} items`,
        }}
      />
      
      <EditProduct 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)}
        productData={selectedProduct}
      />
    </div>
  );
};

export default ProductTable;
