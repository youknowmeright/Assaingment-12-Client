import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { toast } from 'react-toastify';

export default function MyProfile() {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [requestSent, setRequestSent] = useState(false);
  const [requestLoading, setRequestLoading] = useState(false);

  useEffect(() => {
    if (user?.email) {
      fetch(`https://schoolarship-management-system-serv.vercel.app/users/${user.email}`)
        .then(res => res.json())
        .then(data => {
          setUserData(data);
          setRequestSent(data?.moderatorRequest === 'pending');
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching user data:', err);
          setLoading(false);
        });
    }
  }, [user]);

  const handleRequestModerator = () => {
    setRequestLoading(true);
    
    fetch(`https://schoolarship-management-system-serv.vercel.app/users/request-moderator/${user.email}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount > 0) {
          setRequestSent(true);
          toast.success('🎉 Moderator request sent successfully! Waiting for admin approval.');
        } else {
          toast.info('Request already sent or no changes made.');
        }
        setRequestLoading(false);
      })
      .catch(err => {
        console.error('Error requesting moderator role:', err);
        toast.error('Failed to send request. Please try again.');
        setRequestLoading(false);
      });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-linear-to-r from-blue-600 to-purple-600 h-32"></div>
        <div className="px-8 pb-8">
          <div className="flex flex-col md:flex-row items-center md:items-end -mt-16 mb-6">
            <img
              src={user?.photoURL || 'https://via.placeholder.com/150'}
              alt={user?.displayName}
              className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
            />
            <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900">
                {user?.displayName || 'User'}
              </h1>
              <p className="text-gray-600">{user?.email}</p>
              {userData?.role && userData.role !== 'user' && (
                <span className="inline-block mt-2 px-4 py-1 rounded-full bg-purple-100 text-purple-700 font-semibold text-sm">
                  {userData.role.charAt(0).toUpperCase() + userData.role.slice(1)}
                </span>
              )}
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
                Account Status
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Current Role</p>
                  <p className="text-base font-medium text-gray-900">
                    {userData?.role 
                      ? userData.role.charAt(0).toUpperCase() + userData.role.slice(1)
                      : 'User'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Moderator Request Status</p>
                  <p className="text-base font-medium text-gray-900">
                    {userData?.moderatorRequest === 'pending' 
                      ? '⏳ Pending Approval'
                      : userData?.role === 'moderator' || userData?.role === 'admin'
                      ? '✅ Approved'
                      : '➖ Not Requested'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email Verification</p>
                  <p className="text-base font-medium text-gray-900">
                    {user?.emailVerified ? '✅ Verified' : '⚠️ Not Verified'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Become Moderator Section */}
          {userData?.role === 'user' && !requestSent && (
            <div className="mt-8 bg-linear-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
              <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                <svg
                  className="w-6 h-6 mr-2 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
                Become a Moderator
              </h3>
              <p className="text-gray-700 mb-4">
                Want to help manage scholarships and support other students? Request to become a moderator!
              </p>
              <button
                onClick={handleRequestModerator}
                disabled={requestLoading}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  requestLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl'
                }`}
              >
                {requestLoading ? 'Sending Request...' : 'Request Moderator Role'}
              </button>
            </div>
          )}

          {requestSent && userData?.role === 'user' && (
            <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <div className="flex items-start">
                <svg
                  className="w-6 h-6 text-yellow-600 mr-3 mt-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <h4 className="text-lg font-semibold text-yellow-800 mb-1">
                    Moderator Request Pending
                  </h4>
                  <p className="text-yellow-700">
                    Your request to become a moderator is currently under review by the admin team. 
                    You'll be notified once your request has been processed.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Total Applications</p>
              <p className="text-3xl font-bold text-blue-600">0</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">My Reviews</p>
              <p className="text-3xl font-bold text-green-600">0</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Pending Status</p>
              <p className="text-3xl font-bold text-purple-600">0</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <svg
                className="w-8 h-8 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
