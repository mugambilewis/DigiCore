import React, { useState } from 'react';
import { Search, Menu, User, ShoppingCart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/redux/slices/userSlice';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalItems = useSelector((state) => state.cart.totalItems);
  const user = useSelector((state) => state.user.user);

  const handleLogout = () => {
    setIsUserDropdownOpen(false);
    dispatch(logout());
    navigate('/login'); // optional: redirect after logout
  };

  const handleUserClick = () => {
    if (user) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-gray-900">
            Digital<span className="text-blue-600">Core</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {['home', 'devices', 'learn', 'kits', 'about'].map((section) => (
              <a
                key={section}
                href={`#${section}`}
                className="text-gray-900 hover:text-blue-600 transition capitalize"
              >
                {section}
              </a>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:block relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search devices..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none w-64"
              />
            </div>

            {/* Cart */}
            <Link to="/cart" className="relative p-2 text-gray-600 hover:text-blue-600 transition">
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md z-10">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* User Dropdown (Desktop) */}
            {user ? (
              <div
                className="relative hidden md:block"
                onMouseEnter={() => setIsUserDropdownOpen(true)}
                onMouseLeave={() => setIsUserDropdownOpen(false)}
              >
                <button
                  className="p-2 text-gray-600 hover:text-blue-600 transition flex flex-col items-center"
                  onClick={handleUserClick}
                >
                  <User className="w-5 h-5" />
                  <span className="text-[10px] mt-1 truncate max-w-[70px]">
                    {user?.name || 'Account'}
                  </span>
                </button>

                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div
                      onClick={() => {
                        setIsUserDropdownOpen(false);
                        navigate('/profile');
                      }}
                      className="px-4 py-2 text-sm text-gray-700 border-b hover:bg-gray-100 cursor-pointer truncate"
                    >
                      {user?.email || 'Email'}
                    </div>
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
              <button
                onClick={handleUserClick}
                className="hidden md:block p-2 text-gray-600 hover:text-blue-600 transition"
              >
                <User className="w-5 h-5" />
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition"
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden px-2 pt-2 pb-3 bg-white border-t border-gray-200">
            {['home', 'devices', 'learn', 'kits', 'about'].map((section) => (
              <a
                key={section}
                href={`#${section}`}
                className="block px-3 py-2 text-gray-900 hover:text-blue-600 transition capitalize"
              >
                {section}
              </a>
            ))}

            <Link to="/cart" className="block px-3 py-2 text-gray-900 hover:text-blue-600 transition">
              Cart
            </Link>

            {user ? (
              <>
                <Link to="/profile" className="block px-3 py-2 text-gray-900 hover:text-blue-600 transition">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="block px-3 py-2 text-blue-600 hover:bg-gray-100">
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
