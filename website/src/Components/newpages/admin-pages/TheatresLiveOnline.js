import React, { useState, useEffect } from "react";
import {  Card, CardBody, CardTitle } from "reactstrap";
import  { Bar } from "react-chartjs-2";
import { TwoBar } from "./../theatre-pages/charts/TwoBar";

const TheatreLiveOnline = () => {
    var [data, setData] = useState([]);
    const [isLoading, setisLoading] = useState(0);
    var offline = [];
    var online = [];
    var xaxis = [];
    // var live = [10,1,5];
    // var online = [3,9,5];
    useEffect(() => {
        getTheatreliveonline();
    }, []);
    
    function getTheatreliveonline () {
        setisLoading(1);
        fetch("http://localhost:3001/getAdminAnalytics", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            //body: JSON.stringify({ theatre_id }),
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
    var bar = [];
    bar = data;
    for(let i=0; i<bar.length; i++){ 
        if(bar[i].book_type == 'online'){
            online.push(bar[i].sum_seats);
            xaxis.push(bar[i].theatre_name);
        }
        else{
            offline.push(bar[i].sum_seats);
        }
    }

    //var xaxis  = ["Theatre 1", "Theatre 2", "Theatre 3"];
    var stats = TwoBar(xaxis, online, offline, "Number of Bookings", "Live", "Online");
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

export default TheatreLiveOnline
