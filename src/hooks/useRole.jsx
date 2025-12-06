import { useState, useEffect, useRef } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { API_ENDPOINTS } from '../config/api';

export const useUserRole = () => {
  const { user } = useContext(AuthContext);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (user?.email && !fetchedRef.current) {
      fetchedRef.current = true;
      fetch(API_ENDPOINTS.userByEmail(user.email))
        .then(res => res.json())
        .then(data => {
          setUserRole(data?.role || 'user');
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching user role:', err);
          setUserRole('user');
          setLoading(false);
        });
    } else if (!user?.email) {
      setUserRole(null);
      setLoading(false);
      fetchedRef.current = false;
    }
  }, [user?.email]);

  return { userRole, loading };
};

export const useAdmin = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (user?.email && !fetchedRef.current) {
      fetchedRef.current = true;
      fetch(API_ENDPOINTS.checkAdmin(user.email))
        .then(res => res.json())
        .then(data => {
          setIsAdmin(data.admin);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error checking admin status:', err);
          setIsAdmin(false);
          setLoading(false);
        });
    } else if (!user?.email) {
      setIsAdmin(false);
      setLoading(false);
      fetchedRef.current = false;
    }
  }, [user?.email]);

  return { isAdmin, loading };
};

export const useModerator = () => {
  const { user } = useContext(AuthContext);
  const [isModerator, setIsModerator] = useState(false);
  const [loading, setLoading] = useState(true);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (user?.email && !fetchedRef.current) {
      fetchedRef.current = true;
      fetch(API_ENDPOINTS.checkModerator(user.email))
        .then(res => res.json())
        .then(data => {
          setIsModerator(data.moderator);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error checking moderator status:', err);
          setIsModerator(false);
          setLoading(false);
        });
    } else if (!user?.email) {
      setIsModerator(false);
      setLoading(false);
      fetchedRef.current = false;
    }
  }, [user?.email]);

  return { isModerator, loading };
};
