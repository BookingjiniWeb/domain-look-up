"use client";
import React, { useEffect, useState } from "react";
// import { toast } from "react-hot-toast";
import { toast } from 'react-toastify'
import Image from "next/image";
const Feedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [startdate, setStartdate] = useState("2025-01-01"); // Jan 1, 2025
    const [enddate, setEnddate] = useState("2025-12-01"); // Dec 1, 2025
    const [length,setLength] = useState(0)

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 13;

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/datefetch?sdate=${startdate}&edate=${enddate}`);
            const receiveData = await res.json();
            if (receiveData.data) {
                const sortedData = receiveData.data
                setFeedbacks(sortedData);
                setLength(sortedData.length)
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

    // Pagination Logic
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentFeedbacks = feedbacks.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(feedbacks.length / itemsPerPage);

    return (
        <div className="p-6 max-w-[88rem] mx-auto mt-16">
            <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">📢 Feedback List</h1>


            {/* Filters Section */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Left Side: Date Filters + Search Button */}
                    <div className="flex flex-col md:flex-row items-center gap-6 w-full md:w-auto max-w-5xl">
                        <div className="flex flex-col lg:flex-row items-center gap-3">
                            <label className="text-gray-700 font-medium lg:w-28">From Date 📅</label>
                            <input
                                type="date"
                                value={startdate}
                                onChange={(e) => setStartdate(e.target.value)}
                                className="border p-2 rounded-md w-60 focus:ring-2 focus:ring-blue-400 outline-none"
                            />
                        </div>

                        <div className="flex flex-col lg:flex-row items-center gap-3">
                            <label className="text-gray-700 font-medium w-24">To Date 📅</label>
                            <input
                                type="date"
                                value={enddate}
                                onChange={(e) => setEnddate(e.target.value)}
                                className="border p-2 rounded-md w-60 focus:ring-2 focus:ring-blue-400 outline-none"
                            />
                        </div>

                        <button
                            onClick={fetchData}
                            disabled={loading}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition whitespace-nowrap shadow-md"
                        >
                            {loading ? "Fetching..." : "🔍 Search"}
                        </button>
                    </div>
                    <div><p>Total: {length}</p></div>

                    {/* Right Side: Refresh DB Button */}
                    <button
                        onClick={fetchData} // Replace with actual DB refresh function if needed
                        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition whitespace-nowrap shadow-md"
                    >
                        🔄 Refresh DB
                    </button>
                </div>
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
                    <div className="flex flex-col items-center justify-center  bg-gray-100 rounded-lg shadow-md pb-5 pt-5">
                    <Image
                        src='/nodata.png'
                        alt="No feedback"
                        className=" h-80  animate-none" // Small bounce animation for effect
                        width={400}
                        height={400}
                    />
                    <h2 className="text-xl font-semibold text-gray-700">Oops! No feedback available.</h2>
                    <p className="text-gray-500 text-center mt-2">
                        No feedback found for the selected date range. Try choosing a different date.
                    </p>
                    <button
                        onClick={() => { setStartdate("2025-01-01"); setEnddate("2025-12-31"); fetchData(); }}
                        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition shadow-md"
                    >
                        Reset Date & Search Again 🔄
                    </button>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-blue-800 text-white">
                            <tr>
                                <th className="py-3 px-4 text-left">🔢 Sl No</th>
                                <th className="py-3 px-6 text-left">🏢 Property</th>
                                <th className="py-3 px-6 text-left">⭐ Rating</th>
                                <th className="py-3 px-6 text-left">📧 Email</th>
                                <th className="py-3 px-6 text-left">🛠 Assistance</th>
                                <th className="py-3 px-6 text-left">⏰ Timestamp</th>
                                <th className="py-3 px-6 text-left">🔗 Connect</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentFeedbacks.map((feedback, index) => (
                                <tr
                                    key={feedback._id}
                                    className={`border-b ${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200 transition`}
                                >
                                    <td className="py-3 px-4 font-bold">{firstIndex + index + 1}</td>
                                    <td className="py-3 px-6">{feedback.property_name}</td>
                                    <td className="py-3 px-6">{feedback.rate_us} ⭐</td>
                                    <td className="py-3 px-6">{feedback.email}</td>
                                    <td className="py-3 px-6">{feedback.need_assistance}</td>
                                    <td className="py-3 px-6 text-gray-500 text-sm">
                                        {new Date(feedback.timestamp).toLocaleString()}
                                    </td>
                                    <td className="py-3 px-6">
                                        <button
                                            onClick={() => handleConnect(feedback.email)} // Replace with actual function
                                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-md"
                                        >
                                            Connect 
                                        </button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Pagination Section */}
            {!loading && feedbacks.length > 0 && (
                <div className="flex justify-center mt-6 space-x-2">
                    {/* Previous Button */}
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-lg bg-gray-300 text-gray-700 hover:bg-gray-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        ◀ Prev
                    </button>

                    {/* Page Numbers */}
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`px-4 py-2 rounded-lg transition ${currentPage === index + 1
                                    ? "bg-blue-600 text-white font-semibold shadow-md"
                                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                                }`}
                        >
                            {index + 1}
                        </button>
                    ))}

                    {/* Next Button */}
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 rounded-lg bg-gray-300 text-gray-700 hover:bg-gray-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next ▶
                    </button>
                </div>
            )}

        </div>
    );
};

export default Feedback;
