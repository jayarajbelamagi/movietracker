import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function Landing() {
  return (
    <div className="landing-page card">
      <h2>Welcome to Movie Tracker</h2>
      <p>Track your watched movies and stats!</p>
      <div className="landing-btns">
        <Link to="/login"><button>Login</button></Link>
        <Link to="/register"><button>Signup</button></Link>
      </div>
    </div>
  );
}

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const location = useLocation();

  const handleLogout = () => {
    fetch("https://movietrackerbackend-1.onrender.com/api/users/logout", {
      method: "POST",
      credentials: "include",
    }).then(() => setIsLoggedIn(false));
  };

  return (
    <nav className="navbar dark-navbar">
      <h1>🎬 Movie Tracker</h1>
      <div>
        {!isLoggedIn ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Signup</Link>
          </>
        ) : (
          <>
            {location.pathname !== "/dashboard" && <Link to="/dashboard">Dashboard</Link>}
            <Link to="/add-movie">Add Movie</Link>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch("https://movietrackerbackend-1.onrender.com/api/users/me", { credentials: "include" })
      .then(res => setIsLoggedIn(res.ok))
      .catch(() => setIsLoggedIn(false));
  }, []);

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className="container dark-container">
        <Routes>
          <Route path="/" element={!isLoggedIn ? <Landing /> : <Navigate to="/dashboard" />} />
          <Route path="/login" element={!isLoggedIn ? <Login setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={!isLoggedIn ? <Register setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />} />
          <Route path="/add-movie" element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </>
  );
}

export default function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}
