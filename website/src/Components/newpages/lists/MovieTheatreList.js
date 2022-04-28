// Set 1 Usecase  - Theatre Detail page for a movie
// TODO: fetch data from db
// movie id we get from useParams, get movie name and theatres data through that

// Structure -->
//movies/5 --> Book Tickets--> movietheatrelist/5 
import React, { useState } from 'react';
import {
    Card,
    CardBody,
    Button,
  } from "reactstrap";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {Tabs, Tab} from 'react-bootstrap';

const MovieTheatreList = (props) => {
    var [theatreDetails, setTheatreDetails] = useState({});
    let {movieid} = useParams();
    var shows = [{"date": new Date(2022,4,26), "theatres": [{"name": "Ramya's INOX", id:1, 
    "show_timings": ["Morning", "Evening"], "screen": 1}, {"name": "Ramya's PVR", id:2, 
    "show_timings": ["Afternoon", "Evening"], "screen": 1}]},{"date": new Date(2022,4,27),
     "theatres": [{"name": "Ramya's INOX",id:1, "show_timings": ["Morning", "Evening"], "screen": 1}]},
     {"date": new Date(2022,4,28), "theatres": [{"name": "Ramya's PVR",
     id:2,"show_timings": ["Afternoon", "Evening"], "screen": 1}]}];  
     var moviename = "K.G.F. Chapter 2";
    //modify into useEffect
    theatreDetails = {"shows": shows,  "id": movieid, name: moviename};
    var i = -1;


    return (
      <div>
          <div className="container text-left" style={{marginTop:"60px"}}>
            <div >
                <Card>
                    <CardBody>
                        <div>
                            <h2 style={{display: "inline"}}>{theatreDetails.name}</h2>
                            <h5>Select Theatre and Screen to book tickets</h5>
                        </div>
                        
                    </CardBody>
                </Card>
            </div>
        </div>
        <div className="container text-left" style={{marginTop:"30px"}}>
            <Card>
                <CardBody>
                    
                    <Tabs defaultActiveKey={0}>{
                        shows.map((show)=>{
                            i+=1;
                            return(
                                <Tab style={{marginTop:"30px"}} eventKey={i} title={show.date.getDate()+"/"+show.date.getMonth()}>
                                    {
                                        show.theatres.map((theatre)=>{
                                            return(
                                                <>
                                                <div className='row'>
                                                    <div className='col-4'>
                                                        <Link to={"/theatres"} >{theatre.name}</Link>
                                                    </div>
                                                    <div className='col-2'>
                                                        <p>Screen {theatre.screen}</p>
                                                    </div>
                                                    <div className='col-6'>
                                                        {
                                                            theatre.show_timings.map((show_)=>{
                                                                return(
                                                                    <Button style={{marginTop:'0px', marginLeft:'5px'}} className='btn-outline-primary'>
                                                                        {show_}
                                                                    </Button>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    
                                                </div>
                                                    <hr style={{color:"black"}}/>
                                                </>
                                            )
                                        })
                                    }
                                    
                                </Tab>
                            )
                        })
                    }
                    </Tabs>
                </CardBody>
            </Card>
        </div>
    </div>

    );
  }

export default MovieTheatreList;
