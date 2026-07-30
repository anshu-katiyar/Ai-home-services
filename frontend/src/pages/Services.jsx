import { useEffect, useState } from "react";
import { getServices } from "../services/serviceService";
import ServiceCard from "../components/common/ServiceCard";



export default function Services() {

    const [services, setServices] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");

    useEffect(() => {

        fetchServices();

    }, []);

    const fetchServices = async () => {

        try {

            const res = await getServices();

            setServices(res.data);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="max-w-7xl mx-auto p-8">

            <h1 className="text-4xl font-bold mb-8">

                Home Services

            </h1>

            <input
  type="text"
  placeholder="🔍 Search Services..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full border rounded-lg px-4 py-3 mb-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>



<select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className="w-full border rounded-lg px-4 py-3 mb-8"
>
  <option value="All">All Categories</option>
  <option value="Electrical">Electrical</option>
  <option value="Plumbing">Plumbing</option>
  <option value="Cleaning">Cleaning</option>
  <option value="Painting">Painting</option>
  <option value="AC Service">AC Service</option>
</select>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

               {services
  .filter((service) => {
    const matchSearch = service.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === "All" ||
      service.category === category;

    return matchSearch && matchCategory;
  })
  .map((service, index) => (
    <ServiceCard
      key={index}
      service={service}
    />
))}

            </div>

        </div>

    );

}