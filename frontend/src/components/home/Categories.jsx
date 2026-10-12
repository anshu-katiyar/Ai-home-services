import {
  FaBolt,
  FaTint,
  FaSnowflake,
  FaBroom,
  FaPaintRoller,
  FaHammer,
  FaBug,
  FaFilter,
  FaArrowRight,
} from "react-icons/fa";

import { Link } from "react-router-dom";

const services = [
  {
    title: "Electrician",
    category: "Electrical",
    desc: "Electrical repairs & installation",
    icon: FaBolt,
    color: "bg-amber-50 text-amber-500",
  },
  {
    title: "Plumber",
    category: "Plumbing",
    desc: "Pipes, taps & water repairs",
    icon: FaTint,
    color: "bg-blue-50 text-blue-500",
  },
  {
    title: "AC Repair",
    category: "AC Service",
    desc: "Service, repair & maintenance",
    icon: FaSnowflake,
    color: "bg-cyan-50 text-cyan-500",
  },
  {
    title: "Cleaning",
    category: "Cleaning",
    desc: "Home & deep cleaning",
    icon: FaBroom,
    color: "bg-emerald-50 text-emerald-500",
  },
  {
    title: "Painting",
    category: "Painting",
    desc: "Interior & exterior painting",
    icon: FaPaintRoller,
    color: "bg-purple-50 text-purple-500",
  },
  {
    title: "Carpenter",
    category: "Carpenter",
    desc: "Furniture & woodwork",
    icon: FaHammer,
    color: "bg-orange-50 text-orange-500",
  },
  {
    title: "Pest Control",
    category: "Pest Control",
    desc: "Safe pest treatment",
    icon: FaBug,
    color: "bg-red-50 text-red-500",
  },
  {
    title: "RO Service",
    category: "RO Service",
    desc: "RO repair & maintenance",
    icon: FaFilter,
    color: "bg-indigo-50 text-indigo-500",
  },
];

export default function Categories() {
  return (
    <section className="bg-white py-20 sm:py-24">

      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
              Explore services
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Everything your home needs
            </h2>

            <p className="mt-3 max-w-xl text-slate-500">
              From quick repairs to complete home maintenance,
              find the right professional in just a few clicks.
            </p>
          </div>

          <Link
            to="/services"
            className="inline-flex items-center gap-2 font-bold text-blue-600 hover:text-blue-700"
          >
            View all services
            <FaArrowRight className="text-xs" />
          </Link>

        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:gap-6">

          {services.map((item) => {

            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                to={`/services?category=${encodeURIComponent(
                  item.category
                )}`}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:-translate-y-1 hover:border-blue-100 hover:shadow-xl hover:shadow-slate-200/60 sm:p-6"
              >

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.color} transition group-hover:scale-110`}
                >
                  <Icon className="text-lg" />
                </div>

                <h3 className="mt-5 font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-1 text-sm leading-5 text-slate-500">
                  {item.desc}
                </p>

                <div className="mt-5 text-xs font-bold text-blue-600 opacity-0 transition group-hover:opacity-100">
                  Explore services →
                </div>

              </Link>
            );
          })}

        </div>

      </div>

    </section>
  );
}