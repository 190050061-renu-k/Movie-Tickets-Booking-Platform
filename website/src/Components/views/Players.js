import React, { useState, useEffect } from "react";
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
import { Link } from "react-router-dom";

const Players = (props) => {
  let [players, setPlayers] = useState({});
  let [isLoading, setisLoading] = useState(0);
  const [skips, setSkips] = useState(0);
  const limit = 31;

  useEffect(() => {
    getPlayers();
  }, [skips]);

  function getPlayers() {
    setisLoading(1);
    fetch("http://localhost:3001/getPlayers", {
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
        setPlayers(data);
        setisLoading(2);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (isLoading == 2) {
    const show_players = players.length === 31 ? players.slice(0, 30) : players;
    return (
      <div class="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h3">Players</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th className="text-center">Player Name</th>
                      <th className="text-center">Country Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {show_players.map((player) => {
                      return (
                        <tr className="hoverMatch">
                          <td className="text-center">
                            <Link to={"/players/" + player.player_id}>
                              {player.player_name}
                            </Link>
                          </td>
                          <td className="text-center">{player.country_name}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
                <p>
                  Showing {skips + 1} to{" "}
                  {skips + (players.length === 31 ? 30 : players.length)}{" "}
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
                      onClick={() => setSkips(skips - 30)}
                    >
                      Previous
                    </Button>
                  </div>
                )}
                {players.length === 31 ? (
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
    );
  } else return <Preload></Preload>;
};

export default Players;
