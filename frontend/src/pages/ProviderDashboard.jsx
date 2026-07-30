import { useEffect, useState } from "react";
import {
    getProviderBookings,
    acceptBooking,
    rejectBooking,
    onTheWayBooking,
    completeBooking
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

const handleOnTheWay = async (bookingId) => {

    try {

        await onTheWayBooking(bookingId);

        alert("Provider is on the way");

        loadBookings();

    } catch (error) {

        console.log(error);

        alert("Unable to update booking");

    }

};

const handleComplete = async (bookingId) => {

    try {

        await completeBooking(bookingId);

        alert("Service Completed Successfully");

        loadBookings();

    } catch (error) {

        console.log(error);

        alert("Unable to complete service");

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

                            <div className="mt-3">

    <strong>Status : </strong>

    <span
        className={`px-3 py-1 rounded-full text-white font-semibold
        ${
            booking.status === "Accepted"
                ? "bg-green-600"
                : booking.status === "Rejected"
                ? "bg-red-600"
                : booking.status === "On The Way"
                ? "bg-blue-600"
                : booking.status === "Completed"
                ? "bg-emerald-700"
                : "bg-yellow-500"
        }`}
    >
        {booking.status || "Pending"}
    </span>

</div>

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

{
    booking.status === "Accepted" && (

        <button
            onClick={() => handleOnTheWay(booking.id)}
            className="mt-4 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
        >
            On The Way
        </button>

    )
}

{
    booking.status === "On The Way" && (

        <button
            onClick={() => handleComplete(booking.id)}
            className="mt-4 bg-emerald-600 text-white px-5 py-2 rounded hover:bg-emerald-700"
        >
            Mark as Completed
        </button>

    )
}


                        </div>

                    ))

                )
            }

        </div>

    );

}