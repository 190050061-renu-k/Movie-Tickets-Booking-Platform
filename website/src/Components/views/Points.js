import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
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
import Preload from "Components/layouts/Preload";

const Points = (props) => {
  let { year } = useParams();
  const [isLoading, setisLoading] = useState(0);
  const [points, setPoints] = useState({});

  useEffect(() => {
    getPoints();
  }, [year]);

  function getPoints() {
    setisLoading(1);
    fetch("http://localhost:3001/getPoints", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ year }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPoints(data);
        setisLoading(2);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (isLoading == 2) {
    let wins = points.wins;
    let nrr = [];
    for (let ind in wins) {
      if (points.matches[ind].matches === "0") nrr.push(-100);
      else
        nrr.push(
          (
            (points.runs_played[ind].total_runs * 6) /
              points.balls_faced[ind].balls_faced -
            (points.runs_conceded[ind].runs_conceded * 6) /
              points.balls_bowled[ind].balls_bowled
          ).toFixed(2)
        );
    }
    var teams_indices = Array.from(Array(wins.length).keys()).sort((a, b) =>
      wins[a].wins < wins[b].wins ||
      (wins[a].wins === wins[b].wins && nrr[a] < nrr[b])
        ? wins[a].wins < wins[b].wins ||
          (wins[a].wins === wins[b].wins && nrr[a] < nrr[b]) | 0
        : -1
    );

    return (
      <>
        <div class="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h3">
                    Select Year to view Points Table
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <Row>
                    {points.years.map((y) => {
                      return (
                        <Col>
                          <Link
                            to={"/pointstable/" + y.season_year}
                            style={{ color: "white", textDecoration: "None" }}
                          >
                            <Button
                              block
                              color="primary"
                              style={{
                                marginLeft: "auto",
                                marginRight: "auto",
                              }}
                            >
                              {y.season_year}
                            </Button>
                          </Link>
                        </Col>
                      );
                    })}
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {year == "0" ? (
            <></>
          ) : (
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">
                    Points Table for Year - {" " + year}
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive hover striped>
                    <thead className="text-primary">
                      <tr>
                        <th>Team Name</th>
                        <th>Matches</th>
                        <th>Won</th>
                        <th>Lost</th>
                        <th>Ties</th>
                        <th>NRR</th>
                        <th className="text-right">Points</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teams_indices.map((ind) => {
                        if (points.matches[ind].matches != 0) {
                          return (
                            <tr className="hoverMatch">
                              <td>{points.teams[ind].team_name}</td>
                              <td>{points.matches[ind].matches}</td>
                              <td>{points.wins[ind].wins}</td>
                              <td>
                                {points.matches[ind].matches -
                                  points.wins[ind].wins -
                                  points.ties[ind].ties}
                              </td>
                              <td>{points.ties[ind].ties}</td>
                              <td>{nrr[ind]}</td>
                              <td className="text-right">
                                {2 * points.wins[ind].wins}
                              </td>
                            </tr>
                          );
                        } else return <></>;
                      })}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          )}
        </div>
      </>
    );
  } else return <Preload></Preload>;
};

export default Points;
