import { useNavigate } from "react-router-dom";


export default function ServiceCard({ service }) {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate(`/services/${service.id}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden">

      <img
        src="https://placehold.co/600x350"
        alt={service.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-5">

        <h2 className="text-2xl font-bold">
          {service.name}
        </h2>

        <p className="text-gray-500 mt-2">
          {service.category}
        </p>

        <p className="mt-3">
          {service.description}
        </p>

        <div className="flex justify-between items-center mt-5">

          <span className="text-2xl font-bold text-blue-600">
            ₹ {service.price}
          </span>

          <button
    onClick={() => navigate(`/booking/${service.id}`)}
    className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
>
    Book Now
</button>

        </div>

      </div>

    </div>
  );
}