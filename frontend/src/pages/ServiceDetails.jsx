import { useParams } from "react-router-dom";

export default function ServiceDetails() {

  const { id } = useParams();

  return (
    <div className="max-w-6xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-5">
        Service Details
      </h1>

      <p className="text-lg">
        Service ID : {id}
      </p>

    </div>
  );

}