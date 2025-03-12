import React, { useState } from 'react';
import { Table, Switch, Button, Space, Image, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import AddProduct from '../addProduct/AddProduct';
import EditProduct from '../editProduct/EditProduct';
import { formatCurrency } from '../../../utils/moneyFormatter';
// import { mockProducts } from './mockData';

const ProductTable = ({ products, loading, onEdit, onDelete }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  // const [data, setData] = useState(mockProducts);

  const columns = [
    {
      title: 'Image',
      dataIndex: 'imageUrl',
      key: 'image',
      render: (image) => <Image src={image} alt="product" width={100} />,
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
      render: (price) => formatCurrency(price),
    },
    {
      title: 'Category',
      dataIndex: 'categoryName',
      key: 'category',
    },
    {
      title: 'Brand',
      dataIndex: 'brandName',
      key: 'brand',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
          />
          <Popconfirm
            title="Xóa sản phẩm"
            description="Bạn có chắc chắn muốn xóa sản phẩm này?"
            onConfirm={() => onDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
            okButtonProps={{ danger: true }}
          >
            <Button
              danger
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
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
        dataSource={products}
        loading={loading}
        className="bg-white rounded-lg shadow"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Tổng ${total} sản phẩm`,
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
