import React from 'react';
import Product from "../../../assets/img/testproduct.png"
import { FiTruck } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Orders = ({ onOrderClick }) => {
  const navigate = useNavigate();

  const orders = [
    {
      id: '#200803',
      date: '14.06.2024',
      status: 'COMPLETED',
      items: [
        {
          name: 'Kem Dưỡng SKINDEEP',
          quantity: 1,
          price: 229000,
          image: Product
        },
        {
          name: 'Alpha Arbutin & Vitamin C',
          quantity: 1,
          price: 559000,
          image: Product
        }
      ],
      total: 788000,
      deliveryStatus: 'Successfully delivered'
    },
    {
      id: '#200803',
      date: '14.06.2024',
      status: 'CANCELLED',
      items: [
        {
          name: 'Kem Dưỡng SKINDEEP',
          quantity: 1,
          price: 229000,
          image: Product
        },
        {
          name: 'Alpha Arbutin & Vitamin C',
          quantity: 1,
          price: 559000,
          image: Product
        }
      ],
      total: 788000,
      deliveryStatus: 'Cancel'
    },
    {
      id: '#200803',
      date: '14.06.2024',
      status: 'PENDING',
      items: [
        {
          name: 'Kem Dưỡng SKINDEEP',
          quantity: 1,
          price: 229000,
          image: Product
        },
        {
          name: 'Alpha Arbutin & Vitamin C',
          quantity: 1,
          price: 559000,
          image: Product
        }
      ],
      total: 788000,
      deliveryStatus: 'Pending'
    }
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-500 text-white';
      case 'CANCELLED':
        return 'bg-red-500 text-white';
      case 'PENDING':
        return 'bg-yellow-500 text-white';
      default:
        return '';
    }
  };

  const getStatusText = (status) => {
    return status.charAt(0) + status.slice(1).toLowerCase();
  };

  const handleOrderClick = (orderId) => {
    navigate(`/profile/orders/${orderId}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="space-y-8">
        {orders.map((order) => (
          <div 
            key={order.id} 
            className="border-b-2 border-[#CCCCCC] cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => onOrderClick(order.id)}
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-blue-600 font-semibold">{order.id}</span>
              <div className="flex items-center gap-2">
                <span className="text-gray-600 font-semibold">Payment status:</span>
                <span className={`px-2 py-1 rounded text-sm font-semibold ${getStatusStyle(order.status)}`}>
                  {getStatusText(order.status)}
                </span>
                <div className="border-l-2 h-4 mx-2 border-[#CCCCCC]"></div>
                <div className="flex items-center gap-1">
                  <FiTruck className="text-gray-400" />
                  <span className="text-gray-400 font-semibold">{order.date}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 border-t-2 border-b-2 border-[#CCCCCC] py-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-start">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover"
                  />
                  <div className="ml-4 flex-grow">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600 font-semibold">x{item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{item.price.toLocaleString()}đ</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center py-4">
              {order.status === 'COMPLETED' && (
                <div className="flex items-center text-green-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="font-semibold">Successfully delivered</span>
                </div>
              )}
              {order.status === 'CANCELLED' && (
                <div className="flex items-center text-red-500">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                  <span className="font-semibold">Cancel</span>
                </div>
              )}
              {order.status === 'PENDING' && (
                <div className="flex items-center text-yellow-500">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="font-semibold">Pending</span>
                </div>
              )}
              <div className="ml-auto flex items-center gap-2">
                <span className="text-gray-600 font-semibold">Total:</span>
                <span className="font-semibold text-lg">{order.total.toLocaleString()}đ</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;