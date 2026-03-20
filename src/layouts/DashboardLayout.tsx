import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ButtonComponent } from "../components/ui/Button";

export default function DashboardLayout() {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <div style={{ display: "flex", minHeight: "100vh", background: "#f4f6f9" }}>

            {/* Sidebar */}
            <aside
                style={{
                    width: 240,
                    background: "#111827",
                    color: "#fff",
                    padding: 20,
                }}
            >
                <h2 style={{ marginBottom: 30 }}>My Shop</h2>

                <nav style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <NavLink to="/dashboard" style={linkStyle}>
                        Dashboard
                    </NavLink>
                    <NavLink to="/dashboard/orders" style={linkStyle}>
                        Orders
                    </NavLink>
                    <NavLink to="/dashboard/products" style={linkStyle}>
                        Products
                    </NavLink>
                    <NavLink to="/dashboard/product-variants" style={linkStyle}>
                        Product Variants
                    </NavLink>
                    <NavLink to="/dashboard/users" style={linkStyle}>
                        Users
                    </NavLink>
                    <NavLink to="/dashboard/categories" style={linkStyle}>
                        Categories
                    </NavLink>
                    <NavLink to="/dashboard/settings" style={linkStyle}>
                        Settings
                    </NavLink>
                </nav>
            </aside>

            {/* Main area */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>

                {/* Topbar */}
                <header
                    style={{
                        height: 64,
                        background: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0 24px",
                        borderBottom: "1px solid #e5e7eb",
                    }}
                >
                    <strong>Dashboard</strong>
                    <ButtonComponent
                        text="Logout"
                        color="#9810fa"
                        onClick={handleLogout}
                    />
                </header>

                {/* Page content */}
                <main style={{ padding: 24, flex: 1 }}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

const linkStyle = ({ isActive }: { isActive: boolean }) => ({
    color: isActive ? "#60a5fa" : "#fff",
    textDecoration: "none",
    fontWeight: 500,
});
