import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';

export default function ModeratorProfile() {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalScholarships: 0,
    totalApplications: 0,
    totalReviews: 0,
    pendingApplications: 0
  });

  useEffect(() => {
    if (user?.email) {
      // Fetch user data
      fetch(`https://schoolarship-management-system-serv.vercel.app/users/${user.email}`)
        .then(res => res.json())
        .then(data => {
          setUserData(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching user data:', err);
          setLoading(false);
        });

      // Fetch statistics
      Promise.all([
        fetch('https://schoolarship-management-system-serv.vercel.app/scholarships').then(r => r.json()),
        fetch('https://schoolarship-management-system-serv.vercel.app/applications').then(r => r.json()),
        fetch('https://schoolarship-management-system-serv.vercel.app/reviews').then(r => r.json())
      ]).then(([scholarships, applications, reviews]) => {
        setStats({
          totalScholarships: scholarships.length,
          totalApplications: applications.length,
          totalReviews: reviews.length,
          pendingApplications: applications.filter(app => app.status === 'pending').length
        });
      }).catch(err => console.error('Error fetching stats:', err));
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-purple-600"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-linear-to-r from-purple-600 to-blue-600 h-32"></div>
        <div className="px-8 pb-8">
          <div className="flex flex-col md:flex-row items-center md:items-end -mt-16 mb-6">
            <img
              src={user?.photoURL || 'https://via.placeholder.com/150'}
              alt={user?.displayName}
              className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
            />
            <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900">
                {user?.displayName || 'Moderator'}
              </h1>
              <p className="text-gray-600">{user?.email}</p>
              <span className="inline-block mt-2 px-4 py-1 rounded-full bg-purple-100 text-purple-700 font-semibold text-sm">
                Moderator
              </span>
            </div>
          </div>

          {/* Profile Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Personal Information
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Full Name</p>
                  <p className="text-base font-medium text-gray-900">
                    {user?.displayName || 'Not provided'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email Address</p>
                  <p className="text-base font-medium text-gray-900">
                    {user?.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Account Created</p>
                  <p className="text-base font-medium text-gray-900">
                    {userData?.createdAt 
                      ? new Date(userData.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })
                      : 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Moderator Privileges
              </h3>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-700">
                  <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Manage all scholarships
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Review and approve applications
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Moderate reviews
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Add new scholarships
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Provide feedback to applicants
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Total Scholarships</p>
              <p className="text-3xl font-bold text-blue-600">{stats.totalScholarships}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Total Applications</p>
              <p className="text-3xl font-bold text-green-600">{stats.totalApplications}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Pending Applications</p>
              <p className="text-3xl font-bold text-yellow-600">{stats.pendingApplications}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Total Reviews</p>
              <p className="text-3xl font-bold text-purple-600">{stats.totalReviews}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
