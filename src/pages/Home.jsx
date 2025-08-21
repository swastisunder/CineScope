import { useEffect, useState, useCallback } from "react";
import MovieCard from "../components/MoviesCard";
import MovieData from "../assets/JSON/movies.json";
import { Link } from "react-router-dom";

const quotes = [];
for (const movie of MovieData) {
  if (movie.tagline && movie.title && movie.rating >= 9) {
    quotes.push(`"${movie.tagline}" - ${movie.title}`);
  }
}

// Pre-compute high rated movies once to avoid filtering on every interval tick
const highRatedMovies = MovieData.filter((movie) => movie.rating >= 7);

export default function Home() {
  const [randomMovies, setRandomMovies] = useState([]);
  const [quote, setQuote] = useState("");

  const getRandomMovies = useCallback((count) => {
    // Sample without replacement using a shallow copy and partial Fisher–Yates shuffle
    const copy = highRatedMovies.slice();
    const sampleCount = Math.min(count, copy.length);
    for (let i = 0; i < sampleCount; i++) {
      const j = i + Math.floor(Math.random() * (copy.length - i));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, sampleCount);
  }, []);

  useEffect(() => {
    setRandomMovies(getRandomMovies(5));
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);

    const interval = setInterval(() => {
      setRandomMovies(getRandomMovies(5));
      setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, 60000);

    return () => clearInterval(interval);
  }, [getRandomMovies]);

  return (
    <main className="w-[90%] mx-auto py-8 text-white">
      <section className="rounded-2xl border border-cyan-700/40 bg-gradient-to-br from-cyan-900/20 via-cyan-700/5 to-transparent px-6 py-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          🎬 Welcome to <span className="text-cyan-300">CineScope</span>
        </h1>
        <p className="text-base md:text-lg italic text-white/80 mt-3 max-w-2xl mx-auto">
          {quote}
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            to="/movies"
            className="px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 transition"
          >
            Browse Movies
          </Link>
          <Link
            to="/genres"
            className="px-4 py-2 rounded-xl bg-white/5 text-white border border-white/10 hover:bg-white/10 transition"
          >
            Explore Genres
          </Link>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">
          Top picks for you
        </h2>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {randomMovies.map((movie) => (
            <Link to={`/movies/${movie.id}`} key={movie.id}>
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                year={movie.year}
              />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
