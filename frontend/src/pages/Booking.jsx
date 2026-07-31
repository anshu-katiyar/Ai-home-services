import { useState } from "react";
import { createBooking } from "../services/bookingService";
import { useParams, useNavigate } from "react-router-dom";
import PaymentButton from "../components/PaymentButton";

export default function Booking() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        address: "",
        booking_date: "",
        booking_time: ""
    });

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        console.log("Service ID:", id);

        const bookingData = {

            service_id: id,

            address: form.address,

            booking_date: form.booking_date,

            booking_time: form.booking_time

        };

    const handlePaymentSuccess = async () => {

    try {

        const bookingData = {

            service_id: id,

            address: form.address,

            booking_date: form.booking_date,

            booking_time: form.booking_time

        };

        const res = await createBooking(bookingData);

        alert(res.data.message);

        navigate("/my-bookings");

    }

    catch(err){

        console.log(err);

        alert("Booking Failed");

    }

};    

        const res = await createBooking(bookingData);

        alert(res.data.message);

        navigate("/my-bookings");

    } catch (err) {

    console.log(err);

    console.log(err.response);

    alert(
        err.response?.data?.detail ||
        JSON.stringify(err.response?.data) ||
        err.message
    );

}

};
    return (

        <div className="max-w-xl mx-auto p-8">

            <h1 className="text-4xl font-bold mb-8">

                Book Service

            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >

                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                />

                <input
                    type="date"
                    name="booking_date"
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                />

                <input
                    type="time"
                    name="booking_time"
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                />

                {/* <button
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg"
                >
                    Confirm Booking
                </button> */}

                <PaymentButton

                    amount={499}

                    onSuccess={handlePaymentSuccess}

                />

            </form>

        </div>

    );

}