import React, { useState, useEffect } from "react";
import { Button, message, Space, Input, DatePicker, Select, Row, Col, Card, Statistic } from "antd";
import { FilterOutlined, ReloadOutlined, ShoppingOutlined, CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import OrderTable from "./OrderComponent/OderTable";
import OrderDetail from "./OrderComponent/OrderDetail";
import OrderEdit from "./OrderComponent/OrderEdit";
import dayjs from 'dayjs';
import 'dayjs/locale/vi';

// Thiết lập locale cho dayjs
dayjs.locale('vi');

const { RangePicker } = DatePicker;
const { Search } = Input;
const { Option } = Select;

const OrderManagement = () => {
  // Dữ liệu mẫu cho các đơn hàng
  const [orders, setOrders] = useState([
    {
      id: 1,
      orderCode: "ORD-001234",
      customerName: "Nguyễn Văn A",
      phone: "0987654321",
      email: "nguyenvana@gmail.com",
      address: "123 Đường Lê Lợi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh",
      orderDate: "2025-03-08T14:15:30",
      totalAmount: 1250000,
      shippingFee: 30000,
      discount: 50000,
      finalAmount: 1230000,
      paymentMethod: "COD",
      status: "Processing",
      isPaid: false,
      note: "Giao vào buổi chiều",
      items: [
        {
          id: 1,
          productId: 22,
          productName: "Sữa rửa mặt CeraVe",
          image: "https://example.com/image1.jpg",
          price: 350000,
          quantity: 2,
          subtotal: 700000
        },
        {
          id: 2,
          productId: 23,
          productName: "Tẩy tế bào chết Vedette",
          image: "https://example.com/image2.jpg",
          price: 550000,
          quantity: 1,
          subtotal: 550000
        }
      ]
    },
    {
      id: 2,
      orderCode: "ORD-001235",
      customerName: "Trần Thị B",
      phone: "0912345678",
      email: "tranthib@gmail.com",
      address: "456 Đường Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh",
      orderDate: "2025-03-07T09:30:15",
      totalAmount: 820000,
      shippingFee: 30000,
      discount: 0,
      finalAmount: 850000,
      paymentMethod: "Banking",
      status: "Completed",
      isPaid: true,
      note: "",
      items: [
        {
          id: 3,
          productId: 24,
          productName: "Kem dưỡng ẩm Clinique",
          image: "https://example.com/image3.jpg",
          price: 820000,
          quantity: 1,
          subtotal: 820000
        }
      ]
    },
    {
      id: 3,
      orderCode: "ORD-001236",
      customerName: "Lê Văn C",
      phone: "0978123456",
      email: "levanc@gmail.com",
      address: "789 Đường Điện Biên Phủ, Phường Đa Kao, Quận 1, TP. Hồ Chí Minh",
      orderDate: "2025-03-06T16:45:00",
      totalAmount: 1100000,
      shippingFee: 30000,
      discount: 100000,
      finalAmount: 1030000,
      paymentMethod: "Momo",
      status: "Canceled",
      isPaid: false,
      note: "Khách hàng đã hủy",
      items: [
        {
          id: 4,
          productId: 25,
          productName: "Kem dưỡng ẩm Kiehl's",
          image: "https://example.com/image4.jpg",
          price: 750000,
          quantity: 1,
          subtotal: 750000
        },
        {
          id: 5,
          productId: 27,
          productName: "Son dưỡng môi Laneige",
          image: "https://example.com/image5.jpg",
          price: 350000,
          quantity: 1,
          subtotal: 350000
        }
      ]
    }
  ]);

  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [dateRange, setDateRange] = useState([]);
  const [statusFilter, setStatusFilter] = useState(null);
  const [currentOrder, setCurrentOrder] = useState(null);
  
  // States for modal visibility
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  // Pagination state
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 3
  });

  // Thống kê đơn hàng
  const orderStats = {
    total: orders.length,
    processing: orders.filter(order => order.status === "Processing").length,
    completed: orders.filter(order => order.status === "Completed").length,
    canceled: orders.filter(order => order.status === "Canceled").length
  };

  // Giả lập việc tải dữ liệu
  const fetchOrders = () => {
    setLoading(true);
    
    // Giả lập độ trễ mạng
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Function to handle order view
  const handleViewOrder = (order) => {
    setCurrentOrder(order);
    setIsDetailModalVisible(true);
  };

  // Function to handle order edit
  const handleEditOrder = (order) => {
    setCurrentOrder(order);
    setIsEditModalVisible(true);
  };

  // Function to handle update order status
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setLoading(true);
    
    // Giả lập độ trễ mạng
    setTimeout(() => {
      const updatedOrders = orders.map(order => 
        order.id === orderId ? {...order, status: newStatus} : order
      );
      setOrders(updatedOrders);
      message.success(`Cập nhật trạng thái đơn hàng thành công`);
      setLoading(false);
    }, 500);
  };

  // Function to handle update order
  const handleUpdateOrder = (updatedOrder) => {
    setLoading(true);
    
    // Giả lập độ trễ mạng
    setTimeout(() => {
      const updatedOrders = orders.map(order => 
        order.id === updatedOrder.id ? updatedOrder : order
      );
      setOrders(updatedOrders);
      message.success("Cập nhật đơn hàng thành công");
      setLoading(false);
    }, 500);
  };

  // Handle search
  const handleSearch = (value) => {
    setSearchText(value);
    // Thêm logic tìm kiếm thực tế ở đây khi có API
  };

  // Handle date range change
  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
    // Thêm logic lọc theo ngày thực tế ở đây khi có API
  };

  // Handle status filter change
  const handleStatusFilterChange = (value) => {
    setStatusFilter(value);
    // Thêm logic lọc theo trạng thái thực tế ở đây khi có API
  };

  // Handle pagination changes
  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  // Handle reset filters
  const handleResetFilters = () => {
    setSearchText('');
    setDateRange([]);
    setStatusFilter(null);
    fetchOrders();
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Quản lý đơn hàng</h2>
      </div>

      {/* Statistics Cards */}
      <Row gutter={16} className="mb-6">
        <Col span={6}>
          <Card>
            <Statistic 
              title="Tổng đơn hàng"
              value={orderStats.total}
              prefix={<ShoppingOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic 
              title="Đang xử lý"
              value={orderStats.processing}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic 
              title="Hoàn thành"
              value={orderStats.completed}
              valueStyle={{ color: '#52c41a' }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic 
              title="Đã hủy"
              value={orderStats.canceled}
              valueStyle={{ color: '#ff4d4f' }}
              prefix={<CloseCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Filter Section */}
      <div className="bg-white p-4 mb-6 rounded-lg shadow flex items-center space-x-4 flex-wrap">
        <Search
          placeholder="Tìm kiếm mã đơn/tên khách hàng"
          allowClear
          enterButton
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onSearch={handleSearch}
          style={{ width: 250 }}
        />
        <RangePicker 
          placeholder={['Từ ngày', 'Đến ngày']}
          value={dateRange}
          onChange={handleDateRangeChange}
        />
        <Select
          placeholder="Trạng thái"
          allowClear
          style={{ width: 150 }}
          value={statusFilter}
          onChange={handleStatusFilterChange}
        >
          <Option value="Processing">Đang xử lý</Option>
          <Option value="Completed">Hoàn thành</Option>
          <Option value="Canceled">Đã hủy</Option>
        </Select>
        <Button 
          icon={<ReloadOutlined />} 
          onClick={handleResetFilters}
          title="Làm mới"
        >
          Làm mới
        </Button>
      </div>

      <OrderTable
        orders={orders}
        loading={loading}
        onView={handleViewOrder}
        onEdit={handleEditOrder}
        onUpdateStatus={handleUpdateOrderStatus}
        pagination={pagination}
        onChange={handleTableChange}
      />

      <OrderDetail
        isOpen={isDetailModalVisible}
        onClose={() => setIsDetailModalVisible(false)}
        order={currentOrder}
      />

      <OrderEdit
        isOpen={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        onSuccess={handleUpdateOrder}
        order={currentOrder}
      />
    </div>
  );
};

export default OrderManagement;