import { useParams, Link } from "react-router-dom";
import MoviesData from "../assets/JSON/movies.json";
import { useEffect, useState } from "react";
import PosterImage from "../components/PosterImage";

export default function MovieInfo() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const parsedId = parseInt(id);
    const found = MoviesData.find((m) => m.id === parsedId) || null;
    setMovie(found);
  }, [id]);

  if (!movie) {
    return (
      <div className="min-h-[20vh] flex items-center justify-center text-white p-4">
        <div className="rounded-xl sm:rounded-2xl border border-red-500/30 bg-red-500/10 px-4 sm:px-6 py-3 sm:py-4">
          <h1 className="text-lg sm:text-xl font-semibold text-red-300">
            Movie Not Found
          </h1>
        </div>
      </div>
    );
  }

  const actorList = movie.actors.split(", ").slice(0, 4);
  const productionList = movie.production_companies.split(", ").slice(0, 3);

  return (
    <main className="w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] mx-auto py-4 sm:py-6 text-white">
      <section className="rounded-xl sm:rounded-2xl border border-white/10 bg-[#0f0f0f] p-3 sm:p-4 md:p-6 shadow-xl">
        <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
          {/* Poster */}
          <div className="w-full md:w-1/3 lg:w-1/4 mx-auto md:mx-0 max-w-[300px]">
            <PosterImage
              movieId={movie.id}
              alt={movie.title}
              title={movie.title}
              year={movie.year}
              className="w-full rounded-lg sm:rounded-xl object-cover shadow-lg"
            />
          </div>

          {/* Movie Details */}
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">
              {movie.title}{" "}
              <span className="text-white/60">({movie.year})</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg italic text-white/70 mb-2 sm:mb-4">
              {movie.tagline}
            </p>
            <p className="text-sm md:text-base text-white/80 mb-3 sm:mb-4 leading-relaxed">
              {movie.overview}
            </p>

            <div className="mb-2 sm:mb-3">
              <span className="font-semibold text-white/90">Genres:</span>{" "}
              <div className="inline-flex flex-wrap gap-1 sm:gap-2 mt-1">
                {movie.genres.split(",").map((genre, index) => (
                  <Link
                    key={index}
                    to={`/genres?selected=${genre.trim()}`}
                    className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs bg-white/5 border border-white/10 hover:bg-white/10"
                  >
                    {genre.trim()}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mb-2 sm:mb-3">
              <span className="font-semibold text-white/90">Director:</span>{" "}
              <Link
                to={`/directors?selected=${encodeURIComponent(movie.director)}`}
                className="text-cyan-300 hover:underline"
              >
                {movie.director}
              </Link>
            </div>

            <div className="mb-2 sm:mb-3">
              <span className="font-semibold text-white/90">Actors:</span>{" "}
              <div className="inline-flex flex-wrap gap-1 sm:gap-2 mt-1">
                {actorList.map((actor, index) => (
                  <Link
                    key={index}
                    to={`/actors?selected=${encodeURIComponent(actor.trim())}`}
                    className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs bg-white/5 border border-white/10 hover:bg-white/10"
                  >
                    {actor.trim()}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mb-2 sm:mb-3">
              <span className="font-semibold text-white/90">Production:</span>{" "}
              <span className="text-white/80">{productionList.join(", ")}</span>
            </div>

            <div className="mt-3 sm:mt-4 inline-flex items-center gap-2 px-2 sm:px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30">
              <span className="text-yellow-300">⭐</span>
              <span className="text-cyan-200 font-semibold">
                {movie.rating}
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
