import React from "react";
import { Table, Button, Space, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const SympTable = ({ symptoms, loading, onEdit, onDelete, pagination, onChange, bodyParts }) => {
  // Function to get body part name by id
  const getBodyPartName = (bodyPartId) => {
    const bodyPart = bodyParts.find(part => part.id === bodyPartId);
    return bodyPart ? bodyPart.name : "Không xác định";
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "Tên triệu chứng",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (name) => (
        <span style={{ fontWeight: 500, color: "#1890ff" }}>{name}</span>
      ),
    },
    {
      title: "Bộ phận cơ thể",
      dataIndex: "bodyPartId",
      key: "bodyPartId",
      render: (bodyPartId) => getBodyPartName(bodyPartId),
      filters: bodyParts.map(part => ({ text: part.name, value: part.id })),
      onFilter: (value, record) => record.bodyPartId === value,
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
            title="Bạn có chắc muốn xóa triệu chứng này?"
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
        dataSource={symptoms}
        rowKey="id"
        loading={loading}
        className="bg-white rounded-lg shadow"
        pagination={{
          ...pagination,
          showSizeChanger: true,
          showTotal: (total) => `Tổng ${total} triệu chứng`,
        }}
        onChange={onChange}
      />
    </div>
  );
};

export default SympTable;