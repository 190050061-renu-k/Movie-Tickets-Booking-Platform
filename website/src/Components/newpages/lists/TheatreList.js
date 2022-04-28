// Set 1 Usecase 6 - Movie Info Page
// TODO: fetch data from db
import React, { useState } from "react";
import "./../../../Assets/css/MovieDetails.css";
// import { Link } from 'react-router-dom';
import { Card, CardHeader, CardBody, CardTitle, Button } from "reactstrap";
import { Link } from "react-router-dom";

const TheatreList = (props) => {
  var [theatreList, setTheatres] = useState([]);
  var [offset, setOffset] = useState(0);

  var theatres = [
    { name: "Ramya's INOX", id: 111, city: "Las Vegas" },
    { name: "Ramya's INOX", id: 111, city: "Las Vegas" },
    { name: "Ramya's INOX", id: 111, city: "Las Vegas" },
    { name: "Ramya's INOX", id: 111, city: "Las Vegas" },
    { name: "Ramya's INOX", id: 111, city: "Las Vegas" },
    { name: "Ramya's INOX", id: 111, city: "Las Vegas" },
    { name: "Ramya's INOX", id: 111, city: "Las Vegas" },
    { name: "Ramya's INOX", id: 111, city: "Las Vegas" },
    { name: "Ramya's INOX", id: 111, city: "Las Vegas" },
    { name: "Ramya's INOX", id: 111, city: "Las Vegas" },
    { name: "Ramya's INOX", id: 111, city: "Las Vegas" },
    { name: "Ramya's INOX", id: 111, city: "Las Vegas" },
  ];
  //modify into useEffect
  theatreList = theatres;

  const limit = 12;

  //useEffect to fetch theatre list
  const show_theatres =
    theatreList.length === limit ? theatreList.slice(0, 10) : theatreList;

  return (
    <>
      <div style={{ marginTop: "60px", marginBottom: "30px" }}>
        <div style={{ marginTop: "30px" }} className="text-center">
          <h2 style={{ display: "inline" }} className="text-center">
            {" "}
            Browse Theatres
          </h2>
          <p className="text-center">
            Showing {offset + 1} to{" "}
            {offset + (theatreList.length === limit ? 10 : theatreList.length)}{" "}
            entries
          </p>
        </div>
        {offset != 0 ? (
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

        {theatreList.length === limit ? (
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
          {theatreList.map((theatre) => {
            return (
              <div
                className="col-4 text-left"
                style={{ marginTop: "50px", paddingLeft: "30px" }}
              >
                <Link to={"/theatres/" + theatre.id}>
                  <Card>
                    <CardBody>
                      <h2>{theatre.name}</h2>
                      <hr />
                      <h4>{theatre.city}</h4>
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
};

export default TheatreList;
