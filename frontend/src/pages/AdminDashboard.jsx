
import { useEffect, useMemo, useState } from "react";
import {
    getAllBookings,
    getProviders,
    assignProvider
} from "../services/adminService";

const statusStyles = {
    Pending: "bg-amber-100 text-amber-800",
    Accepted: "bg-blue-100 text-blue-800",
    "On The Way": "bg-indigo-100 text-indigo-800",
    Completed: "bg-emerald-100 text-emerald-800",
    Cancelled: "bg-red-100 text-red-800",
    Rejected: "bg-red-100 text-red-800"
};

const formatStatus = (status) => status || "Pending";

function StatCard({ title, value, description }) {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
            <p className="mt-1 text-xs text-gray-500">{description}</p>
        </div>
    );
}

export default function AdminDashboard() {
    const [bookings, setBookings] = useState([]);
    const [providers, setProviders] = useState([]);
    const [selectedProviders, setSelectedProviders] = useState({});
    const [filter, setFilter] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [assigningId, setAssigningId] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        setLoading(true);
        setError("");

        try {
            const [bookingData, providerData] = await Promise.all([
                getAllBookings(),
                getProviders()
            ]);

            setBookings(Array.isArray(bookingData) ? bookingData : []);
            setProviders(Array.isArray(providerData) ? providerData : []);
        } catch (err) {
            console.error("Admin dashboard loading failed:", err);
            setError("Unable to load dashboard data. Please refresh the page.");
        } finally {
            setLoading(false);
        }
    };

    const counts = useMemo(() => {
        const countStatus = (status) =>
            bookings.filter(
                (booking) => formatStatus(booking.status) === status
            ).length;

        return {
            total: bookings.length,
            pending: countStatus("Pending"),
            accepted: countStatus("Accepted"),
            completed: countStatus("Completed"),
            cancelled:
                countStatus("Cancelled") + countStatus("Rejected")
        };
    }, [bookings]);

    
const visibleBookings = useMemo(() => {
    let result = bookings;

    // Filter bookings by status
    if (filter !== "All") {
        if (filter === "Cancelled") {
            result = result.filter((booking) =>
                ["Cancelled", "Rejected"].includes(
                    formatStatus(booking.status)
                )
            );
        } else {
            result = result.filter(
                (booking) => formatStatus(booking.status) === filter
            );
        }
    }

    // Search by booking ID, customer email, address or service name
    const query = searchTerm.trim().toLowerCase();

    if (query) {
        result = result.filter((booking) => {
            const searchableFields = [
                booking.id,
                booking.customer_email,
                booking.address,
                booking.service_name,
                booking.service?.name,
                booking.service_id,
                booking.provider_name,
                booking.provider_email,
                booking.status
            ];

            return searchableFields.some((field) =>
                String(field ?? "").toLowerCase().includes(query)
            );
        });
    }

    return result;
}, [bookings, filter, searchTerm]);


    const handleAssign = async (booking) => {
        const bookingId = booking.id;
        const providerId = selectedProviders[bookingId];

        if (!providerId) {
            alert("Please select a provider first.");
            return;
        }

        if (
            ["Cancelled", "Rejected", "Completed"].includes(
                formatStatus(booking.status)
            )
        ) {
            alert("Provider cannot be assigned to this booking status.");
            return;
        }

        setAssigningId(bookingId);

        try {
            await assignProvider(bookingId, providerId);
            alert("Provider assigned successfully.");
            await loadDashboard();
        } catch (err) {
            console.error("Provider assignment failed:", err);
            alert(
                err?.response?.data?.detail ||
                err?.response?.data?.message ||
                "Assignment failed. Please try again."
            );
        } finally {
            setAssigningId(null);
        }
    };

    const formatAmount = (amount) => {
        if (amount === undefined || amount === null || amount === "") {
            return "—";
        }

        const value = Number(amount);

        if (!Number.isFinite(value)) return "—";

        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 2
        }).format(value);
    };

    if (loading) {
        return (
            <div className="mx-auto max-w-7xl p-8">
                <p className="text-gray-600">Loading admin dashboard...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
                <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                            HomeAI Management
                        </p>
                        <h1 className="mt-1 text-3xl font-bold text-slate-900 sm:text-4xl">
                            Admin Dashboard
                        </h1>
                        <p className="mt-2 text-sm text-slate-500">
                            Manage bookings, providers and service progress.
                        </p>
                    </div>

                    <button
                        onClick={loadDashboard}
                        className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 font-semibold text-slate-700 hover:bg-gray-100"
                    >
                        ↻ Refresh Data
                    </button>
                </div>

                {error && (
                    <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
                        <span>{error}</span>
                        <button
                            onClick={loadDashboard}
                            className="font-semibold underline"
                        >
                            Try again
                        </button>
                    </div>
                )}

                <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    <StatCard
                        title="Total Bookings"
                        value={counts.total}
                        description="All recorded bookings"
                    />
                    <StatCard
                        title="Pending"
                        value={counts.pending}
                        description="Awaiting action"
                    />
                    <StatCard
                        title="Accepted"
                        value={counts.accepted}
                        description="Accepted by providers"
                    />
                    <StatCard
                        title="Completed"
                        value={counts.completed}
                        description="Services marked complete"
                    />
                    <StatCard
                        title="Cancelled / Rejected"
                        value={counts.cancelled}
                        description="Bookings not proceeding"
                    />
                </section>

                <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 p-5">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">
                                Booking Management
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                {visibleBookings.length} bookings shown · {providers.length} providers available
                            </p>
                        </div>

                        
<input
    type="search"
    value={searchTerm}
    onChange={(event) => setSearchTerm(event.target.value)}
    placeholder="Search booking, email, service..."
    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:w-72"
    aria-label="Search bookings"
/>


                        <select
                            value={filter}
                            onChange={(event) => setFilter(event.target.value)}
                            className="rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm"
                            aria-label="Filter bookings by status"
                        >
                            <option value="All">All Bookings</option>
                            <option value="Pending">Pending</option>
                            <option value="Accepted">Accepted</option>
                            <option value="On The Way">On The Way</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled / Rejected</option>
                        </select>
                    </div>

                    {visibleBookings.length === 0 ? (
                        <div className="p-12 text-center">
                            <div className="text-4xl">📋</div>
                            <h3 className="mt-3 font-bold text-slate-800">
                                No bookings found
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Try another status filter or refresh the data.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-[1150px] w-full text-left text-sm">
                                <thead className="bg-slate-100 text-xs uppercase tracking-wider text-slate-600">
                                    <tr>
                                        <th className="p-4">Customer / Booking</th>
                                        <th className="p-4">Service</th>
                                        <th className="p-4">Schedule</th>
                                        <th className="p-4">Amount / Payment</th>
                                        <th className="p-4">Status</th>
                                        <th className="p-4">Assigned Provider</th>
                                        <th className="p-4">Action</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-100">
                                    {visibleBookings.map((booking) => {
                                        const status = formatStatus(booking.status);
                                        const isFinal = [
                                            "Cancelled",
                                            "Rejected",
                                            "Completed"
                                        ].includes(status);

                                        return (
                                            <tr
                                                key={booking.id}
                                                className="align-top hover:bg-slate-50"
                                            >
                                                <td className="p-4">
                                                    <p className="font-semibold text-slate-900">
                                                        {booking.customer_email || "Customer"}
                                                    </p>
                                                    <p className="mt-1 break-all text-xs text-gray-500">
                                                        ID: {booking.id}
                                                    </p>
                                                    <p className="mt-2 max-w-[220px] whitespace-normal text-xs text-gray-600">
                                                        {booking.address || "Address not provided"}
                                                    </p>
                                                </td>

                                                <td className="p-4">
                                                    <p className="font-semibold text-slate-800">
                                                        {booking.service_name || booking.service?.name || "Service"}
                                                    </p>
                                                    <p className="mt-1 text-xs text-gray-500">
                                                        Service ID: {booking.service_id || "—"}
                                                    </p>
                                                </td>

                                                <td className="p-4 whitespace-nowrap">
                                                    <p>{booking.booking_date || "—"}</p>
                                                    <p className="mt-1 text-gray-500">
                                                        {booking.booking_time || "—"}
                                                    </p>
                                                </td>

                                                <td className="p-4 whitespace-nowrap">
                                                    <p className="font-bold text-slate-900">
                                                        {formatAmount(
                                                            booking.amount ??
                                                            booking.price ??
                                                            booking.service_price
                                                        )}
                                                    </p>
                                                    <span className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                                                        String(booking.payment_status || "Pending").toLowerCase() === "paid"
                                                            ? "bg-emerald-100 text-emerald-800"
                                                            : "bg-amber-100 text-amber-800"
                                                    }`}>
                                                        Payment: {booking.payment_status || "Pending"}
                                                    </span>
                                                </td>

                                                <td className="p-4">
                                                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                                                        statusStyles[status] || "bg-gray-100 text-gray-700"
                                                    }`}>
                                                        {status}
                                                    </span>
                                                </td>

                                                <td className="p-4">
                                                    {booking.provider_name ? (
                                                        <>
                                                            <p className="font-semibold text-slate-800">
                                                                {booking.provider_name}
                                                            </p>
                                                            <p className="mt-1 break-all text-xs text-gray-500">
                                                                {booking.provider_email || ""}
                                                            </p>
                                                        </>
                                                    ) : (
                                                        <span className="text-sm text-gray-400">
                                                            Awaiting assignment
                                                        </span>
                                                    )}
                                                </td>

                                                <td className="p-4">
                                                    <div className="flex min-w-[190px] flex-col gap-2">
                                                        <select
                                                            className="w-full rounded-lg border border-gray-300 bg-white p-2"
                                                            value={selectedProviders[booking.id] || ""}
                                                            onChange={(event) =>
                                                                setSelectedProviders((previous) => ({
                                                                    ...previous,
                                                                    [booking.id]: event.target.value
                                                                }))
                                                            }
                                                            disabled={isFinal || providers.length === 0}
                                                            aria-label={`Select provider for booking ${booking.id}`}
                                                        >
                                                            <option value="">
                                                                Select Provider
                                                            </option>

                                                            {providers.map((provider) => (
                                                                <option
                                                                    key={provider.id}
                                                                    value={provider.id}
                                                                >
                                                                    {provider.full_name || "Provider"} — {provider.email}
                                                                </option>
                                                            ))}
                                                        </select>

                                                        <button
                                                            onClick={() => handleAssign(booking)}
                                                            disabled={isFinal || assigningId === booking.id || providers.length === 0}
                                                            className="rounded-lg bg-blue-600 px-3 py-2 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                                                        >
                                                            {assigningId === booking.id
                                                                ? "Assigning..."
                                                                : booking.provider_id
                                                                ? "Reassign Provider"
                                                                : "Assign Provider"}
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}
