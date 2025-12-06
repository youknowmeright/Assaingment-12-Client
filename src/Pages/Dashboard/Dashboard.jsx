import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserRole } from '../../hooks/useRole';

export default function Dashboard() {
  const { userRole, loading } = useUserRole();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && userRole) {
      if (userRole === 'moderator') {
        navigate('/moderator-dashboard/my-profile', { replace: true });
      } else if (userRole === 'admin') {
        navigate('/admin-dashboard/my-profile', { replace: true });
      } else {
        navigate('/user-dashboard/my-profile', { replace: true });
      }
    }
  }, [userRole, loading, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
        <p className="mt-4 text-xl text-gray-700 font-semibold">
          Loading Dashboard...
        </p>
      </div>
    </div>
  );
}
