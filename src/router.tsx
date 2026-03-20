import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Home } from "./pages/home/Home";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import NotFound from "./pages/NotFound/NotFound";
import { PublicRoute } from "./components/PublicRoute";
import { AdminRoute } from "./components/AdminRoute";
import Users from "./pages/dashboard/Users/Users";
import Products from "./pages/dashboard/Products/Products";
import Categories from "./pages/dashboard/Categories/Categories";
import Orders from "./pages/dashboard/Orders/Orders";
import ProductVariants from "./pages/dashboard/ProductVariants/ProductVariants";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            //   { path: "products", element: <Products /> },
            //   { path: "products/:id", element: <ProductDetails /> },
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
                ) 
            },
            { 
                path: "register", 
                element: (
                    <PublicRoute>
                        <Signup />
                    </PublicRoute>
                ) 
            },
        ],
    },
    {
        path: "/dashboard",
        element: (
            <AdminRoute>
                <DashboardLayout />
            </AdminRoute>
        ),
        children: [
            { index: true, element: <div>Dashboard</div> },
            { path: "users", element: <Users /> },
            { path: "products", element: <Products /> },
            { path: "product-variants", element: <ProductVariants /> },
            { path: "categories", element: <Categories /> },
            { path: "orders", element: <Orders /> },
            { path: "settings", element: <div>Settings</div> },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);
