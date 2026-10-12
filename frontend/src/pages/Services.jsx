import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  FaSearch,
  FaSlidersH,
  FaTimes,
  FaArrowRight,
  FaExclamationTriangle,
} from "react-icons/fa";

import { getServices } from "../services/serviceService";
import ServiceCard from "../components/common/ServiceCard";

export default function Services() {
  const [services, setServices] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(
    searchParams.get("category") || "All"
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load services
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError("");

      
const res = await getServices();

console.log("SERVICES FROM BACKEND:", res);

setServices(Array.isArray(res) ? res : []);

    } catch (error) {
      console.error("SERVICES API ERROR:", error);

      setError(
        "Unable to load services. Please make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };


  // Show categories only for available services
  const availableServices = useMemo(() => {
    return services.filter(
      (service) => service.is_available !== false
    );
  }, [services]);

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        availableServices
          .map((service) => service.category)
          .filter(Boolean)
      ),
    ];

    return ["All", ...uniqueCategories];
  }, [availableServices]);


  // URL category synchronization
  useEffect(() => {
    const urlCategory = searchParams.get("category");

    if (!urlCategory) {
      setCategory("All");
      return;
    }

    // Only accept category that actually exists
    const exists = categories.some(
      (item) =>
        item.toLowerCase() === urlCategory.toLowerCase()
    );

    if (exists) {
      const actualCategory = categories.find(
        (item) =>
          item.toLowerCase() === urlCategory.toLowerCase()
      );

      setCategory(actualCategory);
    } else {
      setCategory("All");
      setSearchParams({});
    }
  }, [searchParams, categories]);

  const handleCategoryChange = (value) => {
    setCategory(value);

    if (value === "All") {
      setSearchParams({});
    } else {
      setSearchParams({
        category: value,
      });
    }
  };

  
  const filteredServices = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return availableServices.filter((service) => {
      const name = service.name?.toLowerCase() || "";
      const serviceCategory =
        service.category?.toLowerCase() || "";
      const description =
        service.description?.toLowerCase() || "";

      const matchesSearch =
        !searchText ||
        name.includes(searchText) ||
        serviceCategory.includes(searchText) ||
        description.includes(searchText);

      const matchesCategory =
        category === "All" ||
        serviceCategory === category.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [availableServices, search, category]);


  return (
    <main className="min-h-screen bg-slate-50">

      {/* Header */}

      <section className="border-b border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">

          <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
            Home services
          </p>

          <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
            Find the right service for your home
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500">
            Choose from trusted professionals for repairs,
            maintenance, cleaning and more.
          </p>

          {/* Search */}

          <div className="mt-8 flex max-w-3xl items-center rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">

            <div className="flex flex-1 items-center gap-3 px-3">

              <FaSearch className="text-slate-400" />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search electrician, plumber, AC repair..."
                className="w-full bg-transparent py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400"
              />

              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="text-slate-400 hover:text-slate-700"
                >
                  <FaTimes />
                </button>
              )}

            </div>

          </div>

        </div>

      </section>

      {/* Services */}

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">

        {/* Categories */}

        <div className="mb-8">

          <div className="mb-4 flex items-center gap-2">

            <FaSlidersH className="text-blue-600" />

            <h2 className="font-bold text-slate-900">
              Browse by category
            </h2>

          </div>

          <div className="flex gap-2 overflow-x-auto pb-3">

            {categories.map((item) => (

              <button
                key={item}
                onClick={() =>
                  handleCategoryChange(item)
                }
                className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold ${
                  category === item
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-blue-600"
                }`}
              >
                {item}
              </button>

            ))}

          </div>

        </div>

        {/* Error */}

        {error && (

          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">

            <FaExclamationTriangle className="mx-auto text-2xl text-red-500" />

            <h3 className="mt-3 font-bold text-red-700">
              Services could not be loaded
            </h3>

            <p className="mt-2 text-sm text-red-600">
              {error}
            </p>

            <button
              onClick={fetchServices}
              className="mt-4 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-red-700"
            >
              Try Again
            </button>

          </div>

        )}

        {/* Loading */}

        {loading && (

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {[1, 2, 3, 4, 5, 6].map((item) => (

              <div
                key={item}
                className="h-96 animate-pulse rounded-3xl bg-white"
              />

            ))}

          </div>

        )}

        {/* Results */}

        {!loading && !error && (

          <>

            <div className="mb-6">

              <h2 className="text-2xl font-black text-slate-900">
                {category === "All"
                  ? "All Services"
                  : category}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {filteredServices.length} services available
              </p>

            </div>

            {filteredServices.length === 0 ? (

              <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
                  🔍
                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  No services found
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                  There are no services matching your current
                  search or category.
                </p>

                <button
                  onClick={() => {
                    setSearch("");
                    handleCategoryChange("All");
                  }}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
                >
                  View all services
                  <FaArrowRight className="text-xs" />
                </button>

              </div>

            ) : (

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

                {filteredServices.map((service) => (

                  <ServiceCard
                    key={service.id}
                    service={service}
                  />

                ))}

              </div>

            )}

          </>
        )}

      </section>

    </main>
  );
}