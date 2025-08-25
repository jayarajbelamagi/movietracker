import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register({ setIsLoggedIn }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    setError("");

    // 1️⃣ Register user
    const res = await fetch("https://movietrackerbackend.onrender.com/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();

    if (!res.ok) return setError(data.message || "Registration failed");

    try {
      // 2️⃣ Auto-login after register
      const loginRes = await fetch("https://movietrackerbackend.onrender.com//api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include", // store session cookie
      });
      const loginData = await loginRes.json();

      if (!loginRes.ok) return setError(loginData.message || "Login failed after register");

      setIsLoggedIn(true);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Something went wrong during login");
    }
  };

  return (
    <div className="card">
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        placeholder="Username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
