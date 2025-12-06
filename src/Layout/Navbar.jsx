import React, { useState, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import scholarshipIcon from '../assets/icons8-scholarship-64.png';
import { AuthContext } from '../Provider/AuthProvider';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.error(error));
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Scholarships', path: '/scholarships' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  // Add Dashboard to nav items if user is logged in
  const allNavItems = user 
    ? [{ name: 'Dashboard', path: '/dashboard' }, ...navItems]
    : navItems;

  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img src={scholarshipIcon} alt="Scholarship Icon" className="w-8 h-8" />
              <span className="text-white text-xl font-bold">
                Scholarship Management
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {allNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-blue-700 text-white'
                      : 'text-blue-100 hover:bg-blue-500 hover:text-white'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Auth Section (Desktop) */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName}
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-blue-600 font-bold">
                      {user.displayName?.charAt(0) || user.email?.charAt(0)}
                    </div>
                  )}
                  <span className="text-white text-sm font-medium">
                    {user.displayName || 'User'}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-blue-600 bg-white rounded-md hover:bg-blue-50 transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-white hover:text-blue-100 transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/signUp"
                  className="px-4 py-2 text-sm font-medium text-blue-600 bg-white rounded-md hover:bg-blue-50 transition-colors duration-200"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {allNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? 'bg-blue-700 text-white'
                      : 'text-blue-100 hover:bg-blue-500 hover:text-white'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-blue-500">
            {user ? (
              <div className="px-5">
                <div className="flex items-center mb-3">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName}
                      className="w-10 h-10 rounded-full border-2 border-white"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-blue-600 font-bold text-lg">
                      {user.displayName?.charAt(0) || user.email?.charAt(0)}
                    </div>
                  )}
                  <div className="ml-3">
                    <div className="text-base font-medium text-white">
                      {user.displayName || 'User'}
                    </div>
                    <div className="text-sm text-blue-100">{user.email}</div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-blue-600 bg-white hover:bg-blue-50"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center px-5 space-x-3">
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-blue-100 hover:bg-blue-500 hover:text-white"
                >
                  Login
                </Link>
                <Link
                  to="/signUp"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 bg-white hover:bg-blue-50"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
