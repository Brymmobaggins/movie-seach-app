/** @format */

import React, { useState, useEffect, useCallback } from "react";
import MovieList from "./MovieList";
import "./MovieSearch.css"; // Import CSS for styling
import "./MovieModal.css";

const MovieSearch = () => {
  const [query, setQuery] = useState(""); // State to store the search query
  const [movies, setMovies] = useState([]); // State to store the list of movies
  const [loading, setLoading] = useState(false); // State to indicate loading status
  const [error, setError] = useState(""); // State to store any error messages

  // Function to fetch movies from the API
  const fetchMovies = useCallback(async () => {
    if (!query) return; // If query is empty, do nothing
    setLoading(true); // Set loading to true before fetching data
    setError(""); // Clear any previous errors

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${
          import.meta.env.VITE_OMDB_API_KEY
        }&s=${query}`
      );
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search); // Set movies if the response is successful
      } else {
        setError(data.Error); // Set error message if the response is unsuccessful
        setMovies([]); // Clear movies list
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch data"); // Set error message if there is a network error
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  }, [query]);

  // Effect to handle debouncing of the search query
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query) fetchMovies(); // Fetch movies if query is not empty
    }, 500); // Debounce to prevent excessive API calls

    return () => clearTimeout(delayDebounce); // Clear timeout on cleanup
  }, [query, fetchMovies]);

  // Handle Enter key press to trigger search
  const handleKeyDown = (e) => {
    if (e.key === "Enter") fetchMovies();
  };

  return (
    <div>
      <div className="">
        <img src="" alt="" />
      </div>
      <div className="movie-search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)} // Update query state on input change
          onKeyDown={handleKeyDown} // Trigger search on Enter key press
        />

        {loading && <p className="loading">Loading...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && movies.length === 0 && query && (
          <p className="no-results">No movies found</p> // Show no results message
        )}

        <MovieList movies={movies} />
      </div>
    </div>
  );
};

export default MovieSearch;
