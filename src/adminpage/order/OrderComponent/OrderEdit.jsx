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
  Card
} from "antd";
import { 
  CloseCircleOutlined, 
  CheckCircleOutlined, 
  SyncOutlined, 
  ExclamationCircleOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  FileTextOutlined
} from "@ant-design/icons";

const { TextArea } = Input;
const { Title, Text } = Typography;
const { Option } = Select;

const OrderEdit = ({ isOpen, onClose, onSuccess, order }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState(0);
  const [canceled, setCanceled] = useState(false);
  const [currentPaymentStatus, setCurrentPaymentStatus] = useState('processing');

  // Định nghĩa các trạng thái đơn hàng (rút gọn các label)
  const orderStatuses = [
    { value: 0, label: "Chờ xử lý", code: "NotPrepared" },
    { value: 1, label: "Chuẩn bị", code: "Preparing" },
    { value: 2, label: "Đang giao", code: "Shipping" },
    { value: 3, label: "Đã giao", code: "Delivered" }
  ];

  // Định nghĩa các trạng thái thanh toán - chỉ giữ 3 trạng thái
  const paymentStatuses = [
    { 
      value: "processing", 
      label: "Đang xử lý", 
      color: "processing", 
      icon: <SyncOutlined spin />, 
      activeStyle: { backgroundColor: '#1677ff', color: 'white' }
    },
    { 
      value: "completed", 
      label: "Hoàn thành", 
      color: "success", 
      icon: <CheckCircleOutlined />, 
      activeStyle: { backgroundColor: '#52c41a', color: 'white' }
    },
    { 
      value: "failed", 
      label: "Thất bại", 
      color: "error", 
      icon: <ExclamationCircleOutlined />, 
      activeStyle: { backgroundColor: '#ff4d4f', color: 'white' }
    }
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
    if (canceled) return "Canceled";
    switch (value) {
      case 0: return "NotPrepared";
      case 1: return "Preparing";
      case 2: return "Shipping";
      case 3: return "Delivered";
      default: return "NotPrepared";
    }
  };

  // Component để hiển thị tag cho trạng thái đơn hàng
  const renderStatusTag = (status) => {
    const statusConfig = {
      "NotPrepared": { color: "default", text: "Chờ xử lý" },
      "Preparing": { color: "processing", text: "Đang chuẩn bị" },
      "Shipping": { color: "warning", text: "Đang giao" },
      "Delivered": { color: "success", text: "Đã giao" },
      "Canceled": { color: "error", text: "Đã hủy" }
    };

    const config = statusConfig[status] || { color: "default", text: status };

    return (
      <Tag color={config.color}>
        {config.text}
      </Tag>
    );
  };

  useEffect(() => {
    if (isOpen && order) {
      // Đặt trạng thái đơn hàng
      const sliderValue = statusToSliderValue(order.status);
      setOrderStatus(sliderValue);
      setCanceled(order.status === "Canceled");

      // Convert boolean isPaid to string payment status
      let paymentStatus = "processing";
      if (order.isPaid === true) {
        paymentStatus = "completed";
      }
      
      setCurrentPaymentStatus(paymentStatus);

      form.setFieldsValue({
        paymentStatus: paymentStatus,
        customerName: order.customerName,
        phone: order.phone,
        email: order.email || '',
        address: order.address || '',
        note: order.note || ''
      });
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
  
  const handlePaymentStatusChange = (e) => {
    setCurrentPaymentStatus(e.target.value);
  };

  const handleSubmit = () => {
    form.validateFields()
      .then(values => {
        setLoading(true);
        
        // Tạo đối tượng đơn hàng cập nhật
        const status = sliderValueToStatus(orderStatus);
        
        // Convert string payment status to boolean isPaid
        const isPaid = values.paymentStatus === "completed";
        
        const updatedOrder = {
          ...order,
          status: status,
          isPaid: isPaid,
          paymentStatus: values.paymentStatus, // Lưu trữ trạng thái thanh toán chi tiết
          customerName: values.customerName,
          phone: values.phone,
          email: values.email,
          address: values.address,
          note: values.note
        };

        // Giả lập API call
        setTimeout(() => {
          onSuccess(updatedOrder);
          onClose();
          setLoading(false);
        }, 500);
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
          <Title level={4} style={{ margin: 0 }}>Đơn hàng #{order?.orderCode}</Title>
          <Text type="secondary" style={{ fontSize: '14px' }}>
            Thanh toán qua: <Tag color="blue">Payos</Tag>
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

          <Form.Item
            name="paymentStatus"
            label="Trạng thái thanh toán"
            rules={[{ required: true, message: "Vui lòng chọn trạng thái thanh toán" }]}
          >
            <Radio.Group buttonStyle="solid" onChange={handlePaymentStatusChange}>
              <Space size="large">
                {paymentStatuses.map(status => (
                  <Radio.Button 
                    key={status.value} 
                    value={status.value} 
                    style={currentPaymentStatus === status.value ? {...status.activeStyle, height: '40px', padding: '0 16px'} : {height: '40px', padding: '0 16px'}}
                  >
                    <Space>
                      {status.icon}
                      {status.label}
                    </Space>
                  </Radio.Button>
                ))}
              </Space>
            </Radio.Group>
          </Form.Item>
        </Card>

        <Card 
          title={<Title level={5} style={{ margin: 0 }}>Thông tin khách hàng</Title>}
          style={{ marginBottom: 24 }}
          bodyStyle={{ padding: '16px' }}
        >
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="customerName"
                label="Tên khách hàng"
                rules={[{ required: true, message: "Vui lòng nhập tên khách hàng" }]}
              >
                <Input prefix={<UserOutlined />} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="Số điện thoại"
                rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
              >
                <Input prefix={<PhoneOutlined />} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="email"
            label="Email"
          >
            <Input prefix={<MailOutlined />} />
          </Form.Item>
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

          <Form.Item
            name="note"
            label="Ghi chú"
          >
            <div style={{ position: 'relative' }}>
              <FileTextOutlined style={{ position: 'absolute', left: '10px', top: '12px', color: '#bfbfbf', zIndex: 1 }} />
              <TextArea rows={3} style={{ paddingLeft: '30px' }} />
            </div>
          </Form.Item>
        </Card>

        <div style={{ padding: '12px', backgroundColor: '#fffbe6', borderRadius: '4px', marginTop: '16px' }}>
          <Text type="warning" style={{ display: 'block', marginBottom: '4px' }}>
            <ExclamationCircleOutlined style={{ marginRight: '8px' }} />
            Lưu ý: Không thể chỉnh sửa danh sách sản phẩm và giá trị đơn hàng.
          </Text>
        </div>
      </Form>
    </Modal>
  );
};

export default OrderEdit;