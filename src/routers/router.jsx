import { createBrowserRouter, Navigate } from "react-router-dom";
import AdminPage from "../adminpage/AdminPage";
import Dashboard from "../adminpage/dashboard/Dashboard";
import ProductManagement from "../adminpage/product/ProductManagement";
import UserManagement from "../adminpage/user/UserManagement";
import OrderManagement from "../adminpage/order/OrderManagement";
import Category from "../adminpage/category/CategoryPage";
import BlogManagement from "../adminpage/Blog/BlogManagement/BlogPage";
import BlogCategory from "../adminpage/Blog/BlogCategory/BlogCategory";
import BrandManagement from "../adminpage/brand/BrandPage";
import LoginAdmin from "../adminpage/loginadmin/LoginAdmin";
import { useAuth } from "../context/AuthContext";
import SymptomPart from "../adminpage/symptoms/SymptomPart/SymptomPart";
import ProductSymptoms from "../adminpage/symptoms/ProductSymptoms/ProductSymptoms";
import BodyPart from "../adminpage/symptoms/BodyPart/BodyPart";
import NotificationManagement from "../adminpage/notification/NotificationManagement";

// Component bảo vệ route admin
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const accessToken = localStorage.getItem("accessToken");
  const userRole = localStorage.getItem("userRole");

  // Kiểm tra cả token và role
  if (!user || !accessToken || (userRole !== "3" && userRole !== "4")) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

// Kiểm tra quyền ADMIN
const AdminOnlyRoute = ({ children }) => {
  const userRole = localStorage.getItem("userRole");

  if (userRole !== "3") {
    // Redirect STAFF to orders page
    return <Navigate to="/admin/orders" replace />;
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
        element: (
          <AdminOnlyRoute>
            <Navigate to="/admin/dashboard" replace />
          </AdminOnlyRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <AdminOnlyRoute>
            <Dashboard />
          </AdminOnlyRoute>
        ),
      },
      {
        path: "users",
        element: (
          <AdminOnlyRoute>
            <UserManagement />
          </AdminOnlyRoute>
        ),
      },
      // Routes accessible by both ADMIN and STAFF
      {
        path: "category",
        element: <Category />,
      },
      {
        path: "orders",
        element: <OrderManagement />,
      },
      {
        path: "products",
        element: <ProductManagement />,
      },
      {
        path: "blogs",
        element: <BlogManagement />,
      },
      {
        path: "blogs-category",
        element: <BlogCategory />,
      },
      {
        path: "brands",
        element: <BrandManagement />,
      },
      {
        path: "part-symptoms",
        element: <SymptomPart />,
      },
      {
        path: "product-symptoms",
        element: <ProductSymptoms />,
      },
      {
        path: "body-parts",
        element: <BodyPart />,
      },
      {
        path: "notification",
        element: <NotificationManagement />,
      },
    ],
  },
]);
