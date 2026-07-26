import {
  FaUserShield,
  FaRobot,
  FaClock,
  FaMoneyCheckAlt,
} from "react-icons/fa";

const features = [
  {
    icon: <FaUserShield size={40} />,
    title: "Verified Professionals",
    desc: "Every service provider is verified before joining.",
  },
  {
    icon: <FaRobot size={40} />,
    title: "AI Smart Matching",
    desc: "AI finds the best provider based on your needs.",
  },
  {
    icon: <FaClock size={40} />,
    title: "Quick Booking",
    desc: "Book any service within minutes.",
  },
  {
    icon: <FaMoneyCheckAlt size={40} />,
    title: "Transparent Pricing",
    desc: "Know the estimated cost before booking.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-slate-100">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center">
          Why Choose HomeAI?
        </h2>

        <p className="text-center text-gray-500 mt-4">
          Smart AI + Trusted Professionals + Fast Service
        </p>

        <div className="grid md:grid-cols-4 gap-8 mt-14">

          {features.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition duration-300"
            >
              <div className="text-blue-600 flex justify-center mb-5">
                {item.icon}
              </div>

              <h3 className="font-bold text-xl">
                {item.title}
              </h3>

              <p className="text-gray-500 mt-3">
                {item.desc}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}