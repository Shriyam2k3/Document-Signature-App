import API_URL from "../config";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleLogin = async () => {
        try {
            const response = await axios.post(
                `${API_URL}/api/auth/login`,
                {
                    email,
                    password
                }
            );
            console.log(response.data);
            toast.success("Login Successful");
            localStorage.setItem(
                "token",
                response.data.token
            );
            navigate("/dashboard");
        } catch(error) {
            console.log(error.response?.data);
            alert(error.response?.data?.message);
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h1 className="text-3xl font-bold text-center mb-6">
            Login
        </h1>
        <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full border p-3 rounded mb-4"
        />
        <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full border p-3 rounded mb-4"
        />
        <button onClick={handleLogin}
            className="w-full bg-blue-500 text-white p-3 rounded"
        >
            Login
        </button>
       </div>
      </div>
    );
}

export default Login;