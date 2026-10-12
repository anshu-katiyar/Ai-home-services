const stats = [
  {
    number: "10K+",
    title: "Happy Customers",
  },
  {
    number: "500+",
    title: "Verified Professionals",
  },
  {
    number: "50+",
    title: "Service Areas",
  },
  {
    number: "24/7",
    title: "AI Assistance",
  },
];

export default function Stats() {
  return (
    <section className="border-y border-slate-200 bg-slate-50 py-14">

      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 sm:px-6 md:grid-cols-4 lg:px-8">

        {stats.map((item) => (
          <div
            key={item.title}
            className="text-center"
          >

            <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              {item.number}
            </h2>

            <p className="mt-2 text-sm font-medium text-slate-500">
              {item.title}
            </p>

          </div>
        ))}

      </div>

    </section>
  );
}