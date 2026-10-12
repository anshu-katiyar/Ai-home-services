import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCalendarCheck,
  FaCheckCircle,
  FaClock,
  FaShieldAlt,
  FaStar,
  FaMapMarkerAlt,
} from "react-icons/fa";

import { getServiceById } from "../services/serviceService";

export default function ServiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchService();
  }, [id]);

  const fetchService = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await getServiceById(id);

      console.log("SERVICE DETAILS:", res.data);

      setService(res.data);
    } catch (err) {
      console.error("SERVICE DETAILS ERROR:", err);
      setError("Unable to load this service.");
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = () => {
    navigate(`/booking/${service.id}`);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-5 py-12">
        <div className="mx-auto max-w-6xl">

          <div className="h-6 w-32 animate-pulse rounded bg-slate-200" />

          <div className="mt-8 grid gap-8 lg:grid-cols-2">

            <div className="h-[420px] animate-pulse rounded-3xl bg-slate-200" />

            <div className="space-y-5">
              <div className="h-8 w-3/4 animate-pulse rounded bg-slate-200" />
              <div className="h-5 w-1/3 animate-pulse rounded bg-slate-200" />
              <div className="h-24 animate-pulse rounded bg-slate-200" />
              <div className="h-16 animate-pulse rounded bg-slate-200" />
            </div>

          </div>
        </div>
      </main>
    );
  }

  if (error || !service) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5">

        <div className="max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-2xl">
            ⚠️
          </div>

          <h1 className="mt-5 text-2xl font-black text-slate-900">
            Service not found
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {error || "This service is no longer available."}
          </p>

          <button
            onClick={() => navigate("/services")}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
          >
            <FaArrowLeft />
            Back to Services
          </button>

        </div>

      </main>
    );
  }

  const imageUrl =
    service.image?.includes("example.com")
      ? "https://placehold.co/1000x700/eef4ff/2563eb?text=Home+Service"
      : service.image ||
        "https://placehold.co/1000x700/eef4ff/2563eb?text=Home+Service";

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Breadcrumb */}

      <div className="border-b border-slate-200 bg-white">

        <div className="mx-auto max-w-6xl px-5 py-4 sm:px-6">

          <button
            onClick={() => navigate("/services")}
            className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600"
          >
            <FaArrowLeft className="text-xs" />
            Back to Services
          </button>

        </div>

      </div>

      {/* Main */}

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-6 lg:py-14">

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">

          {/* Image */}

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

            <img
              src={imageUrl}
              alt={service.name}
              onError={(e) => {
                e.currentTarget.src =
                  "https://placehold.co/1000x700/eef4ff/2563eb?text=Home+Service";
              }}
              className="h-[360px] w-full object-cover sm:h-[460px]"
            />

          </div>

          {/* Details */}

          <div className="flex flex-col justify-center">

            <div className="inline-flex w-fit rounded-full bg-blue-50 px-4 py-2 text-xs font-bold text-blue-600">
              {service.category}
            </div>

            <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
              {service.name}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">

              <span className="flex items-center gap-1.5 font-semibold text-slate-700">
                <FaStar className="text-yellow-400" />
                4.8
              </span>

              <span className="text-slate-300">
                •
              </span>

              <span className="text-slate-500">
                Trusted service
              </span>

            </div>

            <p className="mt-6 text-base leading-7 text-slate-500">
              {service.description}
            </p>

            {/* Price */}

            <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50/70 p-5">

              <p className="text-sm font-medium text-slate-500">
                Starting price
              </p>

              <div className="mt-1 flex items-end gap-2">

                <span className="text-4xl font-black text-blue-600">
                  ₹{service.price}
                </span>

                <span className="mb-1 text-sm text-slate-500">
                  onwards
                </span>

              </div>

            </div>

            {/* CTA */}

            <button
              onClick={handleBooking}
              className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-600 px-6 py-4 text-base font-bold text-white shadow-xl shadow-blue-600/20 hover:bg-blue-700"
            >
              <FaCalendarCheck />
              Book This Service
              <FaArrowRight className="ml-auto text-sm" />
            </button>

            {/* Trust features */}

            <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">

              <div className="rounded-2xl border border-slate-200 bg-white p-4">

                <FaShieldAlt className="text-blue-600" />

                <p className="mt-2 text-xs font-bold text-slate-800">
                  Secure
                </p>

                <p className="mt-1 text-[11px] text-slate-400">
                  Safe booking
                </p>

              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4">

                <FaClock className="text-blue-600" />

                <p className="mt-2 text-xs font-bold text-slate-800">
                  Quick
                </p>

                <p className="mt-1 text-[11px] text-slate-400">
                  Fast response
                </p>

              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4">

                <FaCheckCircle className="text-emerald-500" />

                <p className="mt-2 text-xs font-bold text-slate-800">
                  Verified
                </p>

                <p className="mt-1 text-[11px] text-slate-400">
                  Trusted pros
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Service information */}

        <div className="mt-10 grid gap-6 md:grid-cols-3">

          <div className="rounded-3xl border border-slate-200 bg-white p-6">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <FaMapMarkerAlt />
            </div>

            <h3 className="mt-4 font-bold text-slate-900">
              At your doorstep
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              A professional comes directly to your selected location.
            </p>

          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <FaCheckCircle />
            </div>

            <h3 className="mt-4 font-bold text-slate-900">
              Verified professionals
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Your booking can be assigned to a verified HomeAI provider.
            </p>

          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <FaStar />
            </div>

            <h3 className="mt-4 font-bold text-slate-900">
              Rated service
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              After completion, customers can rate and review the service.
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}