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
    <div style={{ maxWidth: "500px", margin: "50px auto", textAlign: "center" }}>
      <h2>Accept Your Goal</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} readOnly style={{ width: "100%", padding: "10px", marginBottom: "10px" }} />
        <input type="email" value={email} readOnly style={{ width: "100%", padding: "10px", marginBottom: "10px" }} />
        <textarea
          placeholder="Enter your goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          required
        />
        <button type="submit" disabled={loading} style={{ padding: "10px 20px" }}>
          {loading ? "Saving..." : "Submit Goal"}
        </button>
      </form>
      {success && <p>{success}</p>}
    </div>
  );
}
