// Set 1 Usecase 6 - Movie Info Page
import React, { useState, useEffect } from "react";
import "./../../../Assets/css/movieDetails.css";
import { Card, CardHeader, CardBody, CardTitle, Button } from "reactstrap";
import { Link } from "react-router-dom";
import Preload from "Components/layouts/Preload";
import authHeader from "../authHeader";

const TheatreList = (props) => {
  var [theatreList, setTheatreList] = useState([]);
  var [offset, setOffset] = useState(0);
  const [isLoading, setisLoading] = useState(0);
  const city_id = localStorage.getItem('user').city_id;

  useEffect(() => {
    getTheatreList();
  }, [city_id]);

  function getTheatreList() {
    setisLoading(1);
    fetch("http://localhost:3001/getTheatres", {
      method: "POST",
      headers: authHeader(),
      body: JSON.stringify({ city_id }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTheatreList(data);
        setisLoading(2);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const limit = 12;

  if (isLoading == 2) {
    const show_theatres =
      theatreList.length - offset > limit
        ? theatreList.slice(offset, offset + 12)
        : theatreList.slice(offset, theatreList.length);

    return (
      <>
        <div style={{ marginTop: "60px", marginBottom: "30px" }}>
          <div style={{ marginTop: "30px" }} className="text-center">
            <h2 style={{ display: "inline" }} className="text-center">
              {" "}
              Browse Theatres
            </h2>
            <p className="text-center">
              Showing {offset + 1} to {offset + show_theatres.length} entries
            </p>
          </div>
          {offset == 0 ? (
            <></>
          ) : (
            <div className="float-left" style={{ marginLeft: "50px" }}>
              <Button
                block
                color="primary"
                size="lg"
                style={{ marginLeft: "auto", marginRight: "auto" }}
                onClick={() => setOffset(offset - 10)}
              >
                Prev
              </Button>
            </div>
          )}

          {offset + show_theatres.length < theatreList.length ? (
            <div className="float-right" style={{ marginRight: "50px" }}>
              <Button
                block
                color="primary"
                size="lg"
                style={{ marginLeft: "auto", marginRight: "auto" }}
                onClick={() => setOffset(offset + 10)}
              >
                Next
              </Button>
            </div>
          ) : (
            <></>
          )}
        </div>

        <div
          style={{
            marginTop: "100px",
            marginBottom: "50px",
            marginLeft: "30px",
            marginRight: "30px",
          }}
        >
          <div className="row">
            {show_theatres.map((theatre) => {
              return (
                <div
                  className="col-4 text-left"
                  style={{ marginTop: "50px", paddingLeft: "30px" }}
                >
                  <Link to={"/theatres/" + theatre.theatre_id}>
                    <Card>
                      <CardBody>
                        <h2>{theatre.name}</h2>
                      </CardBody>
                    </Card>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  } else return <Preload></Preload>;
};

export default TheatreList;
