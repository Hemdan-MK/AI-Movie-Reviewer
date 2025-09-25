import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import GoogleSignInButton from './GoogleSignInButton';
import { 
  X, 
  Film, 
  Zap, 
  Sparkles,
  Star,
  Shield
} from 'lucide-react';

const AuthModal = ({ isOpen, onClose }) => {
  const { currentUser } = useAuth();

  // Close modal when user successfully signs in
  useEffect(() => {
    if (currentUser && isOpen) {
      onClose();
    }
  }, [currentUser, isOpen, onClose]);

  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 50
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2
      }
    }
  };

  const glowVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: [0, 1, 0], 
      scale: [0.8, 1.2, 0.8],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    })
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md"
          >
            {/* Card Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-3xl blur-xl opacity-75"></div>
            
            {/* Main Card */}
            <div className="relative bg-black/90 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden">
              {/* Close Button */}
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
              >
                <X className="w-4 h-4" />
              </motion.button>

              {/* Header */}
              <div className="text-center pt-12 pb-8 px-8">
                {/* Animated Logo */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                  className="relative inline-flex items-center justify-center mb-6"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-75"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <motion.div
                      variants={glowVariants}
                      initial="initial"
                      animate="animate"
                    >
                      <Film className="w-8 h-8 text-white" />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Title */}
                <motion.div
                  custom={0}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <h2 className="text-3xl font-bold mb-3">
                    <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                      Welcome to MovieReview
                    </span>
                  </h2>
                  <p className="text-gray-400 text-lg">
                    Sign in to unlock AI-powered cinema insights
                  </p>
                </motion.div>

                {/* Glowing Badge */}
                <motion.div
                  custom={1}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  className="relative inline-flex items-center space-x-2 mt-6"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-md"></div>
                  <div className="relative bg-black/50 backdrop-blur-sm border border-purple-500/30 text-white px-6 py-3 rounded-full flex items-center space-x-2">
                    <motion.div
                      variants={glowVariants}
                      initial="initial"
                      animate="animate"
                    >
                      <Zap className="w-4 h-4 text-purple-400" />
                    </motion.div>
                    <span className="text-sm font-medium bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      Premium Experience
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Content */}
              <div className="px-8 pb-12">
                {/* Google Sign In Button */}
                <motion.div
                  custom={2}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  className="mb-8 flex justify-center"
                >
                  <motion.div
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 20px 40px rgba(147, 51, 234, 0.2)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="relative group"
                  >
                    {/* Background Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Google Sign-In Button */}
                    <div className="relative">
                      <GoogleSignInButton 
                        theme="filled_black"
                        size="large"
                        shape="rectangular"
                        logo_alignment="left"
                        className="transform transition-transform duration-200"
                      />
                    </div>
                  </motion.div>
                </motion.div>

                {/* Features Grid */}
                <motion.div
                  custom={3}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-3 gap-4"
                >
                  {[
                    { icon: Sparkles, text: 'AI Reviews', color: 'from-yellow-500 to-orange-500' },
                    { icon: Star, text: 'Top Rated', color: 'from-purple-500 to-pink-500' },
                    { icon: Shield, text: 'Secure', color: 'from-green-500 to-blue-500' },
                  ].map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <motion.div
                        key={feature.text}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        whileHover={{ 
                          scale: 1.05,
                          y: -2,
                          transition: { type: "spring", stiffness: 400, damping: 25 }
                        }}
                        className="relative group text-center p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-white/20 transition-all duration-300"
                      >
                        {/* Hover Glow */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                        
                        {/* Content */}
                        <div className="relative">
                          <div className={`w-8 h-8 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                          <p className="text-xs text-gray-300 font-medium">{feature.text}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>

                {/* Privacy Note */}
                <motion.p
                  custom={4}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-center text-xs text-gray-500 mt-6"
                >
                  By signing in, you agree to our Terms of Service and Privacy Policy
                </motion.p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
