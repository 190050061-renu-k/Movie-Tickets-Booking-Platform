// Set 2 Usecase 1 - Client logging in 
// TODO: input validation, check if session is in logged in state
// (Check in database) error handling
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle
  } from "reactstrap";

const ViewHistory = (props) => {
    var [bookings, setBookings] = useState([]);
    bookings = [{"movie_name": "K.G.F Chapter 2", "movie_id":1, "date": new Date(2022, 2, 4), "seats": 2, "theatre_name": "Ramya's INOX", "theatre_id": 420},
    {"movie_name": "K.G.F Chapter 1", "movie_id":2, "date": new Date(2022, 2, 3), "seats": 2, "theatre_name": "Ramya's INOX", "theatre_id": 420},
    {"movie_name": "K.G.F Chapter 3", "movie_id":3, "date": new Date(2022, 2, 2), "seats": 3, "theatre_name": "Ramya's INOX", "theatre_id": 420}
];
    const border = {
        border: "1px solid #e3e8e5",
    };
    return (
      <div >
        <Table responsive striped bordered hover={true}>
            <thead className="text-primary">
                <tr>
                <th style={border} className="text-center">
                    Movie Name
                </th>
                <th style={border} className="text-center">
                    Date
                </th>
                <th style={border} className="text-center">
                    No. of seats
                </th>
                <th style={border} className="text-center">
                    Theatre Name
                </th>
                </tr>
            </thead>
            <tbody>
                {bookings.map((booking)=>{
                    return(
                    <tr>
                        <td className="text-center"><Link to={"/movies/"+booking.movie_id}>{booking.movie_name}</Link></td>
                        <td className="text-center">{booking.date.getDate()+"-"+ booking.date.getMonth()+"-"+ booking.date.getFullYear()}</td>
                        <td className="text-center">{booking.seats}</td>
                        <td className="text-center"><Link to={"/theatres/"+booking.theatre_id}>{booking.theatre_name}</Link></td>
                    </tr>
                    );
                   
                })}
            </tbody>
        </Table>
      </div>

    );
}

export default ViewHistory;
