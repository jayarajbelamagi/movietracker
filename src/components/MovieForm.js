import React, { useState } from "react";
import axios from "axios";
import "./MovieForm.css";

const MovieForm = ({ fetchMovies, onClose }) => {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [myRating, setMyRating] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return setError("Please enter a movie title!");

    try {
      await axios.post(
        "https://movietrackerbackend-1.onrender.com/api/movies/add",
        { title, genre, myRating },
        { withCredentials: true }
      );

      // reset fields
      setTitle("");
      setGenre("");
      setMyRating("");
      setError("");

      // refresh movies & stats
      fetchMovies();

      // close modal
      onClose();
    } catch (err) {
      console.error("❌ Error adding movie:", err);
      setError(err.response?.data?.message || "Failed to add movie");
    }
  };

  // Close modal if clicked outside the form
  const handleBackdropClick = (e) => {
    if (e.target.className === "modal-backdrop") {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="movie-form-modal">
        <h2>Add a Movie 🎥</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Movie Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
          <input
            type="number"
            placeholder="Your Rating (0-10)"
            value={myRating}
            onChange={(e) => setMyRating(e.target.value)}
            min="0"
            max="10"
          />
          <div className="form-buttons">
            <button type="submit">Add Movie</button>
            <button
              type="button"
              onClick={() => {
                setTitle("");
                setGenre("");
                setMyRating("");
                setError("");
                onClose();
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MovieForm;
