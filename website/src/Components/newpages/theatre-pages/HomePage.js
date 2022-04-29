// Set 1 Usecase 6 - Movie Info Page
// TODO: fetch data from db
import React, { useState } from 'react';

// import { Link } from 'react-router-dom';
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle, 
    Button
  } from "reactstrap";
import { Link } from 'react-router-dom';


const TheatreHomePage = (props) => {
    var [ShowsList, setShowsList] = useState([]);
    var [offset, setOffset] = useState(0);
  
    var showsList = [{"movie_name":"KGF Chapter 2", "screen_num": 2, "show_id": 22, "show_timings":"Morning show"}
        ,{"movie_name":"KGF Chapter 2", "screen_num": 2, "show_id": 22, "show_timings":"Morning show"}
        ,{"movie_name":"KGF Chapter 2", "screen_num": 2, "show_id": 22, "show_timings":"Morning show"}
    ];

    //modify into useEffect
    ShowsList = showsList
    const limit = 5;

    const display_shows =
    showsList.length === limit ? showsList.slice(0, 10) : showsList;


    return (
        <>
            
            <div style={{ marginTop: "60px", marginBottom: "30px" }}>
                <div style={{ marginTop: "30px" }} className="text-center">
                <div style={{marginLeft: "40px"}}>
                <Button>Add a Movie</Button>
                <Link to="/theatres/analytics"> <Button>Analytics</Button></Link>
            </div>
                <p className="text-center">
                    Showing {offset + 1} to{" "}
                    {offset + (showsList.length === limit ? 10 : showsList.length)}{" "}
                    entries
                </p>
                </div>
                {offset != 0 ? (
                <></>
                ) : (
                <div className="float-left" style={{ marginLeft: "50px" }}>
                    <Button
                    block
                    color="primary"
                    size="lg"
                    style={{ marginLeft: "auto", marginRight: "auto" }}
                    onClick={() => setOffset(offset - 10)}
                    >
                    Prev
                    </Button>
                </div>
                )}

                {showsList.length === limit ? (
                <div className="float-right" style={{ marginRight: "50px" }}>
                    <Button
                    block
                    color="primary"
                    size="lg"
                    style={{ marginLeft: "auto", marginRight: "auto" }}
                    onClick={() => setOffset(offset + 10)}
                    >
                    Next
                    </Button>
                </div>
                ) : (
                <></>
                )}
            </div>

            <div
                style={{
                marginTop: "100px",
                marginBottom: "50px",
                marginLeft: "30px",
                marginRight: "30px",
                }}
            >
                <div className="row">
                {showsList.map((show) => {
                    return (
                    <div
                        className="col-12 text-left"
                        style={{ marginTop: "50px", paddingLeft: "30px" }}
                    >
                        <Card>
                            <CardBody>
                            <div>
                                <h2>{show.movie_name}</h2>
                                <Button className='float-right'>Book Tickets</Button>
                                <Button className='float-right'>Extend Show</Button>
                            </div>
                            <hr />
                            <h5>{"Screen "+show.screen_num}</h5>
                            <h5>{show.show_timings}</h5>
                            </CardBody>
                        </Card>
                    </div>
                    );
                })}
                </div>
            </div>
        </>
    );
  }

export default TheatreHomePage;
