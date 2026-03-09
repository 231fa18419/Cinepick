import { useState, useEffect } from 'react';
import { searchMovies } from '../services/api';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import Loader from '../components/Loader';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMovies = async (query = '') => {
    try {
      setLoading(true);
      setError(null);
      const data = await searchMovies(query);
      setMovies(data);
    } catch (err) {
      setError('Failed to fetch movies. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleSearch = (query) => {
    fetchMovies(query);
  };

  return (
    <div className="page home-page">
      <header className="hero-section">
        <h1 className="hero-title">Discover the Best Movies</h1>
        <p className="hero-subtitle">Search through our rich catalog of premium cinema.</p>
        <SearchBar onSearch={handleSearch} />
      </header>
      
      <section className="movie-grid-container container">
        {loading && <Loader />}
        
        {error && <div className="error-message">{error}</div>}
        
        {!loading && !error && movies.length === 0 && (
          <div className="empty-state">
            <h2>No movies found</h2>
            <p>Try searching for a different title or genre.</p>
          </div>
        )}

        {!loading && movies.length > 0 && (
          <div className="movie-grid">
            {movies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
