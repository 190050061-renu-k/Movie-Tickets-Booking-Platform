// Set 1 Usecase 7 - Artist Info Page
import React, { useState, useEffect } from "react";

import { useParams } from "react-router";
import { Card, CardHeader, CardBody, CardTitle, Button } from "reactstrap";
import { Link } from "react-router-dom";

import "./../../../Assets/css/artistDetails.css";
import Preload from "Components/layouts/Preload";
import { Redirect } from "react-router-dom";

const ArtistDetails = (props) => {
  const role = localStorage.getItem('role');
  let { artist_id } = useParams();
  var [artistDetails, setArtistDetails] = useState({});
  const [isLoading, setisLoading] = useState(0);

  useEffect(() => {
    getArtistDetails();
  }, [artist_id]);

  function getArtistDetails() {
    setisLoading(1);
    fetch("http://localhost:3001/getArtistInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ artist_id }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setArtistDetails(data);
        console.log(data);
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
      {role==null ? <Redirect push to="/" /> : null}
        <div className="container text-left" style={{ marginTop: "60px" }}>
          <div>
            <h3 style={{ fontWeight: "bold" }}>
              Artist: {artistDetails.name[0].name}
            </h3>
            <h4>
              <i className="nc-icon nc-minimal-right"></i>Movies List
            </h4>
            <div className="row">
              {artistDetails.movies.map((movie) => {
                return (
                  <div
                    className="col-3 text-left"
                    style={{
                      color: "white",
                      marginTop: "20px",
                      paddingLeft: "30px",
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
            </div>
          </div>
        </div>
      </div>
    );
  } else return <Preload></Preload>;
};

export default ArtistDetails;
