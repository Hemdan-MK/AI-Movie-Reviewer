import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { tmdbApi } from '../services/tmdbApi';

const MovieCard = ({ movie }) => {
  const posterUrl = movie.poster_path 
    ? tmdbApi.getImageUrl(movie.poster_path, 'w500')
    : 'https://via.placeholder.com/300x450?text=No+Image';

  return (
    <Link 
      to={`/movie/${movie.id}`}
      className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative">
        <img
          src={posterUrl}
          alt={movie.title}
          className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded flex items-center space-x-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">
            {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 group-hover:text-red-600 transition-colors duration-200 line-clamp-2">
          {movie.title}
        </h3>
        <p className="text-gray-600 text-sm mt-1">
          {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
        </p>
        <p className="text-gray-500 text-sm mt-2 line-clamp-3">
          {movie.overview}
        </p>
      </div>
    </Link>
  );
};

export default MovieCard;
