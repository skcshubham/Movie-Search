import React, { useState } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";

function SearchMovie() {
	// array destructuring
	const [query, setQuery] = useState("");
	const [movies, setMovies] = useState([]);

	const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`;

	const searchMovies = async (event) => {
		event.preventDefault();
		axios
			.get(url)
			.then((result) => {
				// console.log(result.data.results);
				setMovies(result.data.results);
				// console.log(movies);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<React.Fragment>
			<form className="form" onSubmit={searchMovies}>
				<label className="label" htmlFor="query">
					Movie Name
				</label>
				<input
					className="input"
					type="text"
					name="query"
					placeholder="i.e. Jurassic Park"
					value={query}
					onChange={(event) => {
						return setQuery(event.target.value);
					}}
				/>
				<button className="button" type="submit">
					Search
				</button>
			</form>
			<div className="card-list">
				{movies
					.filter((movie) => movie.poster_path)
					.map((movie) => (
						<MovieCard movie={movie} key={movie.id} />
					))}
			</div>
		</React.Fragment>
	);
}

export default SearchMovie;
