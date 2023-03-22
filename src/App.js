import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);

  const [isLoading, setIsloading] = useState(false);

  const [error, setError] = useState(null);

  async function fetchMovieHandler() {
    setIsloading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/films/");

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

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
    } catch (error) {
      setError(error.message);
    }
    setIsloading(false);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>No Found Movies.</p>}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>Loading.....</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
