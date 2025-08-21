import PosterImage from "./PosterImage";

export default function MovieCard({ title, year, id }) {
  return (
    <div className="group relative w-[220px] m-4">
      <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0f0f0f] shadow-xl transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-cyan-500/30">
        <PosterImage
          movieId={id}
          alt={title}
          title={title}
          year={year}
          className="w-full h-[330px] object-cover"
        />
        <div className="p-4">
          <h2 className="text-sm font-semibold text-white truncate">{title}</h2>
          <p className="text-xs text-white/60 mt-1">{year}</p>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 group-hover:ring-cyan-400/40"></div>
    </div>
  );
}
