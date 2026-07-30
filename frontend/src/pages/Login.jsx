import { useState } from "react";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const res = await loginUser({
        email,
        password
      });

      login(
    res.data.access_token,
    res.data.role
);

alert("Login Successful");

if (res.data.role === "customer") {
    navigate("/customer");
}
else if (res.data.role === "provider") {
    navigate("/provider");
}
else if (res.data.role === "admin") {
    navigate("/admin");
}
else {
    navigate("/");
}

      console.log(res.data);

    } catch (err) {

      alert(
        err.response?.data?.detail ||
        "Login Failed"
      );

    }

  };

  return (

    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >

        <h1 className="text-3xl font-bold mb-6">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="border p-3 w-full mb-4 rounded"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-3 w-full mb-4 rounded"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          className="bg-green-600 text-white w-full p-3 rounded"
        >
          Login
        </button>

      </form>

    </div>

  );

}