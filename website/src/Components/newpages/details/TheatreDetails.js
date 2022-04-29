// Set 1 Usecase  - Theatre Detail page
import React, { useState, useEffect } from "react";
import { Card, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Tabs, Tab } from "react-bootstrap";
import Preload from "Components/layouts/Preload";
import { Redirect } from "react-router-dom";

const TheatreDetails = (props) => {
  const role = localStorage.getItem('role');
  let { theatre_id } = useParams();
  var [details, setDetails] = useState({});
  const [isLoading, setisLoading] = useState(0);

  const city_id = 1;

  useEffect(() => {
    getDetails();
  }, [theatre_id]);

  function getDetails() {
    setisLoading(1);
    fetch("http://localhost:3001/getTheatreShows", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ theatre_id, city_id }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setDetails(data);
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
    var previousMovie = "";
    var previousScreen = "";
    details.shows_info.forEach((element) => {
      if (previousDate != element.show_date) {
        shows.push({
          date: element.show_date,
          movies: [
            {
              name: element.movie_name,
              id: element.movie_id,
              show_timings: [
                { show_time: element.show_time, show_id: element.show_id },
              ],
              screen: element.screen_num,
            },
          ],
        });
      } else if (
        previousMovie != element.movie_id ||
        previousScreen != element.screen_num
      ) {
        let last = shows.pop();
        last.movies.push({
          name: element.movie_name,
          id: element.movie_id,
          show_timings: [
            { show_time: element.show_time, show_id: element.show_id },
          ],
          screen: element.screen_num,
        });
        shows.push(last);
      } else {
        let last1 = shows.pop();
        let last2 = last1.movies.pop();
        last2.show_timings.push({
          show_time: element.show_time,
          show_id: element.show_id,
        });
        last1.movies.push(last2);
        shows.push(last1);
      }
      previousDate = element.show_date;
      previousScreen = element.screen_num;
      previousMovie = element.movie_id;
    });
    let theatreDetails = {
      shows: shows,
      id: theatre_id,
      city: details.city[0].city,
      name: details.name[0].name,
    };

    return (
      <div>
        {role==null ? <Redirect push to="/" /> : null}
        <div className="container text-left" style={{ marginTop: "60px" }}>
          <div>
            <Card>
              <CardBody>
                <div>
                  <h1 style={{ display: "inline" }}>{theatreDetails.name}</h1>
                  <Button className="text-light float-right">Rate Now</Button>
                </div>
                <div>
                  <i className="nc-icon nc-pin-3"></i>
                  <h4 style={{ display: "inline" }}>{theatreDetails.city}</h4>
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
                      {show.movies.map((movie) => {
                        return (
                          <>
                            <div className="row">
                              <div className="col-4">
                                <Link to={"/movies/" + movie.id}>
                                  {movie.name}
                                </Link>
                              </div>
                              <div className="col-8">
                                {movie.show_timings.map((show_) => {
                                  return (
                                    <Link to={"/seats/" + show_.show_id}>
                                      <Button className="btn-outline-primary">
                                        {show_.show_time}
                                      </Button>
                                    </Link>
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

export default TheatreDetails;
