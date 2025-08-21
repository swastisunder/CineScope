import { useState } from "react";
import PosterImage from "./PosterImage";

export default function PosterTest() {
  const [testMovieId, setTestMovieId] = useState("100");
  const [testTitle, setTestTitle] = useState("Test Movie");
  const [testYear, setTestYear] = useState("2024");

  return (
    <div className="p-8 bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">
          Poster Loading Test
        </h1>

        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">
            Test Parameters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Movie ID
              </label>
              <input
                type="text"
                value={testMovieId}
                onChange={(e) => setTestMovieId(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                placeholder="e.g., 100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Title
              </label>
              <input
                type="text"
                value={testTitle}
                onChange={(e) => setTestTitle(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                placeholder="Movie Title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Year
              </label>
              <input
                type="text"
                value={testYear}
                onChange={(e) => setTestYear(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                placeholder="2024"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">
            Poster Display
          </h2>
          <div className="flex justify-center">
            <PosterImage
              movieId={testMovieId}
              alt={testTitle}
              title={testTitle}
              year={testYear}
              className="w-64 h-96 object-cover rounded-lg"
            />
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-4">
            Debug Information
          </h2>
          <div className="space-y-2 text-sm text-gray-300">
            <p>
              <strong>Movie ID:</strong> {testMovieId}
            </p>
            <p>
              <strong>Expected Local Path:</strong> /posters/{testMovieId}.jpg
            </p>
            <p>
              <strong>Title:</strong> {testTitle}
            </p>
            <p>
              <strong>Year:</strong> {testYear}
            </p>
            <p>
              <strong>Check Console:</strong> Open browser console to see
              loading logs
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
