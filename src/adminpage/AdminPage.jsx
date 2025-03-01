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

  return (
    <Layout className={`min-h-screen `}>
      <Sidebar
        handleLogout={handleLogout}
        collapsed={collapsed}
        toggleCollapsed={toggleCollapsed}
      />
      <Layout
        style={{
          marginLeft: collapsed ? 80 : 250,
          transition: "all 0.2s",
          background: "#f0f2f5",
          // background:  "#1f2937" : "#f0f2f5",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <AdminHeader collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            flex: 1,
            background: "#11182",
            borderRadius: 8,
            color: "#ffffff",
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
