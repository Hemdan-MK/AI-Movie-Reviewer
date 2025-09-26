import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import AuthFallback from './AuthFallback';

const GoogleSignInButton = ({ 
  theme = 'filled_black', 
  size = 'large', 
  shape = 'rectangular',
  logo_alignment = 'left',
  className = '',
  showFallback = true,
  ...props 
}) => {
  const buttonRef = useRef(null);
  const [hasError, setHasError] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const { renderGoogleSignInButton } = useAuth();

  useEffect(() => {
    const renderButton = () => {
      if (buttonRef.current && window.google && import.meta.env.VITE_GOOGLE_CLIENT_ID) {
        try {
          // Clear any existing content
          buttonRef.current.innerHTML = '';
          
          // Render the Google Sign-In button
          renderGoogleSignInButton(buttonRef.current, {
            theme,
            size,
            shape,
            logo_alignment,
            ...props
          });
          
          setIsReady(true);
          setHasError(false);
        } catch (error) {
          setHasError(true);
          setIsReady(false);
        }
      } else {
        // Check what's missing
        if (!window.google || !import.meta.env.VITE_GOOGLE_CLIENT_ID) {
          setHasError(true);
        }
        setHasError(true);
        setIsReady(false);
      }
    };

    // Try to render immediately
    renderButton();

    // Also try after a short delay in case Google services are still loading
    const timeout = setTimeout(renderButton, 1000);

    return () => clearTimeout(timeout);
  }, [renderGoogleSignInButton, theme, size, shape, logo_alignment, props]);

  // Show fallback if there's an error and fallback is enabled
  if (hasError && showFallback) {
    return <AuthFallback className={className} />;
  }

  // Show loading state if not ready and no error
  if (!isReady && !hasError) {
    return (
      <div className={`flex items-center justify-center p-4 ${className}`}>
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
        <span className="ml-2 text-gray-400">Loading Google Sign-In...</span>
      </div>
    );
  }

  return (
    <div 
      ref={buttonRef} 
      className={`google-signin-button ${className}`}
    />
  );
};

export default GoogleSignInButton;
