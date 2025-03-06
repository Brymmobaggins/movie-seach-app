/** @format */

// import './App.css';
import React from "react";
import MovieModal from "./components/MovieModal";
import MovieSearch from "./components/MovieSearch";

function App() {
 
  return (
    <div className="">
      <div className="bg-blue-100">
        <img src="assests/img.jpg" alt="" />
        
      </div>

      <div className="">
        <h1>Movies Search Application</h1>

        <MovieSearch />
      </div>
    </div>
  );
}
export default App;
