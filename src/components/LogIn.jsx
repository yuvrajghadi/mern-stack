import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  const handleBtn = async () => {
    try {
      let res = await await fetch("https://todo-backend-rosy.vercel.app/login", {
  method: "POST",
  credentials: "include", // ✅ THIS IS REQUIRED
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(userData),
});


      let data = await res.json();
if (data.success) {
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", userData.email);
  navigate("/");
} else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Server error during login");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 flex flex-col gap-5">
        <h1 className="text-3xl font-bold text-blue-700 text-center">
          Log In
        </h1>

        <p className="text-sm text-gray-500 text-center">
          Log in to your account
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          onChange={(e) =>
            setUserData({ ...userData, email: e.target.value })
          }
          className="w-full p-3 border rounded-lg"
        />

        <input
          type="password"
          placeholder="Enter your password"
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
          className="w-full p-3 border rounded-lg"
        />

        <button
          onClick={handleBtn}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
        >
          Log In
        </button>

        <p className="text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
