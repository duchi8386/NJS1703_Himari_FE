import { createBrowserRouter } from "react-router-dom";
import HomePage from "../page/HomePage";
import ProductPage from "../page/ProductPage";
import RootLayout from "../layout/RootLayout";
import Cart from "../page/Cart";
import Loading from "../Loading/Loading";
import Payment from "../page/payment/Payment";
import ProductDetail from "../components/ProductDetailPage/Detail";
import AdminLayout from "../layout/AdminLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Loading>
        <RootLayout />
      </Loading>
    ),
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/product",
        element: <ProductPage />,
      },
      {
        path: "/product/:id",
        // element: <ProductDetailPage />,
        element: <ProductDetail />,
      },
      {
        path: "payment",
        element: <Payment />,
      },
    ],
  },
  // Admin Layout
  {
    path: "/admin",
    element: (
      <Loading>
        <AdminLayout />
      </Loading>
    ),
    children: [
      // {
      //   path: "", // /admin
      //   element: <AdminDashboard />,
      // },
      // {
      //   path: "products", // /admin/products
      //   element: <AdminProducts />,
      // },
      // {
      //   path: "orders", // /admin/orders
      //   element: <AdminOrders />,
      // },
    ],
  },
]);
