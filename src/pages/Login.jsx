import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import HybridAuth from '../components/HybridAuth';
import { 
  Film, 
  Sparkles, 
  ArrowLeft,
  Zap,
  Star,
  Shield
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Login = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Redirect to home if already logged in
  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  // Animation variants
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      y: 30, 
      opacity: 0, 
      scale: 0.9
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black"></div>
        <motion.div 
          className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -150, 0],
            y: [0, 100, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md"
        >
          {/* Back Button */}
          <motion.div
            variants={itemVariants}
            className="mb-8"
          >
            <motion.div
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/" 
                className="group flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-2 w-fit"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                <span>Back to Home</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Main Login Card */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            {/* Card Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-50"></div>
            
            {/* Main Card */}
            <div className="relative bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden">
              {/* Header */}
              <div className="text-center pt-12 pb-8 px-8">
                {/* Animated Logo */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 15 }}
                  className="relative inline-flex items-center justify-center mb-6"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-75"></div>
                  <div className="relative w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <motion.div
                      variants={glowVariants}
                      initial="initial"
                      animate="animate"
                    >
                      <Film className="w-10 h-10 text-white" />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Title */}
                <motion.div
                  variants={itemVariants}
                >
                  <h1 className="text-4xl font-bold mb-3">
                    <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                      Welcome Back
                    </span>
                  </h1>
                  <p className="text-gray-400 text-lg">
                    Sign in to unlock AI-powered cinema insights
                  </p>
                </motion.div>

                {/* Glowing Badge */}
                <motion.div
                  variants={itemVariants}
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
              <div className="px-8 pb-12 space-y-6">
                {/* Hybrid Authentication */}
                <motion.div variants={itemVariants}>
                  <HybridAuth showFallback={true}>
                    Continue with Google
                  </HybridAuth>
                </motion.div>

                {/* Info Text */}
                <motion.div variants={itemVariants} className="text-center">
                  <p className="text-gray-400 text-sm">
                    Secure authentication powered by Google
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            variants={itemVariants}
            className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {[
              { icon: Sparkles, text: 'AI Reviews', color: 'from-yellow-500 to-orange-500' },
              { icon: Star, text: 'Top Rated', color: 'from-purple-500 to-pink-500' },
              { icon: Shield, text: 'Secure Login', color: 'from-green-500 to-blue-500' },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -5,
                    transition: { type: "spring", stiffness: 400, damping: 25 }
                  }}
                  className="relative group text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300"
                >
                  {/* Hover Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                  
                  {/* Content */}
                  <div className="relative">
                    <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-gray-300 font-medium">{feature.text}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;