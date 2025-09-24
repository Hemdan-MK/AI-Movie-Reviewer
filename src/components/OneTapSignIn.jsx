import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

const OneTapSignIn = ({ className = '', children }) => {
  const { currentUser, signInWithGoogle } = useAuth();

  if (currentUser) {
    return null; // Don't show if user is already signed in
  }

  return (
    <motion.button
      onClick={signInWithGoogle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl ${className}`}
    >
      <User className="w-4 h-4" />
      <span>{children || 'Sign in with Google'}</span>
    </motion.button>
  );
};

export default OneTapSignIn;
