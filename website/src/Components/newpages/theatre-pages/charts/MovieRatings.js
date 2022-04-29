import React from "react"
import {  Card, CardBody, CardTitle } from "reactstrap";
import Chart from "react-chartjs-2";
import { getData } from "./getData";

const MovieRatings = () => {
    var yaxis = [10,1,5];
    var xaxis  = ["Movie 1", "Movie 2", "Movie 3"];
    var stats = getData(xaxis, yaxis,"Ratings");
	return (
		<div className="row container" style={{margin:"20px"}}>
			<Card className="card-chart">
                <CardTitle tag="h5">View Ratings of Movies</CardTitle>
                <CardBody>
                    <Chart
                    data={stats.data}
                    options={stats.options}
                    width={800}
                    height={300}
                    />
                </CardBody>
            </Card>
		</div>
	)
}

export default MovieRatings
