import { useEffect, useState } from "react";

export default function ProviderDashboard() {

    const [bookings, setBookings] = useState([]);

    useEffect(() => {

        // API next step me connect karenge

    }, []);

    return (

        <div className="max-w-6xl mx-auto p-8">

            <h1 className="text-4xl font-bold mb-8">
                Provider Dashboard
            </h1>

            {
                bookings.length === 0 ? (

                    <div className="bg-white shadow rounded-lg p-6 text-center">

                        <h2 className="text-xl font-semibold">
                            No Bookings Assigned
                        </h2>

                    </div>

                ) : (

                    bookings.map((booking) => (

                        <div
                            key={booking.id}
                            className="border rounded-lg p-5 mb-5"
                        >

                            Booking Card

                        </div>

                    ))

                )
            }

        </div>

    );

}



// export default function ProviderDashboard() {
//   return (
//     <div className="p-10 bg-yellow-200 min-h-screen">
//       <h1 className="text-5xl font-bold text-red-600">
//         Provider Dashboard Working 🚀
//       </h1>

//       <p className="mt-5 text-2xl">
//         If you can see this, routing is working.
//       </p>
//     </div>
//   );
// }