import { Link } from "react-router-dom";

export default function MovieCard({ id, poster, title, year, director }) {
  return (
    <div className="w-[200px] bg-gray-100 rounded-xl shadow-lg overflow-hidden transform hover:scale-102 transition-transform duration-300 cursor-pointer">
      <img className="w-full h-[300px] object-cover" src={poster} alt={title} />
      <div className="p-4">
        <h1
          className="text-lg font-bold mb-2 text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis"
          title={title}
        >
          {title}
        </h1>
        <p className="text-gray-600 text-sm mb-6">
          Release year: <span className="font-medium">{year}</span>
        </p>
        <Link
          to={`/movies/${id}`}
          key={id}
          className="group w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 text-sm mt-1 px-4"
        >
          Know More
        </Link>
      </div>
    </div>
  );
}
