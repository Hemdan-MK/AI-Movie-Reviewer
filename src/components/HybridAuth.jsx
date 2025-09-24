import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import GoogleSignInButton from './GoogleSignInButton';
import OneTapSignIn from './OneTapSignIn';
import { User, Monitor, Globe } from 'lucide-react';

const HybridAuth = ({ className = '', children, showFallback = true }) => {
  const { currentUser, isDevelopment, isOneTapAvailable } = useAuth();

  if (currentUser) {
    return null; // Don't show if user is already signed in
  }

  // In development or when One Tap is not available, show the regular Google Sign-In button
  if (isDevelopment || !isOneTapAvailable) {
    return (
      <div className={`space-y-3 ${className}`}>
        {/* Development Notice */}
        {isDevelopment && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 text-center"
          >
            <div className="flex items-center justify-center space-x-2 text-blue-300 text-sm">
              <Monitor className="w-4 h-4" />
              <span>Development Mode - Using Google Sign-In Button</span>
            </div>
            <p className="text-blue-200 text-xs mt-1">
              One Tap will work automatically in production
            </p>
          </motion.div>
        )}
        
        {/* Google Sign-In Button */}
        <GoogleSignInButton 
          theme="filled_black"
          size="large"
          shape="rectangular"
          logo_alignment="left"
          showFallback={showFallback}
          className="w-full"
        />
      </div>
    );
  }

  // In production with One Tap available, show the One Tap trigger
  return (
    <div className={`space-y-3 ${className}`}>
      {/* Production Notice */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-center"
      >
        <div className="flex items-center justify-center space-x-2 text-green-300 text-sm">
          <Globe className="w-4 h-4" />
          <span>Production Mode - One Tap Enabled</span>
        </div>
        <p className="text-green-200 text-xs mt-1">
          One Tap will appear automatically, or click below to trigger it
        </p>
      </motion.div>

      {/* One Tap Trigger */}
      <OneTapSignIn className="w-full justify-center text-lg px-6 py-3">
        {children || 'Sign in with Google One Tap'}
      </OneTapSignIn>
    </div>
  );
};

export default HybridAuth;
