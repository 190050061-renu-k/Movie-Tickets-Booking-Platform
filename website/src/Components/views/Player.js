import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import Preload from "Components/layouts/Preload";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
import { useParams } from "react-router";
import MixedChart from "./MixedChart";

function Player() {
  let { player_id } = useParams();
  let [isLoading, setisLoading] = useState(0);
  let [player, setPlayer] = useState({});

  useEffect(() => {
    getPlayer();
  }, [player_id]);

  function getPlayer() {
    setisLoading(1);
    fetch("http://localhost:3001/getPlayerInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ player_id }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPlayer(data);
        setisLoading(2);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (isLoading == 2) {
    let flagBat = player.battingInfo.length;
    let flagBowl = player.bowlingInfo.length;
    let stats = { match_ids: [], runs: [], backgroundColor: [] };
    for (let x in player.battingChart) {
      let runs = player.battingChart[x].runs;
      stats.match_ids.push(player.battingChart[x].match_id);
      stats.runs.push(runs);
      // ["aqua", "green", "red", "yellow"]
      if (runs < 30) {
        stats.backgroundColor.push("#e04631");
      } else if (runs <= 50) {
        stats.backgroundColor.push("#b8b63e");
      } else {
        stats.backgroundColor.push("#96d45f");
      }
    }

    return (
      <>
        <div className="content">
          <Row>
            <Col md="4" style={{ marginRight: "auto", marginLeft: "auto" }}>
              <Card className="card-user">
                <div className="image">
                  <img alt="..." src={require("Assets/img/ball.jpg").default} />
                </div>
                <CardBody>
                  <div style={{ textAlign: "center" }}>
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatar border-gray"
                        src={require("Assets/img/avatar.jpg").default}
                      />
                      <h5 className="title">
                        {player.playerInfo[0].player_name}
                      </h5>
                    </a>
                    <p className="description" style={{ marginTop: "-5px" }}>
                      {player.playerInfo[0].country_name}
                    </p>
                  </div>
                </CardBody>
                <CardFooter style={{ marginTop: "-20px" }}>
                  <hr />
                  <div className="button-container">
                    <Row>
                      <Col className="ml-auto" lg="6" md="6" xs="6">
                        <p style={{ fontSize: 15 }}>
                          Batting Style
                          <br />
                          <small>{player.playerInfo[0].batting_hand}</small>
                        </p>
                      </Col>
                      <Col className="ml-auto mr-auto" lg="6" md="6" xs="6">
                        <p style={{ fontSize: 15 }}>
                          Bowling Skill
                          <br />
                          <small>{player.playerInfo[0].bowling_skill}</small>
                        </p>
                      </Col>
                    </Row>
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col md="4">
              <Card className="card-user">
                <div className="image">
                  <img alt="..." src={require("Assets/img/ball.jpg").default} />
                </div>
                <CardBody>
                  <div style={{ textAlign: "center" }}>
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatar border-gray"
                        src={require("Assets/img/batter.png").default}
                      />
                      <h5 className="title">Batting Career</h5>
                    </a>
                    {flagBat == 0 ? (
                      <p>0 Matches batted</p>
                    ) : (
                      <Row
                        style={{
                          textAlign: "left",
                          marginLeft: "4px",
                          fontSize: 12,
                        }}
                      >
                        <Col md="6">
                          <p>
                            <b>Matches: </b>
                            {player.battingInfo[0].matches_batted}
                          </p>
                        </Col>
                        <Col md="6">
                          <p>
                            <b>Runs: </b>
                            {player.battingInfo[0].runs}
                          </p>
                        </Col>
                        <Col md="6">
                          <p>
                            <b>Fours: </b>
                            {player.battingInfo[0].fours}
                          </p>
                        </Col>
                        <Col md="6">
                          <p>
                            <b>Sixes: </b>
                            {player.battingInfo[0].sixes}
                          </p>
                        </Col>
                        <Col md="6">
                          <p>
                            <b>Fifties: </b>
                            {player.battingInfo[0].fifties}
                          </p>
                        </Col>
                        <Col md="6">
                          <p>
                            <b>Highest Score: </b>
                            {player.battingInfo[0].hs}
                          </p>
                        </Col>
                        <Col md="6">
                          <p>
                            <b>Strike Rate: </b>
                            {player.battingInfo[0].strike_rate}
                          </p>
                        </Col>
                        <Col md="6">
                          <p>
                            <b>Average: </b>
                            {player.battingInfo[0].average}
                          </p>
                        </Col>
                      </Row>
                    )}
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col md="4">
              <Card className="card-user">
                <div className="image">
                  <img alt="..." src={require("Assets/img/ball.jpg").default} />
                </div>
                <CardBody>
                  <div style={{ textAlign: "center" }}>
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatar border-gray"
                        src={require("Assets/img/wicket.jpeg").default}
                      />
                      <h5 className="title">Bowling Career</h5>
                    </a>
                    {flagBowl == 0 ? (
                      <p>0 Matches bowled</p>
                    ) : (
                      <Row
                        style={{
                          textAlign: "left",
                          marginLeft: "5px",
                          fontSize: 12,
                        }}
                      >
                        <Col md="6">
                          <p>
                            <b>Matches: </b>
                            {player.bowlingInfo[0].matches_bowled}
                          </p>
                        </Col>
                        <Col md="6">
                          <p>
                            <b>Runs: </b>
                            {player.bowlingInfo[0].runs_given}
                          </p>
                        </Col>
                        <Col md="6">
                          <p>
                            <b>Balls: </b>
                            {player.bowlingInfo[0].balls_bowled}
                          </p>
                        </Col>
                        <Col md="6">
                          <p>
                            <b>Overs: </b>
                            {player.bowlingInfo[0].overs_bowled}
                          </p>
                        </Col>
                        <Col md="6">
                          <p>
                            <b>Wickets: </b>
                            {player.bowlingInfo[0].wickets}
                          </p>
                        </Col>
                        <Col md="6">
                          <p>
                            <b>Economy: </b>
                            {player.bowlingInfo[0].economy}
                          </p>
                        </Col>
                        <Col md="12">
                          <p>
                            <b>Five Wickets: </b>
                            {player.bowlingInfo[0].five}
                          </p>
                        </Col>
                      </Row>
                    )}
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col md="12" id="batstats">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Batting Statistics</CardTitle>
                </CardHeader>
                <CardBody>
                  <Bar
                    yAxisID="Runs"
                    xAxisID="Match"
                    data={{
                      // Name of the variables on x-axies for each bar
                      labels: stats.match_ids,
                      datasets: [
                        {
                          // Label for bars
                          label:
                            "Runs <30 : Red,  Runs >=30 and <=50 : Yellow, Runs >50 : Green",
                          data: stats.runs, // Data or value of your each variable
                          backgroundColor: stats.backgroundColor, // Color of each bar
                          borderColor: stats.backgroundColor, // Border color of each bar
                          borderWidth: 0.5,
                          maxBarThickness: 50,
                        },
                      ],
                    }}
                    height={400} // Height of graph
                    options={{
                      plugins: { datalabels: { color: "transparent" } },

                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          ticks: {
                            // The y-axis value will start from zero
                            beginAtZero: true,
                          },
                          title: {
                            display: true,
                            text: "Runs in given match",
                          },
                        },
                        x: {
                          title: {
                            display: true,
                            text: "Match ID",
                          },
                        },
                      },
                    }}
                  />
                </CardBody>
              </Card>
            </Col>
            <Col md="12" id="bowlstats">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Bowling Statistics</CardTitle>
                </CardHeader>
                <CardBody>
                  <MixedChart
                    bowlingChart={player.bowlingChart}
                    linelabel="Wickets"
                    barlabel="Runs Conceded"
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  } else return <Preload></Preload>;
}

export default Player;
