// Set 1 Usecase 6 - Movie Info Page
// TODO: fetch data from db
import React, { useState, useEffect } from "react";

// import { Link } from 'react-router-dom';
import { Card, CardHeader, CardBody, CardTitle, Button } from "reactstrap";
import { Link } from "react-router-dom";
import Preload from "Components/layouts/Preload";
import { Redirect } from "react-router-dom";

const TheatreHomePage = (props) => {
  const role = localStorage.getItem('role');
  var [showsList, setShowsList] = useState([]);
  var [offset, setOffset] = useState(0);
  const [isLoading, setisLoading] = useState(0);
  const theatre_id = 8;

  useEffect(() => {
    getShowsList();
  }, [theatre_id]);

  function getShowsList() {
    setisLoading(1);
    fetch("http://localhost:3001/getTheatreShows2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ theatre_id }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setShowsList(data);
        setisLoading(2);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (isLoading == 2) {
    var shows = [];
    var previousShowTime = "";
    var previousMovie = "";
    var previousScreen = "";
    showsList.forEach((element) => {
      if (
        previousMovie != element.movie_id ||
        previousScreen != element.screen_num ||
        previousShowTime != element.show_time
      ) {
        shows.push({
          movie_name: element.movie_name,
          screen_num: element.screen_num,
          show_timings: element.show_time,
          show_dates: [element.show_date],
        });
      } else {
        let last = shows.pop();
        last.show_dates.push(element.show_date);
        shows.push(last);
      }
      previousShowTime = element.show_time;
      previousScreen = element.screen_num;
      previousMovie = element.movie_id;
    });
    console.log(shows, showsList);
    // var showsList = [
    //   {
    //     movie_name: "KGF Chapter 2",
    //     screen_num: 2,
    //     show_id: 22,
    //     show_timings: "Morning show",
    //   },
    //   {
    //     movie_name: "KGF Chapter 2",
    //     screen_num: 2,
    //     show_id: 22,
    //     show_timings: "Morning show",
    //   },
    //   {
    //     movie_name: "KGF Chapter 2",
    //     screen_num: 2,
    //     show_id: 22,
    //     show_timings: "Morning show",
    //   },
    // ];

    //modify into useEffect
    // ShowsList = showsList;
    const limit = 5;

    const display_shows =
      shows.length - offset > limit
        ? shows.slice(offset, offset + limit)
        : shows.slice(offset, shows.length);

    return (
      <>
      {role==null ? <Redirect push to="/" /> : null}
        <div style={{ marginTop: "60px", marginBottom: "30px" }}>
          <div style={{ marginTop: "30px" }} className="text-center">
            <div style={{ marginLeft: "40px" }}>
              <Link to="/theatres/addmovie">
                <Button>Add a Movie</Button>
              </Link>
              <Link to="/theatres/analytics">
                {" "}
                <Button>Analytics</Button>
              </Link>
            </div>
            <p className="text-center">
              Showing {offset + 1} to {offset + display_shows.length} entries
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
                onClick={() => setOffset(offset - limit)}
              >
                Prev
              </Button>
            </div>
          )}

          {offset + display_shows.length + 1 < showsList.length ? (
            <div className="float-right" style={{ marginRight: "50px" }}>
              <Button
                block
                color="primary"
                size="lg"
                style={{ marginLeft: "auto", marginRight: "auto" }}
                onClick={() => setOffset(offset + limit)}
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
            {display_shows.map((show) => {
              return (
                <div
                  className="col-12 text-left"
                  style={{ marginTop: "50px", paddingLeft: "30px" }}
                >
                  <Card>
                    <CardBody>
                      <div>
                        <h2>{show.movie_name}</h2>
                        <Button className="float-right">Book Tickets</Button>
                        <Button className="float-right">Extend Show</Button>
                      </div>
                      <hr />
                      <h5>{"Screen " + show.screen_num}</h5>
                      <h5>{show.show_timings}</h5>
                      <p>
                        {show.show_dates.map(
                          (element) => element.slice(0, 10) + "    "
                        )}
                      </p>
                    </CardBody>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  } else return <Preload></Preload>;
};

export default TheatreHomePage;
