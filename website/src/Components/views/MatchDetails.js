import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import ScoreChart from "./ScoreComp";
import Preload from "Components/layouts/Preload";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
} from "reactstrap";
import PieChart from "./PieChart";

function MatchDetails(props) {
  let { match_id } = useParams();
  const [info, setInfo] = useState({});
  const [isLoading, setisLoading] = useState(0);
  const [scores, setScore] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const inns = ["1", "2"];

  useEffect(() => {
    getInfo();
  }, [match_id]);

  function getInfo() {
    setisLoading(1);
    fetch("http://localhost:3001/getInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ match_id }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setInfo(data);
        setisLoading(2);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const border = {
    border: "1px solid #e3e8e5",
  };
  if (isLoading == 2) {
    const bats =
      info.batTeams[0].innings_no == "1"
        ? [info.batTeams[0].team_name, info.batTeams[1].team_name]
        : [info.batTeams[1].team_name, info.batTeams[0].team_name];

    return (
      <>
        <div className="content">
          <h4>
            {bats[0] + " vs " + bats[1] + ", " + info.matchinfo[0].season_year}{" "}
          </h4>

          <br />
          <Row>
            <Col md="6">
              <Button
                block
                color="primary"
                style={{ marginLeft: "auto", marginRight: "auto" }}
                onClick={() => {
                  setScore(!scores);
                  if (showSummary) setShowSummary(!showSummary);
                }}
              >
                {scores ? "Hide Score" : "Show Score"}
              </Button>
            </Col>
            <Col md="6">
              <Button
                block
                color="primary"
                style={{ marginLeft: "auto", marginRight: "auto" }}
                onClick={() => {
                  setShowSummary(!showSummary);
                  if (scores) setScore(!scores);
                }}
              >
                {showSummary ? "Hide Match Summary" : "Show Match Summary"}
              </Button>
            </Col>
          </Row>

          {scores ? (
            <ScoreChart
              scores={info.score}
              batting={bats}
              info={info.matchinfo[0]}
            />
          ) : (
            <></>
          )}
          <br />
          {/* Match Summary */}
          {showSummary ? (
            <Row>
              <Col md="12">
                <Card>
                  <CardHeader>
                    <CardTitle tag="h3">
                      Match Summary: {match_id}, IPL,{" "}
                      {info.matchinfo[0].season_year}
                    </CardTitle>
                    <h5></h5>
                  </CardHeader>
                  <CardBody>
                    {inns.map((inn) => {
                      return (
                        <>
                          <Row className="text-center" style={{ padding: 15 }}>
                            <Col md="4">
                              <span style={{ fontSize: 15 }}>
                                {bats[parseInt(inn) - 1]}{" "}
                              </span>
                              {info.matchinfo[0].toss_winner ==
                              bats[parseInt(inn) - 1] ? (
                                <b>(TOSS)</b>
                              ) : (
                                <></>
                              )}
                            </Col>
                            <Col md="4">
                              {info.summary[parseInt(inn) - 1].overs} overs
                            </Col>
                            <Col md="4">
                              {info.summary[parseInt(inn) - 1].total_runs}-
                              {info.summary[parseInt(inn) - 1].total_wickets}
                            </Col>
                          </Row>
                          <Row>
                            <Col md="6">
                              <Table responsive striped bordered hover={true}>
                                <thead className="text-primary">
                                  <tr>
                                    <th style={border} className="text-center">
                                      Batter
                                    </th>
                                    <th style={border} className="text-center">
                                      Runs
                                    </th>
                                    <th style={border} className="text-right">
                                      Balls Faced
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {info.topBatters.map((b) => {
                                    if (b.innings_no == inn)
                                      return (
                                        <tr className="hoverMatch">
                                          <td className="text-center">
                                            <Link
                                              to={"/players/" + b.player_id}
                                            >
                                              {b.player_name}
                                            </Link>
                                          </td>
                                          <td className="text-center">
                                            {b.total_runs}
                                          </td>
                                          <td className="text-right">
                                            {b.balls_faced}
                                          </td>
                                        </tr>
                                      );
                                    else return <></>;
                                  })}
                                </tbody>
                              </Table>
                            </Col>
                            <Col md="6">
                              <Table responsive striped bordered hover>
                                <thead className="text-primary">
                                  <tr>
                                    <th style={border} className="text-center">
                                      Bowler
                                    </th>
                                    <th style={border} className="text-center">
                                      Wickets - Runs given
                                    </th>
                                    <th style={border} className="text-right">
                                      Balls bowled
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {info.topBowlers.map((b) => {
                                    if (b.innings_no == "1")
                                      return (
                                        <tr className="hoverMatch">
                                          <td className="text-center">
                                            <Link
                                              to={"/players/" + b.player_id}
                                            >
                                              {b.player_name}
                                            </Link>
                                          </td>
                                          <td className="text-center">
                                            {b.wickets_taken +
                                              "-" +
                                              b.runs_given}
                                          </td>
                                          <td className="text-right">
                                            {b.balls_bowled}
                                          </td>
                                        </tr>
                                      );
                                    else return <></>;
                                  })}
                                </tbody>
                              </Table>
                            </Col>
                          </Row>

                          <hr></hr>
                        </>
                      );
                    })}

                    <h5 className="text-center">
                      {info.matchinfo[0].win_type
                        ? info.matchinfo[0].match_winner +
                          " WON BY " +
                          info.matchinfo[0].win_margin +
                          " " +
                          info.matchinfo[0].win_type
                        : "Match Drawn"}
                    </h5>
                  </CardBody>
                </Card>
              </Col>
              <Col md="6" style={{ marginRight: "auto", marginLeft: "auto" }}>
                <PieChart
                  runsSummary={info.getRunsSummary}
                  batting={bats[0]}
                  inn_no="1"
                ></PieChart>
              </Col>
              <Col md="6">
                <PieChart
                  runsSummary={info.getRunsSummary}
                  batting={bats[1]}
                  inn_no="2"
                ></PieChart>
              </Col>
            </Row>
          ) : (
            <></>
          )}
          <hr />
          <br />
          <h3>Innings</h3>
          <div className="content">
            {inns.map((inn) => {
              return (
                <Row>
                  <Col md="12">
                    <Card>
                      <CardHeader>
                        <CardTitle tag="h4">
                          Innings-{inn} (Batting :{" "}
                          {info.batTeams[0].innings_no == inn
                            ? info.batTeams[0].team_name
                            : info.batTeams[1].team_name}
                          )
                        </CardTitle>
                      </CardHeader>
                      <CardBody>
                        <p>Extras : {info.summary[parseInt(inn) - 1].extras}</p>
                        <p>
                          Total Score :{" "}
                          {info.summary[parseInt(inn) - 1].total_runs +
                            "-" +
                            info.summary[parseInt(inn) - 1].total_wickets}
                        </p>
                        <Table responsive>
                          <thead className="text-primary">
                            <tr>
                              <th>Batter</th>
                              <th>Runs</th>
                              <th>Fours</th>
                              <th>Sixes</th>
                              <th className="text-right">Balls Faced</th>
                            </tr>
                          </thead>
                          <tbody>
                            {info.Bat.map((b) => {
                              if (b.innings_no == inn)
                                return (
                                  <tr className="hoverMatch">
                                    <td>
                                      <Link to={"/players/" + b.player_id}>
                                        {b.player_name}
                                      </Link>
                                    </td>
                                    <td>{b.total_runs}</td>
                                    <td>{b.fours}</td>
                                    <td>{b.sixes}</td>
                                    <td className="text-right">
                                      {b.balls_faced}
                                    </td>
                                  </tr>
                                );
                              else return <></>;
                            })}
                          </tbody>
                        </Table>

                        <hr></hr>
                        <Table responsive>
                          <thead className="text-primary">
                            <tr>
                              <th>Bowler</th>
                              <th>Balls Bowled</th>
                              <th>Runs Given</th>
                              <th className="text-right">Wickets Taken</th>
                            </tr>
                          </thead>
                          <tbody>
                            {info.Bowl.map((b) => {
                              if (b.innings_no == inn)
                                return (
                                  <tr className="hoverMatch">
                                    <td>
                                      <Link to={"/players/" + b.player_id}>
                                        {b.player_name}
                                      </Link>
                                    </td>
                                    <td>{b.balls_bowled}</td>
                                    <td>{b.runs_given}</td>
                                    <td className="text-right">{b.wickets}</td>
                                  </tr>
                                );
                              else return <></>;
                            })}
                          </tbody>
                        </Table>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              );
            })}
            <Row>
              <Col md="12">
                <Card>
                  <CardHeader>
                    <CardTitle tag="h4">Match Info</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <h5>
                      {"Match: " + info.matchinfo[0].match_id + ", "}
                      {info.matchinfo[0].team1_name} vs{" "}
                      {info.matchinfo[0].team2_name},{" "}
                      {info.matchinfo[0].season_year}
                    </h5>
                    <p>Toss winner: {info.matchinfo[0].toss_winner}</p>
                    <p>
                      Venue: {info.matchinfo[0].venue_name}
                      {", "}
                      {info.matchinfo[0].city_name}
                      {", "}
                      {info.matchinfo[0].country_name}
                    </p>
                    <Table responsive>
                      <thead className="text-primary">
                        <tr>
                          <th>Umpires</th>
                          <th className="text-right">Role</th>
                        </tr>
                      </thead>
                      <tbody>
                        {info.umpires.map((b) => {
                          return (
                            <tr className="hoverMatch">
                              <td>{b.umpire_name}</td>
                              <td className="text-right">{b.role_desc}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                    <hr></hr>
                    <h5>Players</h5>

                    <Table responsive>
                      <thead className="text-primary">
                        <tr>
                          <th>{info.matchinfo[0].team1_name}</th>
                          <th className="text-right">
                            {info.matchinfo[0].team2_name}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {[...Array(11).keys()].map((i) => {
                          return (
                            <tr className="hoverMatch">
                              <td>{info.team1[i].player_name}</td>
                              <td className="text-right">
                                {info.team2[i].player_name}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </>
    );
  } else return <Preload></Preload>;
}

export default MatchDetails;
