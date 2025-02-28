import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Admin/Siderbar";
import AdminHeader from "../components/Admin/Header";
// import { logout } from "../../service/logout";

const { Content } = Layout;

const AdminPage = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });
  const adminUser = JSON.parse(localStorage.getItem("adminUser"));

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  console.log("AdminPage Rendered, User:", adminUser); // ✅ Kiểm tra user có load đúng không

  const handleLogout = () => {
    try {
      // Xóa thông tin admin user khỏi localStorage
      localStorage.removeItem("adminUser");
      // Chuyển hướng về trang login
      navigate("/admin/login");
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
      // Trong trường hợp có lỗi, vẫn chuyển về trang login
      navigate("/admin/login");
    }
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Layout className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <Sidebar
        handleLogout={handleLogout}
        collapsed={collapsed}
        toggleCollapsed={toggleCollapsed}
        isDarkMode={isDarkMode}
      />
      <Layout
        style={{
          marginLeft: collapsed ? 80 : 250,
          transition: "all 0.2s",
          background: isDarkMode ? '#1f2937' : '#f0f2f5',
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <AdminHeader
          collapsed={collapsed}
          toggleCollapsed={toggleCollapsed}
          adminUser={adminUser}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            flex: 1,
            background: isDarkMode ? '#111827' : '#ffffff',
            borderRadius: 8,
            color: isDarkMode ? '#ffffff' : '#000000',
            overflow: "auto",
          }}
        >
          <Outlet /> {/* ✅ Đảm bảo Dashboard có thể hiển thị */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminPage;
