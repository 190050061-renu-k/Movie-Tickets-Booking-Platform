import React from "react"
import {  Card, CardBody, CardTitle } from "reactstrap";
import Chart, { Bar } from "react-chartjs-2";
import { TwoBar } from "./TwoBar";

const LiveOnline = () => {
    var live = [10,1,5];
    var online = [3,9,5];

    var xaxis  = ["Day 1", "Day 2", "Day 3"];
    var stats = TwoBar(xaxis, live, online, "Number of Bookings", "Live", "Online");
	return (
		<div className="row container" style={{margin:"20px"}}>
			<Card className="card-chart">
                <CardTitle tag="h5">View Live vs Online bookings for past 7 days</CardTitle>
                <CardBody>
                    <Bar
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

export default LiveOnline
