# Movie Watchlist App

A React application for browsing a local collection of movies, filtering the catalog, and maintaining a watchlist during a session.

## Features

- Browse movies loaded from `public/movies.json`.
- Search movies by title.
- Filter the catalog by genre and rating category.
- Add or remove movies from a watchlist.
- Navigate between the catalog and watchlist pages with React Router.
- Reuse movie cards and shared header/footer components.

The watchlist is held in React component state and is not persisted across a page reload. The catalog is based on local JSON data; this project does not currently require a movie API.

## Technology stack

- React
- React Router
- Create React App / `react-scripts`
- JavaScript and CSS

## Run locally

### Prerequisites

- Node.js and npm

### Install and start

~~~bash
npm ci
npm start
~~~

The development server normally opens at `http://localhost:3000/`.

### Test and build

~~~bash
npm test
npm run build
~~~

## Project structure

~~~text
public/
├── images/               # Movie artwork
└── movies.json           # Local movie catalog
src/
├── component/
│   ├── Header.js
│   ├── Footer.js
│   ├── MovieCard.js
│   ├── MoviesGrid.js
│   └── Watchlist.js
├── App.js
├── App.css
└── styles.css
~~~

## Next improvements

- Persist the watchlist with local storage or a backend.
- Add empty/loading/error states for catalog data.
- Add automated tests for search, filtering, and watchlist interactions.
- Verify the current React and build-tool dependency combination with a clean install and production build before deployment.

## License

No license file is currently included. Add a license before inviting others to reuse or redistribute the project.
