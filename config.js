// Configuration for TMDB API
// Replace 'your_tmdb_api_key_here' with your actual TMDB API key
// Get your API key from: https://www.themoviedb.org/settings/api

export const TMDB_CONFIG = {
  API_KEY: 'your_tmdb_api_key_here', // Replace this with your actual API key
  BASE_URL: 'https://api.themoviedb.org/3',
  IMAGE_BASE_URL: 'https://image.tmdb.org/t/p/w500'
};

// Environment variable fallback
export const getApiKey = () => {
  return import.meta.env.VITE_TMDB_API_KEY || 
         import.meta.env.VITE_TMDB_KEY || 
         TMDB_CONFIG.API_KEY;
};
