"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const Feedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/getfeed");
            const receiveData = await res.json();
            if (receiveData.data) {
                // Sort feedbacks by timestamp in descending order (latest first)
                const sortedData = receiveData.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
                setFeedbacks(sortedData);
                toast.success("Feedback loaded successfully!");
            } else {
                toast.error("No feedback found!");
            }
        } catch (error) {
            console.error("Fetch error:", error);
            toast.error("Failed to fetch feedback!");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="p-6 max-w-7xl mx-auto mt-12">
            <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">📢 Feedback List</h1>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6 bg-white p-4 rounded-lg shadow-md">
                <input 
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="border p-2 rounded-md w-full"
                />
                <input 
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="border p-2 rounded-md w-full"
                />
                <button 
                    onClick={fetchData}
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    {loading ? "Fetching..." : "Search"}
                </button>
            </div>

            {/* Loading Skeleton */}
            {loading && (
                <div className="animate-pulse space-y-4">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="bg-gray-200 h-20 rounded-md"></div>
                    ))}
                </div>
            )}

            {/* Table UI */}
            {!loading && feedbacks.length === 0 ? (
                <p className="text-center text-gray-600">No feedback available.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="py-3 px-4 text-left">🔢 Sl No</th>
                                <th className="py-3 px-6 text-left">🏢 Property</th>
                                <th className="py-3 px-6 text-left">⭐ Rating</th>
                                <th className="py-3 px-6 text-left">📧 Email</th>
                                <th className="py-3 px-6 text-left">🛠 Assistance</th>
                                <th className="py-3 px-6 text-left">⏰ Timestamp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {feedbacks.map((feedback, index) => (
                                <tr 
                                    key={feedback._id} 
                                    className={`border-b ${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200 transition`}
                                >
                                    <td className="py-3 px-4 font-bold">{index + 1}</td>
                                    <td className="py-3 px-6">{feedback.property_name}</td>
                                    <td className="py-3 px-6">{feedback.rate_us} ⭐</td>
                                    <td className="py-3 px-6">{feedback.email}</td>
                                    <td className="py-3 px-6">{feedback.need_assistance}</td>
                                    <td className="py-3 px-6 text-gray-500 text-sm">
                                        {new Date(feedback.timestamp).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Feedback;
