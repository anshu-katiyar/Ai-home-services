import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function CustomerDashboard() {

    const { logout } = useAuth();

    const navigate = useNavigate();

    const handleLogout = () => {

        logout();

        navigate("/login");

    };

    return (

        <div className="min-h-screen flex flex-col items-center justify-center">

            <h1 className="text-4xl font-bold mb-8">

                👤 Customer Dashboard

            </h1>

            <button

                onClick={handleLogout}

                className="bg-red-600 text-white px-6 py-3 rounded-lg"

            >

                Logout

            </button>

        </div>

    );

}