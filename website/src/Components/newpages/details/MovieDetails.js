// Set 1 Usecase 6 - Movie Info Page
import React, { useState, useEffect } from "react";

import { useParams } from "react-router";
import { Card, CardHeader, CardBody, CardTitle, Button } from "reactstrap";
import { Link } from "react-router-dom";

import "./../../../Assets/css/movieDetails.css";
import Preload from "../../layouts/Preload";

const MovieDetails = (props) => {
  let { movie_id } = useParams();
  var [movieDetails, setMovieDetails] = useState({});
  const [isLoading, setisLoading] = useState(0);

  useEffect(() => {
    getMovieDetails();
  }, [movie_id]);

  function getMovieDetails() {
    setisLoading(1);
    fetch("http://localhost:3001/getMovieInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ movie_id }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setMovieDetails(data);
        setisLoading(2);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const poster_img_base = "http://image.tmdb.org/t/p/w300/";
  //useEffect to fetch genres
  if (isLoading == 2) {
    return (
      <div>
        <div
          className="align-items-center  bg-dark"
          id="info1"
          style={{ marginTop: "60px" }}
        >
          <div className="container">
            <div>
              <img
                src={poster_img_base + movieDetails.info[0].poster_img}
                alt="Snow"
                className="center"
              />

              <div className="row">
                <div
                  className="col-9 text-left"
                  style={{
                    color: "white",
                    marginTop: "50px",
                    paddingLeft: "30px",
                  }}
                >
                  <h3 style={{ fontWeight: "bold" }}>
                    {movieDetails.info[0].name}
                  </h3>
                  {!movieDetails.info[0].upcoming ? (
                    <p>Release Date: {movieDetails.info[0].release_date}</p>
                  ) : (
                    <></>
                  )}
                  <Card>
                    <CardBody>
                      {!movieDetails.info[0].upcoming ? (
                        <>
                          <h5 style={{ display: "inline", fontSize: "1.5em" }}>
                            IMDB Rating: {movieDetails.info[0].imdb_rating}
                          </h5>
                          <Button className="text-light float-right">
                            Rate Now
                          </Button>
                        </>
                      ) : (
                        <>
                          <h5 style={{ display: "inline", fontSize: "1.5em" }}>
                            Yet to be Released
                          </h5>
                          <Button className="text-light float-right">
                            Notify me
                          </Button>
                        </>
                      )}
                    </CardBody>
                  </Card>
                  <div className="row">
                    <div className="col-6">
                      <Card>
                        <CardBody>
                          {movieDetails.genres.map((i) => {
                            return (
                              <span style={{ fontWeight: "bold" }}>
                                {i.name}{" "}
                              </span>
                            );
                          })}
                        </CardBody>
                      </Card>
                    </div>
                    <div className="col-6">
                      <Card>
                        <CardBody>
                          {movieDetails.languages.map((i) => {
                            return (
                              <span style={{ fontWeight: "bold" }}>
                                {i.name}{" "}
                              </span>
                            );
                          })}
                        </CardBody>
                      </Card>
                    </div>
                  </div>
                  <Link to={"/movietheatrelist/"+movie_id}>
                    <Button className="bg-primary" size="lg">
                      Book Tickets
                    </Button>
                  </Link>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container text-left">
          <h4>Description</h4>
          <p style={{ fontSize: "1.15em" }}>
            {movieDetails.info[0].description}
          </p>
          <hr />
          <h4>Cast</h4>
          {movieDetails.artists.map((artist) => {
            return (
              <Link
                to={"/artists/" + artist.artist_id}
                style={{ padding: "5px" }}
              >
                <Button className="btn-outline-primary">{artist.name}</Button>
              </Link>
            );
          })}
          <hr />
        </div>
      </div>
    );
  } else return <Preload></Preload>;
};

export default MovieDetails;
