// Set 1 Usecase  - Theatre Detail page for a movie
// TODO: Change display of time
// create links

// Structure -->
//movies/5 --> Book Tickets--> movietheatrelist/5
import React, { useState, useEffect } from "react";
import { Card, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Tabs, Tab } from "react-bootstrap";
import Preload from "Components/layouts/Preload";
import { Redirect } from "react-router-dom";

const MovieTheatreList = (props) => {
  const role = localStorage.getItem('role');
  let { movie_id } = useParams();
  var [theatreList, setTheatreList] = useState({});
  const [isLoading, setisLoading] = useState(0);

  const city_id = localStorage.getItem('user').city_id;

  useEffect(() => {
    getTheatreList();
  }, [movie_id]);

  function getTheatreList() {
    setisLoading(1);
    fetch("http://localhost:3001/getMovieTheatres", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ movie_id, city_id }),
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

  var i = -1;
  if (isLoading == 2) {
    var shows = [];
    var previousDate = "";
    var previousTheatre = "";
    var previousScreen = "";
    theatreList.shows_info.forEach((element) => {
      if (previousDate != element.show_date) {
        shows.push({
          date: element.show_date,
          theatres: [
            {
              name: element.theatre_name,
              id: element.theatre_id,
              show_timings: [
                { show_time: element.show_time, show_id: element.show_id },
              ],
              screen: element.screen_num,
            },
          ],
        });
      } else if (
        previousTheatre != element.id ||
        previousScreen != element.screen_num
      ) {
        let last = shows.pop();
        last.theatres.push({
          name: element.theatre_name,
          id: element.theatre_id,
          show_timings: [
            { show_time: element.show_time, show_id: element.show_id },
          ],
          screen: element.screen_num,
        });
        shows.push(last);
      } else {
        let last1 = shows.pop();
        let last2 = last1.theatres.pop();
        last2.show_timings.push({
          show_time: element.show_time,
          show_id: element.show_id,
        });
        last1.theatres.push(last2);
        shows.push(last1);
      }
      previousDate = element.show_date;
      previousScreen = element.screen_num;
      previousTheatre = element.id;
    });
    let theatreDetails = {
      shows: shows,
      id: movie_id,
      name: theatreList.name[0].name,
    };
    return (
      <div>
        {role==null ? <Redirect push to="/" /> : null}
        <div className="container text-left" style={{ marginTop: "60px" }}>
          <div>
            <Card>
              <CardBody>
                <div>
                  <h2 style={{ display: "inline" }}>{theatreDetails.name}</h2>
                  <h5>Select Theatre and Screen to book tickets</h5>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
        <div className="container text-left" style={{ marginTop: "30px" }}>
          <Card>
            <CardBody>
              <Tabs defaultActiveKey={0}>
                {shows.map((show) => {
                  i += 1;
                  return (
                    <Tab
                      style={{ marginTop: "30px" }}
                      eventKey={i}
                      title={show.date}
                    >
                      {show.theatres.map((theatre) => {
                        return (
                          <>
                            <div className="row">
                              <div className="col-4">
                                <Link to={"/theatres/" + theatre.id}>
                                  {theatre.name}
                                </Link>
                              </div>
                              <div className="col-2">
                                <p>Screen {theatre.screen}</p>
                              </div>
                              <div className="col-6">
                                {theatre.show_timings.map((show_) => {
                                  return (
                                    <Button
                                      style={{
                                        marginTop: "0px",
                                        marginLeft: "5px",
                                      }}
                                      className="btn-outline-primary"
                                    >
                                      <Link to={"/seats/" + show_.show_id}>
                                        {show_.show_time}
                                      </Link>
                                    </Button>
                                  );
                                })}
                              </div>
                            </div>
                            <hr style={{ color: "black" }} />
                          </>
                        );
                      })}
                    </Tab>
                  );
                })}
              </Tabs>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  } else return <Preload></Preload>;
};

export default MovieTheatreList;
