import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Admin/Siderbar";
import AdminHeader from "../components/Admin/Header";

const { Content } = Layout;

const AdminPage = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const adminUser = JSON.parse(localStorage.getItem("adminUser"));

  useEffect(() => {
    // Check if user is logged in
    const accessToken = localStorage.getItem("accessToken");
    const userRole = localStorage.getItem("userRole");

    if (!accessToken || (userRole !== "ADMIN" && userRole !== "STAFF")) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    try {
      // Remove all auth info from localStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userRole");
      localStorage.removeItem("adminUser");

      // Redirect to login page
      navigate("/login");
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
      // Trong trường hợp có lỗi, vẫn chuyển về trang login
      navigate("/login");
    }
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout className="min-h-screen">
      <Sidebar
        handleLogout={handleLogout}
        collapsed={collapsed}
        toggleCollapsed={toggleCollapsed}
      />
      <Layout
        style={{
          marginLeft: collapsed ? 80 : 250,
          transition: "all 0.2s",
          background: "#f5f5f5",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <AdminHeader
          collapsed={collapsed}
          toggleCollapsed={toggleCollapsed}
          adminUser={adminUser}
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%"
          }}
        />
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            flex: 1,
            background: "#ffffff",
            borderRadius: 8,
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
            overflow: "auto",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminPage;
