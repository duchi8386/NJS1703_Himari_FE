import React from "react";
import { Table, Button, Space, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const CategoryTable = ({ categories, onEdit, onDelete, pagination, onChange, loading }) => {
  const columns = [
    // {
    //   title: "ID",
    //   dataIndex: "id",
    //   key: "id",
    //   width: 80,
    // },
    {
      title: "Tên danh mục",
      dataIndex: "categoryName",
      key: "categoryName",
      sorter: (a, b) => a.categoryName.localeCompare(b.categoryName),
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
      title: "Danh mục cha",
      dataIndex: "parentCategoryName",
      key: "parentCategoryName",
      render: (parentName) => parentName || <span style={{ color: "#999" }}>Không có</span>,
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => {
        // Kiểm tra xem danh mục có là parent của danh mục khác không
        const hasChildren = categories.some(cat => cat.parentCategoryId === record.id);

        return (
          <Space>
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => onEdit(record)}
            />
            <Popconfirm
              title={hasChildren ?
                "Danh mục này có chứa các danh mục con. Bạn không thể xóa!" :
                "Bạn có chắc muốn xóa danh mục này?"}
              onConfirm={() => {
                if (!hasChildren) {
                  onDelete(record.id);
                }
              }}
              okText="Đồng ý"
              cancelText="Hủy"
              disabled={hasChildren}
            >
              <Button
                danger
                icon={<DeleteOutlined />}
              // disabled={hasChildren}
              />
            </Popconfirm>
          </Space>
        );
      },
      width: 120,
      align: "center",
    },
  ];

  return (
    <div className="p-6">
      <Table
        columns={columns}
        dataSource={categories}
        rowKey="id"
        className="bg-white rounded-lg shadow"
        pagination={{
          ...pagination,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '30', '50'],
          showTotal: (total) => `Tổng ${total} danh mục`,
          onChange: (page, pageSize) => {
            // When page changes, call the onChange handler with the updated pagination
            onChange({ ...pagination, current: page, pageSize });
          },
          onShowSizeChange: (current, size) => {
            // When page size changes, update pagination
            onChange({ ...pagination, current: 1, pageSize: size });
          }
        }}
        onChange={(newPagination) => onChange(newPagination)}
        loading={loading}
      />
    </div>
  );
};

export default CategoryTable;