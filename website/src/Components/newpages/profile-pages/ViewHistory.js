// Set 2 Usecase 1 - Client logging in
// TODO: input validation, check if session is in logged in state
// (Check in database) error handling
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";
import { Card, CardHeader, CardBody, CardTitle } from "reactstrap";

const ViewHistory = (props) => {
  var [bookings, setBookings] = useState([]);
  const [isLoading, setisLoading] = useState(0);
  const user_id = 267;

  useEffect(() => {
    getBookings();
  }, []);

  function getBookings() {
    setisLoading(1);
    fetch("http://localhost:3001/getBookingHistory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setBookings(data);
        setisLoading(2);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const border = {
    border: "1px solid #e3e8e5",
  };

  if (isLoading == 2) {
    return (
      <div>
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
                Seats
              </th>
              <th style={border} className="text-center">
                Theatre Name
              </th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => {
              return (
                <tr>
                  <td className="text-center">
                    <Link to={"/movies/" + booking.movie_id}>
                      {booking.name}
                    </Link>
                  </td>
                  <td className="text-center">
                    {new Date(booking.book_date).getDate() +
                      "-" +
                      new Date(booking.book_date).getMonth() +
                      "-" +
                      new Date(booking.book_date).getFullYear()}
                  </td>
                  <td className="text-center">
                    {booking.label + booking.column_}
                  </td>
                  <td className="text-center">
                    <Link to={"/theatres/" + booking.theatre_id}>
                      {booking.theatre}
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  } else return <></>;
};

export default ViewHistory;
