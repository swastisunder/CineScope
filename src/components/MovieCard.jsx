import { Link } from "react-router-dom";

export default function MovieCard({ id, poster, title, year, director }) {
  return (
    <div className="w-[200px] bg-gray-100 rounded-xl shadow-lg overflow-hidden transform hover:scale-102 transition-transform duration-300 cursor-pointer">
      <img
        className="w-full h-[300px] object-cover"
        src={poster}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/posters/error.jpg";
        }}
        alt={title}
      />

      <div className="p-4">
        <h1
          className="text-lg font-bold mb-2 text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis"
          title={title}
        >
          {title}
        </h1>
        <p className="text-gray-600 text-sm">
          Release year: <span className="font-medium">{year}</span>
        </p>
      </div>
    </div>
  );
}
