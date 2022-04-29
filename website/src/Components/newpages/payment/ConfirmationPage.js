// Set 1 Usecase 6 - Movie Info Page
// TODO: fetch data from db
import React, { useEffect, useState } from "react";

// import { Link } from 'react-router-dom';
import { Card, CardHeader, CardBody, CardTitle, Button } from "reactstrap";

import { Link } from "react-router-dom";
import Preload from "Components/layouts/Preload";
import authHeader from "../authHeader";

const ConfirmationPage = (props) => {
  var [BookingInfo, setBookingInfo] = useState({});
  var [booking_id, setbooking_id] = useState(0);
  const [isLoading, setisLoading] = useState(0);

  const user_id = localStorage.getItem('user').user_id;

  if (props.location.state) {
    BookingInfo = props.location.state;
  }
  var success = Math.random() < 0.9;
  var booked = success;

  useEffect(() => {
    bookSeats();
  }, []);

  function bookSeats() {
    setisLoading(2);
    if (!booked) return;
    setisLoading(1);
    fetch("http://localhost:3001/bookSeats", {
      method: "POST",
      headers: authHeader(),
      body: JSON.stringify({
        show_id: BookingInfo.show_id,
        user_id: user_id,
        book_date: BookingInfo.date,
        seat_ids: BookingInfo.seat_ids,
        book_type: "online",
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        booked = true;
        setbooking_id(data);
        setisLoading(2);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (isLoading == 2) {
    if (!booked) {
      return (
        <div>
          <div className="container text-left" style={{ marginTop: "60px" }}>
            <h2>Payment Failure!</h2>{" "}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="container text-left" style={{ marginTop: "60px" }}>
            <h2>Successfully booked tickets</h2>
            <Card>
              <CardBody>
                <h3>Booking Info:</h3>
                <div className="row">
                  <div className="col-6">
                    <p style={{ fontSize: "1.2em" }}>
                      Booking ID: <b>{booking_id}</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p style={{ fontSize: "1.2em" }}>
                      Theatre Name: <b>{BookingInfo.theatre_name}</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p style={{ fontSize: "1.2em" }}>
                      Movie: <b>{BookingInfo.movie_name}</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p style={{ fontSize: "1.2em" }}>
                      Price: <b>{BookingInfo.price}</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p style={{ fontSize: "1.2em" }}>
                      Show Date:{" "}
                      <b>
                        {BookingInfo.show_date.slice(8, 10) +
                          "-" +
                          BookingInfo.show_date.slice(5, 7) +
                          "-" +
                          BookingInfo.show_date.slice(0, 4)}
                      </b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p style={{ fontSize: "1.2em" }}>
                      Date of booking:{" "}
                      <b>
                        {BookingInfo.date.getDate() +
                          "-" +
                          BookingInfo.date.getMonth() +
                          "-" +
                          BookingInfo.date.getFullYear()}
                      </b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p style={{ fontSize: "1.2em" }}>
                      Selected Seats:
                      {BookingInfo.seats.map((seat) => {
                        return <b> {seat}</b>;
                      })}
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      );
    }
  } else {
    return <Preload></Preload>;
  }
};

export default ConfirmationPage;
