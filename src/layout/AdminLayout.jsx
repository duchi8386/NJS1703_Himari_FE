import { Layout, Menu } from "antd";
import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import AdminNavBar from "../components/admin/AdminNavbar";
import { useEffect, useState } from "react";
import Sider from "antd/es/layout/Sider";
import Logo from "../assets/img/Logo.png";
import AdminSidebar from "../components/admin/AdminSidebar";

const AdminLayout = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Kiểm tra kích thước màn hình
    };

    handleResize(); // Kiểm tra khi render lần đầu
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <Layout className="h-screen">
      {/* Main Content */}
      <Layout
        style={{
          minHeight: "100vh",
          background: "linear-gradient(to right, #ffe1b7, #ffd8c5, #facfe7)", // Gradient background
          display: "flex",
        }}
        className="p-8 "
      >
        <Layout
          style={{
            width: "100%",
            display: "flex",
            background:
              "linear-gradient(to right, #fff2de 0%, #ffede6 50%, #fdeaf3 100%)", // Gradient bên trong
            borderRadius: "16px",
          }}
        >
          {/* Sidebar */}
          {/* <Sider width={240} className="rounded-l-2xl bg-transparent">
            <div className="p-8">
              <img src={Logo} alt="" />
            </div>
            <Menu mode="vertical" className="text-lg bg-white" />
          </Sider> */}
          <AdminSidebar />
          {/* Main Content */}
          <Content className="rounded-r-2xl  p-4">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
