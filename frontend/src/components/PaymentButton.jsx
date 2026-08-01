import { createOrder } from "../services/paymentService";

export default function PaymentButton({ amount, onSuccess, validate}) {

const loadRazorpayScript = () => {
    return new Promise((resolve) => {

        if (window.Razorpay) {
            return resolve(true);
        }

        const script = document.createElement("script");

        script.src = "https://checkout.razorpay.com/v1/checkout.js";

        script.onload = () => {
            console.log("Razorpay SDK Loaded");
            resolve(true);
        };

        script.onerror = () => {
            console.log("Razorpay SDK Failed");
            resolve(false);
        };

        document.body.appendChild(script);

    });
};


const handlePayment = async () => {

    console.log("Inside handlePayment");
    // alert("Inside handlePayment");

    console.log("✅ Pay Button Clicked");
    console.log("Razorpay Key:", import.meta.env.VITE_RAZORPAY_KEY_ID);

    if (validate && !validate()) {
        return;
    }
    const loaded = await loadRazorpayScript();

if (!loaded) {
    alert("Razorpay SDK Failed To Load");
    return;
}

console.log("Window Razorpay:", window.Razorpay);

    try {

        console.log("🔹 Creating Order...");

        const order = await createOrder(amount);

        console.log("✅ Order Response:", order);
        // alert(JSON.stringify(order));

        const options = {

            key: import.meta.env.VITE_RAZORPAY_KEY_ID,

            amount: order.amount,

            currency: order.currency,

            name: "HomeAI",

            description: "Home Service Booking",

            order_id: order.id,

            handler: function (response) {

                console.log("✅ Payment Success:", response);

                alert("Payment Successful");

                if (onSuccess) {
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

        console.log("🚀 Opening Razorpay");
        console.log(options);

        const razorpay = new window.Razorpay(options);

        razorpay.open();

    }

    catch (error) {

        console.log("❌ Payment Error:", error);

        alert("Payment Failed");

    }

};

    return (

       <button
    type="button"
    onClick={() => {
    // alert("Button Clicked");
    handlePayment();
}}
    className="bg-green-600 text-white px-6 py-3 rounded-lg"
>
    Pay ₹{amount}
</button>

    );

}