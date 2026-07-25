export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-700 via-cyan-600 to-blue-500 text-white">

      <div className="max-w-7xl mx-auto px-6 py-24">

        <h1 className="text-6xl font-bold leading-tight">

          AI Powered
          <br />
          Home Services

        </h1>

        <p className="mt-6 text-xl max-w-2xl">

          Book trusted professionals in minutes using Artificial Intelligence.

        </p>

        {/* Search */}

        <div className="bg-white rounded-xl p-3 mt-10 flex">

          <input
            type="text"
            placeholder="Search Plumber, Electrician..."
            className="flex-1 outline-none px-4 text-black"
          />

          <button className="bg-blue-600 px-6 py-3 rounded-lg">
            Search
          </button>

        </div>

        {/* AI Buttons */}

        <div className="flex flex-wrap gap-5 mt-8">

          <button className="bg-white text-blue-700 px-5 py-3 rounded-xl">
            🎤 Voice Booking
          </button>

          <button className="bg-white text-blue-700 px-5 py-3 rounded-xl">
            📸 Upload Problem
          </button>

          <button className="bg-white text-blue-700 px-5 py-3 rounded-xl">
            📍 Live Location
          </button>

        </div>

      </div>

    </section>
  );
}