import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { tmdbApi } from '../services/tmdbApi';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  Star, 
  Calendar, 
  Play, 
  TrendingUp, 
  Sparkles,
  ArrowRight,
  Film,
  Users,
  MessageSquare
} from 'lucide-react';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('popular');

  const categories = [
    { id: 'popular', name: 'Popular', icon: TrendingUp },
    { id: 'top_rated', name: 'Top Rated', icon: Star },
    { id: 'now_playing', name: 'Now Playing', icon: Play },
  ];

  const { ref: heroRef, inView: heroInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: statsRef, inView: statsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      try {
        const data = await tmdbApi.getPopularMovies();
        setMovies(data.results || []);
      } catch (error) {
        console.error('Error loading movies:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

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
    { label: 'Movies Reviewed', value: '10,000+', icon: Film },
    { label: 'Active Users', value: '5,000+', icon: Users },
    { label: 'Reviews Written', value: '50,000+', icon: MessageSquare },
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
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Sparkles className="w-5 h-5 text-purple-400" />
                  </motion.div>
                  <span className="font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    AI-Powered Reviews
                  </span>
                </div>
              </motion.div>

              {/* Main Title */}
              <motion.h1 
                className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
                initial={{ opacity: 0, y: 100 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
                transition={{ delay: 0.4, duration: 0.8, type: "spring", stiffness: 100 }}
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
                className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Get AI-powered insights, read authentic reviews, and discover your next favorite movie 
                with our comprehensive movie review platform.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
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
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white/20 transition-colors duration-300"
                >
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5" />
                    <span>Read Reviews</span>
                  </div>
                </motion.button>
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
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div 
                    key={stat.label} 
                    variants={itemVariants}
                    whileHover={{ 
                      y: -5,
                      transition: { type: "spring", stiffness: 300, damping: 20 }
                    }}
                  >
                    <div className="relative group">
                      {/* Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Card */}
                      <div className="relative bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8 text-center hover:border-purple-500/30 transition-colors duration-300">
                        <motion.div 
                          className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6"
                          whileHover={{ 
                            rotate: 360,
                            scale: 1.1,
                            transition: { duration: 0.5 }
                          }}
                        >
                          <Icon className="w-10 h-10 text-white" />
                        </motion.div>
                        <h3 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                          {stat.value}
                        </h3>
                        <p className="text-gray-400 text-lg">{stat.label}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

      {/* Movies Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Popular Movies
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Discover the most talked-about movies with AI-powered reviews and insights
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "gradient" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center space-x-2"
                >
                  <Icon className="w-4 h-4" />
                  <span>{category.name}</span>
                </Button>
              );
            })}
          </motion.div>

          {/* Movies Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-2 xs:gap-3 sm:gap-4 md:gap-6"
          >
            <AnimatePresence>
              {loading ? (
                Array.from({ length: 8 }).map((_, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="animate-pulse"
                  >
                    <Card className="bg-slate-800/50 border-slate-700">
                      <div className="aspect-[2/3] bg-slate-700 rounded-t-lg"></div>
                      <CardContent className="p-4">
                        <div className="h-4 bg-slate-700 rounded mb-2"></div>
                        <div className="h-3 bg-slate-700 rounded w-2/3"></div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              ) : (
                movies.slice(0, 8).map((movie, index) => (
                  <motion.div
                    key={movie.id}
                    variants={itemVariants}
                    whileHover={{ y: -10, transition: { duration: 0.2 } }}
                    className="group cursor-pointer"
                  >
                    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-slate-800/50 border-slate-700 hover:border-orange-500/50 h-full">
                      <div className="relative aspect-[2/3] overflow-hidden">
                        <img
                          src={tmdbApi.getImageUrl(movie.poster_path, 'w500')}
                          alt={movie.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-4 left-4 right-4">
                            <Button size="sm" variant="glass" className="w-full" asChild>
                              <Link to={`/movie/${movie.id}`}>
                                <Play className="w-4 h-4 mr-2" />
                                View Details
                              </Link>
                            </Button>
                          </div>
                        </div>
                        <Badge variant="glass" className="absolute top-3 right-3">
                          <Star className="w-3 h-3 mr-1" />
                          {movie.vote_average?.toFixed(1)}
                        </Badge>
                      </div>
                      <CardContent className="p-3 sm:p-4">
                        <h3 className="font-semibold text-white mb-2 line-clamp-2 text-sm sm:text-base">
                          {movie.title}
                        </h3>
                        <div className="flex items-center text-xs sm:text-sm text-slate-400">
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          {new Date(movie.release_date).getFullYear()}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
      </div>
    </div>
  );
};

export default Home;