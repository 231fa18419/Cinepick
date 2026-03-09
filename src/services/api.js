import { movies } from './data';

const simulateDelay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const searchMovies = async (query = '') => {
  await simulateDelay(800); // Simulate network delay
  
  if (!query) return movies;
  
  const lowerQuery = query.toLowerCase();
  return movies.filter(movie => 
    movie.title.toLowerCase().includes(lowerQuery) || 
    movie.year.includes(query) ||
    movie.genre.some(g => g.toLowerCase().includes(lowerQuery))
  );
};

export const getMovieById = async (id) => {
  await simulateDelay(500);
  
  const movie = movies.find(m => m.id === id);
  if (!movie) throw new Error('Movie not found');
  
  return movie;
};
