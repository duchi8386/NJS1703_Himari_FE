import React from 'react';
import { useParams } from 'react-router-dom';
import Product from "../../../../assets/img/testproduct.png";

const OrderDetail = ({ orderId }) => {
  // Giả lập dữ liệu chi tiết đơn hàng
  const orderDetail = {
    customerInfo: {
      name: "Trần Đức Trí",
      phone: "012345678",
      email: "ductri234@gmail.com",
      address: "51.02 vinhomes"
    },
    orderInfo: {
      id: "#271455",
      status: "Mua Hàng",
      date: "27/05/2024",
      orderStatus: "đang giao...",
      paymentMethod: "VN Pay"
    },
    items: [
      {
        name: "Sữa Abbott Grow 4 1.7kg (trên 2 tuổi)",
        quantity: 1,
        price: 575000,
        image: Product
      },
      {
        name: "Sữa Abbott Grow 4 1.7kg (trên 2 tuổi)",
        quantity: 1,
        price: 575000,
        image: Product
      },
      {
        name: "Sữa Abbott Grow 4 1.7kg (trên 2 tuổi)",
        quantity: 1,
        price: 575000,
        image: Product
      },
      {
        name: "Sữa Similac Total Protection 4 900g (2 - 6 tuổi)",
        quantity: 1,
        price: 559000,
        image: Product
      }
    ],
    discount: -10000,
    total: 1134000
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Customer Information */}
        <div className="bg-gray-100 p-4 rounded">
          <div className="space-y-2">
            <div className="flex">
              <span className="w-32">Tên khách hàng:</span>
              <span className="font-semibold">{orderDetail.customerInfo.name}</span>
            </div>
            <div className="flex">
              <span className="w-32">Số điện thoại:</span>
              <span className="font-semibold">{orderDetail.customerInfo.phone}</span>
            </div>
            <div className="flex">
              <span className="w-32">Email:</span>
              <span className="font-semibold">{orderDetail.customerInfo.email}</span>
            </div>
            <div className="flex">
              <span className="w-32">Địa chỉ:</span>
              <span className="font-semibold">{orderDetail.customerInfo.address}</span>
            </div>
          </div>
        </div>

        {/* Order Information */}
        <div className="bg-gray-100 p-4 rounded">
          <div className="space-y-2">
            <div className="flex">
              <span className="w-32">Mã đơn hàng:</span>
              <span className="font-semibold">{orderDetail.orderInfo.id}</span>
              <span className="ml-2 text-green-500">{orderDetail.orderInfo.status}</span>
            </div>
            <div className="flex">
              <span className="w-32">Ngày đặt:</span>
              <span className="font-semibold">{orderDetail.orderInfo.date}</span>
            </div>
            <div className="flex">
              <span className="w-32">Trạng thái đơn hàng:</span>
              <span className="font-semibold">{orderDetail.orderInfo.orderStatus}</span>
            </div>
            <div className="flex">
              <span className="w-32">Hình thức thanh toán:</span>
              <span className="font-semibold">{orderDetail.orderInfo.paymentMethod}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 p-4 rounded mb-6">
        <p className="text-center">Hàng đã về, đặt tiền, gọi điện rồi xuống nhận hàng</p>
      </div>

      {/* Product Details */}
      <div className="bg-[#E8F0E9] p-4 rounded">
        <h3 className="font-semibold mb-4">Chi Tiết Sản Phẩm</h3>
        <div className="space-y-4">
          {orderDetail.items.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
                <div className="ml-4">
                  <p className="font-semibold">{item.name}</p>
                  <p>x{item.quantity}</p>
                </div>
              </div>
              <span className="font-semibold">{item.price.toLocaleString()} đ</span>
            </div>
          ))}
          
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-2">
              <span>Giảm giá:</span>
              <span>{orderDetail.discount.toLocaleString()} đ</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Total:</span>
              <span className="font-semibold">{orderDetail.total.toLocaleString()} đ</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <button className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600">
          Hủy đơn hàng
        </button>
      </div>
    </div>
  );
};

export default OrderDetail;