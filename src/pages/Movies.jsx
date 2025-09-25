import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { tmdbApi } from '../services/tmdbApi';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  Star, 
  Calendar, 
  Play, 
  TrendingUp, 
  Sparkles,
  ArrowRight,
  Film,
  Search,
  Filter,
  Loader2,
  Eye,
  Zap
} from 'lucide-react';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);

  const categories = [
    { id: 'popular', name: 'Popular', icon: TrendingUp, color: 'from-purple-500 to-pink-500' },
    { id: 'top_rated', name: 'Top Rated', icon: Star, color: 'from-yellow-500 to-orange-500' },
    { id: 'now_playing', name: 'Now Playing', icon: Play, color: 'from-green-500 to-blue-500' },
    { id: 'upcoming', name: 'Upcoming', icon: Calendar, color: 'from-blue-500 to-purple-500' },
  ];

  const { ref: heroRef, inView: heroInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const loadMovies = useCallback(async (isLoadMore = false) => {
    if (isLoadMore) {
      setLoadingMore(true);
    } else {
      setLoading(true);
      setError(null);
    }
    
    try {
      console.log('Movies: Loading movies for category:', selectedCategory, 'page:', page, 'search:', searchQuery);
      let data;
      
      if (searchQuery) {
        data = await tmdbApi.searchMovies(searchQuery, page);
      } else {
        // Load movies based on selected category
        switch (selectedCategory) {
          case 'popular':
            data = await tmdbApi.getPopularMovies(page);
            break;
          case 'top_rated':
            data = await tmdbApi.getTopRatedMovies(page);
            break;
          case 'now_playing':
            data = await tmdbApi.getNowPlayingMovies(page);
            break;
          case 'upcoming':
            data = await tmdbApi.getUpcomingMovies(page);
            break;
          default:
            data = await tmdbApi.getPopularMovies(page);
        }
      }
      
      console.log('Movies: Data received:', data);
      
      if (data.results) {
        if (isLoadMore && page > 1) {
          setMovies(prev => [...prev, ...data.results]);
        } else {
          setMovies(data.results);
        }
      } else {
        throw new Error('No results found');
      }
    } catch (error) {
      console.error('Error loading movies:', error);
      setError('Failed to load movies. Please try again.');
      if (!isLoadMore) {
        setMovies([]);
      }
    } finally {
      if (isLoadMore) {
        setLoadingMore(false);
      } else {
        setLoading(false);
      }
    }
  }, [selectedCategory, searchQuery, page]);

  useEffect(() => {
    loadMovies(page > 1);
  }, [loadMovies, page]);

  // Reset page when search query or category changes
  useEffect(() => {
    setPage(1);
  }, [searchQuery, selectedCategory]);

  // React Bits inspired animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      y: 60, 
      opacity: 0, 
      scale: 0.8,
      rotateX: -15
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.6,
      },
    },
  };

  const cardHoverVariants = {
    hover: {
      y: -8,
      scale: 1.02,
      rotateY: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
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
      </div>

      <div className="relative z-10 pt-20 pb-8">
        {/* Hero Section */}
        <section ref={heroRef} className="relative py-16 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              {/* Glowing Badge */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={heroInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                className="relative inline-flex items-center space-x-2 mb-8"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-75"></div>
                <div className="relative bg-black/50 backdrop-blur-sm border border-purple-500/30 text-white px-8 py-4 rounded-full flex items-center space-x-2">
                  <motion.div
                    variants={glowVariants}
                    initial="initial"
                    animate="animate"
                  >
                    <Zap className="w-5 h-5 text-purple-400" />
                  </motion.div>
                  <span className="font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Movie Discovery
                  </span>
                </div>
              </motion.div>

              {/* Main Title */}
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6"
                initial={{ opacity: 0, y: 100 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
                transition={{ delay: 0.4, duration: 0.8, type: "spring", stiffness: 100 }}
              >
                <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                  Discover
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  Epic Movies
                </span>
              </motion.h1>

              <motion.p 
                className="text-lg sm:text-xl text-gray-400 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0"
                initial={{ opacity: 0 }}
                animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Immerse yourself in the world of cinema with AI-powered insights and stunning visuals
              </motion.p>

              {/* Enhanced Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={heroInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
                transition={{ delay: 0.8, duration: 0.6, type: "spring" }}
                className="max-w-2xl mx-auto mb-8"
              >
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-lg opacity-25 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <div className="relative bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-2">
                    <div className="flex items-center">
                      <Search className="ml-4 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search for movies..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 bg-transparent px-4 py-3 text-white placeholder-gray-500 focus:outline-none text-lg"
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-shadow duration-300"
                      >
                        Search
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-4 mb-12"
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
                    onClick={() => setSelectedCategory(category.id)}
                    className={`relative group px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                      isActive 
                        ? 'text-white shadow-2xl' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {/* Background Glow */}
                    {isActive && (
                      <motion.div
                        layoutId="categoryGlow"
                        className={`absolute inset-0 bg-gradient-to-r ${category.color} rounded-2xl blur-sm opacity-75`}
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
                    <div className="relative flex items-center space-x-2">
                      <Icon className="w-5 h-5" />
                      <span>{category.name}</span>
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Movies Grid */}
        <section className="pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Error State */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 max-w-md mx-auto">
                  <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Film className="w-8 h-8 text-red-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-red-400 mb-2">Oops!</h3>
                  <p className="text-gray-400 mb-4">{error}</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => loadMovies()}
                    className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-xl font-medium"
                  >
                    Try Again
                  </motion.button>
                </div>
              </motion.div>
            )}

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6"
            >
              <AnimatePresence>
                {loading ? (
                  Array.from({ length: 12 }).map((_, index) => (
                    <motion.div
                      key={`skeleton-${index}`}
                      variants={itemVariants}
                      className="group"
                    >
                      <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden h-full">
                        <div className="aspect-[2/3] bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse"></div>
                        <div className="p-4">
                          <div className="h-4 bg-gray-800 rounded animate-pulse mb-2"></div>
                          <div className="h-3 bg-gray-800 rounded animate-pulse w-2/3"></div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : movies.length === 0 && !error ? (
                  <motion.div
                    variants={itemVariants}
                    className="col-span-full text-center py-16"
                  >
                    <div className="text-gray-400">
                      <motion.div
                        animate={{ 
                          rotate: [0, 360],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <Film className="w-20 h-20 mx-auto mb-6 text-gray-600" />
                      </motion.div>
                      <h3 className="text-2xl font-semibold mb-4 text-gray-300">No movies found</h3>
                      <p className="text-gray-500 max-w-md mx-auto">
                        {searchQuery 
                          ? `No results for "${searchQuery}". Try a different search term.`
                          : 'No movies available in this category. Please try another category.'
                        }
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  movies.map((movie, index) => (
                    <motion.div
                      key={movie.id}
                      variants={itemVariants}
                      whileHover="hover"
                      className="group cursor-pointer"
                    >
                      <Link to={`/movie/${movie.id}`} className="block h-full">
                        <motion.div
                          variants={cardHoverVariants}
                          className="relative bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 rounded-2xl overflow-hidden h-full hover:border-purple-500/30 transition-colors duration-300"
                        >
                        {/* Hover Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        {/* Movie Poster */}
                        <div className="relative aspect-[2/3] overflow-hidden">
                          <img
                            src={tmdbApi.getImageUrl(movie.poster_path, 'w500')}
                            alt={movie.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                            loading="lazy"
                          />
                          
                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          
                          {/* Rating Badge */}
                          <div className="absolute top-3 right-3">
                            <div className="bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                              <span>{movie.vote_average?.toFixed(1)}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Movie Info */}
                        <div className="p-4">
                          <h3 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors duration-300">
                            {movie.title}
                          </h3>
                          <div className="flex items-center justify-between text-sm text-gray-400">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span>{new Date(movie.release_date).getFullYear()}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Eye className="w-3 h-3" />
                              <span>{movie.popularity?.toFixed(0)}</span>
                            </div>
                          </div>
                        </div>
                        </motion.div>
                      </Link>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </motion.div>

            {/* Load More Button */}
            {!loading && movies.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mt-16"
              >
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(147, 51, 234, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPage(page + 1)}
                  disabled={loadingMore}
                  className="relative group bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {/* Background Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                  
                  {/* Content */}
                  <div className="relative flex items-center space-x-2">
                    {loadingMore ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Loading...</span>
                      </>
                    ) : (
                      <>
                        <span>Load More Movies</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                      </>
                    )}
                  </div>
                </motion.button>
              </motion.div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Movies;
