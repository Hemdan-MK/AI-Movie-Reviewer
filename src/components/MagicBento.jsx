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
  Filter,
  Sparkles,
  Clock,
  Trophy
} from 'lucide-react';

const MagicBento = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('popular');
  const bentoRef = useRef(null);
  const itemsRef = useRef([]);

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

  // 6-grid bento layouts in perfect square formation (3x2 grid = 6 total cells)
  const bentoLayouts = {
    popular: [
      { span: 'col-span-2 row-span-2', size: 'large' },     // Movie 1: Large (takes 4 cells)
      { span: 'col-span-1 row-span-1', size: 'medium' },   // Movie 2: Top-right
      { span: 'col-span-1 row-span-1', size: 'medium' },   // Movie 3: Bottom-right
    ],
    top_rated: [
      { span: 'col-span-1 row-span-1', size: 'medium' },   // Movie 1: Top-left
      { span: 'col-span-2 row-span-2', size: 'large' },    // Movie 2: Large (takes 4 cells)
      { span: 'col-span-1 row-span-1', size: 'medium' },   // Movie 3: Bottom-left
    ],
    now_playing: [
      { span: 'col-span-1 row-span-1', size: 'medium' },   // Movie 1: Top-left
      { span: 'col-span-1 row-span-1', size: 'medium' },   // Movie 2: Top-center
      { span: 'col-span-1 row-span-2', size: 'tall' },     // Movie 3: Right side (tall)
      { span: 'col-span-2 row-span-1', size: 'wide' },     // Movie 4: Bottom (wide)
    ],
    upcoming: [
      { span: 'col-span-1 row-span-2', size: 'tall' },     // Movie 1: Left side (tall)
      { span: 'col-span-1 row-span-1', size: 'medium' },   // Movie 2: Top-center
      { span: 'col-span-1 row-span-1', size: 'medium' },   // Movie 3: Top-right
      { span: 'col-span-2 row-span-1', size: 'wide' },     // Movie 4: Bottom (wide)
    ]
  };

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
        
        // Get the correct number of movies for each layout
        const currentLayout = bentoLayouts[selectedCategory] || bentoLayouts.popular;
        const movieCount = currentLayout.length;
        setMovies(data.results?.slice(0, movieCount) || []);
      } catch (error) {
        console.error('Error loading movies:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [selectedCategory]);

  // GSAP animation when category changes
  useEffect(() => {
    if (!loading && itemsRef.current.length > 0) {
      gsap.fromTo(
        itemsRef.current,
        {
          scale: 0.8,
          opacity: 0,
          rotationY: -90,
        },
        {
          scale: 1,
          opacity: 1,
          rotationY: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
        }
      );
    }
  }, [movies, loading, selectedCategory]);

  const handleCategoryChange = (categoryId) => {
    if (categoryId === selectedCategory) return;

    // Animate out current items
    gsap.to(itemsRef.current, {
      scale: 0.8,
      opacity: 0,
      rotationY: 90,
      duration: 0.4,
      stagger: 0.05,
      ease: "power2.in",
      onComplete: () => {
        setSelectedCategory(categoryId);
      }
    });
  };

  const currentCategory = categories.find(cat => cat.id === selectedCategory);
  const currentLayout = bentoLayouts[selectedCategory] || bentoLayouts.popular;

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="w-6 h-6 text-purple-400" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Magic Bento Movies
            </h2>
            <Sparkles className="w-6 h-6 text-pink-400" />
          </div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover movies in our dynamic bento layout powered by GSAP animations
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
                className={`relative group px-6 py-4 rounded-2xl font-semibold transition-all duration-300 ${
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
                <div className="relative flex flex-col items-center space-y-1">
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{category.name}</span>
                  <span className="text-xs opacity-75">{category.description}</span>
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Magic Bento Grid */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-3 grid-rows-2 gap-4 h-[500px]"
              >
                {Array.from({ length: currentLayout.length }).map((_, index) => (
                  <div
                    key={index}
                    className={`${currentLayout[index]?.span || 'col-span-1 row-span-1'} bg-gray-900/50 rounded-2xl animate-pulse`}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key={selectedCategory}
                ref={bentoRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-3 grid-rows-2 gap-4 h-[500px]"
              >
                {movies.map((movie, index) => {
                  const layout = currentLayout[index];
                  if (!layout) return null;

                  return (
                    <motion.div
                      key={`${selectedCategory}-${movie.id}`}
                      ref={el => itemsRef.current[index] = el}
                      className={`${layout.span} group cursor-pointer relative overflow-hidden rounded-2xl`}
                      whileHover={{ 
                        scale: 1.02,
                        zIndex: 10,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <Link to={`/movie/${movie.id}`} className="block h-full">
                        {/* Movie Poster */}
                        <div className="relative h-full overflow-hidden rounded-2xl">
                          <img
                            src={tmdbApi.getImageUrl(movie.poster_path, 'w780')}
                            alt={movie.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                            loading="lazy"
                          />
                          
                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                          
                          {/* Content Overlay */}
                          <div className="absolute inset-0 p-4 flex flex-col justify-end">
                            {/* Rating Badge */}
                            <div className="absolute top-4 right-4">
                              <div className="bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                <span>{movie.vote_average?.toFixed(1)}</span>
                              </div>
                            </div>

                            {/* Movie Info */}
                            <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                              <h3 className={`font-bold text-white mb-2 line-clamp-2 ${
                                layout.size === 'large' ? 'text-2xl' : 
                                layout.size === 'tall' || layout.size === 'wide' ? 'text-lg' : 'text-base'
                              }`}>
                                {movie.title}
                              </h3>
                              
                              <div className="flex items-center text-sm text-gray-300 mb-2">
                                <Calendar className="w-3 h-3 mr-1" />
                                <span>{new Date(movie.release_date).getFullYear()}</span>
                              </div>

                              {(layout.size === 'large' || layout.size === 'wide') && (
                                <p className="text-gray-400 text-sm line-clamp-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  {movie.overview}
                                </p>
                              )}
                            </div>

                            {/* Play Button */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                                <Play className="w-8 h-8 text-white" />
                              </div>
                            </div>
                          </div>

                          {/* Category Color Accent */}
                          <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${currentCategory?.color}`}></div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
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
          className="text-center mt-12"
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
              <div className={`absolute inset-0 bg-gradient-to-r ${currentCategory?.color} rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300`}></div>
              <div className="relative flex items-center space-x-2">
                <Filter className="w-5 h-5" />
                <span>View All {currentCategory?.name} Movies</span>
              </div>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default MagicBento;
