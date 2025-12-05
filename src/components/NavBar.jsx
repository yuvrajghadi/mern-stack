import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");   // remove user
    setUser(null);                     // update UI
    navigate("/login");                // redirect
  };

useEffect(()=>{
    const handleStorageChange = () => {
      setUser(localStorage.getItem("user"))
    }
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    }
},[])

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl font-bold text-blue-600">
          <Link to="/">Todo</Link>
        </h1>

        <ul className="flex space-x-4 sm:space-x-6">
          {user && (
            <>
              <li>
                <Link
                  to="/"
                  className="px-3 py-1 rounded hover:bg-blue-50 hover:text-blue-600 transition"
                >
                  List
                </Link>
              </li>

              <li>
                <Link
                  to="/add"
                  className="px-3 py-1 rounded hover:bg-blue-50 hover:text-blue-600 transition"
                >
                  Add Task
                </Link>
              </li>

              <li>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 rounded hover:bg-red-50 hover:text-red-600 transition"
                >
                  Log Out
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
