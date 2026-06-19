import API_URL from "../config";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleRegister = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/api/auth/signup`,
        {
          name,
          email,
          password
        }
      );
      console.log(response.data);
      toast.success("Registration Successful");
      navigate("/");
    } catch(error){
      alert(error.response.data.message);
    }
  };
  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">   
    <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">    
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
        Create Account
      </h1>
      <form onSubmit={(e) => {e.preventDefault(); handleRegister();}}
        className="space-y-4"
      >
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>
      <p className="text-center mt-4 text-gray-600">
        Already have an account?
        <span
          onClick={() => navigate("/login")}
          className="text-blue-600 cursor-pointer ml-1"
        >
          Login
        </span>
      </p>
    </div>
  </div>
);
}

export default Signup;