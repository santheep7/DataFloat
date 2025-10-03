import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import { toast, ToastContainer } from "react-toastify";

export default function Signin() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //admin login
    if (form.email === "admin@gmail.com" && form.password === "admin123") {
      localStorage.setItem("isAdmin", true);
      toast.success("Admin Login Success")
      setTimeout(() => navigate("/AdminHome"), 1500)
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/api/user/Login`, form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("User Login Success..!")
      setTimeout(() => navigate("/Feedback"), 1500);
    } catch (err) {

      toast.error("Sign In Failed")
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer theme="dark" />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-200">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">Sign In</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                value={form.email}
                autoComplete="off"
                onChange={handleChange}
                required
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                autoComplete="off"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-semibold transition duration-200"
            >
              Sign In
            </button>
          </form>

          <p className="text-sm text-center text-gray-500 mt-6">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-indigo-600 cursor-pointer hover:underline"
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
