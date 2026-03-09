import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieById } from '../services/api';
import { useFavorites } from '../hooks/useFavorites';
import Loader from '../components/Loader';
import { ArrowLeft, Heart, Star, Clock, Calendar } from 'lucide-react';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const data = await getMovieById(id);
        setMovie(data);
      } catch (err) {
        setError('Movie not found or failed to load.');
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) return <div className="page center"><Loader /></div>;
  
  if (error || !movie) return (
    <div className="page center">
      <div className="error-message">{error}</div>
      <button onClick={() => navigate('/')} className="btn-primary" style={{marginTop: '1rem'}}>Go Back Home</button>
    </div>
  );

  const favorite = isFavorite(movie.id);

  const handleFavoriteToggle = () => {
    if (favorite) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <div className="page movie-details-page container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <ArrowLeft size={20} />
        Back
      </button>

      <div className="details-card glass-panel">
        <div className="details-poster">
          <img src={movie.poster} alt={movie.title} />
        </div>
        
        <div className="details-info">
          <div className="details-header">
            <h1 className="details-title">{movie.title}</h1>
            <button 
              className={`favorite-toggle-btn ${favorite ? 'active' : ''}`} 
              onClick={handleFavoriteToggle}
              title={favorite ? "Remove from Favorites" : "Add to Favorites"}
            >
              <Heart size={28} className={favorite ? 'fill' : ''} />
            </button>
          </div>
          
          <div className="details-meta">
            <span className="badge rating"><Star size={16} /> {movie.rating}</span>
            <span className="badge"><Calendar size={16} /> {movie.year}</span>
            <span className="badge"><Clock size={16} /> {movie.runtime}</span>
          </div>

          <div className="details-genres">
            {movie.genre.map(g => (
              <span key={g} className="genre-tag">{g}</span>
            ))}
          </div>

          <div className="details-plot">
            <h3>Plot</h3>
            <p>{movie.plot}</p>
          </div>

          <div className="details-cast">
            <h3>Top Cast</h3>
            <ul className="cast-list">
              {movie.cast.map(actor => (
                <li key={actor}>{actor}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
