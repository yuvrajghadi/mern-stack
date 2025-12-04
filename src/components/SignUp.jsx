import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [userData, setUserData] = useState({}); // ✅ safer for spreading

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 px-4">
      
      {/* ✅ Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 flex flex-col gap-5">
        
        {/* ✅ Title */}
        <h1 className="text-3xl font-bold text-blue-700 text-center">
          Create Account
        </h1>
        <p className="text-sm text-gray-500 text-center">
          Sign up to get started
        </p>

        {/* ✅ Name Input */}
        <input
          type="text"
          name="name"
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          placeholder="Enter your name"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />

        {/* ✅ Email Input */}
        <input
          type="text"
          name="email"
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          placeholder="Enter your email"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />

        {/* ✅ Password Input */}
        <input
          type="password"
          name="password"
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
          placeholder="Enter your password"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />

        {/* ✅ Sign Up Button */}
        <button
          type="button"
          onClick={() => console.log(userData)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition active:scale-95 shadow-md"
        >
          Sign Up
        </button>

        {/* ✅ Redirect */}
        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
