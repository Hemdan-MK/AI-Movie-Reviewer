import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { tmdbApi } from '../services/tmdbApi';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import ReviewBox from '../components/ReviewBox';
import GoogleGeminiSummaryBox from '../components/GoogleGeminiSummaryBox';
import ReviewsList from '../components/ReviewsList';
import { Star, Calendar, Clock, Loader2 } from 'lucide-react';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [tmdbReviews, setTmdbReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [tmdbReviewsLoading, setTmdbReviewsLoading] = useState(true);

  useEffect(() => {
    console.log('MovieDetails: Loading movie with ID:', id);
    loadMovieDetails();
    loadReviews();
    loadTmdbReviews();
  }, [id]);

  const loadMovieDetails = async () => {
    try {
      console.log('MovieDetails: Fetching movie details for ID:', id);
      const data = await tmdbApi.getMovieDetails(id);
      console.log('MovieDetails: Movie data received:', data);
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
      where('movieId', '==', id)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const reviewsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      // Sort by createdAt in JavaScript instead of Firestore
      reviewsData.sort((a, b) => {
        const aTime = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : 0;
        const bTime = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : 0;
        return bTime - aTime; // Descending order
      });
      setReviews(reviewsData);
      setReviewsLoading(false);
    });

    return unsubscribe;
  };

  const loadTmdbReviews = async () => {
    try {
      const data = await tmdbApi.getMovieReviews(id);
      setTmdbReviews(data.results || []);
    } catch (error) {
      console.error('Error loading TMDB reviews:', error);
    } finally {
      setTmdbReviewsLoading(false);
    }
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

  console.log(" movie ");
  console.log(movie);


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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-orange-900">
      {/* Hero Section with Backdrop */}
      <div className="relative min-h-[60vh] max-h-[80vh] overflow-hidden">
        <img
          src={backdropUrl}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/40"></div>
               <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-transparent to-transparent"></div>
        
        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-end">
          <div className="w-full px-4 sm:px-6 lg:px-8 pb-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col xl:flex-row items-start xl:items-end space-y-6 xl:space-y-0 xl:space-x-8">
                {/* Movie Poster */}
                <div className="flex-shrink-0">
                  <img
                    src={posterUrl}
                    alt={movie.title}
                    className="w-40 sm:w-48 md:w-56 lg:w-64 h-60 sm:h-72 md:h-84 lg:h-96 object-cover rounded-xl shadow-2xl border-4 border-white/20"
                  />
                </div>
                
                {/* Movie Info */}
                <div className="flex-1 text-white">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 leading-tight">
                    {movie.title}
                  </h1>
                  
                  {movie.tagline && (
                    <p className="text-lg sm:text-xl text-gray-300 mb-4 italic">
                      "{movie.tagline}"
                    </p>
                  )}
                  
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="text-lg font-semibold">{movie.vote_average?.toFixed(1)}</span>
                      <span className="text-sm text-gray-300">({movie.vote_count} votes)</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(movie.release_date).getFullYear()}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                      <Clock className="w-4 h-4" />
                      <span>{movie.runtime} min</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                      <span className="text-sm">{movie.status}</span>
                    </div>
                  </div>
                  
                  <p className="text-lg text-gray-200 max-w-4xl leading-relaxed mb-6">
                    {movie.overview}
                  </p>
                  
                  {/* Genres */}
                  {movie.genres && movie.genres.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {movie.genres.map((genre) => (
                        <span
                          key={genre.id}
                          className="bg-orange-600/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Reviews Section */}
          <div className="xl:col-span-2">
                 <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                <span className="w-1 h-8 bg-orange-500 rounded-full mr-4"></span>
                Reviews & Discussion
              </h2>

            {/* AI Summary */}
            <GoogleGeminiSummaryBox
              tmdbReviews={tmdbReviews}
              userReviews={reviews}
              movieTitle={movie.title}
            />

            {/* Review Form */}
            <div className="mb-8">
              <ReviewBox movieId={id} onReviewAdded={handleReviewAdded} />
            </div>

            {/* All Reviews */}
            <ReviewsList movieId={id} tmdbReviews={tmdbReviews} />
            </div>
          </div>

          {/* Movie Info Sidebar */}
          <div className="xl:col-span-1">
                 <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 sticky top-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="w-1 h-6 bg-orange-500 rounded-full mr-3"></span>
                Movie Details
              </h3>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-white mb-2">Genres</h4>
                         <div className="flex flex-wrap gap-2">
                           {movie.genres ? movie.genres.map(genre => (
                             <span key={genre.id} className="bg-orange-600/20 text-orange-300 px-3 py-1 rounded-full text-sm border border-orange-500/30">
                               {genre.name}
                             </span>
                           )) : <span className="text-slate-400">N/A</span>}
                         </div>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-2">Release Date</h4>
                  <p className="text-slate-300">
                    {movie.release_date ? new Date(movie.release_date).toLocaleDateString() : 'N/A'}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-2">Runtime</h4>
                  <p className="text-slate-300">
                    {movie.runtime ? `${movie.runtime} minutes` : 'N/A'}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-2">Budget</h4>
                  <p className="text-slate-300">
                    {movie.budget ? `$${movie.budget.toLocaleString()}` : 'N/A'}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-2">Revenue</h4>
                  <p className="text-slate-300">
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
