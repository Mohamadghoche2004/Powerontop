import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../context/CartContext";

const desktopLinkClass =
  "rounded-md px-3 py-2 text-sm font-medium text-purple-600 hover:bg-purple-50";
const mobileLinkClass =
  "block w-full px-3 py-3 text-base font-medium text-purple-600 hover:bg-purple-50 rounded-md";
const mobilePrimaryClass =
  "block w-full px-3 py-3 text-base font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-md text-center";
const mobileLogoutClass =
  "block w-full px-3 py-3 text-base font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-md";

type NavVariant = "desktop" | "mobile";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const closeMobile = () => setIsMobileMenuOpen(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    closeMobile();
  };

  const linkClass = (variant: NavVariant) =>
    variant === "mobile" ? mobileLinkClass : desktopLinkClass;

  const renderNavLinks = (variant: NavVariant) => {
    const isMobile = variant === "mobile";
    const linkCls = linkClass(variant);
    const cartBadgeClass = isMobile
      ? "ml-2 inline-flex bg-purple-600 text-white text-xs rounded-full min-w-[20px] h-5 items-center justify-center px-1"
      : "absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1";

    return (
      <>
        <Link to="/" className={linkCls} onClick={closeMobile}>
          Home
        </Link>
        <Link to="/products" className={linkCls} onClick={closeMobile}>
          Shop
        </Link>
        <Link
          to="/cart"
          className={`${linkCls} ${isMobile ? "" : "relative"}`}
          onClick={closeMobile}
        >
          Cart
          {itemCount > 0 && <span className={cartBadgeClass}>{itemCount}</span>}
        </Link>
        {!isAuthenticated ? (
          <>
            <Link to="/auth/login" className={linkCls} onClick={closeMobile}>
              Login
            </Link>
            <Link
              to="/auth/register"
              className={isMobile ? mobilePrimaryClass : `${desktopLinkClass} bg-purple-600 text-white hover:bg-purple-700`}
              onClick={closeMobile}
            >
              Register
            </Link>
          </>
        ) : (
          <>
            {user?.name && (
              <span
                className={
                  isMobile
                    ? "block px-3 py-2 text-sm text-gray-600"
                    : "rounded-md px-2 py-2 text-sm text-gray-600"
                }
              >
                Hi, {user.name.split(" ")[0]}
              </span>
            )}
            <button
              type="button"
              className={isMobile ? mobileLogoutClass : `${desktopLinkClass} bg-purple-600 text-white hover:bg-purple-700`}
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </>
    );
  };

  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center">
          {/* Mobile: hamburger | centered logo | cart */}
          <div className="flex w-full items-center justify-between sm:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-purple-600 hover:bg-purple-50"
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

            <Link to="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex shrink-0 items-center">
              <img src="/logo.png" alt="PowerOnTop" className="h-12 w-auto" />
            </Link>

            <Link to="/cart" className="relative p-2 text-purple-600">
              Cart
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 bg-purple-600 text-white text-xs rounded-full min-w-[16px] h-4 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Desktop: logo + links centered */}
          <div className="hidden sm:flex w-full items-center justify-center gap-6 lg:gap-8">
            <Link to="/" className="flex shrink-0 items-center">
              <img src="/logo.png" alt="PowerOnTop" className="h-12 w-auto" />
            </Link>
            <div className="flex items-center gap-1 flex-wrap justify-center">
              {renderNavLinks("desktop")}
            </div>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="sm:hidden border-t border-gray-100 px-2 pt-2 pb-4">
          <div className="flex flex-col gap-1">{renderNavLinks("mobile")}</div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
