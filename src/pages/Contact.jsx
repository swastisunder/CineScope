import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    // In a real app, send to backend/API. For now, show a success state.
    setStatus(
      "Thanks! We received your message and will get back to you soon."
    );
    setFormData({ name: "", email: "", message: "" });
  }

  return (
    <main className="w-[90%] mx-auto pb-16">
      {/* Header */}
      <section className="mt-6 mb-8 rounded-2xl bg-gradient-to-br from-cyan-900/30 via-cyan-700/10 to-transparent border border-cyan-700/40 px-8 py-8">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
          Contact <span className="text-cyan-400">Us</span>
        </h1>
        <p className="mt-3 max-w-2xl text-white/80">
          Have feedback, a feature request, or found an issue? Drop us a line.
        </p>
      </section>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Contact Info */}
        <aside className="md:col-span-1 rounded-2xl bg-[#0f0f0f] border border-white/10 p-6 h-fit">
          <h2 className="text-xl font-semibold">Get in touch</h2>
          <ul className="mt-4 space-y-3 text-white/80">
            <li>
              <span className="text-cyan-300">Email:</span>{" "}
              support@cinescope.app
            </li>
            <li>
              <span className="text-cyan-300">X/Twitter:</span> @cinescope
            </li>
            <li>
              <span className="text-cyan-300">GitHub:</span> cinescope
            </li>
          </ul>
          <p className="mt-4 text-sm text-white/60">
            We usually respond within 1–2 business days.
          </p>
        </aside>

        {/* Form */}
        <section className="md:col-span-2 rounded-2xl bg-[#0f0f0f] border border-cyan-700/30 p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                className="block text-sm mb-1 text-white/80"
                htmlFor="name"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2 outline-none focus:ring-2 focus:ring-cyan-600"
                required
              />
            </div>
            <div>
              <label
                className="block text-sm mb-1 text-white/80"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2 outline-none focus:ring-2 focus:ring-cyan-600"
                required
              />
            </div>
            <div>
              <label
                className="block text-sm mb-1 text-white/80"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us what's on your mind..."
                className="w-full resize-y rounded-xl bg-white/5 border border-white/10 px-4 py-2 outline-none focus:ring-2 focus:ring-cyan-600"
                required
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 transition"
              >
                Send Message
              </button>
              {status && (
                <span className="text-sm text-emerald-400">{status}</span>
              )}
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
