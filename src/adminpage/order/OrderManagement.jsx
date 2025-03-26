import { useState, useEffect } from "react";
import { Button, message, Space, Input, DatePicker, Select, Row, Col, Card, Statistic, InputNumber } from "antd";
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
  const [searchValue, setSearchValue] = useState('');
  const [dateRange, setDateRange] = useState([]);
  const [statusFilter, setStatusFilter] = useState(null);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [paymentStatusFilter, setPaymentStatusFilter] = useState(null);
  const [deliveryStatusFilter, setDeliveryStatusFilter] = useState(null);

  // Thêm state mới cho thống kê
  const [orderStats, setOrderStats] = useState({
    total: 0,
    notStarted: 0,
    preparing: 0,
    delivering: 0,
    delivered: 0,
    cancelled: 0
  });

  // States for modal visibility
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  // Pagination state
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 3
  });

  // Thêm state để lưu trữ tháng và năm được chọn
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Tháng hiện tại
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Năm hiện tại

  // Thêm state cho sắp xếp
  const [newestFirst, setNewestFirst] = useState(true);

  // Thêm hàm để lấy thống kê đơn hàng
  const fetchOrderStatistics = async () => {
    try {
      const response = await OrderAPI.getOrderStatistics(selectedMonth, selectedYear);

      if (response?.statusCode === 200 && response?.data) {
        setOrderStats({
          total: response.data.totalOrder,
          notStarted: response.data.notStartedOrder,
          preparing: response.data.preparingOrder,
          delivering: response.data.deliveringOrder,
          delivered: response.data.deliveredOrder,
          cancelled: response.data.cancelledOrder
        });
      }
    } catch (error) {
      console.error("Error fetching order statistics:", error);
      message.error("Không thể tải thống kê đơn hàng");
    }
  };

  // Cập nhật hàm fetchOrders để hỗ trợ các tham số filter
  const fetchOrders = async () => {
    try {
      setLoading(true);
      // console.log("Fetching orders with params:", {
      //   pageIndex: pagination.current,
      //   pageSize: pagination.pageSize,
      //   searchTerm: searchValue,
      //   deliveryStatus: deliveryStatusFilter,
      //   paymentStatus: paymentStatusFilter,
      //   newestFirst
      // });

      const response = await OrderAPI.getsOrders(
        pagination.current,
        pagination.pageSize,
        {
          searchText: searchValue,
          deliveryStatus: deliveryStatusFilter,
          paymentStatus: paymentStatusFilter,
          newestFirst
        }
      );

      if (response?.data) {
        // console.log("Received orders:", response.data);
        setOrders(response.data.data);
        setPagination(prev => ({
          ...prev,
          total: response.data.metaData.totalCount
        }));
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      message.error("Không thể tải danh sách đơn hàng");
    } finally {
      setLoading(false);
    }
  };

  // Thêm useEffect để lấy thống kê đơn hàng
  useEffect(() => {
    fetchOrderStatistics();
  }, [selectedMonth, selectedYear]);

  // Sửa lại useEffect
  useEffect(() => {
    // console.log("Effect triggered with:", {
    //   pageIndex: pagination.current,
    //   pageSize: pagination.pageSize,
    //   searchValue,
    //   deliveryStatus: deliveryStatusFilter,
    //   paymentStatus: paymentStatusFilter,
    //   newestFirst
    // });

    const timeoutId = setTimeout(() => {
      fetchOrders();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [
    pagination.current,
    pagination.pageSize,
    searchValue,
    deliveryStatusFilter,
    paymentStatusFilter,
    newestFirst
  ]);

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
        order.id === orderId ? { ...order, status: newStatus } : order
      );
      setOrders(updatedOrders);
      message.success(`Cập nhật trạng thái đơn hàng thành công`);
      setLoading(false);
    }, 500);
  };


  // Cập nhật hàm xử lý filter trạng thái giao hàng
  const handleDeliveryStatusFilterChange = (value) => {
    console.log("Delivery status changed:", value); // Thêm log để debug
    setDeliveryStatusFilter(value);
    setPagination(prev => ({ ...prev, current: 1 }));
  };

  // Cập nhật hàm xử lý filter trạng thái thanh toán
  const handlePaymentStatusFilterChange = (value) => {
    console.log("Payment status changed:", value); // Thêm log để debug
    setPaymentStatusFilter(value);
    setPagination(prev => ({ ...prev, current: 1 }));
  };

  // Sửa lại hàm handleSearch
  const handleSearch = (value) => {
    console.log("Search value:", value);
    setSearchValue(value);
    setPagination(prev => ({ ...prev, current: 1 }));
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

  // Cập nhật hàm reset filters
  const handleResetFilters = () => {
    setSearchText('');
    setSearchValue('');
    setDateRange([]);
    setDeliveryStatusFilter(null);
    setPaymentStatusFilter(null);
    setNewestFirst(true);
    setPagination(prev => ({
      ...prev,
      current: 1
    }));
  };

  // Thêm hàm xử lý khi thay đổi tháng
  const handleMonthChange = (value) => {
    setSelectedMonth(value);
  };

  // Thêm hàm xử lý khi thay đổi năm (dùng với InputNumber)
  const handleYearChange = (value) => {
    if (value && value > 0) {
      setSelectedYear(value);
    }
  };

  // Hàm xử lý khi cập nhật thành công từ OrderEdit
  const handleOrderEditSuccess = (updatedOrder) => {
    // Cập nhật state mới với đơn hàng đã cập nhật
    const updatedOrders = orders.map(order =>
      order.id === updatedOrder.id ? updatedOrder : order
    );

    setOrders(updatedOrders);

    // Cập nhật thống kê (nếu cần)
    fetchOrderStatistics();

    // Đóng modal
    setIsEditModalVisible(false);

    // Hiển thị thông báo thành công
    message.success("Đơn hàng đã được cập nhật thành công");
  };

  // Thêm hàm xử lý thay đổi sắp xếp
  const handleSortChange = (value) => {
    setNewestFirst(value);
    setPagination(prev => ({ ...prev, current: 1 }));
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Quản lý đơn hàng</h2>
      </div>

      {/* Thêm phần chọn tháng và năm */}
      <div className="mb-4 flex items-center">
        <span className="mr-2 font-medium">Thống kê theo:</span>
        <Select
          value={selectedMonth}
          onChange={handleMonthChange}
          style={{ width: 100, marginRight: 8 }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month => (
            <Option key={month} value={month}>Tháng {month}</Option>
          ))}
        </Select>

        <InputNumber
          value={selectedYear}
          onChange={handleYearChange}
          style={{ width: 100 }}
          min={2000}
          max={2100}
          placeholder="Năm"
        />

      </div>

      {/* Statistics Cards - Cập nhật sử dụng orderStats từ API */}
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

        <Select
          placeholder="Trạng thái giao hàng"
          allowClear
          style={{ width: 150 }}
          value={deliveryStatusFilter}
          onChange={handleDeliveryStatusFilterChange}
        >
          <Option value={DeliveryStatus.NOT_STARTED}>
            {DeliveryStatus.getStatusName(DeliveryStatus.NOT_STARTED)}
          </Option>
          <Option value={DeliveryStatus.PREPARING}>
            {DeliveryStatus.getStatusName(DeliveryStatus.PREPARING)}
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
          <Option value={PaymentStatus.SUCCESS}>
            {PaymentStatus.getStatusName(PaymentStatus.SUCCESS)}
          </Option>
          <Option value={PaymentStatus.FAILED}>
            {PaymentStatus.getStatusName(PaymentStatus.FAILED)}
          </Option>
        </Select>

        {/* Thêm Select cho sắp xếp */}
        <Select
          placeholder="Sắp xếp theo"
          style={{ width: 150 }}
          value={newestFirst}
          onChange={handleSortChange}
        >
          <Option value={true}>Mới nhất trước</Option>
          <Option value={false}>Cũ nhất trước</Option>
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
        onSuccess={handleOrderEditSuccess}
        order={currentOrder}
      />
    </div>
  );
};

export default OrderManagement;