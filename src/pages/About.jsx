import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <main className="w-[90%] mx-auto pb-16">
      {/* Hero */}
      <section className="mt-6 mb-10 rounded-2xl bg-gradient-to-br from-cyan-900/30 via-cyan-700/10 to-transparent border border-cyan-700/40 px-8 py-10">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
          About <span className="text-cyan-400">CineScope</span>
        </h1>
        <p className="mt-3 max-w-2xl text-white/80">
          CineScope helps you explore movies through rich metadata, intuitive
          browsing, and personalized discovery. We blend curated datasets with a
          sleek UI so you can find your next favorite film faster.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
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

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Movies Indexed", value: "4.8k+" },
          { label: "Genres", value: "20+" },
          { label: "Data Points / Movie", value: "50+" },
          { label: "Fast Search", value: "<50ms" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl bg-[#0f0f0f] border border-cyan-700/30 p-5 text-center"
          >
            <div className="text-2xl md:text-3xl font-bold text-cyan-300">
              {stat.value}
            </div>
            <div className="mt-1 text-sm text-white/70">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* What we offer */}
      <section className="grid md:grid-cols-3 gap-6 mb-12">
        {[
          {
            title: "Smart Discovery",
            desc: "Filter by genre, year, rating, and more.",
            emoji: "🎯",
          },
          {
            title: "Rich Insights",
            desc: "Dive into crews, casts, and production details all in one place.",
            emoji: "🧠",
          },
          {
            title: "Sleek Experience",
            desc: "A modern interface built with speed, clarity, and accessibility in mind.",
            emoji: "⚡",
          },
        ].map((card) => (
          <div
            key={card.title}
            className="rounded-2xl bg-[#0f0f0f] border border-white/10 p-6"
          >
            <div className="text-3xl">{card.emoji}</div>
            <h3 className="mt-3 text-xl font-semibold">{card.title}</h3>
            <p className="mt-2 text-white/75">{card.desc}</p>
          </div>
        ))}
      </section>

      {/* How it works */}
      <section className="rounded-2xl bg-[#0f0f0f] border border-cyan-700/30 p-6">
        <h2 className="text-2xl font-semibold">How CineScope Works</h2>
        <ol className="mt-4 grid md:grid-cols-3 gap-4 list-decimal list-inside text-white/85">
          <li className="rounded-xl bg-white/5 border border-white/10 p-8">
            We aggregate and clean movie datasets for accuracy and consistency.
          </li>
          <li className="rounded-xl bg-white/5 border border-white/10 p-8">
            Our interface lets you browse by genre, cast, and other rich
            metadata.
          </li>
          <li className="rounded-xl bg-white/5 border border-white/10 p-8">
            You discover films quickly using filters and lightning-fast search.
          </li>
        </ol>
      </section>
    </main>
  );
}
