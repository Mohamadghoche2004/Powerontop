import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Home } from "./pages/home/Home";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import AdminLogin from "./pages/auth/AdminLogin";
import NotFound from "./pages/NotFound/NotFound";
import { PublicRoute } from "./components/PublicRoute";
import { AdminRoute } from "./components/AdminRoute";
import Users from "./pages/dashboard/Users/Users";
import Products from "./pages/dashboard/Products/Products";
import Categories from "./pages/dashboard/Categories/Categories";
import Orders from "./pages/dashboard/Orders/Orders";
import ProductVariants from "./pages/dashboard/ProductVariants/ProductVariants";
import StoreProducts from "./pages/store/Products";
import ProductDetail from "./pages/store/ProductDetail";
import Cart from "./pages/store/Cart";
import Checkout from "./pages/store/Checkout";
import OrderConfirmation from "./pages/store/OrderConfirmation";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "products", element: <StoreProducts /> },
      { path: "products/:id", element: <ProductDetail /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout /> },
      { path: "order-confirmation/:id", element: <OrderConfirmation /> },
    ],
  },
  {
    path: "/auth",
    element: (
      <PublicRoute>
        <AuthLayout />
      </PublicRoute>
    ),
    children: [
      {
        path: "login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: "register",
        element: (
          <PublicRoute>
            <Signup />
          </PublicRoute>
        ),
      },
    ],
  },
  {
    path: "/auth/admin/login",
    element: (
      <PublicRoute>
        <AdminLogin />
      </PublicRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <AdminRoute>
        <DashboardLayout />
      </AdminRoute>
    ),
    children: [
      { index: true, element: <div className="p-6">Welcome to the admin dashboard</div> },
      { path: "users", element: <Users /> },
      { path: "products", element: <Products /> },
      { path: "product-variants", element: <ProductVariants /> },
      { path: "categories", element: <Categories /> },
      { path: "orders", element: <Orders /> },
      { path: "settings", element: <div className="p-6">Settings (coming soon)</div> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
