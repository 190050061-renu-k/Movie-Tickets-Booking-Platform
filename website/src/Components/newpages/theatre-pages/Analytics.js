import React from "react"
import { Button } from "reactstrap"
import Ratings from "./charts/TheatreRatings"

const Analytics = () => {
	return (

		<div className="row container">
			<div className="col-3"><Button>Ratings</Button></div>
			<div className="col-3"><Button>Live VS Online</Button></div>
			<div className="col-3"><Button>Percentage of Audience</Button></div>
			<div className="col-3"><Button>Choice of Audience</Button></div>
		<Ratings></Ratings>

		</div>
	)
}

export default Analytics
