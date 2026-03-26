import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    if (isProfileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileMenuOpen]);

  return (
    <nav className=" bg-white">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="relative inline-flex items-center justify-center rounded-md p-2 text-purple-600 hover:bg-purple-50 hover:text-purple-700 focus:outline-2 focus:-outline-offset-1 focus:outline-purple-500"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                  className="size-6"
                >
                  <path
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                  className="size-6"
                >
                  <path
                    d="M6 18 18 6M6 6l12 12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <Link to="/" className="inline-flex shrink-0" aria-label="Home">
                <img
                  src="/logo.png"
                  alt=""
                  className="h-12 w-auto"
                />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:block sm:flex sm:items-center">
              <div className="flex space-x-4">
                {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-white/5 hover:text-white" */}
                <a
                  href="#"
                  aria-current="page"
                  className="rounded-md bg-purple-600 px-3 py-2 text-sm font-medium text-white"
                >
                  Dashboard
                </a>
                <a
                  href="#"
                  className="rounded-md px-3 py-2 text-sm font-medium text-purple-600 hover:bg-purple-50 hover:text-purple-700"
                >
                  Team
                </a>
                <a
                  href="#"
                  className="rounded-md px-3 py-2 text-sm font-medium text-purple-600 hover:bg-purple-50 hover:text-purple-700"
                >
                  Projects
                </a>
                <a
                  href="#"
                  className="rounded-md px-3 py-2 text-sm font-medium text-purple-600 hover:bg-purple-50 hover:text-purple-700"
                >
                  Calendar
                </a>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative rounded-full p-1 text-purple-600 focus:outline-2 focus:outline-offset-2 focus:outline-purple-500"
            >
              <span className="absolute -inset-1.5"></span>
              <span className="sr-only">View notifications</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
                className="size-6"
              >
                <path
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Profile dropdown */}
            <div className="relative ml-3" ref={profileMenuRef}>
              <button
                onClick={toggleProfileMenu}
                className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
                aria-expanded={isProfileMenuOpen}
                aria-haspopup="true"
              >
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">Open user menu</span>
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                  className="size-8 rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10"
                />
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg outline outline-black/5 transition">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-purple-700 hover:bg-purple-50"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    Your profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-purple-700 hover:bg-purple-50"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    Settings
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-purple-700 hover:bg-purple-50"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    Sign out
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div id="mobile-menu" className="block sm:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3">
            {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-white/5 hover:text-white" */}
            <a
              href="#"
              aria-current="page"
              className="block rounded-md bg-purple-600 px-3 py-2 text-base font-medium text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </a>
            <a
              href="#"
              className="block rounded-md px-3 py-2 text-base font-medium text-purple-600 hover:bg-purple-50 hover:text-purple-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Team
            </a>
            <a
              href="#"
              className="block rounded-md px-3 py-2 text-base font-medium text-purple-600 hover:bg-purple-50 hover:text-purple-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Projects
            </a>
            <a
              href="#"
              className="block rounded-md px-3 py-2 text-base font-medium text-purple-600 hover:bg-purple-50 hover:text-purple-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Calendar
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
