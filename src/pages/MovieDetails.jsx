import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { tmdbApi } from '../services/tmdbApi';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import ReviewBox from '../components/ReviewBox';
import SummaryBox from '../components/SummaryBox';
import { Star, Calendar, Clock, Loader2 } from 'lucide-react';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  useEffect(() => {
    loadMovieDetails();
    loadReviews();
  }, [id]);

  const loadMovieDetails = async () => {
    try {
      const data = await tmdbApi.getMovieDetails(id);
      setMovie(data);
    } catch (error) {
      console.error('Error loading movie details:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadReviews = () => {
    const q = query(
      collection(db, 'reviews'),
      where('movieId', '==', id),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const reviewsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setReviews(reviewsData);
      setReviewsLoading(false);
    });

    return unsubscribe;
  };

  const handleReviewAdded = () => {
    // Reviews will automatically update via Firestore listener
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <Loader2 className="w-8 h-8 animate-spin text-red-600" />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <p className="text-gray-500 text-lg">Movie not found</p>
      </div>
    );
  }

  const backdropUrl = movie.backdrop_path 
    ? tmdbApi.getImageUrl(movie.backdrop_path, 'w1280')
    : 'https://via.placeholder.com/1280x720?text=No+Image';

  const posterUrl = movie.poster_path 
    ? tmdbApi.getImageUrl(movie.poster_path, 'w500')
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-cover bg-center" style={{ backgroundImage: `url(${backdropUrl})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-8">
          <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-6">
            <img
              src={posterUrl}
              alt={movie.title}
              className="w-48 h-72 object-cover rounded-lg shadow-lg"
            />
            <div className="text-white">
              <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-lg font-semibold">
                    {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-5 h-5" />
                  <span>{movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-5 h-5" />
                  <span>{movie.runtime ? `${movie.runtime} min` : 'N/A'}</span>
                </div>
              </div>
              <p className="text-lg max-w-3xl">{movie.overview}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Reviews Section */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Reviews</h2>
            
            {/* AI Summary */}
            <SummaryBox reviews={reviews} movieTitle={movie.title} />
            
            {/* Review Form */}
            <div className="mb-8">
              <ReviewBox movieId={id} onReviewAdded={handleReviewAdded} />
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
              {reviewsLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-red-600" />
                </div>
              ) : reviews.length > 0 ? (
                reviews.map((review) => (
                  <div key={review.id} className="bg-white p-4 rounded-lg shadow-md">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-gray-600">
                          {review.userName ? review.userName.charAt(0).toUpperCase() : 'U'}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {review.userName || 'Anonymous'}
                        </p>
                        <p className="text-sm text-gray-500">
                          {review.createdAt?.toDate ? review.createdAt.toDate().toLocaleDateString() : 'Recently'}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700">{review.content}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No reviews yet. Be the first to review this movie!</p>
                </div>
              )}
            </div>
          </div>

          {/* Movie Info Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Movie Information</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-700">Genres</h4>
                  <p className="text-gray-600">
                    {movie.genres ? movie.genres.map(genre => genre.name).join(', ') : 'N/A'}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-700">Release Date</h4>
                  <p className="text-gray-600">
                    {movie.release_date ? new Date(movie.release_date).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-700">Runtime</h4>
                  <p className="text-gray-600">
                    {movie.runtime ? `${movie.runtime} minutes` : 'N/A'}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-700">Budget</h4>
                  <p className="text-gray-600">
                    {movie.budget ? `$${movie.budget.toLocaleString()}` : 'N/A'}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-700">Revenue</h4>
                  <p className="text-gray-600">
                    {movie.revenue ? `$${movie.revenue.toLocaleString()}` : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
