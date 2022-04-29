import React, { useState, useEffect } from "react";
import "./styles/newseat.css";

import MovieSelector from "./MovieSelector";
import SeatAvailability from "./SeatAvailability";
import SeatMatrix from "./SeatMatrix";
import PriceCalculator from "./PriceCalculator";

import MovieContext from "./MovieContext";
import { useParams } from "react-router";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import { elements } from "chart.js/auto";
import Preload from "Components/layouts/Preload";
import { Redirect } from "react-router-dom";

const SeatSelection = (props) => {
  const role = localStorage.getItem('role');
  let { show_id } = useParams();
  var type_booking = props.type ? props.type : "online";
  const [isLoading, setisLoading] = useState(0);
  const [movies, setmovies] = useState({
    movieNames: {
      Bloodshot: 10,
    },
    moviePrice: 10,
    totalSeats: 0,
    seatNumbers: [],
    occupied: [1, 2, 3, 15, 18],
    theatre_id: 0,
    theatre_name: "",
    movie_id: "",
    movie_name: "",
    show_date: "",
  });

  var newData = {};
  useEffect(() => {
    getmovies();
  }, [show_id]);

  function getmovies() {
    setisLoading(1);
    fetch("http://localhost:3001/getShowDetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ show_id }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        newData = {
          ...movies,
          theatre_id: data[0].theatre_id,
          movie_id: data[0].movie_id,
          theatre_name: data[0].theatre_name,
          movie_name: data[0].movie_name,
          show_date: data[0].show_date,
          moviePrice: data[0].ticket,
        };
        setmovies(newData);
        setisLoading(10);
      })
      .catch((err) => {
        console.log(err);
      });

    fetch("http://localhost:3001/getUnavailableSeats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ show_id }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setmovies({
          ...newData,
          occupied: data.map((element) => element.seat_id),
        });
        setisLoading(2);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (isLoading == 2) {
    if (new Date(movies.show_date) < new Date())
      return <>Booking unavailable</>;
    console.log(movies);
    return (
      <>
      {role==null ? <Redirect push to="/" /> : null}
        <div className="main container">
          <MovieContext.Provider value={{ movies, changeState: setmovies }}>
            <MovieSelector />
            <SeatMatrix occupied={movies.occupied} />
            <SeatAvailability />

            <PriceCalculator />
          </MovieContext.Provider>
          <Link
            style={{ textDecoration: "none" }}
            to={{
              pathname: "/payment",
              state: {
                seats: movies.seatNumbers,
                theatre_id: movies.theatre_id,
                theatre_name: movies.theatre_name,
                movie_name: movies.movie_name,
                movie_id: movies.movie_id,
                price: movies.moviePrice * movies.seatNumbers.length,
                date: new Date(),
                show_id: show_id,
                show_date: movies.show_date,
                type : type_booking
              },
            }}
          >
            <Button className="btn-dark">Proceed to Payment</Button>
          </Link>
        </div>
      </>
    );
  } else return <Preload></Preload>;
};

export default SeatSelection;
