import React, { useState} from "react";
import '../styles.css';
import MoviesCard from "./MovieCard";

export default function MoviesGrid({movies, watchlist,toggleWatchlist}) {

    const [searchTerm, setSearchTerm] = useState("");
    const [genre, setGenre] = useState("All Generes");
    const [rating, setRating] = useState("All");
    //const age=27;
  

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const handleGenreChange = (e) => {
        setGenre(e.target.value);
    }

    const handleRatingChange = (e) => {
        setRating(e.target.value);
    }

    const matchesGenre = (movie, genre) => {
        return genre === 'All Generes' || movie.genre.toLowerCase() === genre.toLowerCase();
    }

    const matchesSearchTerm = (movie, searchTerm) => {
        return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    }


    const matchesRating = (movie, rating) => {

        switch (rating) {
            case 'All':
                return true;
               
            case 'Good':
                return movie.rating >= 8;
                break
            case 'Ok':
                return movie.rating >= 5 && movie.rating < 8;
               
            case 'Bad':
                return movie.rating < 5;
               
            default:
                return false;
               
        }

    }

    const filteredMovies = movies.filter((movie) =>
        //movie.title.toLowerCase().includes(searchTerm.toLowerCase())
        matchesGenre(movie, genre) 
        && matchesRating(movie,rating)
        && matchesSearchTerm(movie, searchTerm)
    );
    return (
        <div>
            <input type="text"
                className="search-input"
                placeholder="Seach Movies"
                value={searchTerm}
                onChange={handleSearchChange} />

            <div className="filter-bar">
                <div className="filter-slot">
                    <label>Genere</label>
                    <select className="filter-dropdown" value={genre} onChange={handleGenreChange}>
                        <option>All Genres</option>
                        <option>Action</option>
                        <option>Drama</option>
                        <option>Fantasy</option>
                        <option>Horror</option>
                    </select>
                </div>

                <div className="filter-slot" value={rating} onChange={handleRatingChange}>
                    <label>Rating</label>
                    <select className="filter-dropdown">
                        <option>All</option>
                        <option>Good</option>
                        <option>Ok</option>
                        <option>Bad</option>
                    </select>
                </div>
            </div>

            <div className="movies-grid">
                {
                    filteredMovies.map(movie => (
                        <MoviesCard 
                         key={movie.id} 
                        movie={movie} 
                        toggleWatchlist={toggleWatchlist}
                        isWatchlisted={movies.includes(movie.id)}>
                        </MoviesCard>
                    ))
                }
            </div>
        </div>


    );

}