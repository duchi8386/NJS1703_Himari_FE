import { createBrowserRouter, Navigate } from "react-router-dom";
import AdminPage from "../adminpage/AdminPage";
import Dashboard from "../adminpage/dashboard/Dashboard";
import ProductManagement from "../adminpage/product/ProductManagement";
import UserManagement from "../adminpage/user/UserManagement";
import OrderManagement from "../adminpage/order/OrderManagement";
import Category from "../adminpage/category/Category";
import Reports from "../adminpage/reports/Reports";
import Vouchers from "../adminpage/vouchers/Vouchers";
import LoginAdmin from "../adminpage/loginadmin/LoginAdmin";
import { useAuth } from "../context/AuthContext";

// Component bảo vệ route admin
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth(); // Sử dụng useAuth để kiểm tra trạng thái đăng nhập
  const accessToken = localStorage.getItem("accessToken");
  const userRole = localStorage.getItem("userRole");

  // Kiểm tra cả token và role
  if (!user || !accessToken || (userRole !== "ADMIN" && userRole !== "STAFF")) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/admin/login" replace />,
  },
  {
    path: "/admin/login",
    element: <LoginAdmin />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminPage />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Navigate to="/admin/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "products",
        element: <ProductManagement />,
      },
      {
        path: "users",
        element: <UserManagement />,
      },
      {
        path: "orders",
        element: <OrderManagement />,
      },
      {
        path: "category",
        element: <Category />,
      },
      {
        path: "reports",
        element: <Reports />,
      },
      {
        path: "vouchers",
        element: <Vouchers />,
      },
    ],
  },
]);
