import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MovieList.css";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [stats, setStats] = useState({});

  const fetchMovies = async () => {
    try {
  const res = await axios.get("http://localhost:5000/api/movies", { withCredentials: true });
      setMovies(res.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const fetchStats = async () => {
    try {
  const res = await axios.get("http://localhost:5000/api/movies/stats", { withCredentials: true });
      setStats(res.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
    fetchStats();
  }, []);

  return (
    <div className="movie-list">
      <h2>My Watched Movies 🍿</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie._id}>
            <strong>{movie.title}</strong> - Watched on {new Date(movie.watchedAt).toDateString()}
          </li>
        ))}
      </ul>

      <div className="stats">
        <h3>📊 Stats</h3>
        <p>Total Movies: {stats.total}</p>
        <p>This Month: {stats.month}</p>
        <p>This Year: {stats.year}</p>
      </div>
    </div>
  );
};

export default MovieList;
