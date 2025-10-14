const CACHE = new Map();

// size: one of 'w92','w154','w185','w342','w500','w780','original' (TMDB sizes)
export async function fetchPoster(movieId, size = 'w500') {
  if (!movieId) return null;

  const cacheKey = `${movieId}:${size}`;
  if (CACHE.has(cacheKey)) return CACHE.get(cacheKey);

  const apiKey = (import.meta && import.meta.env && import.meta.env.VITE_TMDB_API_KEY) || "c807b99517b63fe8603a2c9a720a5697"; // prefer env
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      CACHE.set(cacheKey, null);
      return null;
    }
    const data = await response.json();

    if (data.poster_path) {
      const imageUrl = `https://image.tmdb.org/t/p/${size}${data.poster_path}`;
      CACHE.set(cacheKey, imageUrl);
      return imageUrl;
    }

    CACHE.set(cacheKey, null);
    return null;
  } catch (err) {
  // keep app resilient; log for dev
  console.error('Error fetching poster:', err);
    CACHE.set(cacheKey, null);
    return null;
  }
}
