const stats = [
  { number: "10K+", title: "Happy Customers" },
  { number: "500+", title: "Verified Providers" },
  { number: "50+", title: "Cities Covered" },
  { number: "24/7", title: "AI Support" },
];

export default function Stats() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-6">
        {stats.map((item) => (
          <div
            key={item.title}
            className="text-center p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-4xl font-bold text-blue-600">
              {item.number}
            </h2>
            <p className="mt-2 text-gray-600">{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}