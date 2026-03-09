import { useFavorites } from '../hooks/useFavorites';
import MovieCard from '../components/MovieCard';

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div className="page favorites-page container">
      <header className="page-header">
        <h1>Your Favorite Movies</h1>
        <p>A collection of movies you've saved for later.</p>
      </header>

      {favorites.length === 0 ? (
        <div className="empty-state">
          <h2>No favorites yet</h2>
          <p>Go back to the home page and heart some movies!</p>
        </div>
      ) : (
        <div className="movie-grid">
          {favorites.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
