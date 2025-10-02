import React, { useEffect, useState } from "react";
import axios from "axios";

function UsersTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9000/api/feedback/getall") 
      .then((res) => {
        const grouped = {};
        res.data.forEach((f) => {
          const userId = f.userId._id;
          if (!grouped[userId]) {
            grouped[userId] = {
              name: f.userId.name,
              email: f.userId.email,
              feedbacks: [],
            };
          }
          grouped[userId].feedbacks.push({
            comment: f.comment,
            rating: f.rating,
            sentiment: f.sentiment,
          });
        });

        setUsers(Object.values(grouped));
      })
      .catch((err) => console.error(err));
  }, []);

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case "Positive":
        return "bg-green-200 text-green-800";
      case "Negative":
        return "bg-red-200 text-red-800";
      case "Neutral":
        return "bg-yellow-200 text-yellow-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-700">Users & Feedback</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-4 px-6 text-left text-gray-600 uppercase tracking-wider">Name</th>
              <th className="py-4 px-6 text-left text-gray-600 uppercase tracking-wider">Email</th>
              <th className="py-4 px-6 text-left text-gray-600 uppercase tracking-wider">Feedbacks</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition">
                <td className="py-4 px-6 font-medium text-gray-700">{user.name}</td>
                <td className="py-4 px-6 text-gray-500">{user.email}</td>
                <td className="py-4 px-6">
                  <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
                    {user.feedbacks.map((f, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-lg border border-gray-200 shadow-sm hover:shadow-md bg-white"
                      >
                        <p className="text-gray-700"><strong>Comment:</strong> {f.comment}</p>
                        <p className="text-gray-600"><strong>Rating:</strong> {f.rating}</p>
                        <span
                          className={`inline-block mt-1 px-2 py-0.5 rounded-full text-sm font-medium ${getSentimentColor(f.sentiment)}`}
                        >
                          {f.sentiment}
                        </span>
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsersTable;
