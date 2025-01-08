import { createBrowserRouter } from "react-router-dom";
import HomePage from "../page/HomePage";
import RootLayout from "../layout/RootLayout";
import Cart from "../page/Cart";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
]);
