import { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../config/api';

export const useScholarships = (limit = null) => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        setLoading(true);
        const url = limit 
          ? API_ENDPOINTS.topScholarships 
          : API_ENDPOINTS.scholarships;
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Failed to fetch scholarships');
        }
        
        const data = await response.json();
        
        // If limit is specified and we're not using the /top endpoint
        const scholarshipsData = limit && !url.includes('/top') 
          ? data.slice(0, limit) 
          : data;
        
        setScholarships(scholarshipsData);
        setError(null);
      } catch (err) {
        setError(err.message);
        setScholarships([]);
      } finally {
        setLoading(false);
      }
    };

    fetchScholarships();
  }, [limit]);

  return { scholarships, loading, error };
};

export default useScholarships;
