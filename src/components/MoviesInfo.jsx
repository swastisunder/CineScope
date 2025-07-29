import { useParams } from "react-router-dom";
import movies from "../assets/movies.json";

export default function MoviesInfo() {
  const { id } = useParams();
  const movie = movies.find((m) => String(m.id) === id);

  if (!movie) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <h1 className="text-2xl font-bold">Movie Not Found</h1>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${movie.poster})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-80 backdrop-blur-md"></div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-4xl w-full bg-white/10 backdrop-blur-md text-white rounded-2xl p-8 shadow-xl flex flex-col md:flex-row gap-6">
          {/* Poster */}
          <div className="w-full md:w-1/3">
            <img
              src={movie.poster}
              alt={movie.title}
              className="rounded-xl shadow-lg w-full"
            />
          </div>

          {/* Info */}
          <div className="w-full md:w-2/3 flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-extrabold mb-4">{movie.title}</h1>
              <p className="text-sm text-gray-300 mb-4">{movie.year}</p>
              <p className="text-sm text-gray-200 mb-4">
                <span className="font-semibold text-white">Rating:</span> ⭐{" "}
                {movie.rating}
              </p>

              {/* Genre badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {movie.genre.split(", ").map((g, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-white/20 text-sm rounded-full"
                  >
                    {g}
                  </span>
                ))}
              </div>

              {/* Plot */}
              <p className="text-gray-200 mb-6">{movie.plot}</p>

              {/* Meta info */}
              <div className="space-y-2 text-sm text-gray-300">
                <p>
                  <span className="font-semibold text-white">Actors:</span>{" "}
                  {movie.actors?.trim() ? movie.actors : "Not Available"}
                </p>
                <p>
                  <span className="font-semibold text-white">Director:</span>{" "}
                  {movie.director}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
