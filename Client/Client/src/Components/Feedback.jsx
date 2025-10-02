import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Navbar/Navbar";

export default function FeedbackForm() {
  const [form, setForm] = useState({
    rating: 1,
    comment: "",
  });

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Please log in first."); 
      return;
    }

    try {
      await axios.post(
        "http://localhost:9000/api/feedback/createfeedback",
        { ...form }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Feedback submitted successfully!"); 
      setForm({ rating: 1, comment: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Feedback submission failed"); // ✅ toast
    }
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 to-blue-200">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          Submit Feedback
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Rating (1 - 5)
            </label>
            <select
              name="rating"
              value={form.rating}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Comment
            </label>
            <textarea
              name="comment"
              placeholder="Write your feedback..."
              value={form.comment}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              rows="4"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-semibold transition duration-200"
          >
            Submit Feedback
          </button>
        </form>
      </div>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
    </>
  );
}
