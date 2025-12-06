import React, { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { NavLink, Outlet } from 'react-router-dom';

export default function ModeratorDashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-linear-to-r from-purple-600 to-blue-600 rounded-2xl shadow-xl p-6 mb-6 text-white">
          <div className="flex items-center gap-6">
            <img
              src={user?.photoURL || 'https://via.placeholder.com/150'}
              alt={user?.displayName}
              className="w-20 h-20 rounded-full border-4 border-white object-cover"
            />
            <div>
              <h1 className="text-3xl font-bold mb-1">
                {user?.displayName || 'Moderator'}
              </h1>
              <p className="text-purple-100">Moderator Dashboard</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-4 mt-6 border-b border-white/20 overflow-x-auto">
            <NavLink
              to="/moderator-dashboard/my-profile"
              className={({ isActive }) =>
                `px-6 py-3 font-semibold border-b-2 transition-colors whitespace-nowrap ${
                  isActive
                    ? 'border-white text-white'
                    : 'border-transparent text-purple-100 hover:text-white'
                }`
              }
            >
              My Profile
            </NavLink>
            <NavLink
              to="/moderator-dashboard/manage-scholarships"
              className={({ isActive }) =>
                `px-6 py-3 font-semibold border-b-2 transition-colors whitespace-nowrap ${
                  isActive
                    ? 'border-white text-white'
                    : 'border-transparent text-purple-100 hover:text-white'
                }`
              }
            >
              Manage Scholarships
            </NavLink>
            <NavLink
              to="/moderator-dashboard/all-reviews"
              className={({ isActive }) =>
                `px-6 py-3 font-semibold border-b-2 transition-colors whitespace-nowrap ${
                  isActive
                    ? 'border-white text-white'
                    : 'border-transparent text-purple-100 hover:text-white'
                }`
              }
            >
              All Reviews
            </NavLink>
            <NavLink
              to="/moderator-dashboard/all-applications"
              className={({ isActive }) =>
                `px-6 py-3 font-semibold border-b-2 transition-colors whitespace-nowrap ${
                  isActive
                    ? 'border-white text-white'
                    : 'border-transparent text-purple-100 hover:text-white'
                }`
              }
            >
              All Applications
            </NavLink>
            <NavLink
              to="/moderator-dashboard/add-scholarship"
              className={({ isActive }) =>
                `px-6 py-3 font-semibold border-b-2 transition-colors whitespace-nowrap ${
                  isActive
                    ? 'border-white text-white'
                    : 'border-transparent text-purple-100 hover:text-white'
                }`
              }
            >
              Add Scholarship
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
