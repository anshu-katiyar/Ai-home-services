import { Link } from "react-router-dom";
import { FaHome, FaRobot, FaBell } from "react-icons/fa";
import { MdMiscellaneousServices } from "react-icons/md";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
    getNotifications,
    markNotificationRead
} from "../../services/notificationService";


export default function Navbar() {
  const { token, role, logout } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter(
    (notification) => !notification.is_read
).length;

useEffect(() => {
    if (token) {
        loadNotifications();
    }
}, [token]);

const loadNotifications = async () => {

    try {

        const data = await getNotifications();

        setNotifications(data);

    } catch (error) {

        console.log(error);

    }

};

const handleNotificationClick = async (id) => {

    await markNotificationRead(id);

    loadNotifications();

};



  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link to="/" className="text-3xl font-bold text-blue-600">
          HomeAI
        </Link>

        {/* Menu */}
        <div className="hidden md:flex gap-8 items-center">

          <Link className="flex items-center gap-2 hover:text-blue-600" to="/">
  <FaHome />
  Home
</Link>

<Link className="flex items-center gap-2 hover:text-blue-600" to="/services">
  <MdMiscellaneousServices />
  Services
</Link>

{/* <Link className="flex items-center gap-2 hover:text-blue-600" to="/provider">
  <FaUserTie />
  Provider
</Link> */}

<Link className="flex items-center gap-2 hover:text-blue-600" to="/assistant">
  <FaRobot />
  AI Assistant
</Link>

<Link className="flex items-center gap-2 hover:text-blue-600" to="/my-bookings">
  My Bookings
</Link>

<Link className="flex items-center gap-2 hover:text-blue-600" to="/provider-dashboard">
  Provider Dashboard
</Link>

        </div>

        {/* Buttons */}

        <div className="flex items-center gap-4">

    {token && (

        <div className="relative">

    <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative text-2xl"
    >
        <FaBell />

        {unreadCount > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
        {unreadCount}
    </span>
)}

    </button>


    {showNotifications && (

<div className="absolute right-0 mt-3 w-96 bg-white shadow-xl rounded-xl border z-50">

    <div className="p-4 border-b font-bold">

        Notifications

    </div>

    <div className="max-h-96 overflow-y-auto">

        {notifications.length === 0 ? (

            <div className="p-4 text-gray-500">

                No Notifications

            </div>

        ) : (

            notifications.map((notification) => (

                <div
    key={notification.id}
    onClick={() => handleNotificationClick(notification.id)}
    className={`p-4 border-b cursor-pointer hover:bg-gray-100 ${
        notification.is_read
            ? "bg-white"
            : "bg-blue-50"
    }`}
>

                    <h3 className="font-semibold">

                        {notification.title}

                    </h3>

                    <p className="text-sm text-gray-600">

                        {notification.message}

                    </p>

                </div>

            ))

        )}

    </div>

</div>

)}

</div>

    )}

    {!token ? (

        <>

            <Link
                to="/login"
                className="border border-blue-600 px-4 py-2 rounded-lg"
            >
                Login
            </Link>

            <Link
                to="/signup"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
                Signup
            </Link>

        </>

    ) : (

        <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
            Logout
        </button>

    )}

</div>

      </div>
    </nav>
  );
}