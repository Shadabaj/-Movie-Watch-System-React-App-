import React, { useState } from "react";
import "../styles.css";
import MoviesCard from "./MovieCard";

export default function MoviesGrid({ movies, watchlist, toggleWatchlist }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [genre, setGenre] = useState("All Genres");
    const [rating, setRating] = useState("All");

    const matchesGenre = (movie, selectedGenre) =>
        selectedGenre === "All Genres" ||
        movie.genre.toLowerCase() === selectedGenre.toLowerCase();

    const matchesSearchTerm = (movie, term) =>
        movie.title.toLowerCase().includes(term.toLowerCase());

    const matchesRating = (movie, selectedRating) => {
        switch (selectedRating) {
            case "All":
                return true;
            case "Good":
                return movie.rating >= 8;
            case "Ok":
                return movie.rating >= 5 && movie.rating < 8;
            case "Bad":
                return movie.rating < 5;
            default:
                return false;
        }
    };

    const filteredMovies = movies.filter((movie) =>
        matchesGenre(movie, genre) &&
        matchesRating(movie, rating) &&
        matchesSearchTerm(movie, searchTerm)
    );

    return (
        <div>
            <input
                type="text"
                className="search-input"
                placeholder="Search movies"
                aria-label="Search movies"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
            />

            <div className="filter-bar">
                <div className="filter-slot">
                    <label htmlFor="genre-filter">Genre</label>
                    <select
                        id="genre-filter"
                        className="filter-dropdown"
                        value={genre}
                        onChange={(event) => setGenre(event.target.value)}
                    >
                        <option>All Genres</option>
                        <option>Action</option>
                        <option>Drama</option>
                        <option>Fantasy</option>
                        <option>Horror</option>
                    </select>
                </div>

                <div className="filter-slot">
                    <label htmlFor="rating-filter">Rating</label>
                    <select
                        id="rating-filter"
                        className="filter-dropdown"
                        value={rating}
                        onChange={(event) => setRating(event.target.value)}
                    >
                        <option>All</option>
                        <option>Good</option>
                        <option>Ok</option>
                        <option>Bad</option>
                    </select>
                </div>
            </div>

            <div className="movies-grid">
                {filteredMovies.map((movie) => (
                    <MoviesCard
                        key={movie.id}
                        movie={movie}
                        toggleWatchlist={toggleWatchlist}
                        watchlist={watchlist.includes(movie.id)}
                    />
                ))}
            </div>
        </div>
    );
}
