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
    <div style={{ padding: "20px" }}>
      <h1>Team Goals Dashboard</h1>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #ccc" }}>
            <th style={{ textAlign: "left", padding: "10px" }}>Name</th>
            <th style={{ textAlign: "left", padding: "10px" }}>Email</th>
            <th style={{ textAlign: "left", padding: "10px" }}>Goal</th>
            <th style={{ textAlign: "left", padding: "10px" }}>Submitted At</th>
          </tr>
        </thead>
        <tbody>
          {goals.map((g) => (
            <tr key={g._id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "10px" }}>{g.name}</td>
              <td style={{ padding: "10px" }}>{g._id}</td>
              <td style={{ padding: "10px" }}>{g.goal}</td>
              <td style={{ padding: "10px" }}>
                {new Date(g.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
