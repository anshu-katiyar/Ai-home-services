import { createOrder } from "../services/paymentService";

export default function PaymentButton({ amount, onSuccess, validate}) {

    const handlePayment = async () => {

        try {

            const order = await createOrder(amount);

            const options = {

                key: import.meta.env.VITE_RAZORPAY_KEY_ID,

                amount: order.amount,

                currency: order.currency,

                name: "HomeAI",

                description: "Home Service Booking",

                order_id: order.id,

                handler: function (response) {

                    alert("Payment Successful");

                    if(onSuccess){

                         onSuccess(response);

                    }

                },

                prefill: {

                    name: localStorage.getItem("fullName"),

                    email: localStorage.getItem("email")

                },

                theme: {

                    color: "#2563eb"

                }

            };



            const razorpay = new window.Razorpay(options);

            razorpay.open();

        }

        catch (error) {

            console.log(error);

            alert("Payment Failed");

        }

    };

    return (

        <button

            onClick={handlePayment}

            className="bg-green-600 text-white px-6 py-3 rounded-lg"

        >

            Pay ₹{amount}

        </button>

    );

}