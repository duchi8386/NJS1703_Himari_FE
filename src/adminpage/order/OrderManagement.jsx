import  { useState, useEffect } from "react";
import { Button, message, Space, Input, DatePicker, Select, Row, Col, Card, Statistic } from "antd";
import { FilterOutlined, ReloadOutlined, ShoppingOutlined, CheckCircleOutlined, CloseCircleOutlined, ClockCircleOutlined, SyncOutlined, LoadingOutlined } from "@ant-design/icons";
import OrderTable from "./OrderComponent/OderTable";
import OrderDetail from "./OrderComponent/OrderDetail";
import OrderEdit from "./OrderComponent/OrderEdit";
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import OrderAPI from "../../service/api/orderApi";
import { DeliveryStatus, PaymentStatus } from '../../utils/orderEnums';

// Thiết lập locale cho dayjs
dayjs.locale('vi');

const { RangePicker } = DatePicker;
const { Search } = Input;
const { Option } = Select;

const OrderManagement = () => {
  // Thay đổi state orders thành rỗng ban đầu
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [dateRange, setDateRange] = useState([]);
  const [statusFilter, setStatusFilter] = useState(null);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [paymentStatusFilter, setPaymentStatusFilter] = useState(null);
  const [deliveryStatusFilter, setDeliveryStatusFilter] = useState(null);
  
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
    notStarted: orders.filter(order => order.deliveryStatus === DeliveryStatus.NOT_STARTED).length,
    preparing: orders.filter(order => order.deliveryStatus === DeliveryStatus.PREPARING).length,
    delivering: orders.filter(order => order.deliveryStatus === DeliveryStatus.DELIVERING).length,
    delivered: orders.filter(order => order.deliveryStatus === DeliveryStatus.DELIVERED).length,
    cancelled: orders.filter(order => order.deliveryStatus === DeliveryStatus.CANCELLED).length,
  };

  // Cập nhật hàm fetchOrders để gọi API
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await OrderAPI.getsOrders(
        pagination.current,
        pagination.pageSize,
        searchText
      );
      
      setOrders(response.data.data);
      setPagination({
        ...pagination,
        current: response.data.metaData.currentPage,
        pageSize: response.data.metaData.pageSize,
        total: response.data.metaData.totalCount
      });
    } catch (error) {
      message.error("Không thể tải danh sách đơn hàng");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Thêm useEffect để theo dõi các thay đổi về filter
  useEffect(() => {
    fetchOrders();
  }, [pagination.current, pagination.pageSize, searchText]);

  // Function to handle order view
  const handleViewOrder = async (order) => {
    try {
      console.log("Viewing order:", order);
      setLoading(true);
      const response = await OrderAPI.getOrderById(order.id);
      console.log("API Response:", response);
      
      if (response.data) {
        console.log("Setting current order:", response.data);
        setCurrentOrder(response.data);
        setIsDetailModalVisible(true);
      } else {
        message.error("Không thể tải thông tin chi tiết đơn hàng");
      }
    } catch (error) {
      console.error("Error fetching order detail:", error);
      message.error("Đã có lỗi xảy ra khi tải thông tin đơn hàng");
    } finally {
      setLoading(false);
    }
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

  // Handle delivery status filter change
  const handleDeliveryStatusFilterChange = (value) => {
    setDeliveryStatusFilter(value);
    // Thêm logic lọc theo trạng thái giao hàng
  };

  // Handle payment status filter change
  const handlePaymentStatusFilterChange = (value) => {
    setPaymentStatusFilter(value);
    // Thêm logic lọc theo trạng thái thanh toán
  };

  // Handle pagination changes
  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  // Handle reset filters
  const handleResetFilters = () => {
    setSearchText('');
    setDateRange([]);
    setDeliveryStatusFilter(null);
    setPaymentStatusFilter(null);
    fetchOrders();
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Quản lý đơn hàng</h2>
      </div>

      {/* Statistics Cards */}
      <Row gutter={16} className="mb-6">
        <Col span={4}>
          <Card>
            <Statistic 
              title="Tổng đơn hàng"
              value={orderStats.total}
              prefix={<ShoppingOutlined style={{ color: '#1890ff' }} />}
              valueStyle={{ color: '#1890ff', fontWeight: 'bold' }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic 
              title="Chưa bắt đầu"
              value={orderStats.notStarted}
              prefix={<ClockCircleOutlined style={{ color: '#d9d9d9' }} />}
              valueStyle={{ color: '#d9d9d9' }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic 
              title="Đang chuẩn bị"
              value={orderStats.preparing}
              prefix={<SyncOutlined spin style={{ color: '#faad14' }} />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic 
              title="Đang giao hàng"
              value={orderStats.delivering}
              prefix={<LoadingOutlined style={{ color: '#1890ff' }} />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic 
              title="Đã giao hàng"
              value={orderStats.delivered}
              prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic 
              title="Đã hủy"
              value={orderStats.cancelled}
              prefix={<CloseCircleOutlined style={{ color: '#ff4d4f' }} />}
              valueStyle={{ color: '#ff4d4f' }}
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
          placeholder="Trạng thái giao hàng"
          allowClear
          style={{ width: 150 }}
          value={statusFilter}
          onChange={handleStatusFilterChange}
        >
          <Option value={DeliveryStatus.PENDING}>
            {DeliveryStatus.getStatusName(DeliveryStatus.PENDING)}
          </Option>
          <Option value={DeliveryStatus.DELIVERING}>
            {DeliveryStatus.getStatusName(DeliveryStatus.DELIVERING)}
          </Option>
          <Option value={DeliveryStatus.DELIVERED}>
            {DeliveryStatus.getStatusName(DeliveryStatus.DELIVERED)}
          </Option>
          <Option value={DeliveryStatus.CANCELLED}>
            {DeliveryStatus.getStatusName(DeliveryStatus.CANCELLED)}
          </Option>
        </Select>
        <Select
          placeholder="Trạng thái thanh toán"
          allowClear
          style={{ width: 150 }}
          value={paymentStatusFilter}
          onChange={handlePaymentStatusFilterChange}
        >
          <Option value={PaymentStatus.PENDING}>
            {PaymentStatus.getStatusName(PaymentStatus.PENDING)}
          </Option>
          <Option value={PaymentStatus.PAID}>
            {PaymentStatus.getStatusName(PaymentStatus.PAID)}
          </Option>
          <Option value={PaymentStatus.CONFIRMED}>
            {PaymentStatus.getStatusName(PaymentStatus.CONFIRMED)}
          </Option>
          <Option value={PaymentStatus.FAILED}>
            {PaymentStatus.getStatusName(PaymentStatus.FAILED)}
          </Option>
          <Option value={PaymentStatus.REFUNDED}>
            {PaymentStatus.getStatusName(PaymentStatus.REFUNDED)}
          </Option>
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