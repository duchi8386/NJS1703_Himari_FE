import { useState } from 'react';
import UserProfile from './UserProfile/UserProfile';
import Location from './Location/Location';
import ResetPassword from './ResetPassword/ResetPassword';
import Orders from './Orders/Orders';
import OrderDetail from './Orders/OrderDetail/OrderDetail';
import { FiUser, FiMapPin, FiLock, FiLogOut, FiShoppingBag } from 'react-icons/fi';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const getTabTitle = () => {
    switch (activeTab) {
      case 'profile':
        return 'Thông tin người dùng';
      case 'location':
        return 'Địa chỉ';
      case 'password':
        return 'Thay đổi mật khẩu';
      case 'orders':
        return selectedOrderId ? 'Chi tiết đơn hàng' : 'Quản lí đơn hàng';
      default:
        return 'Thông tin người dùng';
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <UserProfile />;
      case 'location':
        return <Location />;
      case 'password':
        return <ResetPassword />;
      case 'orders':
        return selectedOrderId ? 
          <OrderDetail orderId={selectedOrderId} onBack={() => setSelectedOrderId(null)} /> : 
          <Orders onOrderClick={(orderId) => setSelectedOrderId(orderId)} />;
      default:
        return <UserProfile />;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === 'orders') {
      setSelectedOrderId(null); // Reset selectedOrderId khi click vào "Quản lý đơn hàng"
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-medium mb-8">{getTabTitle()}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow p-4 space-y-2">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center space-x-2 p-2 rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'profile' 
                  ? 'bg-gray-100 text-gray-900' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FiUser />
              <span>Thông tin tài khoản</span>
            </button>

            <button
              onClick={() => setActiveTab('password')}
              className={`w-full flex items-center space-x-2 p-2 rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'password' 
                  ? 'bg-gray-100 text-gray-900' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FiLock />
              <span>Thay đổi mật khẩu</span>
            </button>

            <button
              onClick={() => setActiveTab('location')}
              className={`w-full flex items-center space-x-2 p-2 rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'location' 
                  ? 'bg-gray-100 text-gray-900' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FiMapPin />
              <span>Địa chỉ</span>
            </button>

            <button
              onClick={() => handleTabClick('orders')}
              className={`w-full flex items-center space-x-2 p-2 rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'orders' 
                  ? 'bg-gray-100 text-gray-900 ' 
                  : 'text-gray-600 hover:bg-gray-50 '
              }`}
            >
              <FiShoppingBag />
              <span>Quản lý đơn hàng</span>
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-2 p-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors whitespace-nowrap"
            >
              <FiLogOut />
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-4 ">
          <div className="bg-white rounded-lg shadow p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;