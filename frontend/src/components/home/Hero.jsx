import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaSearch,
  FaStar,
} from "react-icons/fa";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">

      {/* Background */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.30),transparent_35%),radial-gradient(circle_at_85%_30%,rgba(6,182,212,0.20),transparent_30%)]" />

      <div className="absolute -right-32 top-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 sm:px-6 md:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-28">

        {/* Left */}

        <div className="animate-fade-up">

          {/* Badge */}

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-blue-200 backdrop-blur">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
            AI-powered home services
          </div>

          <h1 className="max-w-3xl text-5xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">

            Your home.
            <br />

            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
              Smarter care.
            </span>

          </h1>

          <p className="mt-7 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
            Book trusted professionals for repairs, cleaning,
            maintenance and more — powered by smart matching
            and real-time service tracking.
          </p>

          {/* Search */}

          <div className="mt-9 max-w-2xl rounded-2xl border border-white/10 bg-white p-2 shadow-2xl shadow-black/20">

            <div className="flex flex-col gap-2 sm:flex-row">

              <div className="flex flex-1 items-center gap-3 rounded-xl px-4 py-3">

                <FaSearch className="shrink-0 text-slate-400" />

                <input
                  type="text"
                  placeholder="What service do you need?"
                  className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400 sm:text-base"
                />

              </div>

              <Link
                to="/services"
                className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/25 hover:bg-blue-700 sm:px-7"
              >
                Find a Service
                <FaArrowRight className="text-xs" />
              </Link>

            </div>

          </div>

          {/* Quick actions */}

          <div className="mt-5 flex flex-wrap gap-3">

            <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-200 backdrop-blur hover:bg-white/10">
              🎙️ Voice Booking
            </button>

            <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-200 backdrop-blur hover:bg-white/10">
              📷 Upload Problem
            </button>

            <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-200 backdrop-blur hover:bg-white/10">
              <FaMapMarkerAlt className="mr-1 inline text-xs" />
              Use Location
            </button>

          </div>

          {/* Trust */}

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-400">

            <span className="flex items-center gap-2">
              <FaCheckCircle className="text-emerald-400" />
              Verified professionals
            </span>

            <span className="flex items-center gap-2">
              <FaCheckCircle className="text-emerald-400" />
              Secure payments
            </span>

          </div>

        </div>

        {/* Right visual */}

        <div className="relative hidden lg:block">

          <div className="relative mx-auto max-w-md">

            {/* Main card */}

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur-xl">

              <div className="rounded-[1.5rem] bg-white p-6 text-slate-900">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Today's booking
                    </p>

                    <h3 className="mt-1 text-xl font-extrabold">
                      AC Service
                    </h3>
                  </div>

                  <div className="rounded-xl bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-600">
                    Confirmed
                  </div>

                </div>

                <div className="my-6 h-px bg-slate-100" />

                <div className="flex items-center gap-4">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
                    👨‍🔧
                  </div>

                  <div className="flex-1">

                    <h4 className="font-bold">
                      Verified Professional
                    </h4>

                    <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                      <FaStar className="text-yellow-400" />
                      <span>4.9</span>
                      <span>•</span>
                      <span>6+ years experience</span>
                    </div>

                  </div>

                </div>

                <div className="mt-6 rounded-2xl bg-slate-50 p-4">

                  <div className="flex items-center justify-between text-sm">

                    <span className="text-slate-500">
                      Arrival
                    </span>

                    <span className="font-bold text-slate-900">
                      20–30 min
                    </span>

                  </div>

                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400" />
                  </div>

                  <p className="mt-3 text-xs text-slate-400">
                    Provider is on the way to your location
                  </p>

                </div>

              </div>

            </div>

            {/* Floating card */}

            <div className="animate-float absolute -left-10 bottom-10 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  ✓
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Payment
                  </p>

                  <p className="font-bold text-slate-900">
                    ₹499 secured
                  </p>
                </div>

              </div>

            </div>

            {/* Rating card */}

            <div className="absolute -right-8 top-12 rounded-2xl border border-white/10 bg-slate-900/90 p-4 shadow-xl backdrop-blur">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400/10 text-yellow-400">
                  <FaStar />
                </div>

                <div>
                  <p className="text-lg font-extrabold text-white">
                    4.9/5
                  </p>

                  <p className="text-xs text-slate-400">
                    Customer rating
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Bottom fade */}

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/5 to-transparent" />

    </section>
  );
}