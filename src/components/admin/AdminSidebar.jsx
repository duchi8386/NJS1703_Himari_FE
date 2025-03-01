import { Layout, Menu } from "antd";
import { NavLink } from "react-router-dom";
import {
  DashboardOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  AppstoreOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import Logo from "../../assets/img/logo.png"; // Cập nhật đường dẫn logo nếu cần

const { Sider } = Layout;

const AdminSidebar = () => {
  return (
    <Sider width={240} className="rounded-l-2xl bg-transparent">
      {/* Logo */}
      <div className="p-8 flex justify-center">
        <img src={Logo} alt="Logo" className="h-full w-auto" />
      </div>

      {/* Menu */}
      <Menu
        mode="vertical"
        className="text-lg bg-transparent"
        defaultSelectedKeys={["dashboard"]}
      >
        <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
          <NavLink to="/admin/dashboard">Dashboard</NavLink>
        </Menu.Item>
        <Menu.Item key="orders" icon={<ShoppingCartOutlined />}>
          <NavLink to="/admin/orders">Orders</NavLink>
        </Menu.Item>
        <Menu.Item key="customers" icon={<UserOutlined />}>
          <NavLink to="/admin/customers">Customers</NavLink>
        </Menu.Item>
        <Menu.Item key="products" icon={<AppstoreOutlined />}>
          <NavLink to="/admin/products">Products</NavLink>
        </Menu.Item>
        <Menu.Item key="analytics" icon={<BarChartOutlined />}>
          <NavLink to="/admin/analytics">Analytics</NavLink>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default AdminSidebar;
