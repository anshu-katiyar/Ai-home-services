import { useEffect, useState } from "react";
import {
    getBookings,
    cancelBooking
} from "../services/bookingService";
import ReviewForm from "../components/ReviewForm";



export default function MyBookings() {

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadBookings();

  }, []);

  const loadBookings = async () => {
    try {
      const res = await getBookings();
      setBookings(res.data);
    } catch (err) {
      console.log(err);
    }
  };

const handleCancel = async (id) => {

    try {

        const res = await cancelBooking(id);

        alert(res.data.message);

        loadBookings();

    } catch (err) {

        console.log(err);

    }

};


  return (
    <div className="max-w-6xl mx-auto p-8">

      <h1 className="text-3xl font-bold mb-6">
        My Bookings
      </h1>

      {
        bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          bookings.map((booking) => (
            <div
              key={booking.id}
              className="border rounded-lg p-5 mb-4 shadow"
            >
              <h2 className="text-xl font-bold">
  {booking.service?.name}
</h2>

<p>Category: {booking.service?.category}</p>

<p>Price: ₹{booking.service?.price}</p>

              <p><b>Address:</b> {booking.address}</p>

              <p><b>Date:</b> {booking.booking_date}</p>

              <p><b>Time:</b> {booking.booking_time}</p>

              <p>
                
                <b>Status:</b>
                <span className="text-blue-600 font-semibold ml-2">
                  {booking.status}
                </span>
              </p>

              {
    booking.status !== "Completed" &&
    booking.status !== "Cancelled" && (

        <button
            onClick={() => handleCancel(booking.id)}
            className="bg-red-500 text-white px-4 py-2 rounded mt-3 hover:bg-red-600"
        >
            Cancel Booking
        </button>

    )
}

{
    booking.status === "Completed" && (

        <ReviewForm
            bookingId={booking.id}
            providerId={booking.provider_id}
        />

    )
}

            </div>
          ))
        )
      }
      

    </div>


  );
}