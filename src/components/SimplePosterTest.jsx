import { useState } from "react";

export default function SimplePosterTest() {
  const [movieId, setMovieId] = useState("100");
  const [imageSrc, setImageSrc] = useState("");
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const testImage = () => {
    const src = `/posters/${movieId}.jpg`;
    setImageSrc(src);
    setImageError(false);
    setImageLoaded(false);
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">
          Simple Poster Test
        </h1>

        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <div className="flex gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Movie ID
              </label>
              <input
                type="text"
                value={movieId}
                onChange={(e) => setMovieId(e.target.value)}
                className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                placeholder="e.g., 100"
              />
            </div>
            <button
              onClick={testImage}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Test Image
            </button>
          </div>
        </div>

        {imageSrc && (
          <div className="bg-gray-800 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">
              Image Test Results
            </h2>
            <div className="space-y-4">
              <p className="text-gray-300">
                <strong>Testing URL:</strong> {imageSrc}
              </p>

              {imageLoaded && (
                <div className="text-green-400">
                  ✅ Image loaded successfully!
                </div>
              )}

              {imageError && (
                <div className="text-red-400">❌ Image failed to load</div>
              )}

              <div className="border border-gray-600 rounded-lg overflow-hidden">
                <img
                  src={imageSrc}
                  alt={`Movie ${movieId}`}
                  className="w-full h-96 object-cover"
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                />
              </div>
            </div>
          </div>
        )}

        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-4">
            Troubleshooting
          </h2>
          <div className="space-y-2 text-sm text-gray-300">
            <p>
              • Make sure poster images are in{" "}
              <code className="bg-gray-700 px-2 py-1 rounded">
                public/posters/
              </code>
            </p>
            <p>
              • Image files should be named{" "}
              <code className="bg-gray-700 px-2 py-1 rounded">
                {movieId}.jpg
              </code>
            </p>
            <p>• Check browser console for any error messages</p>
            <p>
              • Verify the image path is correct in the browser's Network tab
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
