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
  Tag
} from "antd";
import { 
  CloseCircleOutlined, 
  CheckCircleOutlined, 
  SyncOutlined, 
  ExclamationCircleOutlined
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
      title={<Title level={4}>Chỉnh sửa đơn hàng #{order?.orderCode}</Title>}
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Hủy
        </Button>,
        <Button 
          key="submit" 
          type="primary" 
          loading={loading}
          onClick={handleSubmit}
        >
          Lưu thay đổi
        </Button>
      ]}
      maskClosable={false}
      width={700} // Giảm độ rộng của modal
    >
      <Form form={form} layout="vertical">
        <Title level={5}>Thông tin đơn hàng</Title>
        
        <Row gutter={[16, 16]}>
          <Col span={14}> {/* Phần trạng thái đơn hàng */}
            <Form.Item
              label="Trạng thái đơn hàng"
              required
            >
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
                />
                
                <div style={{ display: 'flex', alignItems: 'center', marginTop: 8 }}>
                  <span>Trạng thái:</span>
                  <span style={{ marginLeft: 8 }}>
                    {renderStatusTag(sliderValueToStatus(orderStatus))}
                  </span>
                </div>
              </div>
            </Form.Item>
          </Col>
          
          <Col span={10}> {/* Nút hủy đơn */}
            <Form.Item label=" " colon={false}>
              <Button 
                danger 
                icon={<CloseCircleOutlined />} 
                onClick={handleCancel}
                style={{ width: '100%' }}
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
            <Space>
              {paymentStatuses.map(status => (
                <Radio.Button 
                  key={status.value} 
                  value={status.value} 
                  style={currentPaymentStatus === status.value ? status.activeStyle : {}}
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

        <Divider />
        <Title level={5}>Thông tin khách hàng</Title>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="customerName"
              label="Tên khách hàng"
              rules={[{ required: true, message: "Vui lòng nhập tên khách hàng" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="phone"
              label="Số điện thoại"
              rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="email"
          label="Email"
        >
          <Input />
        </Form.Item>

        <Divider />
        <Title level={5}>Địa chỉ giao hàng</Title>
        <Form.Item
          name="address"
          label="Địa chỉ"
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="note"
          label="Ghi chú"
        >
          <TextArea rows={3} />
        </Form.Item>

        <Text type="warning">
          Lưu ý: Không thể chỉnh sửa danh sách sản phẩm và giá trị đơn hàng.
        </Text>
        <br/>
        <Text type="secondary">
          Phương thức thanh toán: Payos
        </Text>
      </Form>
    </Modal>
  );
};

export default OrderEdit;