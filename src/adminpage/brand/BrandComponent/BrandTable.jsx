import React from "react";
import { Table, Button, Space, Popconfirm, Image } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const BrandTable = ({ brands, loading, onEdit, onDelete, pagination, onChange }) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <Image
          src={image}
          width={60}
          height={40}
          style={{ objectFit: "contain" }}
          preview={false}
        />
      ),
      width: 100,
    },
    {
      title: "Tên thương hiệu",
      dataIndex: "brandName",
      key: "brandName",
      sorter: (a, b) => a.brandName.localeCompare(b.brandName),
      render: (name) => (
        <span style={{ fontWeight: 500, color: "#1890ff" }}>{name}</span>
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
      width: 550,
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
          />
          <Popconfirm
            title="Bạn có chắc muốn xóa thương hiệu này?"
            onConfirm={() => onDelete(record.id)}
            okText="Đồng ý"
            cancelText="Hủy"
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
      width: 120,
      align: "center",
    },
  ];

  return (
    <div className="p-6">
      <Table
        columns={columns}
        dataSource={brands}
        rowKey="id"
        loading={loading}
        className="bg-white rounded-lg shadow"
        pagination={{
          ...pagination,
          showSizeChanger: true,
          showTotal: (total) => `Tổng ${total} thương hiệu`,
        }}
        onChange={onChange}
      />
    </div>
  );
};

export default BrandTable;