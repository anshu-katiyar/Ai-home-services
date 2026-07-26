const providers = [
  {
    id: 1,
    name: "Rahul Sharma",
    service: "Electrician",
    rating: "4.9",
    experience: "6 Years",
    price: "₹299 onwards",
  },
  {
    id: 2,
    name: "Amit Verma",
    service: "AC Repair",
    rating: "4.8",
    experience: "5 Years",
    price: "₹399 onwards",
  },
  {
    id: 3,
    name: "Rohit Singh",
    service: "Plumber",
    rating: "4.7",
    experience: "8 Years",
    price: "₹249 onwards",
  },
];

export default function PopularProviders() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center">
          Popular Professionals
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mt-14">

          {providers.map((item) => (

            <div
              key={item.id}
              className="shadow-lg rounded-2xl p-8 hover:shadow-2xl transition"
            >

              <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto"></div>

              <h3 className="text-center mt-5 text-2xl font-bold">
                {item.name}
              </h3>

              <p className="text-center text-gray-500">
                {item.service}
              </p>

              <div className="mt-6 space-y-2">

                <p>⭐ {item.rating}</p>

                <p>🛠 {item.experience}</p>

                <p>{item.price}</p>

              </div>

              <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl">
                Book Now
              </button>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}