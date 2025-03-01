import { createBrowserRouter, Navigate } from "react-router-dom";
// import HomePage from "../page/HomePage";
// import ProductPage from "../page/ProductPage";
// import RootLayout from "../layout/RootLayout";
// import Cart from "../page/Cart";
// import Loading from "../Loading/Loading";
// import Payment from "../page/payment/Payment";
// import ProductDetail from "../components/ProductDetailPage/Detail";
// import BlogPage from "../page/blogspage/BlogPage";
// import Profile from "../page/profile/Profile";
import AdminPage from "../adminpage/AdminPage";
import Dashboard from "../adminpage/dashboard/Dashboard";
import ProductManagement from "../adminpage/product/ProductManagement";
import UserManagement from "../adminpage/user/UserManagement";
import OrderManagement from "../adminpage/order/OrderManagement";
import Category from "../adminpage/category/Category";
import Reports from "../adminpage/reports/Reports";
import Vouchers from "../adminpage/vouchers/Vouchers";
import LoginAdmin from "../adminpage/loginadmin/LoginAdmin";

// Component bảo vệ route admin
const ProtectedRoute = ({ children }) => {
  const adminUser = localStorage.getItem("adminUser");
  
  if (!adminUser) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

export const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: (
  //     <Loading>
  //       <RootLayout />
  //     </Loading>
  //   ),
  //   children: [
  //     {
  //       path: "",
  //       element: <HomePage />,
  //     },
  //     {
  //       path: "/cart",
  //       element: <Cart />,
  //     },
  //     {
  //       path: "/product",
  //       element: <ProductPage />,
  //     },
  //     {
  //       path: "/product/:id",
  //       // element: <ProductDetailPage />,
  //       element: <ProductDetail />,
  //     },
  //     {
  //       path: "payment",
  //       element: <Payment />,
  //     },
  //     {
  //       path: "/blog",
  //       element: <BlogPage />,
  //     },
  //     {
  //       path: "/profile",
  //       element: <Profile />,
  //     },
  //   ],
  // },
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


