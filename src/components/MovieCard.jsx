/** @format */

import React from "react";

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img src={movie.Poster} alt={movie.Title} />
      <h3>
        {movie.Title} ({movie.Year})
      </h3>
    </div>
  );
};

export default MovieCard;
