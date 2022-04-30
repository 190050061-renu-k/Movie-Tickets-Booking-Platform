import Preload from "Components/layouts/Preload";
import React, { useState, useEffect } from "react";
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

function Matches() {
  const [matches, setMatches] = useState([]);
  const [isLoading, setisLoading] = useState(0);
  const [skips, setSkips] = useState(0);
  const limit = 11;

  useEffect(() => {
    getMatches();
  }, [skips]);

  function getMatches() {
    setisLoading(1);
    fetch("http://localhost:3001/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ skips, limit }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setMatches(data);
        setisLoading(2);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (isLoading == 2) {
    const show_matches = matches.length === 11 ? matches.slice(0, 10) : matches;
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Matches</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Season Year</th>
                        <th>Team1 vs Team2</th>
                        <th>Venue</th>
                        <th className="text-right">Winner</th>
                      </tr>
                    </thead>
                    <tbody>
                      {show_matches.map((match) => {
                        return (
                          <tr className="hoverMatch">
                            <td>{match.season_year}</td>
                            <td>
                              <Link
                                to={"/matches/" + match.match_id}
                                seasonyear={match.season_year}
                              >
                                {match.t1 + " vs " + match.t2}
                              </Link>
                            </td>
                            <td>
                              {match.venue_name +
                                ", " +
                                match.city_name +
                                ", " +
                                match.country_name}
                            </td>
                            <td className="text-right">{match.w}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                  <p>
                    Showing {skips + 1} to{" "}
                    {skips + (matches.length === 11 ? 10 : matches.length)}{" "}
                    entries
                  </p>
                  <br></br>
                  {skips === 0 ? (
                    <></>
                  ) : (
                    <div className="float-left">
                      <Button
                        block
                        color="primary"
                        style={{ marginLeft: "auto", marginRight: "auto" }}
                        onClick={() => setSkips(skips - 10)}
                      >
                        Previous
                      </Button>
                    </div>
                  )}
                  {matches.length === 11 ? (
                    <div className="float-right">
                      <Button
                        block
                        color="primary"
                        style={{ marginLeft: "auto", marginRight: "auto" }}
                        onClick={() => setSkips(skips + 10)}
                      >
                        Next
                      </Button>
                    </div>
                  ) : (
                    <></>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  } else return <Preload></Preload>;
}

export default Matches;
