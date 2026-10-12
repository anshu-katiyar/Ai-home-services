import { useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaCalendarCheck,
  FaStar,
  FaBolt,
  FaTint,
  FaSnowflake,
  FaBroom,
  FaPaintRoller,
} from "react-icons/fa";

const categoryVisuals = {
  "Electrical": {
    icon: FaBolt,
    bg: "from-amber-50 to-orange-100",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-500",
  },

  "Plumbing": {
    icon: FaTint,
    bg: "from-blue-50 to-cyan-100",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-500",
  },

  "AC Service": {
    icon: FaSnowflake,
    bg: "from-cyan-50 to-sky-100",
    iconBg: "bg-cyan-100",
    iconColor: "text-cyan-500",
  },

  "Cleaning": {
    icon: FaBroom,
    bg: "from-emerald-50 to-green-100",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-500",
  },

  "Painting": {
    icon: FaPaintRoller,
    bg: "from-purple-50 to-fuchsia-100",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-500",
  },
};

export default function ServiceCard({ service }) {
  const navigate = useNavigate();

  const visual =
    categoryVisuals[service.category] || {
      icon: FaCalendarCheck,
      bg: "from-slate-50 to-blue-100",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    };

  const Icon = visual.icon;

  const handleDetails = () => {
    navigate(`/services/${service.id}`);
  };

  const handleBookNow = () => {
    navigate(`/booking/${service.id}`);
  };

  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-2xl hover:shadow-slate-200/60">

      {/* Visual */}

      <div
        className={`relative flex h-52 items-center justify-center overflow-hidden bg-gradient-to-br ${visual.bg}`}
      >

        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/40" />

        <div className="absolute -bottom-12 -left-8 h-36 w-36 rounded-full bg-white/30" />

        <div
          className={`relative flex h-24 w-24 items-center justify-center rounded-[2rem] ${visual.iconBg} shadow-sm transition duration-500 group-hover:scale-110 group-hover:rotate-3`}
        >
          <Icon className={`text-4xl ${visual.iconColor}`} />
        </div>

        <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-blue-600 shadow-sm">
          {service.category}
        </div>

      </div>

      {/* Content */}

      <div className="p-6">

        <div className="flex items-start justify-between gap-4">

          <div>

            <h2 className="text-xl font-extrabold text-slate-900">
              {service.name}
            </h2>

            <div className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">

              <FaStar className="text-yellow-400" />

              <span className="font-semibold text-slate-700">
                4.8
              </span>

              <span>
                • Trusted service
              </span>

            </div>

          </div>

          <div className="shrink-0 text-right">

            <p className="text-xs text-slate-400">
              Starting from
            </p>

            <p className="text-xl font-black text-blue-600">
              ₹{service.price}
            </p>

          </div>

        </div>

        <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-500">
          {service.description}
        </p>

        {/* Buttons */}

        <div className="mt-6 grid grid-cols-2 gap-3">

          <button
            onClick={handleDetails}
            className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
          >
            View Details
          </button>

          <button
            onClick={handleBookNow}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700"
          >
            <FaCalendarCheck />
            Book Now
          </button>

        </div>

        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-xs">

          <span className="text-slate-400">
            ✓ Verified professionals
          </span>

          <button
            onClick={handleDetails}
            className="flex items-center gap-1 font-bold text-blue-600 hover:text-blue-700"
          >
            Details
            <FaArrowRight />
          </button>

        </div>

      </div>

    </article>
  );
}