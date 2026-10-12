
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    getServices,
    createService,
    updateService,
    updateServiceAvailability
} from "../services/serviceService";

const emptyForm = {
    name: "",
    category: "",
    price: "",
    description: "",
    image: ""
};

export default function AdminServices() {
    const navigate = useNavigate();

    const [services, setServices] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        loadServices();
    }, []);

    const loadServices = async () => {
        setLoading(true);
        setError("");

        try {
            const data = await getServices();
            setServices(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error(err);
            setError(
                err.response?.data?.detail ||
                "Services load nahi hui. Please refresh karein."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    const resetForm = () => {
        setForm(emptyForm);
        setEditingId(null);
        setError("");
    };

    const handleEdit = (service) => {
        setEditingId(service.id);

        setForm({
            name: service.name || "",
            category: service.category || "",
            price: String(service.price ?? ""),
            description: service.description || "",
            image: service.image || ""
        });

        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        const price = Number(form.price);

        if (
            !form.name.trim() ||
            !form.category.trim() ||
            !form.description.trim() ||
            !form.image.trim() ||
            form.price.trim() === "" ||
            !Number.isFinite(price) ||
            price < 0
        ) {
            setError(
                "Sabhi fields bharein aur valid price enter karein."
            );
            return;
        }

        const payload = {
            name: form.name.trim(),
            category: form.category.trim(),
            price,
            description: form.description.trim(),
            image: form.image.trim()
        };

        setSaving(true);

        try {
            if (editingId) {
                await updateService(editingId, payload);
                alert("Service updated successfully!");
            } else {
                await createService(payload);
                alert("New service added successfully!");
            }

            resetForm();
            await loadServices();
        } catch (err) {
            console.error(err);

            setError(
                err.response?.data?.detail ||
                err.response?.data?.message ||
                "Service save nahi hui. Please try again."
            );
        } finally {
            setSaving(false);
        }
    };


const handleAvailability = async (service) => {
    const nextValue = service.is_available === false;

    try {
        const result = await updateServiceAvailability(
            service.id,
            nextValue
        );

        console.log("Availability update response:", result);

        await loadServices();

        alert(
            nextValue
                ? "Service enabled successfully"
                : "Service disabled successfully"
        );
    } catch (err) {
        console.error(
            "Availability update failed:",
            err.response?.status,
            err.response?.data || err.message
        );

        alert(
            err.response?.data?.detail ||
            err.response?.data?.message ||
            "Service update failed. Please check the backend terminal."
        );
    }
};

    const visibleServices = services.filter((service) => {
        const query = search.trim().toLowerCase();

        return [
            service.name,
            service.category,
            service.description
        ].some((value) =>
            String(value || "").toLowerCase().includes(query)
        );
    });

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                            HomeAI Management
                        </p>
                        <h1 className="mt-1 text-3xl font-bold text-slate-900">
                            Services Management
                        </h1>
                        <p className="mt-2 text-sm text-gray-500">
                            Add services, edit prices and control availability.
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/admin")}
                        className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 font-semibold text-slate-700 hover:bg-gray-100"
                    >
                        ← Back to Admin
                    </button>
                </div>

                <section className="mb-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
                    <h2 className="mb-5 text-xl font-bold text-slate-900">
                        {editingId ? "Edit Service" : "Add New Service"}
                    </h2>

                    {error && (
                        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Service Name
                                </label>
                                <input
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="e.g. AC Repair"
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Category
                                </label>
                                <input
                                    name="category"
                                    value={form.category}
                                    onChange={handleChange}
                                    placeholder="e.g. AC Service"
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Price (₹)
                                </label>
                                <input
                                    name="price"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={form.price}
                                    onChange={handleChange}
                                    placeholder="499"
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Image URL
                                </label>
                                <input
                                    name="image"
                                    type="url"
                                    value={form.image}
                                    onChange={handleChange}
                                    placeholder="https://..."
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                                    required
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="mb-1 block text-sm font-medium">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    placeholder="Describe the service..."
                                    rows={3}
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                                    required
                                />
                            </div>
                        </div>

                        <div className="mt-5 flex flex-wrap gap-3">
                            <button
                                type="submit"
                                disabled={saving}
                                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
                            >
                                {saving
                                    ? "Saving..."
                                    : editingId
                                    ? "Save Changes"
                                    : "Add Service"}
                            </button>

                            {editingId && (
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel Edit
                                </button>
                            )}
                        </div>
                    </form>
                </section>

                <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 p-5">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">
                                All Services
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                {visibleServices.length} services
                            </p>
                        </div>

                        <input
                            type="search"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search services..."
                            className="w-full rounded-xl border border-gray-300 px-4 py-2.5 sm:w-64"
                        />
                    </div>

                    {loading ? (
                        <p className="p-8 text-gray-500">Loading services...</p>
                    ) : visibleServices.length === 0 ? (
                        <p className="p-8 text-gray-500">
                            No services found.
                        </p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-[850px] w-full text-left text-sm">
                                <thead className="bg-slate-100 text-xs uppercase text-slate-600">
                                    <tr>
                                        <th className="p-4">Service</th>
                                        <th className="p-4">Category</th>
                                        <th className="p-4">Price</th>
                                        <th className="p-4">Availability</th>
                                        <th className="p-4">Actions</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-100">
                                    {visibleServices.map((service) => (
                                        <tr
                                            key={service.id}
                                            className="hover:bg-slate-50"
                                        >
                                            <td className="p-4">
                                                <p className="font-semibold text-slate-900">
                                                    {service.name}
                                                </p>
                                                <p className="mt-1 max-w-xs text-xs text-gray-500">
                                                    {service.description}
                                                </p>
                                            </td>

                                            <td className="p-4">
                                                {service.category}
                                            </td>

                                            <td className="p-4 font-bold">
                                                ₹{Number(service.price).toLocaleString("en-IN")}
                                            </td>

                                            <td className="p-4">
                                                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                    service.is_available === false
                                                        ? "bg-red-100 text-red-700"
                                                        : "bg-emerald-100 text-emerald-700"
                                                }`}>
                                                    {service.is_available === false
                                                        ? "Unavailable"
                                                        : "Available"}
                                                </span>
                                            </td>

                                            <td className="p-4">
                                                <div className="flex flex-wrap gap-2">
                                                    <button
                                                        onClick={() => handleEdit(service)}
                                                        className="rounded-lg bg-blue-600 px-3 py-2 font-semibold text-white hover:bg-blue-700"
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        onClick={() => handleAvailability(service)}
                                                        className={`rounded-lg px-3 py-2 font-semibold text-white ${
                                                            service.is_available === false
                                                                ? "bg-emerald-600 hover:bg-emerald-700"
                                                                : "bg-red-600 hover:bg-red-700"
                                                        }`}
                                                    >
                                                        {service.is_available === false
                                                            ? "Enable"
                                                            : "Disable"}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}
