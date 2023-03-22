import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);

  const [isLoading, setIsloading] = useState(false);

  async function fetchMovieHandler() {
    setIsloading(true);
    const response = await fetch("https://swapi.dev/api/films/");

    const data = await response.json();

    const transFormedMovies = data.results.map((moviedata) => {
      return {
        id: moviedata.episode_id,
        title: moviedata.title,
        openingText: moviedata.opening_crawl,
        release_date: moviedata.release_date,
      };
    });
    setMovies(transFormedMovies);
    setIsloading(false)
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && <MoviesList movies={movies} />}
        {!isLoading && movies.length===0 && <p>No Found Movies.</p>}
        {isLoading && <p>Loading.....</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
