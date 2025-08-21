import { useEffect, useState } from "react";
import { fetchPoster } from "../utils/fetchPoster";

export default function PosterImage({ movieId, alt, title, year, className }) {
  const [posterUrl, setPosterUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPoster() {
      setLoading(true);
      const url = await fetchPoster(movieId);
      setPosterUrl(url);
      setLoading(false);
    }
    getPoster();
  }, [movieId]);

  if (loading) {
    return (
      <div className="w-full aspect-[2/3] animate-pulse bg-gray-700 rounded-lg" />
    );
  }

  if (!posterUrl) {
    return (
      <div className="w-full aspect-[2/3] flex items-center justify-center bg-gray-800 rounded-lg shadow-lg">
        <span className="text-gray-400 text-sm">No Poster Available</span>
      </div>
    );
  }

  return (
    <img
      src={posterUrl}
      alt={alt || title}
      title={`${title} (${year})`}
      className={className}
    />
  );
}
