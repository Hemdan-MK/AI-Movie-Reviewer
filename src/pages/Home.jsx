import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import LaserFlow from '../components/LaserFlow';
import { 
  Star, 
  Play, 
  Sparkles,
  ArrowRight,
  Film,
  Users,
  MessageSquare
} from 'lucide-react';

// Animated Counter Hook
const useAnimatedCounter = (end, duration = 2000, start = 0) => {
  const [count, setCount] = useState(start);
  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    const startTime = Date.now();
    const startValue = start;
    const endValue = end;

    const updateCount = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentValue = Math.floor(startValue + (endValue - startValue) * easeOutExpo);
      
      setCount(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setIsAnimating(false);
      }
    };
    
    requestAnimationFrame(updateCount);
  };

  return { count, startAnimation };
};

// Animated Stat Card Component
const AnimatedStatCard = ({ stat, index, inView }) => {
  const Icon = stat.icon;
  const counter = useAnimatedCounter(stat.value, 2000 + index * 200);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true);
      // Add delay based on index for staggered animation
      setTimeout(() => {
        counter.startAnimation();
      }, index * 200);
    }
  }, [inView, index, counter, hasAnimated]);

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + 'K';
    }
    return num.toLocaleString();
  };

  return (
    <motion.div 
      variants={{
        hidden: { y: 20, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
          transition: {
            type: "spring",
            stiffness: 100,
          },
        },
      }}
      whileHover={{ 
        y: -5,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
    >
      <div className="relative group">
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Card */}
        <div className="relative bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 sm:p-8 text-center hover:border-purple-500/30 transition-colors duration-300">
          <motion.div 
            className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6"
            whileHover={{ 
              rotate: 360,
              scale: 1.1,
              transition: { duration: 0.5 }
            }}
          >
            <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </motion.div>
          <h3 className="text-3xl sm:text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {formatNumber(counter.count)}{stat.suffix}
          </h3>
          <p className="text-gray-400 text-base sm:text-lg">{stat.label}</p>
        </div>
      </div>
    </motion.div>
  );
};

const Home = () => {
  const { ref: heroRef, inView: heroInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: statsRef, inView: statsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const stats = [
    { label: 'Movies Reviewed', value: 10000, suffix: '+', icon: Film },
    { label: 'Active Users', value: 5000, suffix: '+', icon: Users },
    { label: 'Reviews Written', value: 50000, suffix: '+', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black"></div>
        <motion.div 
          className="absolute top-32 right-32 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-32 left-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 120, 0],
            y: [0, -80, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section ref={heroRef} className="relative pt-20 pb-16 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >

              {/* Main Title */}
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6"
                initial={{ opacity: 0, y: 100 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
                transition={{ delay: 0.4, duration: 0.5, type: "spring", stiffness: 100 }}
              >
                <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                  Discover
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  Amazing Movies
                </span>
              </motion.h1>

              <motion.p 
                className="text-lg sm:text-xl text-gray-400 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0"
                initial={{ opacity: 0 }}
                animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Get AI-powered insights, read authentic reviews, and discover your next favorite movie 
                with our comprehensive movie review platform.
              </motion.p>

              {/* Action Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.8 }}
                className="flex justify-center"
              >
                <Link to="/movies">
                  <motion.button
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 20px 40px rgba(147, 51, 234, 0.3)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="relative group bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                    <div className="relative flex items-center space-x-2">
                      <Play className="w-5 h-5" />
                      <span>Explore Movies</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section ref={statsRef} className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={statsInView ? "visible" : "hidden"}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8"
            >
              {stats.map((stat, index) => (
                <AnimatedStatCard 
                  key={stat.label} 
                  stat={stat} 
                  index={index} 
                  inView={statsInView}
                />
              ))}
            </motion.div>
          </div>
        </section>

        {/* Laser Flow Movies Section */}
        <LaserFlow />
      </div>
    </div>
  );
};

export default Home;