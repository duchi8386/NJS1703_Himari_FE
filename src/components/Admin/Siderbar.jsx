/* eslint-disable react/prop-types */

import { Layout, Menu } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  DashboardOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  InboxOutlined,
  BarChartOutlined,
  GiftOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Logo from '../../assets/img/Logo.png';

const { Sider } = Layout;

const Sidebar = ({ handleLogout, collapsed, toggleCollapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const onLogout = () => {
    // Call the handleLogout function passed from parent
    handleLogout();
    
    // Clear localStorage items
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("adminUser");
    
    // Navigate to login page
    navigate("/admin/login");
  };

  const menuItems = [
    {
      key: "/admin",
      icon: <DashboardOutlined />,
      label: <Link to="/admin">Dashboard</Link>,
    },
    {
      key: "/admin/users",
      icon: <UserOutlined />,
      label: <Link to="/admin/users">User Management</Link>,
    },
    {
      key: "/admin/orders",
      icon: <ShoppingCartOutlined />,
      label: <Link to="/admin/orders">Order Management</Link>,
    },
    {
      key: "/admin/products",
      icon: <InboxOutlined />,
      label: <Link to="/admin/products">Products</Link>,
    },
    {
      key: "/admin/category",
      icon: <InboxOutlined />,
      label: <Link to="/admin/category">Category Management</Link>,
    },
    {
      key: "/admin/reports",
      icon: <BarChartOutlined />,
      label: <Link to="/admin/reports">Reports</Link>,
    },
    {
      key: "/admin/vouchers",
      icon: <GiftOutlined />,
      label: <Link to="/admin/vouchers">Vouchers</Link>,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      className: "mt-auto",
      danger: true,
      onClick: onLogout,
    },
  ];

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={250}
      style={{
        background: '#ffffff',
        height: "100vh",
        position: "fixed",
        left: 0,
        boxShadow: '2px 0 8px rgba(0,0,0,0.1)'
      }}
    >
      <div className="p-4">
        <div
          className={`transition-all duration-300 ease-in-out ${
            collapsed ? "w-12 h-12" : "w-full"
          }`}
        >
          <div className="flex items-center gap-3">
            <img 
              src={Logo} 
              alt="Logo" 
              className={`object-contain ${collapsed ? 'w-12 h-12' : 'h-12 w-12'}`}
            />
            {!collapsed && (
              <div className="flex font-bold items-center">
                <span className="text-xl font-bold text-gray-800">
                  Himari
                </span>
                <span className="ml-1.5 text-[10px] font-medium tracking-widest text-gray-400 self-end mb-0.5">
                  ADMIN
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <Menu
        theme="light"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        style={{
          borderRight: 0,
          background: '#ffffff',
        }}
      />
    </Sider>
  );
};

export default Sidebar;
