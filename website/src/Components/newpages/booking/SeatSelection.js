import React, {useState} from "react"
import "./styles/newseat.css"

import MovieSelector from "./MovieSelector"
import SeatAvailability from "./SeatAvailability"
import SeatMatrix from "./SeatMatrix"
import PriceCalculator from "./PriceCalculator"

import MovieContext from './MovieContext'
import { Button } from "reactstrap"
import { Link } from "react-router-dom"

const SeatSelection = () => {

	const [movies, EditMovies] = useState({
		movieNames: {
			"Bloodshot": 10,
			
		},
		moviePrice: 10,
		totalSeats: 0,
		seatNumbers: [],
		occupied: [1,2,3,15, 18],

	})

	return (
		<>
		<div className="main container">
			<MovieContext.Provider value={{ movies, changeState: EditMovies }}>
				<MovieSelector />
				<SeatMatrix occupied = {movies.occupied}/>
				<SeatAvailability />
				<PriceCalculator />
			</MovieContext.Provider>
			<Link style={{textDecoration:"none"}}>
				<Button className="btn-dark">
					Proceed to Payment
				</Button>
			</Link>
			
		</div>
		
		</>
	)
}

export default SeatSelection;