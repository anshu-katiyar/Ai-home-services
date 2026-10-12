import { useEffect, useState } from "react";
import {
  FaArrowRight,
  FaCalendarCheck,
  FaStar,
  FaUserCircle,
} from "react-icons/fa";

import { Link } from "react-router-dom";

import { getProviders } from "../../services/adminService";

export default function PopularProviders() {

  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadProviders();

  }, []);

  const loadProviders = async () => {

    try {

      const data = await getProviders();

      setProviders(data.slice(0, 3));

    } catch (error) {

      console.log("Provider loading error:", error);

    } finally {

      setLoading(false);

    }
  };

  return (

    <section className="bg-white py-20 sm:py-24">

      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        {/* Heading */}

        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

          <div>

            <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
              Trusted professionals
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Meet our professionals
            </h2>

            <p className="mt-3 max-w-xl text-slate-500">
              Connect with professionals available on HomeAI
              and book the service you need.
            </p>

          </div>

          <Link
            to="/services"
            className="inline-flex items-center gap-2 font-bold text-blue-600 hover:text-blue-700"
          >
            Explore services
            <FaArrowRight className="text-xs" />
          </Link>

        </div>

        {/* Loading */}

        {loading && (

          <div className="mt-12 grid gap-6 md:grid-cols-3">

            {[1, 2, 3].map((item) => (

              <div
                key={item}
                className="h-80 animate-pulse rounded-3xl bg-slate-100"
              />

            ))}

          </div>

        )}

        {/* No providers */}

        {!loading && providers.length === 0 && (

          <div className="mt-12 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center">

            <FaUserCircle className="mx-auto text-5xl text-slate-300" />

            <h3 className="mt-4 text-xl font-bold text-slate-800">
              Professionals are joining soon
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Explore our services and book when professionals
              become available.
            </p>

            <Link
              to="/services"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white"
            >
              Explore Services
              <FaArrowRight />
            </Link>

          </div>

        )}

        {/* Providers */}

        {!loading && providers.length > 0 && (

          <div className="mt-12 grid gap-6 md:grid-cols-3">

            {providers.map((provider) => (

              <div
                key={provider.id}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-100 hover:shadow-xl"
              >

                {/* Profile */}

                <div className="flex items-center gap-4">

                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 text-3xl text-blue-600">
                    <FaUserCircle />
                  </div>

                  <div className="min-w-0">

                    <h3 className="truncate text-lg font-extrabold text-slate-900">
                      {provider.full_name || "Professional"}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Home Service Professional
                    </p>

                  </div>

                </div>

                {/* Rating */}

                <div className="mt-6 flex items-center justify-between rounded-2xl bg-slate-50 p-4">

                  <div className="flex items-center gap-2">

                    <FaStar className="text-yellow-400" />

                    <span className="font-bold text-slate-900">
                      {provider.rating || "New"}
                    </span>

                  </div>

                  <span className="text-xs text-slate-400">
                    Verified profile
                  </span>

                </div>

                {/* Info */}

                <div className="mt-5 space-y-2 text-sm text-slate-500">

                  <p>
                    ✓ Available for home services
                  </p>

                  <p>
                    ✓ Secure booking
                  </p>

                  <p>
                    ✓ HomeAI platform
                  </p>

                </div>

                {/* CTA */}

                <Link
                  to="/services"
                  className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700"
                >
                  <FaCalendarCheck />
                  Book a Service
                </Link>

              </div>

            ))}

          </div>

        )}

      </div>

    </section>
  );
}