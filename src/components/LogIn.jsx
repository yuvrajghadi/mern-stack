import React, { useState } from "react";
import { useEffect } from "react";
import { Link,  useNavigate } from "react-router-dom";

const SignUp = () => {
  const [userData, setUserData] = useState({}); // ✅ safer for spreading
  const navigate = useNavigate();

  useEffect(()=>{
    if (localStorage.getItem('user')) {
      navigate('/')
    }
  }, [])

  const handleBtn = async () => {
        console.log(userData);
        let data = await fetch('http://localhost:3200/login', {
            method: 'post',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        data = await data.json()

        if (data.token) {
            document.cookie = 'token=' + data.token
            localStorage.setItem('user',userData.email)
          navigate('/')
        }else{
          alert('Please enter correct details')
        }
    }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 px-4">
      
      {/* ✅ Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 flex flex-col gap-5">
        
        {/* ✅ Title */}
        <h1 className="text-3xl font-bold text-blue-700 text-center">
          Log In
        </h1>
        <p className="text-sm text-gray-500 text-center">
          Log In to your account
        </p>


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
          onClick={handleBtn}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition active:scale-95 shadow-md"
        >
          Sign Up
        </button>

        {/* ✅ Redirect */}
        <p className="text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
