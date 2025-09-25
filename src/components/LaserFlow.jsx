import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { tmdbApi } from '../services/tmdbApi';
import { 
  Star, 
  Calendar, 
  Play, 
  TrendingUp,
  Trophy,
  Clock,
  Sparkles,
  Filter,
  ArrowRight,
  Zap
} from 'lucide-react';

const LaserFlow = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('popular');
  const laserRef = useRef(null);
  const moviesRef = useRef([]);

  const categories = [
    { 
      id: 'popular', 
      name: 'Popular', 
      icon: TrendingUp, 
      color: 'from-purple-500 to-pink-500',
      description: 'Most watched movies'
    },
    { 
      id: 'top_rated', 
      name: 'Top Rated', 
      icon: Trophy, 
      color: 'from-yellow-500 to-orange-500',
      description: 'Highest rated films'
    },
    { 
      id: 'now_playing', 
      name: 'Now Playing', 
      icon: Play, 
      color: 'from-green-500 to-blue-500',
      description: 'In theaters now'
    },
    { 
      id: 'upcoming', 
      name: 'Upcoming', 
      icon: Clock, 
      color: 'from-blue-500 to-purple-500',
      description: 'Coming soon'
    },
  ];

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      try {
        let data;
        switch (selectedCategory) {
          case 'popular':
            data = await tmdbApi.getPopularMovies();
            break;
          case 'top_rated':
            data = await tmdbApi.getTopRatedMovies();
            break;
          case 'now_playing':
            data = await tmdbApi.getNowPlayingMovies();
            break;
          case 'upcoming':
            data = await tmdbApi.getUpcomingMovies();
            break;
          default:
            data = await tmdbApi.getPopularMovies();
        }
        setMovies(data.results?.slice(0, 12) || []);
      } catch (error) {
        console.error('Error loading movies:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [selectedCategory]);

  // Laser Flow GSAP animation
  useEffect(() => {
    if (!loading && moviesRef.current.length > 0) {
      // Initial fade-in animation for new selection
      gsap.fromTo(moviesRef.current, {
        opacity: 0,
        scale: 0.6,
        rotationY: 45,
        y: 50,
      }, {
        opacity: 1,
        scale: 1,
        rotationY: 0,
        y: 0,
        duration: 0.8,
        stagger: {
          amount: 0.4,
          from: "start"
        },
        ease: "back.out(1.7)",
      });

      // Add continuous floating animation
      moviesRef.current.forEach((movie, index) => {
        gsap.to(movie, {
          y: "+=15",
          duration: 2.5 + (index % 4) * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.15,
        });
      });

      return () => {
        gsap.killTweensOf(moviesRef.current);
      };
    }
  }, [movies, loading, selectedCategory]);

  const handleCategoryChange = (categoryId) => {
    if (categoryId === selectedCategory) return;

    // Fade out previous selection with laser effect
    gsap.to(moviesRef.current, {
      opacity: 0,
      scale: 0.8,
      rotationY: -45,
      y: -30,
      duration: 0.6,
      stagger: {
        amount: 0.3,
        from: "random"
      },
      ease: "power2.inOut",
      onComplete: () => {
        setSelectedCategory(categoryId);
      }
    });
  };

  const currentCategory = categories.find(cat => cat.id === selectedCategory);

  return (
    <div className="relative py-20 overflow-hidden">
      {/* Laser Flow Background Effects */}
      <div className="absolute inset-0">
        {/* Animated laser lines */}
        <div className="absolute top-0 left-0 w-full h-full">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              className={`absolute h-0.5 bg-gradient-to-r ${currentCategory?.color} opacity-30`}
              style={{
                top: `${20 + i * 15}%`,
                left: '-100%',
                width: '200%',
              }}
              animate={{
                x: ['0%', '100%'],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 0.3,
              }}
            />
          ))}
        </div>

        {/* Particle effects */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 bg-gradient-to-r ${currentCategory?.color} rounded-full`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
            {Array.from({ length: 96 }).map((_, i) => (
              <div key={i} className="border border-white/20" />
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12 sm:mb-16 px-4 sm:px-0"
        >
          {categories.map((category, index) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.id;
            
            return (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ 
                  scale: 1.05,
                  y: -2,
                  transition: { type: "spring", stiffness: 400, damping: 25 }
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCategoryChange(category.id)}
                className={`relative group px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold transition-all duration-300 text-sm sm:text-base ${
                  isActive 
                    ? 'text-white shadow-2xl' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {/* Laser glow effect */}
                {isActive && (
                  <motion.div
                    layoutId="laserGlow"
                    className={`absolute inset-0 bg-gradient-to-r ${category.color} rounded-2xl blur-md opacity-75`}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                
                {/* Background */}
                <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                  isActive 
                    ? `bg-gradient-to-r ${category.color}` 
                    : 'bg-white/5 group-hover:bg-white/10'
                }`} />
                
                {/* Content */}
                <div className="relative flex flex-col sm:flex-col items-center space-y-1 sm:space-y-2">
                  <Icon className="w-4 h-4 sm:w-5 md:w-6 sm:h-5 md:h-6" />
                  <span className="text-xs sm:text-sm font-bold">{category.name}</span>
                  <span className="text-xs opacity-75 hidden sm:block">{category.description}</span>
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Laser Flow Movies Grid */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-6"
              >
                {Array.from({ length: 12 }).map((_, index) => (
                  <div
                    key={index}
                    className="aspect-[2/3] bg-gray-900/50 rounded-2xl animate-pulse"
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-6"
              >
                {movies.map((movie, index) => (
                  <motion.div
                    key={`${selectedCategory}-${movie.id}`}
                    ref={el => moviesRef.current[index] = el}
                    className="group cursor-pointer relative"
                    whileHover={{ 
                      scale: 1.05,
                      zIndex: 10,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <Link to={`/movie/${movie.id}`} className="block">
                      {/* Movie Card */}
                      <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 hover:border-purple-500/50 transition-all duration-300">
                        {/* Laser border effect */}
                        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${currentCategory?.color} p-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                          <div className="w-full h-full bg-black rounded-2xl" />
                        </div>

                        {/* Movie Poster */}
                        <img
                          src={tmdbApi.getImageUrl(movie.poster_path, 'w500')}
                          alt={movie.title}
                          className="relative z-10 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                          loading="lazy"
                        />
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Content */}
                        <div className="absolute inset-0 z-30 p-4 flex flex-col justify-end">
                          {/* Rating Badge */}
                          <div className="absolute top-4 right-4">
                            <div className="bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                              <span>{movie.vote_average?.toFixed(1)}</span>
                            </div>
                          </div>

                          {/* Movie Info */}
                          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <h3 className="font-bold text-white mb-2 line-clamp-2 text-lg hover:text-purple-300 transition-colors cursor-pointer">
                              {movie.title}
                            </h3>
                            
                            <div className="flex items-center text-sm text-gray-300 mb-3">
                              <Calendar className="w-3 h-3 mr-1" />
                              <span>{new Date(movie.release_date).getFullYear()}</span>
                            </div>
                          </div>
                        </div>

                        {/* Laser sweep effect */}
                        <div className={`absolute inset-0 z-40 bg-gradient-to-r ${currentCategory?.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link to="/movies">
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(147, 51, 234, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              className={`relative group bg-gradient-to-r ${currentCategory?.color} text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl`}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${currentCategory?.color} rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300`} />
              <div className="relative flex items-center space-x-2">
                <Filter className="w-5 h-5" />
                <span>Explore All {currentCategory?.name} Movies</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default LaserFlow;
