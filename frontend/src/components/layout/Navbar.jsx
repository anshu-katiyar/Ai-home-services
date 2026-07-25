import { Link } from "react-router-dom";
import { FaHome, FaUserTie, FaRobot } from "react-icons/fa";
import { MdMiscellaneousServices } from "react-icons/md";

export default function Navbar() {
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

          <Link className="flex items-center gap-2 hover:text-blue-600" to="/provider">
            <FaUserTie />
            Provider
          </Link>

          <Link className="flex items-center gap-2 hover:text-blue-600" to="/assistant">
            <FaRobot />
            AI Assistant
          </Link>

        </div>

        {/* Buttons */}

        <div className="flex gap-3">

          <button className="border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50">
            Login
          </button>

          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Signup
          </button>

        </div>

      </div>
    </nav>
  );
}