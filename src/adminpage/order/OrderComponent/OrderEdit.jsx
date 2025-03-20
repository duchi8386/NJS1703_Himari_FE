/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { 
  Modal, 
  Form, 
  Select, 
  Input, 
  Button,
  Typography,
  Divider,
  Row,
  Col,
  Radio,
  Slider,
  Space,
  Tag,
  Card,
  Table
} from "antd";
import { 
  CloseCircleOutlined, 
  CheckCircleOutlined, 
  SyncOutlined, 
  ExclamationCircleOutlined,
  UserOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  FileTextOutlined
} from "@ant-design/icons";
import { DeliveryStatus, PaymentStatus } from "../../../utils/orderEnums";
import OrderAPI from "../../../service/api/orderApi";
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { message } from "antd";

// Thiết lập locale cho dayjs
dayjs.locale('vi');

const { TextArea } = Input;
const { Title, Text } = Typography;
const { Option } = Select;

const OrderEdit = ({ isOpen, onClose, onSuccess, order }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState(0);
  const [canceled, setCanceled] = useState(false);
  const [currentPaymentStatus, setCurrentPaymentStatus] = useState('processing');
  const [orderDetail, setOrderDetail] = useState(null);

  // Định nghĩa các trạng thái đơn hàng (rút gọn các label)
  const orderStatuses = [
    { value: 0, label: "Chờ xử lý", code: "NotPrepared" },
    { value: 1, label: "Chuẩn bị", code: "Preparing" },
    { value: 2, label: "Đang giao", code: "Shipping" },
    { value: 3, label: "Đã giao", code: "Delivered" }
  ];

  
  // Chuyển đổi từ mã trạng thái sang giá trị slider
  const statusToSliderValue = (status) => {
    switch (status) {
      case "NotPrepared": return 0;
      case "Preparing": return 1;
      case "Shipping": return 2;
      case "Delivered": return 3;
      case "Canceled": 
        setCanceled(true);
        return 0;
      default: return 0;
    }
  };

  // Chuyển đổi từ giá trị slider sang mã trạng thái
  const sliderValueToStatus = (value) => {
    if (canceled) return DeliveryStatus.CANCELLED;
    switch (value) {
      case 0: return DeliveryStatus.NOT_STARTED;
      case 1: return DeliveryStatus.PREPARING;
      case 2: return DeliveryStatus.DELIVERING;
      case 3: return DeliveryStatus.DELIVERED;
      default: return DeliveryStatus.NOT_STARTED;
    }
  };

  // Component để hiển thị tag cho trạng thái đơn hàng
  const renderStatusTag = (status) => {
    return (
      <Tag color={DeliveryStatus.getStatusColor(status)}>
        {DeliveryStatus.getStatusName(status)}
      </Tag>
    );
  };

  // Thêm hàm formatDate vào component
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return dayjs(dateString).format('DD/MM/YYYY HH:mm');
    } catch (error) {
      return "Invalid Date";
    }
  };

  // Thêm hàm formatCurrency vào component
  const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return "N/A";
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  useEffect(() => {
    if (isOpen && order) {
      // Gọi API để lấy dữ liệu chi tiết đơn hàng
      setLoading(true);
      OrderAPI.getOrderById(order.id)
        .then(response => {
          if (response.data) {
            setOrderDetail(response.data);
            console.log("Order detail from API:", response.data);
            
            // Sử dụng enum từ file orderEnums.js
            let statusValue = 0;
            
            // Ánh xạ deliveryStatus từ order sang giá trị slider
            switch (Number(response.data.deliveryStatus)) {
              case DeliveryStatus.NOT_STARTED:
                statusValue = 0;
                break;
              case DeliveryStatus.PREPARING:
                statusValue = 1;
                break;
              case DeliveryStatus.DELIVERING:
                statusValue = 2;
                break;
              case DeliveryStatus.DELIVERED:
                statusValue = 3;
                break;
              case DeliveryStatus.CANCELLED:
                setCanceled(true);
                statusValue = 0;
                break;
              default:
                statusValue = 0;
            }
            
            setOrderStatus(statusValue);
            setCanceled(Number(response.data.deliveryStatus) === DeliveryStatus.CANCELLED);

            // Lấy trạng thái thanh toán
            let paymentStatus = response.data.paymentStatus || PaymentStatus.PENDING;
            setCurrentPaymentStatus(paymentStatus);

            form.setFieldsValue({
              paymentStatus: paymentStatus,
              address: response.data.address || '',
            });
          }
        })
        .catch(error => {
          console.error("Error fetching order details:", error);
          message.error("Không thể tải thông tin chi tiết đơn hàng");
        })
        .finally(() => setLoading(false));
    } else {
      // Reset state khi đóng modal
      setOrderDetail(null);
    }
  }, [isOpen, order, form]);

  const handleStatusChange = (value) => {
    if (value < orderStatus) {
      // Không cho phép quay lại trạng thái trước đó
      return;
    }
    setOrderStatus(value);
    setCanceled(false);
  };

  const handleCancel = () => {
    setCanceled(true);
  };

  const handleSubmit = () => {
    form.validateFields()
      .then(values => {
        setLoading(true);
        
        // Chỉ cập nhật địa chỉ và trạng thái đơn hàng
        const updateData = {
          address: values.address,
          deliveryStatus: sliderValueToStatus(orderStatus),
        };
        
        // Gọi API cập nhật đơn hàng
        OrderAPI.updateOrder(order.id, updateData)
          .then(response => {
            const fullUpdatedOrder = {
              ...orderDetail, // Dữ liệu chi tiết từ API
              ...updateData,   // Dữ liệu đã cập nhật
              id: order.id,    // Đảm bảo ID vẫn giữ nguyên
            };
            
            // Gọi callback thành công với đơn hàng đã cập nhật
            onSuccess(fullUpdatedOrder);
          })
          .catch(error => {
            message.error("Cập nhật đơn hàng thất bại: " + error.message);
          })
          .finally(() => {
            setLoading(false);
          });
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  // Tùy chỉnh để hiển thị marks của slider ngắn hơn
  const customMarks = {
    0: { label: <span style={{ fontSize: '12px' }}>Chờ xử lý</span>, style: { transform: 'translateX(-15%)' } },
    1: { label: <span style={{ fontSize: '12px' }}>Chuẩn bị</span>, style: { transform: 'translateX(-25%)' } },
    2: { label: <span style={{ fontSize: '12px' }}>Đang giao</span>, style: { transform: 'translateX(-25%)' } },
    3: { label: <span style={{ fontSize: '12px' }}>Đã giao</span>, style: { transform: 'translateX(-15%)' } },
  };

  // Custom style cho slider
  const sliderTrackStyle = { backgroundColor: canceled ? '#f5f5f5' : '#1677ff' };
  const sliderHandleStyle = { borderColor: canceled ? '#d9d9d9' : '#1677ff' };

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',paddingRight: '24px' }}>
          <Title level={4} style={{ margin: 0 }}>Đơn hàng #{orderDetail?.orderCode || order?.orderCode}</Title>
          <Text type="secondary" style={{ fontSize: '14px' }}>
            Ngày đặt: {formatDate(orderDetail?.createdDate || order?.createdDate)}
          </Text>
        </div>
      }
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose} size="large">
          Hủy
        </Button>,
        <Button 
          key="submit" 
          type="primary" 
          loading={loading}
          onClick={handleSubmit}
          size="large"
        >
          Lưu thay đổi
        </Button>
      ]}
      maskClosable={false}
      width={800}
      bodyStyle={{ padding: '24px' }}
    >
      <Form form={form} layout="vertical" size="large">
        <Card 
          title={<Title level={5} style={{ margin: 0 }}>Trạng thái đơn hàng</Title>}
          style={{ marginBottom: 24 }}
          bodyStyle={{ padding: '16px' }}
        >
          <Row gutter={[24, 24]}>
            <Col span={18}>
              <Form.Item label="Tiến trình đơn hàng" required>
                <div>
                  <Slider
                    value={orderStatus}
                    onChange={handleStatusChange}
                    min={0}
                    max={3}
                    step={1}
                    marks={customMarks}
                    disabled={canceled}
                    tooltip={{
                      formatter: (value) => orderStatuses.find(s => s.value === value)?.label
                    }}
                    trackStyle={sliderTrackStyle}
                    handleStyle={sliderHandleStyle}
                    style={{ marginBottom: 24 }}
                  />
                  
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Text strong>Trạng thái hiện tại:</Text>
                    <span style={{ marginLeft: 12 }}>
                      {renderStatusTag(sliderValueToStatus(orderStatus))}
                    </span>
                  </div>
                </div>
              </Form.Item>
            </Col>
            
            <Col span={6}>
              <Form.Item label=" " colon={false}>
                <Button 
                  danger 
                  icon={<CloseCircleOutlined />} 
                  onClick={handleCancel}
                  style={{ width: '100%', height: '40px' }}
                >
                  Hủy đơn hàng
                </Button>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <Text type="secondary">Trạng thái thanh toán:</Text>
              <Tag color={PaymentStatus.getStatusColor(order?.paymentStatus)}>
                {PaymentStatus.getStatusName(order?.paymentStatus)}
              </Tag>
            </div>
          </Form.Item>
        </Card>

        <Card 
          title={<Title level={5} style={{ margin: 0 }}>Thông tin khách hàng</Title>}
          style={{ marginBottom: 24 }}
          bodyStyle={{ padding: '16px' }}
        >
          <Row gutter={24}>
            <Col span={12}>
              <div className="mb-4">
                <UserOutlined style={{ marginRight: 8 , fontSize: '16px'}} />
                <Text  className="font-bold">Tên khách hàng:</Text>
                <div><Text strong>{orderDetail?.fullName || order?.fullName}</Text></div>
              </div>
            </Col>
            <Col span={12}>
              <div className="mb-4">
                <PhoneOutlined style={{ marginRight: 8 , fontSize: '16px'}} />
                <Text className="font-bold" >Số điện thoại:</Text>
                <div><Text strong>{orderDetail?.phoneNumber || order?.phoneNumber}</Text></div>
              </div>
            </Col>
          </Row>
        </Card>

        <Card 
          title={<Title level={5} style={{ margin: 0 }}>Địa chỉ giao hàng</Title>}
          style={{ marginBottom: 24 }}
          bodyStyle={{ padding: '16px' }}
        >
          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
          >
            <Input prefix={<EnvironmentOutlined />} />
          </Form.Item>
        </Card>
        
        <Card 
          title={<Title level={5} style={{ margin: 0 }}>Thông tin đơn hàng</Title>}
          style={{ marginBottom: 24 }}
          bodyStyle={{ padding: '16px' }}
        >
          <Table 
            dataSource={orderDetail?.orderDetails || []}
            columns={[
              {
                title: 'Sản phẩm',
                dataIndex: 'productName',
                key: 'productName',
                render: (text, record) => {
                  console.log("Record in table:", record);
                  const name = text || record.name || record.title || record.product?.name || "Không có tên";
                  const image = record.image || record.imageUrl || record.product?.image || "";
                  return (
                    <Space>
                      <img 
                        src={image}
                        alt={name}
                        style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4 }}
                        onError={(e) => { e.target.src = "placeholder_image_url" }}
                      />
                      <div>{name}</div>
                    </Space>
                  );
                },
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
              }
            ]}
            loading={loading}
            pagination={false}
            rowKey="productId"
            size="small"
          />
          
          <Divider />
          
          <div className="flex justify-end">
            <div style={{ width: 300 }}>
              <div className="flex justify-between">
                <Text className="text-md font-bold">Tổng tiền:</Text>
                <Text>{formatCurrency(order?.orderPrice || 0)}</Text>
              </div>
            </div>
          </div>
        </Card>

        <div style={{ padding: '12px', backgroundColor: '#fffbe6', borderRadius: '4px', marginTop: '16px' }}>
          <Text type="warning" style={{ display: 'block', marginBottom: '4px' }}>
            <ExclamationCircleOutlined style={{ marginRight: '8px' }} />
            Lưu ý: Bạn chỉ có thể thay đổi địa chỉ giao hàng và trạng thái đơn hàng.
          </Text>
        </div>
      </Form>
    </Modal>
  );
};

export default OrderEdit;