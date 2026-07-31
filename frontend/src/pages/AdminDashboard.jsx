import { useEffect, useState } from "react";
import {
    getAllBookings,
    getProviders,
    assignProvider
} from "../services/adminService";

export default function AdminDashboard() {

    const [bookings, setBookings] = useState([]);
    const [providers, setProviders] = useState([]);
    const [selectedProviders, setSelectedProviders] = useState({});

    useEffect(() => {
        loadBookings();
        loadProviders();
    }, []);

    const loadBookings = async () => {

        try {

            const data = await getAllBookings();
            setBookings(data);

        } catch (error) {

            console.log(error);

        }

    };

    const loadProviders = async () => {

    try {

        const data = await getProviders();

        setProviders(data);

    } catch (error) {

        console.log(error);

    }

};


const handleAssign = async (bookingId) => {

    const providerId = selectedProviders[bookingId];

    if (!providerId) {

        alert("Please select a provider");

        return;

    }

    try {

        await assignProvider(
            bookingId,
            providerId
        );

        alert("Provider Assigned Successfully");

        loadBookings();

    } catch (error) {

        console.log(error);

        alert("Assignment Failed");

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

                                        <div className="flex flex-col gap-2">

    <select

        className="border rounded p-2"

        value={selectedProviders[booking.id] || ""}

        onChange={(e) =>

            setSelectedProviders({

                ...selectedProviders,

                [booking.id]: e.target.value

            })

        }

    >

        <option value="">

            Select Provider

        </option>

        {

            providers.map(provider => (

                <option

                    key={provider.id}

                    value={provider.id}

                >

                   {provider.full_name}

                </option>

            ))

        }

    </select>

    <button

        onClick={() => handleAssign(booking.id)}

        className="bg-blue-600 text-white rounded py-2"

    >

        Assign

    </button>

</div>

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