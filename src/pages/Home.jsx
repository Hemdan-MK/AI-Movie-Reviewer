import { useState, useEffect } from 'react';
import { tmdbApi } from '../services/tmdbApi';
import MovieCard from '../components/MovieCard';
import { Search, Loader2 } from 'lucide-react';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadMovies();
  }, [currentPage]);

  const loadMovies = async () => {
    setLoading(true);
    try {
      const data = await tmdbApi.getPopularMovies(currentPage);
      setMovies(data.results);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error('Error loading movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      loadMovies();
      return;
    }

    setLoading(true);
    try {
      const data = await tmdbApi.searchMovies(searchQuery);
      setMovies(data.results);
      setTotalPages(data.total_pages);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error searching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreMovies = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Amazing Movies
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Read reviews and get AI-powered insights about your favorite films
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for movies..."
              className="w-full px-4 py-3 pl-12 pr-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </form>

        {/* Movies Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-red-600" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>

            {/* Load More Button */}
            {currentPage < totalPages && (
              <div className="text-center mt-8">
                <button
                  onClick={loadMoreMovies}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
                >
                  Load More Movies
                </button>
              </div>
            )}
          </>
        )}

        {/* No Results */}
        {!loading && movies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No movies found. Try a different search term.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
