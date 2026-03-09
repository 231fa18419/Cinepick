import { useState, useEffect } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('cinepick_favorites');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('cinepick_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (movie) => {
    setFavorites(prev => {
      if (prev.find(m => m.id === movie.id)) return prev;
      return [...prev, movie];
    });
  };

  const removeFavorite = (id) => {
    setFavorites(prev => prev.filter(m => m.id !== id));
  };

  const isFavorite = (id) => {
    return favorites.some(m => m.id === id);
  };

  return { favorites, addFavorite, removeFavorite, isFavorite };
};
