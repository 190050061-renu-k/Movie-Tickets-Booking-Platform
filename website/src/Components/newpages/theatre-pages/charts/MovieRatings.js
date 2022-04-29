import React, { useState, useEffect } from "react";
import {  Card, CardBody, CardTitle } from "reactstrap";
import Chart from "react-chartjs-2";
import { getData } from "./getData";

const MovieRatings = () => {
    const [isLoading, setisLoading] = useState(0);
    var [data, setData] = useState([]);
    // var yaxis = [10,1,5];
    // var xaxis  = ["Movie 1", "Movie 2", "Movie 3"];
    var x_data = [];
    var y_data = [];

    useEffect(() => {
        getMovieRatings();
    }, []);

    function getMovieRatings () {
        setisLoading(1);
        fetch("http://localhost:3001/getMovieRatings", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            //body: JSON.stringify({ movie_id }),
        })
        .then((response) => {
            return response.json();
          })
          .then((data) => {
            setData(data);
            setisLoading(2);
          })
          .catch((err) => {
            console.log(err);
          });
    }
    console.log(data);
    data.forEach(element => {
        x_data.push(element.name);
        y_data.push(element.avg_rating);
    });
    
    var stats = getData(x_data, y_data,"Ratings");
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
