import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../context/CartContext";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMobileMenuOpen(false);
  };

  const navLinks = (
    <>
      <Link
        to="/"
        className="rounded-md px-3 py-2 text-sm font-medium text-purple-600 hover:bg-purple-50"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        Home
      </Link>
      <Link
        to="/products"
        className="rounded-md px-3 py-2 text-sm font-medium text-purple-600 hover:bg-purple-50"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        Shop
      </Link>
      <Link
        to="/cart"
        className="rounded-md px-3 py-2 text-sm font-medium text-purple-600 hover:bg-purple-50 relative"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        Cart
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
            {itemCount}
          </span>
        )}
      </Link>
      {!isAuthenticated ? (
        <>
          <Link
            to="/auth/login"
            className="rounded-md px-3 py-2 text-sm font-medium text-purple-600 hover:bg-purple-50"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Login
          </Link>
          <Link
            to="/auth/register"
            className="rounded-md bg-purple-600 px-3 py-2 text-sm font-medium text-white hover:bg-purple-700"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Register
          </Link>
        </>
      ) : (
        <>
          {user?.name && (
            <span className="hidden md:inline rounded-md px-2 py-2 text-sm text-gray-600">
              Hi, {user.name.split(" ")[0]}
            </span>
          )}
          <button
            type="button"
            className="rounded-md bg-purple-600 px-3 py-2 text-sm font-medium text-white hover:bg-purple-700"
            onClick={handleLogout}
          >
            Logout
          </button>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative inline-flex items-center justify-center rounded-md p-2 text-purple-600 hover:bg-purple-50"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open menu</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6">
                {isMobileMenuOpen ? (
                  <path d="M6 18 18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                ) : (
                  <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
                )}
              </svg>
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center sm:justify-start">
            <Link to="/" className="flex shrink-0 items-center">
              <img src="/logo.png" alt="PowerOnTop" className="h-12 w-auto" />
            </Link>
            <div className="hidden sm:ml-8 sm:flex sm:items-center sm:gap-1">{navLinks}</div>
          </div>

          <div className="sm:hidden flex items-center gap-2 pr-2">
            <Link to="/cart" className="relative p-2 text-purple-600">
              Cart
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 bg-purple-600 text-white text-xs rounded-full min-w-[16px] h-4 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="sm:hidden border-t border-gray-100 px-2 pt-2 pb-4 space-y-1">
          {navLinks}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
