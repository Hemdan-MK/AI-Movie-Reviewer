import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { 
  User, 
  Star, 
  Calendar, 
  MessageSquare, 
  Film,
  TrendingUp,
  Award,
  Clock,
  Edit3,
  Eye,
  Heart,
  Sparkles
} from 'lucide-react';

const Profile = () => {
  const { currentUser, showOneTap, isOneTapAvailable } = useAuth();
  const [userReviews, setUserReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalReviews: 0,
    averageRating: 0,
    favoriteGenre: 'Action',
    totalMoviesWatched: 0
  });

  // Trigger One Tap for unauthenticated users
  useEffect(() => {
    if (!currentUser && isOneTapAvailable) {
      // Small delay to ensure the page has loaded
      const timer = setTimeout(() => {
        showOneTap();
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [currentUser, isOneTapAvailable, showOneTap]);

  // Mock user reviews data - In a real app, this would come from your database
  useEffect(() => {
    const loadUserReviews = async () => {
      setLoading(true);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data - replace with actual API call
        const mockReviews = [
          {
            id: 1,
            movieId: 550,
            movieTitle: "Fight Club",
            moviePoster: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
            rating: 5,
            review: "An absolute masterpiece that challenges societal norms. The cinematography and Edward Norton's performance are phenomenal.",
            date: "2024-01-15",
            likes: 12,
            views: 45
          },
          {
            id: 2,
            movieId: 13,
            movieTitle: "Forrest Gump",
            moviePoster: "/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
            rating: 4,
            review: "A heartwarming story that spans decades. Tom Hanks delivers an incredible performance that makes you believe in the power of kindness.",
            date: "2024-01-10",
            likes: 8,
            views: 32
          },
          {
            id: 3,
            movieId: 278,
            movieTitle: "The Shawshank Redemption",
            moviePoster: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
            rating: 5,
            review: "The greatest film ever made. A story of hope, friendship, and redemption that never gets old. Every scene is perfectly crafted.",
            date: "2024-01-05",
            likes: 25,
            views: 78
          },
          {
            id: 4,
            movieId: 238,
            movieTitle: "The Godfather",
            moviePoster: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
            rating: 4,
            review: "A cinematic achievement that defined the crime genre. Marlon Brando's performance is legendary and the storytelling is flawless.",
            date: "2023-12-28",
            likes: 18,
            views: 56
          }
        ];
        
        setUserReviews(mockReviews);
        setStats({
          totalReviews: mockReviews.length,
          averageRating: mockReviews.reduce((acc, review) => acc + review.rating, 0) / mockReviews.length,
          favoriteGenre: 'Drama',
          totalMoviesWatched: mockReviews.length + 15 // Additional movies without reviews
        });
      } catch (error) {
        console.error('Error loading user reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      loadUserReviews();
    } else {
      setLoading(false);
    }
  }, [currentUser]);

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

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
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
        </div>

        <div className="relative z-10 text-center max-w-md mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative inline-flex items-center justify-center mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-75"></div>
              <div className="relative w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Sign In Required
              </span>
            </h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Please sign in to view your profile and review history. 
              {isOneTapAvailable ? ' One Tap sign-in will appear shortly.' : ' Please use the sign-in option.'}
            </p>
            
            {!isOneTapAvailable && (
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-2xl font-semibold shadow-2xl"
                >
                  Go to Sign In
                </motion.button>
              </Link>
            )}
          </motion.div>
        </div>
      </div>
    );
  }

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
      </div>

      <div className="relative z-10 pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="relative inline-flex items-center justify-center mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-75"></div>
              <div className="relative w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                {currentUser.displayName || 'Movie Enthusiast'}
              </span>
            </h1>
            <p className="text-xl text-gray-400">Your movie review journey</p>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
          >
            {[
              { label: 'Total Reviews', value: stats.totalReviews, icon: MessageSquare, color: 'from-purple-500 to-pink-500' },
              { label: 'Average Rating', value: stats.averageRating.toFixed(1), icon: Star, color: 'from-yellow-500 to-orange-500' },
              { label: 'Movies Watched', value: stats.totalMoviesWatched, icon: Film, color: 'from-green-500 to-blue-500' },
              { label: 'Favorite Genre', value: stats.favoriteGenre, icon: Award, color: 'from-blue-500 to-purple-500' },
            ].map((stat, index) => {
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
                    <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    <div className="relative bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 text-center hover:border-purple-500/30 transition-colors duration-300">
                      <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-3xl font-bold text-white mb-2">
                        {stat.value}
                      </h3>
                      <p className="text-gray-400">{stat.label}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Reviews Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center space-x-3 mb-8">
              <Sparkles className="w-6 h-6 text-purple-400" />
              <h2 className="text-3xl font-bold text-white">Your Reviews</h2>
            </div>

            {loading ? (
              <div className="grid gap-6">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="bg-gray-900/50 rounded-2xl p-6 animate-pulse">
                    <div className="flex space-x-4">
                      <div className="w-20 h-28 bg-gray-800 rounded-lg"></div>
                      <div className="flex-1">
                        <div className="h-6 bg-gray-800 rounded mb-2"></div>
                        <div className="h-4 bg-gray-800 rounded w-1/3 mb-4"></div>
                        <div className="h-4 bg-gray-800 rounded mb-2"></div>
                        <div className="h-4 bg-gray-800 rounded w-2/3"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : userReviews.length === 0 ? (
              <div className="text-center py-16">
                <MessageSquare className="w-20 h-20 text-gray-600 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-gray-300 mb-4">No Reviews Yet</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-8">
                  Start your movie review journey by watching some films and sharing your thoughts!
                </p>
                <Link to="/movies">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-2xl font-semibold"
                  >
                    Explore Movies
                  </motion.button>
                </Link>
              </div>
            ) : (
              <div className="grid gap-6">
                {userReviews.map((review, index) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -2 }}
                    className="group"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 hover:border-purple-500/30 transition-colors duration-300">
                        <div className="flex space-x-6">
                          {/* Movie Poster */}
                          <Link to={`/movie/${review.movieId}`}>
                            <div className="flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                              <img
                                src={`https://image.tmdb.org/t/p/w200${review.moviePoster}`}
                                alt={review.movieTitle}
                                className="w-20 h-28 object-cover rounded-lg"
                                loading="lazy"
                              />
                            </div>
                          </Link>

                          {/* Review Content */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <Link to={`/movie/${review.movieId}`}>
                                  <h3 className="text-xl font-bold text-white hover:text-purple-300 transition-colors duration-300 cursor-pointer">
                                    {review.movieTitle}
                                  </h3>
                                </Link>
                                <div className="flex items-center space-x-4 mt-2">
                                  <div className="flex items-center space-x-1">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`w-4 h-4 ${
                                          i < review.rating
                                            ? 'text-yellow-400 fill-current'
                                            : 'text-gray-600'
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <div className="flex items-center text-sm text-gray-400">
                                    <Calendar className="w-3 h-3 mr-1" />
                                    <span>{new Date(review.date).toLocaleDateString()}</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <p className="text-gray-300 mb-4 leading-relaxed">
                              {review.review}
                            </p>

                            <div className="flex items-center space-x-6 text-sm text-gray-400">
                              <div className="flex items-center space-x-1">
                                <Heart className="w-4 h-4" />
                                <span>{review.likes} likes</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Eye className="w-4 h-4" />
                                <span>{review.views} views</span>
                              </div>
                              <button className="flex items-center space-x-1 hover:text-purple-400 transition-colors">
                                <Edit3 className="w-4 h-4" />
                                <span>Edit</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
