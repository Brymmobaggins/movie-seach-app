/** @format */

import React from "react";

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      {/* Display the movie poster */}
      <img src={movie.Poster} alt={movie.Title} />
      {/* Display the movie title and release year */}
      <h3>
        {movie.Title} ({movie.Year})
      </h3>
    </div>
  );
};

export default MovieCard;
