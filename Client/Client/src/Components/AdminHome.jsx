import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../Navbar/AdminNavbar";

function AdminHome() {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [totalUsers, setTotalUsers] = useState(0);
  const [sentimentData, setSentimentData] = useState({
    positive: 0,
    neutral: 0,
    negative: 0,
    totalFeedbacks: 0,
    overall: "Neutral",
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/user/count`)
      .then(res => setTotalUsers(res.data.totalUsers))
      .catch(err => console.error("Users API Error:", err));

    axios
      .get(`${API_BASE_URL}/api/feedback/summary`)
      .then(res => setSentimentData(res.data))
      .catch(err => console.error("Feedback Summary API Error:", err));
  }, []);

  const handleUsersClick = () => navigate("/UserTable");
  const handleFeedbackClick = () => console.log("Feedback card clicked");

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case "Positive": return "bg-green-200 text-green-800";
      case "Neutral": return "bg-yellow-200 text-yellow-800";
      case "Negative": return "bg-red-200 text-red-800";
      default: return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <>
    <AdminNavbar/>
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-700">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          className="bg-white shadow-md rounded-xl p-6 cursor-pointer hover:shadow-lg transition"
          onClick={handleUsersClick}
        >
          <h2 className="text-xl font-semibold mb-2">Total Users</h2>
          <p className="text-4xl font-bold">{totalUsers}</p>
        </div>

        <div
          className="bg-white shadow-md rounded-xl p-6 cursor-pointer hover:shadow-lg transition"
          onClick={handleFeedbackClick}
        >
          <h2 className="text-xl font-semibold mb-4">Overall Feedback Sentiment</h2>

          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600 font-medium">Positive:</span>
            <span className="text-green-700 font-bold">{sentimentData.positive}</span>
          </div>

          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600 font-medium">Neutral:</span>
            <span className="text-yellow-700 font-bold">{sentimentData.neutral}</span>
          </div>

          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600 font-medium">Negative:</span>
            <span className="text-red-700 font-bold">{sentimentData.negative}</span>
          </div>

          <div className="mt-4 flex justify-between items-center">
            <span className="text-gray-500 text-sm">Total Feedbacks:</span>
            <span className="text-gray-700 font-semibold">{sentimentData.totalFeedbacks}</span>
          </div>

          <div className={`mt-4 inline-block px-3 py-1 rounded-full font-medium ${getSentimentColor(sentimentData.overall)}`}>
            Overall: {sentimentData.overall}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default AdminHome;
