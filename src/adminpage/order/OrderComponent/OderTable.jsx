import React from "react";
import { Table, Button, Space, Tag, Tooltip } from "antd";
import { 
  EyeOutlined, 
  EditOutlined, 
  CheckCircleOutlined, 
  SyncOutlined,
  CloseCircleOutlined,
  DollarCircleOutlined,
  StopOutlined
} from "@ant-design/icons";
import dayjs from 'dayjs';
import 'dayjs/locale/vi';

// Thiết lập locale cho dayjs
dayjs.locale('vi');

const OrderTable = ({ 
  orders, 
  loading, 
  onView, 
  onEdit, 
  onUpdateStatus, 
  pagination, 
  onChange 
}) => {
  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return dayjs(dateString).format('DD/MM/YYYY HH:mm');
    } catch (error) {
      return "Invalid Date";
    }
  };

  // Function to render status tag with appropriate color
  const renderStatusTag = (status) => {
    const statusConfig = {
      "Processing": { color: "processing", icon: <SyncOutlined spin />, text: "Đang xử lý" },
      "Completed": { color: "success", icon: <CheckCircleOutlined />, text: "Hoàn thành" },
      "Canceled": { color: "error", icon: <CloseCircleOutlined />, text: "Đã hủy" }
    };

    const config = statusConfig[status] || { color: "default", icon: null, text: status };

    return (
      <Tag color={config.color} icon={config.icon}>
        {config.text}
      </Tag>
    );
  };

  // Function to render payment status tag
  const renderPaymentTag = (isPaid) => {
    if (isPaid) {
      return <Tag color="green" icon={<DollarCircleOutlined />}>Đã thanh toán</Tag>;
    } else {
      return <Tag color="volcano" icon={<StopOutlined />}>Chưa thanh toán</Tag>;
    }
  };

  // Function to format price as VND
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "orderCode",
      key: "orderCode",
      render: (code) => (
        <span style={{ fontWeight: 500, color: "#1890ff" }}>{code}</span>
      ),
      width: 150,
    },
    {
      title: "Khách hàng",
      dataIndex: "customerName",
      key: "customerName",
      sorter: (a, b) => a.customerName.localeCompare(b.customerName),
      width: 200,
    },
    {
      title: "SĐT",
      dataIndex: "phone",
      key: "phone",
      width: 120,
    },
    {
      title: "Ngày đặt",
      dataIndex: "orderDate",
      key: "orderDate",
      render: (date) => formatDate(date),
      sorter: (a, b) => new Date(a.orderDate) - new Date(b.orderDate),
      width: 150,
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (amount) => formatPrice(amount),
      sorter: (a, b) => a.totalAmount - b.totalAmount,
      width: 150,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => renderStatusTag(status),
      filters: [
        { text: "Đang xử lý", value: "Processing" },
        { text: "Hoàn thành", value: "Completed" },
        { text: "Đã hủy", value: "Canceled" },
      ],
      onFilter: (value, record) => record.status === value,
      width: 150,
    },
    {
      title: "Thanh toán",
      dataIndex: "isPaid",
      key: "isPaid",
      render: (isPaid) => renderPaymentTag(isPaid),
      filters: [
        { text: "Đã thanh toán", value: true },
        { text: "Chưa thanh toán", value: false },
      ],
      onFilter: (value, record) => record.isPaid === value,
      width: 150,
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Tooltip title="Xem chi tiết">
            <Button
              type="primary"
              icon={<EyeOutlined />}
              onClick={() => onView(record)}
            />
          </Tooltip>
          <Tooltip title="Chỉnh sửa">
            <Button
              icon={<EditOutlined />}
              onClick={() => onEdit(record)}
            />
          </Tooltip>
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
        dataSource={orders}
        rowKey="id"
        loading={loading}
        className="bg-white rounded-lg shadow"
        pagination={{
          ...pagination,
          showSizeChanger: true,
          showTotal: (total) => `Tổng ${total} đơn hàng`,
        }}
        onChange={onChange}
      />
    </div>
  );
};

export default OrderTable;