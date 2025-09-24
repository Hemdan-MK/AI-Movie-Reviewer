import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const OneTapProvider = ({ children }) => {
  const { currentUser, showOneTap, isDevelopment } = useAuth();

  useEffect(() => {
    // Only trigger One Tap in production and for non-authenticated users
    if (!isDevelopment && !currentUser) {
      // Delay to ensure the page is fully loaded
      const timer = setTimeout(() => {
        showOneTap();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [currentUser, showOneTap, isDevelopment]);

  return <>{children}</>;
};

export default OneTapProvider;
