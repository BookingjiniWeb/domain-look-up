'use client';

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGoals() {
      try {
        const res = await fetch("/api/getgoals");
        const data = await res.json();
        setGoals(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchGoals();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (goals.length === 0) return <p>No goals submitted yet.</p>;

return (
  <div
    style={{
      minHeight: "100vh",
      padding: "80px 20px",
      fontFamily: "'Poppins', sans-serif",
      backgroundColor: "#f0f4f8",
      color: "#333",
      position: "relative",
    }}
  >
    {/* Sticky Left Button */}
    <div
      style={{
        position: "fixed",
        top: "90%",
        left: "20px",
        transform: "translateY(-50%)",
        zIndex: 1000,
      }}
    >
      <button
        style={{
          padding: "12px 20px",
          backgroundColor: "#2490EB",
          color: "#fff",
          fontWeight: 600,
          borderRadius: "8px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
          cursor: "pointer",
          transition: "all 0.3s",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#1c6fd1";
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#2490EB";
          e.currentTarget.style.transform = "translateY(0)";
        }}
        onClick={() => {
          window.location.href = "/domain-lookup";
        }}
      >
        Manage my domain
      </button>
    </div>

    {/* Table Container */}
    <div
      style={{
        overflowX: "auto",
        borderRadius: "12px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#2490EB", color: "#fff" }}>
            <th style={{ textAlign: "left", padding: "15px" }}>Name</th>
            <th style={{ textAlign: "left", padding: "15px" }}>Email</th>
            <th style={{ textAlign: "left", padding: "15px" }}>Goal</th>
            <th style={{ textAlign: "left", padding: "15px" }}>Submitted At</th>
          </tr>
        </thead>
        <tbody>
          {goals.map((g, idx) => (
            <tr
              key={g._id}
              style={{
                backgroundColor: idx % 2 === 0 ? "#f9f9f9" : "#fff",
                transition: "0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#e0f0ff")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor =
                  idx % 2 === 0 ? "#f9f9f9" : "#fff")
              }
            >
              <td style={{ padding: "12px 15px", fontWeight: 500 }}>{g.name}</td>
              <td style={{ padding: "12px 15px" }}>{g._id}</td>
              <td style={{ padding: "12px 15px" }}>{g.goal}</td>
              <td style={{ padding: "12px 15px" }}>
                {new Date(g.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

}
