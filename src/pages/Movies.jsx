import { Link } from "react-router-dom";
import moviesData from "../assets/movies.json";
import MovieCard from "../components/MovieCard";

function Movies() {
  return (
    <section
      className="flex flex-col items-center justify-center min-h-screen text-white text-center px-4 py-8 bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(24,24,24,0.7), rgba(24,24,24,0.7)), url('/posters/hero.jpg')",
      }}
    >
      <h1 className="text-3xl font-bold mb-8">Highest Rated Movies</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full max-w-7xl">
        {moviesData.map((movie) => (
          <Link to={`/movies/${movie.id}`} key={movie.id} className="group">
            <MovieCard key={movie.id} {...movie} />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Movies;
