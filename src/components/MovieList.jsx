/** @format */

import React from "react";
import MovieCard from "./MovieCard";

// MovieList component that takes in a list of movies as a prop
const MovieList = ({ movies }) => {
  // If there are no movies, display a message
  if (movies.length === 0) {
    return <p>No movies found. Try searching for something else.</p>;
  }

  // If there are movies, map through the list and render a MovieCard for each movie
  return (
    <div className="movie-list">
      {movies.map((movie) => (
        // Each MovieCard is given a unique key using the movie's imdbID
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
