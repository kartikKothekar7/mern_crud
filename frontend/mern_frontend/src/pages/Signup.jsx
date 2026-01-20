import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/api/auth/register", {
        email,
        password,
      });
      
      alert("Signup successful. Please login.");
      navigate("/login");
    } catch (error) {
      console.log(error)
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center">
      <form
        onSubmit={handleSignup}
        className="bg-gray-900 p-6 rounded-lg w-96 text-white shadow-lg"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 rounded bg-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 p-2 rounded font-semibold transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
