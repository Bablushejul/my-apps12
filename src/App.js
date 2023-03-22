import React,{useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
 const [movies,setMovies]=useState([]);
  function fetchMovieHandler(){
    fetch('https://swapi.dev/api/films/').then((response)=>{
return response.json();

    }).then((data)=>{
      const transFormedMovies =data.results.map(moviedata=>{
        return{
        id:moviedata.episode_id,
        title:moviedata.title,
        opening_text:moviedata.opening_crawl,
        release_date:moviedata.release_date
        }

      })
setMovies(transFormedMovies)
    });
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;