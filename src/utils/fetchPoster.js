export async function fetchPoster(movieId) {
  const apiKey = "c807b99517b63fe8603a2c9a720a5697"; // your TMDB API key
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.poster_path) {
      return `https://image.tmdb.org/t/p/w500${data.poster_path}`;
    }
    return null;
  } catch (err) {
    console.error("Error fetching poster:", err);
    return null;
  }
}
