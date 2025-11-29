import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl font-bold text-blue-600"><Link to={"/"}>Todo </Link></h1>

        <ul className="flex space-x-4 sm:space-x-6">
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
        </ul>
      </div>
    </nav>
  )
}

export default NavBar
