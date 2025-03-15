import React from "react";
import { Table, Button, Space, Popconfirm, Tooltip } from "antd";
import { 
  EditOutlined, 
  DeleteOutlined, 
  LinkOutlined, 
  NotificationOutlined,
  GlobalOutlined,
  UserOutlined
} from "@ant-design/icons";

// Helper function to format date without date-fns dependency
const formatDate = (dateString) => {
  if (!dateString) return "";
  
  const date = new Date(dateString);
  if (isNaN(date)) return dateString;
  
  // Format as DD/MM/YYYY HH:MM
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

const NotificationTable = ({ 
  notifications, 
  loading, 
  onEdit, 
  onDelete, 
  onSendToUser,
  onSendToAll,
  pagination, 
  onChange 
}) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
      render: (title) => (
        <span style={{ fontWeight: 500, color: "#1890ff" }}>{title}</span>
      ),
    },
    {
      title: "Nội dung",
      dataIndex: "message",
      key: "message",
      ellipsis: true,
      width: 450,
    },
    {
      title: "Đường dẫn",
      dataIndex: "href",
      key: "href",
      render: (href) => href ? (
        <Button 
          type="link" 
          icon={<LinkOutlined />}
          href={href} 
          target="_blank"
          size="small"
        >
          Xem liên kết
        </Button>
      ) : (
        <span className="text-gray-400">Không có</span>
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (date) => formatDate(date),
      sorter: (a, b) => {
        const dateA = a.createdDate ? new Date(a.createdDate) : null;
        const dateB = b.createdDate ? new Date(b.createdDate) : null;
        if (!dateA && !dateB) return 0;
        if (!dateA) return -1;
        if (!dateB) return 1;
        return dateA - dateB;
      },
      width: 180,
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Tooltip title="Gửi cho người dùng cụ thể">
            <Button
              type="default"
              style={{ backgroundColor: "#722ed1", borderColor: "#722ed1", color: "#fff" }}
              icon={<UserOutlined />}
              onClick={() => onSendToUser(record)}
            />
          </Tooltip>
          <Tooltip title="Gửi cho tất cả người dùng">
            <Button
              type="default"
              style={{ backgroundColor: "#13c2c2", borderColor: "#13c2c2", color: "#fff" }}
              icon={<GlobalOutlined />}
              onClick={() => onSendToAll(record)}
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Popconfirm
              title="Bạn có chắc muốn xóa thông báo này?"
              onConfirm={() => onDelete(record.id)}
              okText="Đồng ý"
              cancelText="Hủy"
            >
              <Button danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
      width: 220,
      align: "center",
    },
  ];

  return (
    <div className="p-4">
      <Table
        columns={columns}
        dataSource={notifications}
        rowKey="id"
        loading={loading}
        className="bg-white rounded-lg shadow"
        pagination={{
          ...pagination,
          showSizeChanger: true,
          showTotal: (total) => `Tổng ${total} thông báo`,
          pageSizeOptions: ["10", "20", "50", "100"],
        }}
        onChange={onChange}
      />
    </div>
  );
};

export default NotificationTable;