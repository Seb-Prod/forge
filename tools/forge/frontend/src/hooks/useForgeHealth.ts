import { useEffect, useState } from 'react';
import { checkHealth } from '../services/api';

export const useForgeHealth = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        await checkHealth();
        setIsOnline(true);
        setLoading(false);
      } catch (error) {
        setIsOnline(false);
        setLoading(false);
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return { isOnline, loading };
};