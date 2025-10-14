import { useEffect, useRef, useState } from "react";
import { fetchPoster } from "../utils/fetchPoster";

// Helper sizes for TMDB: w185, w342, w500, w780
const SIZE_OPTIONS = ["w185", "w342", "w500", "w780"];

export default function PosterImage({ movieId, alt, title, year, className }) {
  const imgRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [srcSet, setSrcSet] = useState(null);
  const [src, setSrc] = useState(null);
  const [loading, setLoading] = useState(true);

  // Observe visibility and set inView when near viewport
  useEffect(() => {
    if (!imgRef.current) return undefined;
    const el = imgRef.current;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return undefined;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            obs.disconnect();
            break;
          }
        }
      },
      { rootMargin: "200px" }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [imgRef]);

  // When in view, build srcset by fetching cached urls for multiple sizes
  useEffect(() => {
    let mounted = true;
    async function load() {
      if (!movieId || !inView) return;
      setLoading(true);

      // Request multiple sizes; fetchPoster has in-memory cache so this is cheap after first
      const promises = SIZE_OPTIONS.map((s) => fetchPoster(movieId, s));
      const results = await Promise.all(promises);

      if (!mounted) return;
      const pairs = [];
      for (let i = 0; i < SIZE_OPTIONS.length; i++) {
        const url = results[i];
        if (url) pairs.push(`${url} ${parseInt(SIZE_OPTIONS[i].slice(1), 10)}w`);
      }

      if (pairs.length > 0) {
        setSrcSet(pairs.join(", "));
        // pick medium size as default src
        const medium = results[2] || results[1] || results[0];
        setSrc(medium);
      } else {
        setSrc(null);
        setSrcSet(null);
      }

      setLoading(false);
    }

    load();
    return () => {
      mounted = false;
    };
  }, [movieId, inView]);

  if (loading) {
    return (
      <div ref={imgRef} className="w-full aspect-[2/3] animate-pulse bg-gray-700 rounded-lg" />
    );
  }

  if (!src) {
    return (
      <div ref={imgRef} className="w-full aspect-[2/3] flex items-center justify-center bg-gray-800 rounded-lg shadow-lg">
        <span className="text-gray-400 text-sm">No Poster Available</span>
      </div>
    );
  }

  return (
    <img
      ref={imgRef}
      src={src}
      srcSet={srcSet || undefined}
      sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 220px"
      alt={alt || title}
      title={`${title} (${year})`}
      loading="lazy"
      decoding="async"
      className={className}
    />
  );
}

