import { useEffect, useState } from "react";
import { getAllBookings } from "../services/adminService";

export default function AdminDashboard() {

    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        loadBookings();
    }, []);

    const loadBookings = async () => {

        try {

            const data = await getAllBookings();
            setBookings(data);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="max-w-7xl mx-auto p-8">

            <h1 className="text-4xl font-bold mb-8">
                Admin Dashboard
            </h1>

            <div className="overflow-x-auto">

                <table className="min-w-full border border-gray-300">

                    <thead className="bg-blue-600 text-white">

                        <tr>

                            <th className="p-3">Customer</th>
                            <th className="p-3">Address</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Time</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            bookings.map((booking) => (

                                <tr
                                    key={booking.id}
                                    className="border-b text-center"
                                >

                                    <td className="p-3">
                                        {booking.customer_email}
                                    </td>

                                    <td className="p-3">
                                        {booking.address}
                                    </td>

                                    <td className="p-3">
                                        {booking.booking_date}
                                    </td>

                                    <td className="p-3">
                                        {booking.booking_time}
                                    </td>

                                    <td className="p-3">
                                        {booking.status || "Pending"}
                                    </td>

                                    <td className="p-3">

                                        <button
                                            className="bg-blue-600 text-white px-4 py-2 rounded"
                                        >
                                            Assign Provider
                                        </button>

                                    </td>

                                </tr>

                            ))
                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}