import React from "react";
import { Table, Button, Space, Popconfirm, Tag, Typography } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

// Sử dụng dayjs của Ant Design
import dayjs from 'dayjs';
import 'dayjs/locale/vi'; // Import locale Tiếng Việt

// Thiết lập locale cho dayjs
dayjs.locale('vi');

const { Text } = Typography;

const ProductSympTable = ({ productSymptoms, loading, onEdit, onDelete, pagination, onChange }) => {
  // Format date function sử dụng dayjs (được Ant Design sử dụng)
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return dayjs(dateString).format('DD/MM/YYYY HH:mm');
    } catch (error) {
      return "Invalid Date";
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 70,
    },
    {
      title: "Sản phẩm",
      dataIndex: "productName",
      key: "productName",
      sorter: (a, b) => a.productName.localeCompare(b.productName),
      render: (name) => (
        <span style={{ fontWeight: 500, color: "#1890ff" }}>{name}</span>
      ),
      width: 200,
    },
    {
      title: "Triệu chứng",
      dataIndex: "partSymptomName",
      key: "partSymptomName",
      sorter: (a, b) => a.partSymptomName.localeCompare(b.partSymptomName),
      render: (name) => (
        <Tag color="green">{name}</Tag>
      ),
      width: 150,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (date) => <Text>{formatDate(date)}</Text>,
      width: 150,
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updatedDate",
      key: "updatedDate",
      render: (date) => <Text>{formatDate(date)}</Text>,
      width: 150,
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
            title="Bạn có chắc muốn xóa liên kết này?"
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
        dataSource={productSymptoms}
        rowKey="id"
        loading={loading}
        className="bg-white rounded-lg shadow"
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true,
          showTotal: (total) => `Tổng ${total} liên kết sản phẩm-triệu chứng`,
          onChange: (page, pageSize) => {
            // Make sure we pass both page and pageSize to parent component
            onChange({
              current: page,
              pageSize: pageSize
            });
          },
          onShowSizeChange: (current, size) => {
            // Handle page size changes
            onChange({
              current: 1, // Reset to page 1 when changing page size
              pageSize: size
            });
          }
        }}
      />
    </div>
  );
};

export default ProductSympTable;