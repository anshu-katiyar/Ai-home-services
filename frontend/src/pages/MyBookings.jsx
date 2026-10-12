
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaArrowRight,
  FaClipboardList,
  FaCreditCard,
  FaUserTie,
  FaStar,
  FaTools,
} from "react-icons/fa";

import {
  getBookings,
  cancelBooking,
} from "../services/bookingService";

import ReviewForm from "../components/ReviewForm";

const statusSteps = [
  "Pending",
  "Accepted",
  "On The Way",
  "Completed",
];

function BookingProgress({ status }) {
  const currentIndex = statusSteps.indexOf(status);

  if (status === "Cancelled" || status === "Rejected") {
    return (
      <div className="mt-5 rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700">
        <FaTimesCircle className="mr-2 inline" />
        {status === "Cancelled"
          ? "This booking has been cancelled."
          : "The provider rejected this booking."}
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h3 className="mb-4 text-sm font-bold text-slate-800">
        Service progress
      </h3>

      <div className="flex items-start">
        {statusSteps.map((step, index) => {
          const completed =
            currentIndex >= 0 && index <= currentIndex;

          return (
            <div key={step} className="relative flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs ${
                    completed
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {completed ? (
                    <FaCheckCircle />
                  ) : (
                    index + 1
                  )}
                </div>

                <span className="mt-2 text-center text-[10px] font-medium leading-4 text-slate-500 sm:text-xs">
                  {step}
                </span>
              </div>

              {index < statusSteps.length - 1 && (
                <div
                  className={`absolute left-[calc(50%+16px)] top-4 h-0.5 w-[calc(100%-32px)] ${
                    currentIndex > index
                      ? "bg-blue-600"
                      : "bg-slate-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function MyBookings() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancellingId, setCancellingId] = useState(null);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await getBookings();
      setBookings(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("MY BOOKINGS ERROR:", err);
      setError("Unable to load your bookings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (booking) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmed) return;

    try {
      setCancellingId(booking.id);

      const res = await cancelBooking(booking.id);

      alert(res.data.message || "Booking cancellation requested.");
      await loadBookings();
    } catch (err) {
      console.error("CANCEL BOOKING ERROR:", err);
      alert(
        err.response?.data?.detail ||
          "Unable to cancel this booking."
      );
    } finally {
      setCancellingId(null);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-5 py-10">
        <div className="mx-auto max-w-6xl">
          <div className="h-10 w-64 animate-pulse rounded bg-slate-200" />
          <div className="mt-8 h-64 animate-pulse rounded-3xl bg-white" />
          <div className="mt-5 h-64 animate-pulse rounded-3xl bg-white" />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
            Your HomeAI account
          </p>

          <div className="mt-3 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                My Bookings
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Manage bookings and follow your service progress.
              </p>
            </div>

            <button
              onClick={() => navigate("/services")}
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
            >
              Book a Service <FaArrowRight />
            </button>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <FaClipboardList className="text-blue-600" />
              <p className="mt-3 text-2xl font-black text-slate-900">
                {bookings.length}
              </p>
              <p className="text-xs text-slate-500">Total bookings</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <FaTools className="text-emerald-600" />
              <p className="mt-3 text-2xl font-black text-slate-900">
                {bookings.filter((b) => b.status === "Completed").length}
              </p>
              <p className="text-xs text-slate-500">Completed</p>
            </div>

            <div className="col-span-2 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:col-span-1">
              <FaClock className="text-amber-500" />
              <p className="mt-3 text-2xl font-black text-slate-900">
                {bookings.filter(
                  (b) =>
                    !["Completed", "Cancelled", "Rejected"].includes(
                      b.status
                    )
                ).length}
              </p>
              <p className="text-xs text-slate-500">In progress</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-8 sm:px-6">
        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
            {error}
            <button
              onClick={loadBookings}
              className="ml-3 font-bold underline"
            >
              Retry
            </button>
          </div>
        )}

        {!error && bookings.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-2xl text-blue-600">
              <FaClipboardList />
            </div>

            <h2 className="mt-5 text-xl font-black text-slate-900">
              No bookings yet
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Your service bookings will appear here.
            </p>

            <button
              onClick={() => navigate("/services")}
              className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
            >
              Explore Services
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => {
              const service = booking.service || {};
              const status = booking.status || "Pending";

              const canCancel = ![
                "Completed",
                "Cancelled",
                "Rejected",
              ].includes(status);

              return (
                <article
                  key={booking.id}
                  className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
                >
                  <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-start sm:justify-between sm:p-6">
                    <div>
                      <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                        {service.category || "Home Service"}
                      </span>

                      <h2 className="mt-3 text-xl font-black text-slate-900">
                        {service.name || booking.service_name || "Home Service"}
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        Booking ID: {booking.id}
                      </p>
                    </div>

                    <div className="sm:text-right">
                      <p className="text-xs text-slate-400">
                        Service price
                      </p>
                      <p className="mt-1 text-2xl font-black text-blue-600">
                        ₹{service.price ?? booking.amount ?? "—"}
                      </p>

                      <span
                        className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                          status === "Completed"
                            ? "bg-emerald-50 text-emerald-700"
                            : status === "Cancelled" ||
                                status === "Rejected"
                              ? "bg-red-50 text-red-700"
                              : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {status}
                      </span>
                    </div>
                  </div>

                  <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
                    <div className="flex gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <FaCalendarAlt />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">
                          Booking date
                        </p>
                        <p className="mt-1 text-sm font-semibold text-slate-800">
                          {booking.booking_date || "Not specified"}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                        <FaClock />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">
                          Preferred time
                        </p>
                        <p className="mt-1 text-sm font-semibold text-slate-800">
                          {booking.booking_time || "Not specified"}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 sm:col-span-2">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                        <FaMapMarkerAlt />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">
                          Service address
                        </p>
                        <p className="mt-1 text-sm leading-6 text-slate-700">
                          {booking.address || "Address not available"}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                        <FaUserTie />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">
                          Assigned professional
                        </p>
                        <p className="mt-1 text-sm font-semibold text-slate-800">
                          {booking.provider_name || "Awaiting assignment"}
                        </p>
                        {booking.provider_email && (
                          <p className="mt-1 break-all text-xs text-slate-500">
                            {booking.provider_email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                        <FaCreditCard />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">
                          Payment status
                        </p>
                        <p className="mt-1 text-sm font-semibold text-slate-800">
                          {booking.payment_status || "Not available"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 px-5 py-5 sm:px-6">
                    <BookingProgress status={status} />

                    <div className="mt-6 flex flex-wrap gap-3">
                      {canCancel && (
                        <button
                          disabled={cancellingId === booking.id}
                          onClick={() => handleCancel(booking)}
                          className="rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
                        >
                          {cancellingId === booking.id
                            ? "Cancelling..."
                            : "Cancel Booking"}
                        </button>
                      )}

                      {status === "Completed" && booking.provider_id && (
                        <button
                          onClick={() =>
                            document
                              .getElementById(`review-${booking.id}`)
                              ?.scrollIntoView({
                                behavior: "smooth",
                                block: "center",
                              })
                          }
                          className="flex items-center gap-2 rounded-xl bg-amber-50 px-4 py-2.5 text-sm font-bold text-amber-700 hover:bg-amber-100"
                        >
                          <FaStar />
                          Rate this service
                        </button>
                      )}
                    </div>

                    {status === "Completed" && (
                      <div
                        id={`review-${booking.id}`}
                        className="mt-5"
                      >
                        {booking.provider_id ? (
                          <ReviewForm
                            bookingId={booking.id}
                            providerId={booking.provider_id}
                          />
                        ) : (
                          <p className="rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
                            Provider details are unavailable for this booking, so a review cannot be linked yet.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
