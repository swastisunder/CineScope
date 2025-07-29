export default function About() {
  return (
    <section className="bg-gray-900 text-gray-100 py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6 text-white">About CineVault</h1>
        <p className="text-lg leading-relaxed text-gray-300">
          CineVault is your go-to platform for exploring top-rated movies from
          every genre. Whether you're a die-hard cinephile or just looking for a
          weekend pick, our curated collection brings you the best of cinema
          with elegant design and smooth browsing.
        </p>

        <div className="mt-10 text-left text-gray-400">
          <h2 className="text-2xl font-semibold text-white mb-3">
            Our Mission
          </h2>
          <p className="mb-4">
            To make movie discovery enjoyable and accessible, by combining
            beautiful UI with rich, offline movie data — no internet needed!
          </p>
          <h2 className="text-2xl font-semibold text-white mb-3">
            Built With ❤️ Using:
          </h2>
          <ul className="list-disc list-inside">
            <li>React.js + React Router</li>
            <li>Tailwind CSS</li>
            <li>Custom local JSON data (No APIs!)</li>
            <li>Local poster images</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
