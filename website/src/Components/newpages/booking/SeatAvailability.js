import React from "react"
import Seat from './Seat'

const SeatAvailability = () => {
	return (
		<div className="row">
			<div className="col-5">Unoccupied : <Seat seatColor="seat-grey" /></div>
			<div className="col-4">Occupied : <Seat seatColor="seat-red" /></div>
			<div className="col-4">Selected : <Seat seatColor="seat-black" /></div>
		</div>
	)
}

export default SeatAvailability
