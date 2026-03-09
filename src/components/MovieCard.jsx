import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      <div className="poster-container">
        <img src={movie.poster} alt={`${movie.title} Poster`} className="poster" />
        <div className="overlay">
          <div className="overlay-content">
            <span className="view-details">View Details</span>
          </div>
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <div className="meta">
          <span className="year">{movie.year}</span>
          <span className="rating">
            <Star size={14} className="star-icon" />
            {movie.rating}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
