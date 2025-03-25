/* eslint-disable react/prop-types */

import { Layout, Menu } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  DashboardOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  InboxOutlined,
  LogoutOutlined,
  FileTextOutlined,
  FolderOutlined,
  ReadOutlined,
  ShopOutlined,
  GiftOutlined,
  BellOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { FaHandDots, FaPerson, FaBoxArchive } from "react-icons/fa6";
import Logo from "../../assets/img/Logo.png";
import { useEffect, useState } from "react";

const { Sider } = Layout;

const Sidebar = ({ handleLogout, collapsed, toggleCollapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));

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

  // Base menu items that both ADMIN and STAFF can see
  const baseMenuItems = [
    {
      key: "/admin/orders",
      icon: <ShoppingCartOutlined />,
      label: <Link to="/admin/orders">Quản lý đơn hàng</Link>,
    },
    {
      key: "/admin/products",
      icon: <InboxOutlined />,
      label: <Link to="/admin/products">Quản lý sản phẩm</Link>,
    },
    {
      key: "/admin/category",
      icon: <FolderOutlined />,
      label: <Link to="/admin/category">Quản lý danh mục</Link>,
    },
    {
      key: "blog",
      icon: <ReadOutlined />,
      label: "Bài viết",
      children: [
        {
          key: "/admin/blogs",
          icon: <FileTextOutlined />,
          label: <Link to="/admin/blogs">Quản lý bài viết</Link>,
        },
        {
          key: "/admin/blogs-category",
          icon: <FolderOutlined />,
          label: <Link to="/admin/blogs-category">Quản lý danh mục bài viết</Link>,
        },
      ],
    },
    {
      key: "/admin/brands",
      icon: <ShopOutlined />,
      label: <Link to="/admin/brands">Quản lý thương hiệu </Link>,
    },
    {
      key: "symptoms",
      icon: <HeartOutlined />,
      label: "Triệu chứng",
      children: [
        {
          key: "/admin/part-symptoms",
          icon: <FaHandDots />,
          label: <Link to="/admin/part-symptoms">Quản lý Triệu chứng cơ thể</Link>,
        },
        {
          key: "/admin/product-symptoms",
          icon: <FaBoxArchive />,
          label: <Link to="/admin/product-symptoms">Quản lý Triệu chứng sản phẩm</Link>
        },
        {
          key: "/admin/body-parts",
          icon: <FaPerson />,
          label: <Link to="/admin/body-parts">Quản lý vùng cơ thể</Link>,
        },
      ],
    },
    {
      key: "/admin/notification",
      icon: <BellOutlined />,
      label: <Link to="/admin/notification">Quản lý thông báo</Link>,
    },
  ];

  // Admin-only menu items
  const adminMenuItems = [
    {
      key: "/admin",
      icon: <DashboardOutlined />,
      label: <Link to="/admin/dashboard">Dashboard</Link>,
    },
    {
      key: "/admin/users",
      icon: <UserOutlined />,
      label: <Link to="/admin/users">Quản lý người dùng</Link>,
    },
  ];

  // Combine menu items based on role
  const menuItems = [
    ...(userRole === "3" ? adminMenuItems : []),
    ...baseMenuItems,
    // Always include logout
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Đăng xuất",
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
        background: "#ffffff",
        height: "100vh",
        position: "fixed",
        left: 0,
        boxShadow: "2px 0 8px rgba(0,0,0,0.1)",
      }}
    >
      <div className="p-4">
        <div
          className={`transition-all duration-300 ease-in-out ${collapsed ? "w-12 h-12" : "w-full"
            }`}
        >
          <div className="flex items-center gap-3">
            <img
              src={Logo}
              alt="Logo"
              className={`object-contain ${collapsed ? "w-12 h-12" : "h-12 w-12"
                }`}
            />
            {!collapsed && (
              <div className="flex font-bold items-center">
                <span className="text-xl font-bold text-gray-800">Himari</span>
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
        defaultOpenKeys={["blog"]}
        items={menuItems}
        style={{
          borderRight: 0,
          background: "#ffffff",
        }}
      />
    </Sider>
  );
};

export default Sidebar;
