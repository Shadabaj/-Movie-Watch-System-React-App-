import { fireEvent, render, screen } from "@testing-library/react";
import MoviesGrid from "./MoviesGrid";

const movies = [
  { id: 1, title: "Sky Warriors", genre: "Action", rating: 8.5, image: "1.jpg" },
  { id: 2, title: "Quiet Drama", genre: "Drama", rating: 6.2, image: "2.jpg" },
  { id: 3, title: "Night Terror", genre: "Horror", rating: 4.0, image: "3.jpg" }
];

function renderGrid(watchlist = []) {
  const toggleWatchlist = jest.fn();
  render(<MoviesGrid movies={movies} watchlist={watchlist} toggleWatchlist={toggleWatchlist} />);
  return { toggleWatchlist };
}

test("searches the movie catalog by title", () => {
  renderGrid();
  fireEvent.change(screen.getByRole("textbox", { name: /search movies/i }), { target: { value: "Quiet" } });

  expect(screen.getByText("Quiet Drama")).toBeInTheDocument();
  expect(screen.queryByText("Sky Warriors")).not.toBeInTheDocument();
});

test("filters the catalog by genre", () => {
  renderGrid();
  fireEvent.change(screen.getByLabelText("Genre"), { target: { value: "Drama" } });

  expect(screen.getByText("Quiet Drama")).toBeInTheDocument();
  expect(screen.queryByText("Sky Warriors")).not.toBeInTheDocument();
});

test("filters the catalog by rating category", () => {
  renderGrid();
  fireEvent.change(screen.getByLabelText("Rating"), { target: { value: "Good" } });

  expect(screen.getByText("Sky Warriors")).toBeInTheDocument();
  expect(screen.queryByText("Quiet Drama")).not.toBeInTheDocument();
});

test("shows watchlist state and toggles the correct movie", () => {
  const { toggleWatchlist } = renderGrid([1]);
  const checkbox = screen.getByRole("checkbox", { name: /in watchlist/i });

  expect(checkbox).toBeChecked();
  fireEvent.click(checkbox);
  expect(toggleWatchlist).toHaveBeenCalledWith(1);
});
