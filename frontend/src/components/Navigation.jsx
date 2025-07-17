import React, { useState } from 'react';
import { Search, Menu, User, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const totalItems = useSelector((state) => state.cart.totalItems);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({ type: 'auth/logout' }); // adjust based on your setup
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-gray-900">
              Digital<span className="text-blue-600">Core</span>
            </h1>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-900 hover:text-blue-600 transition">Home</a>
            <a href="#devices" className="text-gray-900 hover:text-blue-600 transition">Devices</a>
            <a href="#learn" className="text-gray-900 hover:text-blue-600 transition">Learn</a>
            <a href="#kits" className="text-gray-900 hover:text-blue-600 transition">Kits</a>
            <a href="#about" className="text-gray-900 hover:text-blue-600 transition">About</a>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:block relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search devices..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-64"
              />
            </div>

            {/* Cart */}
            <Link to="/cart" className="p-2 text-gray-600 hover:text-blue-600 transition relative">
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md z-10">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* User Section */}
            {user ? (
              <div
                className="relative hidden md:block"
                onMouseEnter={() => setIsUserDropdownOpen(true)}
                onMouseLeave={() => setIsUserDropdownOpen(false)}
              >
                <button className="p-2 text-gray-600 hover:text-blue-600 transition flex flex-col items-center">
                  <User className="w-5 h-5" />
                  <span className="text-[10px] mt-1 truncate max-w-[70px]">{user.name}</span>
                </button>
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b truncate">{user.email}</div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:block p-2 text-gray-600 hover:text-blue-600 transition"
              >
                <User className="w-5 h-5" />
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              <a href="#home" className="block px-3 py-2 text-gray-900 hover:text-blue-600 transition">Home</a>
              <a href="#devices" className="block px-3 py-2 text-gray-900 hover:text-blue-600 transition">Devices</a>
              <a href="#learn" className="block px-3 py-2 text-gray-900 hover:text-blue-600 transition">Learn</a>
              <a href="#kits" className="block px-3 py-2 text-gray-900 hover:text-blue-600 transition">Kits</a>
              <a href="#about" className="block px-3 py-2 text-gray-900 hover:text-blue-600 transition">About</a>
              <Link to="/cart" className="block px-3 py-2 text-gray-900 hover:text-blue-600 transition">Cart</Link>
              {user ? (
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              ) : (
                <Link to="/login" className="block px-3 py-2 text-blue-600 hover:bg-gray-100">
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
