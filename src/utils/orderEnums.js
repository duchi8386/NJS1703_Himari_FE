export const DeliveryStatus = {
  NOT_STARTED: 0,
  PREPARING: 1,
  DELIVERING: 2,
  DELIVERED: 3,
  CANCELLED: 4,
  getStatusName: (status) => {
    switch (status) {
      case DeliveryStatus.NOT_STARTED:
        return "Chưa bắt đầu";
      case DeliveryStatus.PREPARING:
        return "Đang chuẩn bị";
      case DeliveryStatus.DELIVERING:
        return "Đang giao hàng";
      case DeliveryStatus.DELIVERED:
        return "Đã giao hàng";
      case DeliveryStatus.CANCELLED:
        return "Đã hủy";
      default:
        return "Không xác định";
    }
  },
  getStatusColor: (status) => {
    switch (status) {
      case DeliveryStatus.NOT_STARTED:
        return "#d9d9d9"; // màu xám
      case DeliveryStatus.PREPARING:
        return "#faad14"; // màu vàng
      case DeliveryStatus.DELIVERING:
        return "#1890ff"; // màu xanh dương
      case DeliveryStatus.DELIVERED:
        return "#52c41a"; // màu xanh lá
      case DeliveryStatus.CANCELLED:
        return "#ff4d4f"; // màu đỏ
      default:
        return "#d9d9d9";
    }
  },
};

export const PaymentMethod = {
  MOMO: 0,
  PAYOS: 1,
  getMethodName: (method) => {
    switch (method) {
      case PaymentMethod.MOMO:
        return "Ví MoMo";
      case PaymentMethod.PAYOS:
        return "PayOS";
      default:
        return "Không xác định";
    }
  },
  getMethodColor: (method) => {
    switch (method) {
      case PaymentMethod.MOMO:
        return "#A50064"; // màu tím MoMo
      case PaymentMethod.PAYOS:
        return "#00B6F3"; // màu xanh PayOS
      default:
        return "#d9d9d9";
    }
  },
};

export const PaymentStatus = {
  PENDING: 0,
  SUCCESS: 1,
  FAILED: 2,
  getStatusName: (status) => {
    switch (status) {
      case PaymentStatus.PENDING:
        return "Chờ thanh toán";
      case PaymentStatus.SUCCESS:
        return "Thành công";
      case PaymentStatus.FAILED:
        return "Thất bại";
      default:
        return "Không xác định";
    }
  },
  getStatusColor: (status) => {
    switch (status) {
      case PaymentStatus.PENDING:
        return "#faad14"; // màu vàng
      case PaymentStatus.SUCCESS:
        return "#52c41a"; // màu xanh lá
      case PaymentStatus.FAILED:
        return "#ff4d4f"; // màu đỏ
      default:
        return "#d9d9d9";
    }
  },
};
