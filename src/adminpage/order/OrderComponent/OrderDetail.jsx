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
  DollarCircleOutlined,
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
  StopOutlined
} from "@ant-design/icons";
import dayjs from 'dayjs';
import 'dayjs/locale/vi';

// Thiết lập locale cho dayjs
dayjs.locale('vi');

const { Title, Text } = Typography;

const OrderDetail = ({ isOpen, onClose, order }) => {
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

  // Render status tag
  const renderStatusTag = (status) => {
    let color = '';
    let icon = null;
    let text = '';

    switch(status) {
      case 'Processing':
        color = 'processing';
        icon = <SyncOutlined spin />;
        text = 'Đang xử lý';
        break;
      case 'Completed':
        color = 'success';
        icon = <CheckCircleOutlined />;
        text = 'Hoàn thành';
        break;
      case 'Canceled':
        color = 'error';
        icon = <CloseCircleOutlined />;
        text = 'Đã hủy';
        break;
      default:
        color = 'default';
        text = status;
    }

    return (
      <Tag color={color} icon={icon}>
        {text}
      </Tag>
    );
  };

  // Hiển thị phương thức thanh toán Payos
  const renderPaymentMethod = () => {
    return 'Thanh toán qua Payos';
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
            src={record.image   }
            alt={text}
            style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4 }}
            onError={(e) => { e.target.src = "  " }}
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
      dataIndex: 'subtotal',
      key: 'subtotal',
      render: (subtotal) => <Text strong>{formatCurrency(subtotal)}</Text>,
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
              <Descriptions.Item label="Ngày đặt">{formatDate(order.orderDate)}</Descriptions.Item>
              <Descriptions.Item label="Trạng thái">{renderStatusTag(order.status)}</Descriptions.Item>
              <Descriptions.Item label="Thanh toán">
                <Tag color={order.isPaid ? "green" : "orange"} icon={order.isPaid ? <DollarCircleOutlined /> : <StopOutlined />}>
                  {order.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Phương thức thanh toán" span={2}>
                {renderPaymentMethod()}
              </Descriptions.Item>
              
            </Descriptions>
          </Card>
        </Col>

        <Col span={24}>
          <Card>
            <div className="mb-4">
              <Title level={5}><UserOutlined /> Thông tin khách hàng</Title>
              <div className="px-4">
                <p><strong>{order.customerName}</strong></p>
                <p><PhoneOutlined className="mr-2" /> {order.phone}</p>
                {order.email && <p><MailOutlined className="mr-2" /> {order.email}</p>}
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
              dataSource={order.items}
              columns={columns}
              pagination={false}
              rowKey="id"
            />

            <Divider />

            <div className="flex justify-end">
              <div style={{ width: 300 }}>
                <div className="flex justify-between mb-2">
                  <Text>Tổng tiền sản phẩm:</Text>
                  <Text strong>{formatCurrency(order.totalAmount)}</Text>
                </div>
                <div className="flex justify-between mb-2">
                  <Text>Phí vận chuyển:</Text>
                  <Text>{formatCurrency(order.shippingFee || 0)}</Text>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between mb-2">
                    <Text>Giảm giá:</Text>
                    <Text>-{formatCurrency(order.discount)}</Text>
                  </div>
                )}
                <Divider />
                <div className="flex justify-between">
                  <Title level={5}>Thành tiền:</Title>
                  <Title level={5} type="danger">{formatCurrency(order.finalAmount || order.totalAmount)}</Title>
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