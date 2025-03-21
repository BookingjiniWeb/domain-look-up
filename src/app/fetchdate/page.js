"use client";
import React, { useEffect, useState } from "react";

const Feedback = () => {
    const [feedbacks, setFeedbacks] = useState([]); // State to store feedback data
    const [loading, setLoading] = useState(true); // State for loading indicator
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const fetchData = async () => {
        try {
            const res = await fetch("/api/getfeed", { method: "GET" });
            const receiveData = await res.json(); // Convert response to JSON
            if (receiveData.data) {
                setFeedbacks(receiveData.data); // Store fetched data in state
            }
            setLoading(false);
        } catch (error) {
            console.error("Fetch error:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []); // Run only once when component mounts

    return (
        <div>
            <h1>Feedback List</h1>


            <div>
                <label>From Date:</label>
                <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />

                <label>To Date:</label>
                <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />

                <button onClick={fetchData} disabled={loading}>
                    {loading ? "Fetching..." : "Search"}
                </button>
            </div>




            {loading ? (
                <p>Loading...</p>
            ) : feedbacks.length === 0 ? (
                <p>No feedback available.</p>
            ) : (
                <ul>
                    {feedbacks.map((feedback) => (
                        <li key={feedback._id}>
                            <strong>{feedback.property_name}</strong> - {feedback.rate_us} ⭐
                            <br />
                            <small>Email: {feedback.email} | Assistance: {feedback.need_assistance}</small> | Time:{feedback.timestamp}
                            <hr />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Feedback;
