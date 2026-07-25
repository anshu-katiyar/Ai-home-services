const services = [
  "⚡ Electrician",
  "🚿 Plumber",
  "❄ AC Repair",
  "🧹 Cleaning",
  "🎨 Painting",
  "🪚 Carpenter",
  "🐜 Pest Control",
  "💧 RO Service",
];

export default function Categories() {
  return (
    <section className="py-20 bg-gray-50">

      <div className="max-w-7xl mx-auto">

        <h2 className="text-4xl font-bold text-center">

          Popular Services

        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">

          {services.map((item) => (

            <div
              key={item}
              className="bg-white p-8 rounded-xl shadow hover:shadow-xl hover:-translate-y-2 transition"
            >
              {item}
            </div>

          ))}

        </div>

      </div>

    </section>
  );
}