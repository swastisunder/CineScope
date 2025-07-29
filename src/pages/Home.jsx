import moviesData from "../assets/movies.json";
import MovieCard from "../components/MovieCard";
import MoviesInfo from "../components/MoviesInfo";
import { Link } from "react-router-dom";

function getFiveRandomMovies(data) {
  let randomMovies = [];

  while (randomMovies.length < 5) {
    const randomMovie = data[Math.floor(Math.random() * data.length)];

    if (!randomMovies.includes(randomMovie)) {
      randomMovies.push(randomMovie);
    }
  }

  return randomMovies;
}

function Home() {
  const randomMovies = getFiveRandomMovies(moviesData);

  return (
    <section
      className="flex flex-col items-center justify-center min-h-screen text-white text-center px-4 py-8 bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(24,24,24,0.7), rgba(24,24,24,0.7)), url('/posters/hero.jpg')",
      }}
    >
      <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
        Welcome to CineScope
      </h1>
      <p className="text-lg md:text-xl mb-8 max-w-xl mx-auto drop-shadow">
        Discover, explore, and enjoy your favorite movies. Dive into the world
        of cinema with us!
      </p>
      <h1 className="text-3xl font-bold mb-4">Top Movies</h1>
      <div className="flex gap-10 overflow-x-auto w-full py-4 justify-center md:flex-wrap md:overflow-visible">
        {randomMovies.map((movie) => (
          <Link to={`/movies/${movie.id}`} key={movie.id} className="group">
            <MovieCard {...movie} />
          </Link>
        ))}
      </div>
      <Link
        to="/movies"
        className="mt-6 inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition"
      >
        View All Movies
      </Link>
    </section>
  );
}

export default Home;
