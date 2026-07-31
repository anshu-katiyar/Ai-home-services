import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../services/authService";

export default function Signup() {

  const navigate = useNavigate();

  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");

  const handleSignup = async (e) => {

    e.preventDefault();

    try {

      await signupUser({
        full_name,
        email,
        password,
        role
      });

      alert("Signup Successful");

      navigate("/login");

    } catch (err) {

      alert(
        err.response?.data?.detail ||
        "Signup Failed"
      );

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-slate-100">

      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">

        <h1 className="text-4xl font-bold text-center text-blue-600">
          Create Account
        </h1>

        <form
          onSubmit={handleSignup}
          className="space-y-5 mt-8"
        >

          <input
            type="text"
            placeholder="Full Name"
            className="w-full border rounded-lg p-3"
            value={full_name}
            onChange={(e)=>setFullName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-lg p-3"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg p-3"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />

          <select
            className="w-full border rounded-lg p-3"
            value={role}
            onChange={(e)=>setRole(e.target.value)}
          >

            <option value="customer">
              Customer
            </option>

            <option value="provider">
              Provider
            </option>

            <option value="admin">
              Admin
            </option>

          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg"
          >
            Signup
          </button>

        </form>

        <p className="text-center mt-6">

          Already have an account?

          <Link
            to="/login"
            className="text-blue-600 ml-2"
          >
            Login
          </Link>

        </p>

      </div>

    </div>

  );

}