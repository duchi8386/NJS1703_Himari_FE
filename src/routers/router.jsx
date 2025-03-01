import { createBrowserRouter } from "react-router-dom";
import Loading from "../Loading/Loading";
import AdminLayout from "../layout/AdminLayout";

export const router = createBrowserRouter([
  // Admin Layout
  {
    path: "/",
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
