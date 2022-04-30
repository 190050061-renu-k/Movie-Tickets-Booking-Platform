import React, { useState, useEffect } from "react";
import Preload from "Components/layouts/Preload";
import { Button } from "reactstrap";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";
import { Link } from "react-router-dom";

const AllVenues = (props) => {
  let [venues, setVenues] = useState({});
  let [isLoading, setisLoading] = useState(0);

  useEffect(() => {
    getVenues();
  }, []);

  function getVenues() {
    setisLoading(1);
    fetch("http://localhost:3001/getVenues")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setVenues(data);
        setisLoading(2);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (isLoading == 2) {
    return (
      <div class="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h3">Venues</CardTitle>
                <Link to="/venues/add" className="float-left" style={{textDecoration:"None"}}>
                  <Button
                    block
                    color="primary"
                    style={{ marginLeft: "auto", marginRight: "auto" }}  
                  >Add new Venue</Button>
                  </Link>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <tbody>
                    {venues.map((y) => {
                      return (
                        <tr className="hoverMatch">
                          <td className="text-center">
                            <Link  to={"/venue/" + y.venue_id}>
                              {y.venue_name}
                            </Link>
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
    );
  } else return (<Preload></Preload>);
};

export default AllVenues;
