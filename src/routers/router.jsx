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

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

export const router = createBrowserRouter([
  {
    path: "",
    element: (
      <ProtectedRoute>
        <Navigate to="/admin/dashboard" replace />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
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
