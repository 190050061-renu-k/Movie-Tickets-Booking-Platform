// Set 1 Usecase 6 - Movie Info Page
import React, { useState, useEffect } from "react";

import { Card, CardHeader, CardBody, CardTitle, Button } from "reactstrap";

import { Link } from "react-router-dom";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import Preload from "Components/layouts/Preload";
import { Redirect } from "react-router-dom";

const HomePage = (props) => {
  const role = localStorage.getItem('role');
  var [highRatedMovies, setHighRatedMovies] = useState([]);
  var [upcomingMovies, setUpcomingMovies] = useState([]);
  var [recommendedMovies, setRecommendedsMovies] = useState([]);
  const [isLoading, setisLoading] = useState(0);

  const user_id = 1;
  const city_id = 6;

  useEffect(() => {
    getMovies();
  }, [city_id]);

  function getMovies() {
    setisLoading(1);
    fetch("http://localhost:3001/getMovies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ city_id }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setHighRatedMovies(data);
      })
      .catch((err) => {
        console.log(err);
      });

    fetch("http://localhost:3001/getUpcomingMovies", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUpcomingMovies(data);
      })
      .catch((err) => {
        console.log(err);
      });

    fetch("http://localhost:3001/getRecommendations", {
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
        setRecommendedsMovies(data);
        setisLoading(2);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  var i = -1;
  const poster_img_base = "http://image.tmdb.org/t/p/w300/";

  if (isLoading == 2) {
    let moviesList = [
      { name: "High Rated Movies", mvs: highRatedMovies },
      { name: "Upcoming Movies", mvs: upcomingMovies },
      { name: "Recommended Movies", mvs: recommendedMovies },
    ];
    return (
      <div>
        {role==null ? <Redirect push to="/" /> : null}
        <div className="container text-left" style={{ marginTop: "60px" }}>
          {moviesList.map((list) => {
            i = -1;
            return (
              <Card>
                <CardBody>
                  <h3>{list.name}</h3>
                  <div>
                    <ScrollMenu
                      options={{
                        ratio: 0.9,
                        rootMargin: "5px",
                        threshold: [0.01, 0.05, 0.5, 0.75, 0.95, 1],
                      }}
                    >
                      {list.mvs.map((movie) => {
                        i += 1;
                        return (
                          <div
                            itemID={i}
                            key={i}
                            className="text-left"
                            style={{
                              color: "white",
                              marginTop: "20px",
                              paddingLeft: "30px",
                              width: "200px",
                            }}
                          >
                            <Link to={"/movies/" + movie.movie_id}>
                              <Card>
                                <CardBody className="setimg">
                                  <img
                                    id="mov_img"
                                    src={poster_img_base + movie.poster_img}
                                  ></img>
                                  <p id="list" className="text-center">
                                    {movie.name}
                                  </p>
                                </CardBody>
                              </Card>
                            </Link>
                          </div>
                        );
                      })}
                    </ScrollMenu>
                  </div>
                </CardBody>
              </Card>
            );
          })}
        </div>
      </div>
    );
  } else return <Preload></Preload>;
};

export default HomePage;
