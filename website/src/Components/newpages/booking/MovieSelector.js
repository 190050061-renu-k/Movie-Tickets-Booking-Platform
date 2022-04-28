import React, { useContext } from "react"
import MovieContext from "./MovieContext"
import "./styles/Seat.css"

const Header = () => {

	const { movies } = useContext(MovieContext)
	const movieData = useContext(MovieContext)

	const GenerateOptions = () => {
		const moviesObject = movies.movieNames
		return Object.keys(moviesObject).map((movie, key) => {
			return <option value={movie} key={key}>{movie} - ${moviesObject[movie]}</option>
		})
	}

	const movieSwitchHandler = (e) => {
		const newMoviePrice = movies.movieNames[e.target.value]
		movieData.changeState({...movies, moviePrice: newMoviePrice})
	}

	return (
		<div className="container" style={{ textAlign: "center" }}>
			<h3>
				{GenerateOptions()}
			</h3>
		</div>
	)
}

export default Header
