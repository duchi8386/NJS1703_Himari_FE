import React from "react";
import { Table, Button, Space, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const BodyTable = ({ bodyParts, loading, onEdit, onDelete, pagination, onChange }) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "Tên bộ phận cơ thể",
      dataIndex: "bodyPartName",
      key: "bodyPartName",
      sorter: (a, b) => a.bodyPartName.localeCompare(b.bodyPartName),
      render: (name) => (
        <span style={{ fontWeight: 500, color: "#1890ff" }}>{name}</span>
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
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
            title="Bạn có chắc muốn xóa bộ phận này?"
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
        dataSource={bodyParts}
        rowKey="id"
        loading={loading}
        className="bg-white rounded-lg shadow"
        pagination={{
          ...pagination,
          showSizeChanger: true,
          showTotal: (total) => `Tổng ${total} bộ phận cơ thể`,
        }}
        onChange={onChange}
      />
    </div>
  );
};

export default BodyTable;