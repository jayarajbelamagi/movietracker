import React, { useEffect, useState } from "react";
import MovieForm from "../components/MovieForm";


function Dashboard({ username }) {
  const [movies, setMovies] = useState([]);
  const [stats, setStats] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchMovies = async () => {
    try {
      const res = await fetch("https://movietrackerbackend-1.onrender.com/api/movies", {
        credentials: "include",
      });
      const data = await res.json();
      setMovies(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching movies:", err);
      setMovies([]);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch("https://movietrackerbackend-1.onrender.com/api/movies/stats", {
        credentials: "include",
      });
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error("Error fetching stats:", err);
      setStats(null);
    }
  };

  useEffect(() => {
    fetchMovies();
    fetchStats();
  }, []);

  return (
    <div className="dashboard">
      <h2>Welcome, {username} 🎉</h2>

      <div className="dashboard-content">
        {/* Stats on left */}
        <div className="stats">
          <h3>📊 Your Stats</h3>
          {stats ? (
            <>
              <p>Total Movies: {stats.total}</p>
              <h4>By Month</h4>
              <ul>
                {Object.entries(stats.perMonth).map(([month, count]) => (
                  <li key={month}>{month}: {count}</li>
                ))}
              </ul>
              <h4>By Year</h4>
              <ul>
                {Object.entries(stats.perYear).map(([year, count]) => (
                  <li key={year}>{year}: {count}</li>
                ))}
              </ul>
            </>
          ) : <p>Loading stats...</p>}
        </div>

        {/* Movies list center */}
        <div className="movie-list">
          {movies.map((m, i) => (
            <div className="movie-card" key={i}>
              <h3>{m.title}</h3>
              <p>🎭 {m.genre || "Unknown Genre"}</p>
              <p>⭐ Rating: {m.myRating ?? "N/A"}</p>
              <p>Watched on: {new Date(m.createdAt).toDateString()}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Add movie button */}
      <div className="add-movie-btn">
        <button onClick={() => setShowForm(true)}>➕ Add Movie</button>
      </div>

      {/* Modal */}
      {showForm && (
        <MovieForm
          fetchMovies={() => {
            fetchMovies();
            fetchStats();
          }}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

export default Dashboard;
