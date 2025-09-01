'use client';

import { useState } from "react";

export default function AcceptForm({ token, name, email }) {
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/savegoal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, name, email, goal }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess("Goal saved successfully!");
        setGoal("");
      } else {
        setSuccess(`Error: ${data.error}`);
      }
    } catch (err) {
      setSuccess("Error saving goal");
    } finally {
      setLoading(false);
    }
  };

return (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f5f5f5",
      fontFamily: "'Poppins', sans-serif",
      padding: "20px",
      position: "relative",
    }}
  >
    {/* Floating Dashboard Button */}
    <a
      href="/dashboard" // Replace with your dashboard route
      style={{
        position: "fixed", // stays in place when scrolling
        top: "50%", // center vertically
        right: "20px",
        transform: "translateY(-50%)",
        padding: "12px 18px",
        backgroundColor: "#28a745",
        color: "#fff",
        borderRadius: "50px",
        textDecoration: "none",
        fontWeight: 600,
        fontSize: "14px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
        transition: "all 0.3s ease",
        zIndex: 1000,
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = "#218838";
        e.currentTarget.style.transform = "translateY(-50%) scale(1.05)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = "#28a745";
        e.currentTarget.style.transform = "translateY(-50%) scale(1)";
      }}
    >
      Check Others Goals
    </a>

    {/* Form Container */}
    <div
      style={{
        width: "100%",
        maxWidth: "450px",
        padding: "40px",
        borderRadius: "15px",
        boxShadow: "0 12px 25px rgba(0,0,0,0.15)",
        backgroundColor: "#fff",
        textAlign: "center",
        position: "relative",
      }}
    >
      <h2 style={{ marginBottom: "25px", color: "#000", fontWeight: 700 }}>
        Accept Your Goal
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          readOnly
          style={{
            width: "100%",
            padding: "12px 15px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px",
            color: "#000",
          }}
        />
        <input
          type="email"
          value={email}
          readOnly
          style={{
            width: "100%",
            padding: "12px 15px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px",
            color: "#000",
          }}
        />
        <textarea
          placeholder="Enter your goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 15px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px",
            minHeight: "120px",
            resize: "vertical",
            color: "#000",
          }}
          required
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px 0",
            borderRadius: "50px",
            border: "none",
            backgroundColor: "#2490EB",
            color: "#fff",
            fontSize: "16px",
            fontWeight: 600,
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#1c6ac9")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#2490EB")}
        >
          {loading ? "Saving..." : "Submit Goal"}
        </button>
      </form>

      {success && (
        <p
          style={{
            marginTop: "20px",
            color: "#000",
            fontWeight: 500,
            backgroundColor: "#d4edda",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          {success}
        </p>
      )}
    </div>
  </div>
);



}
