import logo from './logo.svg';
import './App.css';
import './styles.css';
import Header from './component/Header';
import Footer from './component/Footer';
import MoviesGrid from './component/MoviesGrid';
import Watchlist from './component/Watchlist';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";
function App() {

  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    // const m = ["a", "b", "c"];
    // setMovies(m);
    fetch("movies.json")
      .then(response => response.json())
      .then(data => setMovies(data))
  }, []);

  const toggleWatchlist = (movieid) => {
    setWatchlist((prev) => prev.includes(movieid) ?
      prev.filter((id) => id !== movieid) : [...prev, movieid]);
  };

  return (
    <div className="App">

      <div className='container'>
        <Header></Header>

        <Router>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/watchlist">WatchList</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<MoviesGrid watchlist={watchlist} movies={movies} toggleWatchlist={toggleWatchlist} />}></Route>
            <Route path="/watchlist" element={<Watchlist watchlist={watchlist} movies={movies} toggleWatchlist={toggleWatchlist} />}></Route>
          </Routes>
        </Router>

      </div>

      <Footer></Footer>
      {/* <footer className="footer">
<p className='footer'>
  footer Content Here
</p>
      </footer> */}
    </div>
  );
}

export default App;
