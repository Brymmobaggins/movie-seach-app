/** @format */


// import './App.css';
import React from "react";
import MovieModal from "./components/MovieModal";
import MovieSearch from "./components/MovieSearch";

function App() {
  return (
    <div className="bg-yellow-100">
      <h1>Movies Search Application</h1>
      <MovieModal />
      <MovieSearch />
    </div>
  );
}
export default App;
