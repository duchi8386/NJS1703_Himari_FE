import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
    return (
        <Layout style={{ minHeight: "100vh" }}>
          {/* {Navbar} */}
          <AdminNavBar />
          <Layout
            style={{
              marginLeft: isMobile ? 0 : 250, // MarginLeft cho desktop
              padding: "24px 24px 0 24px",
              marginTop: "80px",
              backgroundColor: "#e8ebee",
            }}
          >
            {/* <DynamicBreadcrumb /> */}
            <Content
              style={{
                borderRadius: "15px",
                padding: "8px",
                backgroundColor: "#fff",
                minHeight: "80vh",
              }}
            >
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      );
};

export default AdminLayout;
