/** @format */

import React, { useEffect, useState } from "react";
import "./MovieModal.css"; // Import styles for modal

const MovieModal = ({ movieId, onClose }) => {
  const [movie, setMovie] = useState(null); // State to store movie details
  const [loading, setLoading] = useState(false); // State to manage loading state
  const [error, setError] = useState(""); // State to store error message

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true); // Set loading to true before fetching data
      setError(""); // Clear any previous errors
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${
            import.meta.env.VITE_OMDB_API_KEY
          }&i=${movieId}`
        );
        const data = await response.json();
        if (data.Response === "True") {
          setMovie(data); // Set movie data if response is successful
        } else {
          setError(data.Error); // Set error message if response is unsuccessful
        }
      } catch {
        setError("Failed to fetch movie details"); // Set error message if fetch fails
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    if (movieId) {
      fetchMovieDetails(); // Fetch movie details if movieId is provided
    }
  }, [movieId]); // Dependency array to re-run effect when movieId changes

  if (!movieId) return null; // Return null if no movieId is provided

  return (
    <div className="modal-overlay fade-in" onClick={onClose}>
      <div
        className="modal-content slide-up"
        onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside content
      >
        <button className="close-button" onClick={onClose}>
          &times; {/* Close button */}
        </button>
        {loading && <p>Loading...</p>} {/* Show loading message */}
        {error && <p className="error">{error}</p>} {/* Show error message */}
        {movie && (
          <div>
            <h2>
              {movie.Title} ({movie.Year}) {/* Show movie title and year */}
            </h2>
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "placeholder.jpg"}
              alt={movie.Title} // Show movie poster or placeholder if not available
            />
            <p>
              <strong>Genre:</strong> {movie.Genre} {/* Show movie genre */}
            </p>
            <p>
              <strong>Plot:</strong> {movie.Plot} {/* Show movie plot */}
            </p>
            <p>
              <strong>Director:</strong> {movie.Director} {/* Show movie director */}
            </p>
            <p>
              <strong>Actors:</strong> {movie.Actors} {/* Show movie actors */}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieModal;
