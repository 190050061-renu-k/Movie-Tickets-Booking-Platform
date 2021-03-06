// Set 1 Usecase 6 - Movie Info Page
// TODO: fetch data from db
import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import { Tabs, Tab } from "react-bootstrap";
import "./../../../Assets/css/addmovie.css";
import { Redirect } from "react-router-dom";
import Preload from "Components/layouts/Preload";

const AddMovieShowPage = (props) => {
  const role = localStorage.getItem("role");
  const theatre_id = JSON.parse(localStorage.getItem("user")).login_id;
  var [movies, setMovies] = useState({});
  const [isLoading, setisLoading] = useState(0);

  useEffect(() => {
    getMovies();
  }, []);

  function getMovies() {
    setisLoading(1);
    fetch("http://localhost:3001/getLatestMovies", {
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
        console.log(data);
        setMovies(data);
        setisLoading(2);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  var showsInfo = {
    movie_name: "KGF Chapter 2",
    movie_id: 2,
    screen_numbers: [1, 2, 3],
    screen1: {
      date1na: [0],
      date2na: [1],
      date3na: [1, 2],
      date4na: [1, 2],
      date5na: [3],
      date6na: [],
      date7na: [1, 2, 3],
      date1s: [0],
      date2s: [1],
      date3s: [1, 2],
      date4s: [1, 2],
      date5s: [3, 4],
      date6s: [],
      date7s: [1, 2, 3],
    },
    screen2: {
      date1na: [0],
      date2na: [1],
      date3na: [1, 2],
      date4na: [1, 2],
      date5na: [3],
      date6na: [],
      date7na: [1, 2, 3],
      date1s: [0],
      date2s: [1],
      date3s: [1, 2],
      date4s: [1, 2],
      date5s: [3, 4],
      date6s: [],
      date7s: [1, 2, 3],
    },
    screen3: {
      date1na: [0],
      date2na: [1],
      date3na: [1, 2],
      date4na: [1, 2],
      date5na: [3],
      date6na: [],
      date7na: [1, 2, 3],
      date1s: [0],
      date2s: [1],
      date3s: [1, 2],
      date4s: [1, 2],
      date5s: [3, 4],
      date6s: [],
      date7s: [1, 2, 3],
    },
  };

  var [data, setData] = useState({
    ShowsInfo: showsInfo,
    isMovieSelected: false,
  });

  function isButtonDisabled(screen_num, day, show) {
    if (
      data.ShowsInfo["screen" + screen_num]["date" + (day + 1) + "na"].includes(
        show
      )
    )
      return true;
    else return false;
  }

  function isButtonActive(screen_num, day, show) {
    if (
      data.ShowsInfo["screen" + screen_num]["date" + (day + 1) + "s"].includes(
        show
      )
    )
      return true;
    else return false;
  }

  //modify into useEffect
  var today = new Date();
  var i = -1;
  var isdisable;
  var isactive;
  if (isLoading == 2) {
    return (
      <>
        {role == null ? <Redirect push to="/" /> : null}
        <div style={{ marginTop: "60px", marginBottom: "30px" }}>
          <div style={{ marginTop: "30px" }}>
            {!data.isMovieSelected ? (
              <>
                <div className={"form-group"}>
                  <select
                    className="form-control form-control-lg"
                    id="inputmovie"
                    style={{ width: "50%" }}
                  >
                    <option value="-1">Movie</option>
                    {movies.map((i) => {
                      return (
                        <option
                          value={i.movie_id}
                          props={{ movie_name: i.name }}
                          movie_id={i.movie_id}
                          movie_name={i.name}
                        >
                          {i.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <Button
                  onClick={() => {
                    if (document.getElementById("inputmovie").value != "-1") {
                      showsInfo.movie_id =
                        document.getElementById("inputmovie").value;
                      showsInfo.movie_name = movies.filter((movie) => {
                        if (movie.movie_id == showsInfo.movie_id) return true;
                        else return false;
                      })[0].movie_name;
                      setData({ isMovieSelected: true, ShowsInfo: showsInfo });
                    }
                  }}
                >
                  Select Movie
                </Button>
              </>
            ) : (
              <>
                <Link>
                  <Button className="btn-outline-primary float-right">
                    Add Movie Shows
                  </Button>
                </Link>
                <h2>{data.ShowsInfo.movie_name}</h2>

                <div>
                  <Tabs defaultActiveKey={0}>
                    {data.ShowsInfo.screen_numbers.map((screen_num) => {
                      i += 1;
                      return (
                        <Tab
                          style={{ marginTop: "30px" }}
                          eventKey={i}
                          title={"Screen" + screen_num}
                        >
                          {[0, 1, 2, 3, 4, 5, 6].map((day) => {
                            return (
                              <>
                                {/* <h3>{new Date(today.getTime()+day*86400000).getDate()}</h3> */}
                                <h3>
                                  {new Date(
                                    today.getTime() + day * 86400000
                                  ).getDate() +
                                    "/" +
                                    new Date(
                                      today.getTime() + day * 86400000
                                    ).getMonth() +
                                    "/" +
                                    new Date(
                                      today.getTime() + day * 86400000
                                    ).getFullYear()}
                                </h3>
                                <div className="row" style={{ margin: "30px" }}>
                                  <div className="col-3">
                                    {
                                      (isdisable = isButtonDisabled(
                                        screen_num,
                                        day,
                                        0
                                      ))
                                    }
                                    {
                                      (isactive = isButtonActive(
                                        screen_num,
                                        day,
                                        0
                                      ))
                                    }
                                    <Button
                                      onClick={() => {
                                        // if(showsInfo["date"+(day+1)+"s"].includes(0)) console.log(showsInfo["date"+(day+1)+"s"]);
                                        showsInfo = data.ShowsInfo;
                                        showsInfo["screen" + screen_num][
                                          "date" + (day + 1) + "s"
                                        ].push(0);
                                        setData((prevState) => ({
                                          ...prevState,
                                          ShowsInfo: showsInfo,
                                        }));
                                        console.log(data.ShowsInfo);
                                      }}
                                      disabled={isdisable}
                                      active={isactive}
                                      className={
                                        isdisable
                                          ? "btn-outline-dark "
                                          : "btn-outline-primary"
                                      }
                                    >
                                      Morning Show
                                    </Button>
                                  </div>
                                  <div className="col-3">
                                    {
                                      (isdisable = isButtonDisabled(
                                        screen_num,
                                        day,
                                        1
                                      ))
                                    }
                                    {
                                      (isactive = isButtonActive(
                                        screen_num,
                                        day,
                                        1
                                      ))
                                    }
                                    <Button
                                      onClick={() => {
                                        showsInfo = data.ShowsInfo;

                                        showsInfo["screen" + screen_num][
                                          "date" + (day + 1) + "s"
                                        ].push(1);
                                        setData((prevState) => ({
                                          ...prevState,
                                          ShowsInfo: showsInfo,
                                        }));
                                        console.log(data.ShowsInfo);
                                      }}
                                      disabled={isdisable}
                                      active={isactive}
                                      className={
                                        isdisable
                                          ? "btn-outline-dark "
                                          : "btn-outline-primary"
                                      }
                                    >
                                      Afternoon Show
                                    </Button>
                                  </div>
                                  <div className="col-3">
                                    {
                                      (isdisable = isButtonDisabled(
                                        screen_num,
                                        day,
                                        2
                                      ))
                                    }
                                    {
                                      (isactive = isButtonActive(
                                        screen_num,
                                        day,
                                        2
                                      ))
                                    }
                                    <Button
                                      onClick={() => {
                                        showsInfo = data.ShowsInfo;

                                        showsInfo["screen" + screen_num][
                                          "date" + (day + 1) + "s"
                                        ].push(2);
                                        setData((prevState) => ({
                                          ...prevState,
                                          ShowsInfo: showsInfo,
                                        }));
                                        console.log(data.ShowsInfo);
                                      }}
                                      disabled={isdisable}
                                      active={isactive}
                                      className={
                                        isdisable
                                          ? "btn-outline-dark "
                                          : "btn-outline-primary"
                                      }
                                    >
                                      First Show
                                    </Button>
                                  </div>
                                  <div className="col-3">
                                    {
                                      (isdisable = isButtonDisabled(
                                        screen_num,
                                        day,
                                        3
                                      ))
                                    }
                                    {
                                      (isactive = isButtonActive(
                                        screen_num,
                                        day,
                                        3
                                      ))
                                    }
                                    <Button
                                      onClick={() => {
                                        showsInfo = data.ShowsInfo;
                                        showsInfo["screen" + screen_num][
                                          "date" + (day + 1) + "s"
                                        ].push(3);
                                        setData((prevState) => ({
                                          ...prevState,
                                          ShowsInfo: showsInfo,
                                        }));
                                        console.log(data.ShowsInfo);
                                      }}
                                      disabled={isdisable}
                                      active={isactive}
                                      className={
                                        isdisable
                                          ? "btn-outline-dark "
                                          : "btn-outline-primary"
                                      }
                                    >
                                      Second Show
                                    </Button>
                                  </div>
                                </div>
                              </>
                            );
                          })}
                        </Tab>
                      );
                    })}
                  </Tabs>
                </div>
                <div></div>
              </>
            )}
          </div>
        </div>
      </>
    );
  } else return <Preload></Preload>;
};

export default AddMovieShowPage;
