import { useState } from "react";

const services = [
  { id: 1, name: "Electrician", icon: "⚡", price: "₹299" },
  { id: 2, name: "Plumber", icon: "🚿", price: "₹249" },
  { id: 3, name: "AC Repair", icon: "❄️", price: "₹499" },
  { id: 4, name: "Cleaning", icon: "🧹", price: "₹699" },
  { id: 5, name: "Painting", icon: "🎨", price: "₹999" },
  { id: 6, name: "Carpenter", icon: "🪚", price: "₹399" },
];

export default function Services() {
  const [search, setSearch] = useState("");

  const filtered = services.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <h1 className="text-5xl font-bold mb-8">
        Home Services
      </h1>

      <input
        type="text"
        placeholder="Search Service..."
        className="border p-4 rounded-xl w-full mb-8"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid md:grid-cols-3 gap-8">

        {filtered.map((item) => (

          <div
            key={item.id}
            className="shadow-lg rounded-xl p-8 hover:shadow-2xl transition"
          >

            <h2 className="text-4xl">{item.icon}</h2>

            <h3 className="text-2xl font-bold mt-4">
              {item.name}
            </h3>

            <p className="mt-3 text-gray-500">
              Starting from {item.price}
            </p>

            <button className="mt-6 bg-blue-600 text-white px-5 py-3 rounded-lg">
              Book Now
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}