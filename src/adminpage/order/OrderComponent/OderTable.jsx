import React from "react";
import { Table, Button, Space, Tag, Tooltip } from "antd";
import { 
  EyeOutlined, 
  EditOutlined, 
  CheckCircleOutlined, 
  SyncOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  LoadingOutlined
} from "@ant-design/icons";
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { DeliveryStatus, PaymentStatus } from "../../../utils/orderEnums";

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
    const statusName = DeliveryStatus.getStatusName(status);
    const statusColor = DeliveryStatus.getStatusColor(status);
    
    const getStatusIcon = (status) => {
      switch (status) {
        case DeliveryStatus.NOT_STARTED:
          return <ClockCircleOutlined />;
        case DeliveryStatus.PREPARING:
          return <SyncOutlined spin />;
        case DeliveryStatus.DELIVERING:
          return <LoadingOutlined />;
        case DeliveryStatus.DELIVERED:
          return <CheckCircleOutlined />;
        case DeliveryStatus.CANCELLED:
          return <CloseCircleOutlined />;
        default:
          return null;
      }
    };

    return (
      <Tag 
        color={statusColor} 
        icon={getStatusIcon(status)}
        style={{ 
          padding: '4px 12px',
          borderRadius: '4px',
          fontSize: '13px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          width: 'fit-content'
        }}
      >
        {statusName}
      </Tag>
    );
  };

  // Function to render payment status tag
  const renderPaymentTag = (status) => {
    const statusName = PaymentStatus.getStatusName(status);
    const statusColor = PaymentStatus.getStatusColor(status);
    
    const getPaymentIcon = (status) => {
      switch (status) {
        case PaymentStatus.PENDING:
          return <ClockCircleOutlined />;
        case PaymentStatus.SUCCESS:
          return <CheckCircleOutlined />;
        case PaymentStatus.FAILED:
          return <CloseCircleOutlined />;
        default:
          return null;
      }
    };

    return (
      <Tag 
        color={statusColor} 
        icon={getPaymentIcon(status)}
        style={{ 
          padding: '4px 12px',
          borderRadius: '4px',
          fontSize: '13px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          width: 'fit-content'
        }}
      >
        {statusName}
      </Tag>
    );
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
      dataIndex: "fullName",
      key: "fullName",
      sorter: (a, b) => a.customerName.localeCompare(b.customerName),
      width: 200,
    },

    {
      title: "Ngày đặt",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (date) => formatDate(date),
      sorter: (a, b) => new Date(a.orderDate) - new Date(b.orderDate),
      width: 150,
    },
    {
      title: "Tổng tiền",
      dataIndex: "orderPrice",
      key: "orderPrice",
      render: (amount) => formatPrice(amount),
      sorter: (a, b) => a.totalAmount - b.totalAmount,
      width: 150,
    },
    {
      title: "Trạng thái",
      dataIndex: "deliveryStatus",
      key: "deliveryStatus",
      render: (status) => renderStatusTag(status),
      filters: [
        { text: "Chưa bắt đầu", value: DeliveryStatus.NOT_STARTED },
        { text: "Đang chuẩn bị", value: DeliveryStatus.PREPARING },
        { text: "Đang giao hàng", value: DeliveryStatus.DELIVERING },
        { text: "Đã giao hàng", value: DeliveryStatus.DELIVERED },
        { text: "Đã hủy", value: DeliveryStatus.CANCELLED },
      ],
      onFilter: (value, record) => record.deliveryStatus === value,
      width: 150,
    },
    {
      title: "Thanh toán",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (status) => renderPaymentTag(status),
      filters: [
        { text: "Chờ thanh toán", value: PaymentStatus.PENDING },
        { text: "Thành công", value: PaymentStatus.SUCCESS },
        { text: "Thất bại", value: PaymentStatus.FAILED },
      ],
      onFilter: (value, record) => record.paymentStatus === value,
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