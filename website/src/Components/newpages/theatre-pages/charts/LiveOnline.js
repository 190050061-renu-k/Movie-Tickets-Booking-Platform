import React, { useState, useEffect } from "react";
import {  Card, CardBody, CardTitle } from "reactstrap";
import Chart, { Bar } from "react-chartjs-2";
import { TwoBar } from "./TwoBar";
import { elements } from "chart.js/auto";
import { useParams } from "react-router";
const LiveOnline = () => {
    //let { theatre_id } = useParams();
    var theatre_id = 12;
    var [graph, setGraph] = useState({});
    const [isLoading, setisLoading] = useState(0);
    var x_data = [];
    var offline = [];
    var online = [];
    // var live = [10,1,5];
    // var online = [3,9,5];
    useEffect(() => {
        getLivevsOnline();
    }, [theatre_id]);
    
    function getLivevsOnline () {
        console.log(theatre_id);
        setisLoading(1);
        fetch("http://localhost:3001/getOnlineVsOffline", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ theatre_id }),
        })
        .then((response) => {
            return response.json();
          })
          .then((data) => {
            setGraph(data);
            setisLoading(2);
          })
          .catch((err) => {
            console.log(err);
          });
    }
    console.log(graph);
    var onl = [];
    onl = graph.online;
    if(typeof(onl) != 'undefined'){
        console.log(onl);
        for(let i=0; i<onl.length; i++){
            x_data.push(onl[i].book_date.slice(1,10));
            online.push(onl[i].num_seats);
        }
    }
    var ofl = graph.offline;
    if(typeof(ofl) != 'undefined'){
        for(let i=0; i<onl.length; i++){
            offline.push(ofl[i].num_seats);
        }
    }
    // graph.online.forEach(element => {
    //     x_data.push(element.book_date);
    //     online.push(element.num_seats);
    // });
    // graph.offline.forEach(element => {
    //     x_data.push(element.book_date);
    //     offline.push(element.num_seats);
    // });
    //var xaxis  = ["Day 1", "Day 2", "Day 3"];
    var stats = TwoBar(x_data, offline, online, "Number of Bookings", "Live", "Online");
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
