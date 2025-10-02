import React from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminNavbar() {
  const navigate = useNavigate();

  // Check if admin is logged in
  const isAdmin = localStorage.getItem("isAdmin") === "true"; 

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("user");
    localStorage.removeItem("isAdmin"); // clear admin flag
    navigate("/"); 
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-gray-700">DataFloat Admin</div>

      <div className="flex items-center space-x-6">
        {isAdmin ? (
          <>
            <Link
              to="/UserTable"
              className="text-gray-700 font-medium hover:text-blue-600 transition"
            >
              Users
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/"
              className="text-gray-700 font-medium hover:text-blue-600 transition"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="text-gray-700 font-medium hover:text-blue-600 transition"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default AdminNavbar;
