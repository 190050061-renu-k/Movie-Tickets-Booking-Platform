import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import {Card,CardHeader,CardBody,CardTitle,Row,Col,} from "reactstrap";
import VenueGraph from "./VenueGraph";
import VenuePie from "./VenuePie";
import Preload from "Components/layouts/Preload";

const Venue = (props) => {
  let { venue_id } = useParams();
  const [isLoading, setisLoading] = useState(0);
  const [venue, setVenue] = useState({});

  useEffect(() => {
    getVenues();
  }, [venue_id]);

  function getVenues() {
    setisLoading(1);
    fetch("http://localhost:3001/getVenueInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ venue_id }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setVenue(data);
        setisLoading(2);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (isLoading == 2) {
    let info = venue.basicInfo[0];
    return(<>
      <div className="content">
          <Row>
            <Col md="9" style={{marginLeft:'auto', marginRight:'auto'}}>
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">
                    Venue - {info.venue_name}
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div style={{textAlign:"center"}}>
                    <Row  style={{textAlign:"left", marginLeft:"5px"}}>
                          <Col md= "4" sm="6">
                              <p><b>Address: </b>{info.city_name + ", " + info.country_name}</p>
                          </Col>
                          <Col md= "4" sm="6"><p><b>Capacity: </b>{info.capacity}</p></Col>
                          <Col md= "4" sm="6"><p><b>Matches played: </b>{info.matches_played}</p></Col>
                          <Col md= "4" sm="6"><p><b>Highest total recorded: </b>{venue.extremeScores[0].highest_scored}</p></Col>
                          <Col md= "4" sm="6"><p><b>Lowest total recorded: </b>{venue.extremeScores[0].least_scored}</p></Col>
                          <Col md= "4" sm="6"><p><b>Highest score chased: </b>{venue.highestChased[0].highest_chased}</p></Col>
                      </Row> 
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col md = "6" style={{marginLeft:'auto', marginRight:'auto'}}>
              <VenuePie
                differentWins = {venue.differentWins[0]}
              ></VenuePie>
            </Col>
            <Col md = "6" style={{marginLeft:'auto', marginRight:'auto'}}>
              <VenueGraph
                averageScore = {venue.averageScore}
              ></VenueGraph>
            </Col>
          </Row>
        </div>
    </>);
    
  }
  else return (<Preload></Preload>);
};

export default Venue;
