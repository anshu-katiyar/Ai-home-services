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

    // ✅ Validate Form
    const validateBooking = () => {

        if (
            !form.address ||
            !form.booking_date ||
            !form.booking_time
        ) {

            alert("Please fill all fields");

            return false;

        }

        return true;

    };

    // ✅ Payment Success
const handlePaymentSuccess = async (payment) => {

    try {

        const bookingData = {

            service_id: id,

            address: form.address,

            booking_date: form.booking_date,

            booking_time: form.booking_time,

            payment_id: payment.razorpay_payment_id,

            order_id: payment.razorpay_order_id,

            payment_status: "Paid"

        };

        const res = await createBooking(bookingData);

        alert(res.data.message);

        navigate("/my-bookings");

    }

    catch (err) {

        console.log(err);

        alert("Booking Failed");

    }

};

    return (

        <div className="max-w-xl mx-auto p-8">

            <h1 className="text-4xl font-bold mb-8">
                Book Service
            </h1>

            <form className="space-y-5">

                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={form.address}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                />

                <input
                    type="date"
                    name="booking_date"
                    value={form.booking_date}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                />

                <input
                    type="time"
                    name="booking_time"
                    value={form.booking_time}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                />

                <PaymentButton
                    amount={499}
                    validate={validateBooking}
                    onSuccess={handlePaymentSuccess}
                />

            </form>

        </div>

    );

}