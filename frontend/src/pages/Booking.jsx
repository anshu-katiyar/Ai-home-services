import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  FaArrowLeft,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaMapMarkerAlt,
  FaShieldAlt,
} from "react-icons/fa";

import { getServiceById } from "../services/serviceService";
import { createBooking } from "../services/bookingService";

import PaymentButton from "../components/PaymentButton";
import LocationPicker from "../components/LocationPicker";

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState(null);

  const [form, setForm] = useState({
    address: "",
    booking_date: "",
    booking_time: "",
  });

  const [location, setLocation] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadService();
  }, [id]);

  const loadService = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getServiceById(id);

console.log("BOOKING SERVICE:", data);

setService(data);
    } catch (err) {
    console.error("SERVICE LOAD ERROR:", err);

    setError(
        err.response?.data?.detail ||
        err.message ||
        "Unable to load this service."
    );
} finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validateBooking = () => {
    if (!form.address.trim()) {
      alert("Please enter your service address.");
      return false;
    }

    if (!form.booking_date) {
      alert("Please select booking date.");
      return false;
    }

    if (!form.booking_time) {
      alert("Please select booking time.");
      return false;
    }

    if (!location) {
      alert("Please select your location on the map.");
      return false;
    }

    return true;
  };

  const handlePaymentSuccess = async (payment) => {
    try {
      const bookingData = {
        service_id: id,

        address: form.address,

        booking_date: form.booking_date,

        booking_time: form.booking_time,

        latitude: location?.lat,

        longitude: location?.lng,

        payment_id: payment.razorpay_payment_id,

        order_id: payment.razorpay_order_id,

        payment_status: "Paid",
      };

      console.log("BOOKING DATA:", bookingData);

      const res = await createBooking(bookingData);

      alert(
        res.data.message ||
          "Booking confirmed successfully!"
      );

      navigate("/my-bookings");

    } catch (err) {
      console.error("BOOKING ERROR:", err);

      alert("Payment successful, but booking creation failed. Please contact support.");
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-5 py-12">

        <div className="mx-auto max-w-6xl">

          <div className="h-6 w-32 animate-pulse rounded bg-slate-200" />

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">

            <div className="space-y-6">

              <div className="h-32 animate-pulse rounded-3xl bg-white" />

              <div className="h-96 animate-pulse rounded-3xl bg-white" />

            </div>

            <div className="h-80 animate-pulse rounded-3xl bg-white" />

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
            Service unavailable
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {error || "This service could not be loaded."}
          </p>

          <button
            onClick={() => navigate("/services")}
            className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
          >
            Back to Services
          </button>

        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Top */}

      <div className="border-b border-slate-200 bg-white">

        <div className="mx-auto max-w-6xl px-5 py-4 sm:px-6">

          <button
            onClick={() =>
              navigate(`/services/${service.id}`)
            }
            className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600"
          >
            <FaArrowLeft className="text-xs" />
            Back to service
          </button>

        </div>

      </div>

      {/* Content */}

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-6 lg:py-14">

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

          {/* LEFT */}

          <div>

            <div className="mb-8">

              <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
                Book your service
              </p>

              <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900">
                Schedule a professional
              </h1>

              <p className="mt-3 text-slate-500">
                Choose your location, date and preferred time.
              </p>

            </div>

            {/* Address */}

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <FaMapMarkerAlt />
                </div>

                <div>

                  <h2 className="font-bold text-slate-900">
                    Service location
                  </h2>

                  <p className="text-sm text-slate-500">
                    Where should our professional visit?
                  </p>

                </div>

              </div>

              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                rows={3}
                placeholder="Enter your complete address..."
                className="mt-6 w-full resize-none rounded-2xl border border-slate-200 p-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />

              <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">

                <LocationPicker
                  onLocationSelect={(loc) => {
                    setLocation(loc);
                    console.log(
                      "Selected Location:",
                      loc
                    );
                  }}
                />

              </div>

              {location && (
                <div className="mt-3 flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">

                  <FaCheckCircle />

                  Location selected successfully

                </div>
              )}

            </div>

            {/* Date / Time */}

            <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                  <FaCalendarAlt />
                </div>

                <div>

                  <h2 className="font-bold text-slate-900">
                    Schedule your visit
                  </h2>

                  <p className="text-sm text-slate-500">
                    Select a convenient date and time.
                  </p>

                </div>

              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Date
                  </label>

                  <input
                    type="date"
                    name="booking_date"
                    value={form.booking_date}
                    min={
                      new Date()
                        .toISOString()
                        .split("T")[0]
                    }
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />

                </div>

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Preferred time
                  </label>

                  <input
                    type="time"
                    name="booking_time"
                    value={form.booking_time}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />

                </div>

              </div>

            </div>

          </div>

          {/* RIGHT — SUMMARY */}

          <aside>

            <div className="sticky top-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">

              <p className="text-sm font-bold uppercase tracking-wider text-slate-400">
                Booking summary
              </p>

              <h2 className="mt-3 text-2xl font-black text-slate-900">
                {service.name}
              </h2>

              <div className="mt-2 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">
                {service.category}
              </div>

              <div className="my-6 h-px bg-slate-100" />

              <div className="space-y-4 text-sm">

                <div className="flex justify-between">

                  <span className="text-slate-500">
                    Service
                  </span>

                  <span className="font-semibold text-slate-900">
                    {service.name}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-slate-500">
                    Visit
                  </span>

                  <span className="font-semibold text-slate-900">
                    At your location
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-slate-500">
                    Price
                  </span>

                  <span className="font-bold text-blue-600">
                    ₹{service.price}
                  </span>

                </div>

              </div>

              <div className="my-6 h-px bg-slate-100" />

              <div className="flex items-end justify-between">

                <span className="font-semibold text-slate-600">
                  Total
                </span>

                <span className="text-3xl font-black text-slate-900">
                  ₹{service.price}
                </span>

              </div>

              <div className="mt-6 rounded-2xl bg-slate-50 p-4">

                <div className="flex gap-3">

                  <FaShieldAlt className="mt-1 shrink-0 text-emerald-500" />

                  <div>

                    <p className="text-sm font-bold text-slate-800">
                      Secure payment
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Your payment is processed securely through Razorpay.
                    </p>

                  </div>

                </div>

              </div>

              <PaymentButton
                amount={Number(service.price)}
                validate={validateBooking}
                onSuccess={handlePaymentSuccess}
              />

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
                <FaClock />
                Quick booking • Verified professionals
              </div>

            </div>

          </aside>

        </div>

      </section>

    </main>
  );
}