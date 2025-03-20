import React from "react";
import { 
  Modal, 
  Button, 
  Typography, 
  Descriptions, 
  Tag, 
  Table, 
  Divider, 
  Space, 
  Row,
  Col,
  Card
} from "antd";
import { 
  UserOutlined, 
  PhoneOutlined, 
  MailOutlined, 
  HomeOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
  LoadingOutlined
} from "@ant-design/icons";
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { DeliveryStatus, PaymentStatus } from "../../../utils/orderEnums";

// Thiết lập locale cho dayjs
dayjs.locale('vi');

const { Title, Text } = Typography;

const OrderDetail = ({ isOpen, onClose, order }) => {
  console.log("OrderDetail props:", { isOpen, order }); // Thêm log để debug
  
  if (!order) {
    return null;
  }

  // Format số tiền
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return dayjs(dateString).format('DD/MM/YYYY HH:mm');
    } catch (error) {
      return "Invalid Date";
    }
  };

  // Render delivery status tag
  const renderDeliveryStatusTag = (status) => {
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
      <Tag color={statusColor} icon={getStatusIcon(status)}>
        {statusName}
      </Tag>
    );
  };

  // Render payment status tag
  const renderPaymentStatusTag = (status) => {
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
      <Tag color={statusColor} icon={getPaymentIcon(status)}>
        {statusName}
      </Tag>
    );
  };

  // Columns cho bảng sản phẩm
  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'productName',
      key: 'productName',
      render: (text, record) => (
        <Space>
          <img 
            src={record.imageUrl}
            alt={text}
            style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4 }}
            onError={(e) => { e.target.src = "placeholder_image_url" }}
          />
          <div>
            <div>{text}</div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (price) => formatCurrency(price),
      width: 150,
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 100,
      align: 'center',
    },
    {
      title: 'Tổng tiền',
      key: 'subtotal',
      render: (_, record) => <Text strong>{formatCurrency(record.price * record.quantity)}</Text>,
      width: 150,
    },
  ];

  return (
    <Modal
      title={<Title level={4}>Chi tiết đơn hàng #{order.orderCode}</Title>}
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Đóng
        </Button>
      ]}
      width={800}
    >
      <Row gutter={[16, 24]}>
        <Col span={24}>
          <Card>
            <Descriptions title="Thông tin đơn hàng" bordered column={2}>
              <Descriptions.Item label="Mã đơn hàng">{order.orderCode}</Descriptions.Item>
              <Descriptions.Item label="Ngày đặt">{formatDate(order.createdDate)}</Descriptions.Item>
              <Descriptions.Item label="Trạng thái giao hàng">
                {renderDeliveryStatusTag(order.deliveryStatus)}
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái thanh toán">
                {renderPaymentStatusTag(order.paymentStatus)}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        <Col span={24}>
          <Card>
            <div className="mb-4">
              <Title level={5}><UserOutlined /> Thông tin khách hàng</Title>
              <div className="px-4">
                <p><strong>{order.fullName}</strong></p>
                <p><PhoneOutlined className="mr-2" /> {order.phoneNumber}</p>
              </div>
            </div>

            <div>
              <Title level={5}><HomeOutlined /> Địa chỉ giao hàng</Title>
              <div className="px-4">
                <p>{order.address}</p>
              </div>
            </div>
          </Card>
        </Col>

        <Col span={24}>
          <Card>
            <Title level={5}>Danh sách sản phẩm</Title>
            <Table 
              dataSource={order.orderDetails}
              columns={columns}
              pagination={false}
              rowKey="productId"
            />

            <Divider />

            <div className="flex justify-end">
              <div style={{ width: 300 }}>
                <div className="flex justify-between mb-2">
                  <Text className="text-md font-bold">Tổng sản phẩm:</Text>
                  <Text>
                    {order.orderDetails && Array.isArray(order.orderDetails) 
                      ? order.orderDetails.reduce((total, item) => total + item.quantity, 0) 
                      : 0} sản phẩm
                  </Text>
                </div>
                <Divider style={{ margin: '12px 0' }} />
                <div className="flex justify-between">
                  <Text className="text-md font-bold">Tổng tiền:</Text>
                  <Text>{formatCurrency(order.orderPrice)}</Text>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </Modal>
  );
};

export default OrderDetail;