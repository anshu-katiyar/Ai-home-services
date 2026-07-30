import { useEffect, useState } from "react";
import {
    getProviderBookings,
    acceptBooking,
    rejectBooking
} from "../services/providerService";

export default function ProviderDashboard() {

    const [bookings, setBookings] = useState([]);

    useEffect(() => {

        loadBookings();

    }, []);

    const loadBookings = async () => {

        try {

            const data = await getProviderBookings();

            setBookings(data);

        } catch (error) {

            console.log(error);

        }

    };


    const handleAccept = async (bookingId) => {

    try {

        await acceptBooking(bookingId);

        alert("Booking Accepted Successfully");

        loadBookings();

    } catch (error) {

        console.log(error);

        alert("Unable to accept booking");

    }

};



const handleReject = async (bookingId) => {

    try {

        await rejectBooking(bookingId);

        alert("Booking Rejected");

        loadBookings();

    } catch (error) {

        console.log(error);

        alert("Unable to reject booking");

    }

};







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
                            className="bg-white shadow rounded-lg p-6 mb-5"
                        >

                            <h2 className="text-xl font-bold mb-3">
                                Booking Details
                            </h2>

                            <p>
                                <strong>Email:</strong> {booking.customer_email}
                            </p>

                            <p>
                                <strong>Address:</strong> {booking.address}
                            </p>

                            <p>
                                <strong>Date:</strong> {booking.booking_date}
                            </p>

                            <p>
                                <strong>Time:</strong> {booking.booking_time}
                            </p>

                            <p>
                                <strong>Status:</strong> {booking.status || "Pending"}
                            </p>

                           {
    booking.status === "Pending" && (

        <div className="flex gap-3 mt-4">

            <button
                onClick={() => handleAccept(booking.id)}
                className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
            >
                Accept
            </button>

            <button
                onClick={() => handleReject(booking.id)}
                className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700"
            >
                Reject
            </button>

        </div>

    )
}
                        </div>

                    ))

                )
            }

        </div>

    );

}