import React, { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { NavLink, Outlet } from 'react-router-dom';

export default function UserDashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center gap-6">
            <img
              src={user?.photoURL || 'https://via.placeholder.com/150'}
              alt={user?.displayName}
              className="w-20 h-20 rounded-full border-4 border-blue-500 object-cover"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">
                {user?.displayName || 'User'}
              </h1>
              <p className="text-gray-600">{user?.email}</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-4 mt-6 border-b">
            <NavLink
              to="/user-dashboard/my-profile"
              className={({ isActive }) =>
                `px-6 py-3 font-semibold border-b-2 transition-colors ${
                  isActive
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-blue-600'
                }`
              }
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                My Profile
              </span>
            </NavLink>
            <NavLink
              to="/user-dashboard/my-applications"
              className={({ isActive }) =>
                `px-6 py-3 font-semibold border-b-2 transition-colors ${
                  isActive
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-blue-600'
                }`
              }
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                My Applications
              </span>
            </NavLink>
            <NavLink
              to="/user-dashboard/my-reviews"
              className={({ isActive }) =>
                `px-6 py-3 font-semibold border-b-2 transition-colors ${
                  isActive
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-blue-600'
                }`
              }
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                My Reviews
              </span>
            </NavLink>
          </div>
        </div>

        {/* Nested Route Content */}
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
