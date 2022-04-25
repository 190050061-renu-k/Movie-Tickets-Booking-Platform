// Set 1 Usecase 7 - Artist Info Page
// TODO: fetch data from db
import React, { useState } from 'react';
import "./../../../Assets/css/artistDetails.css";
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle, 
    Button
  } from "reactstrap";
import { Link } from 'react-router-dom';

const ArtistDetails = (props) => {
    var [artistDetails, setArtistDetails] = useState({});
  
    var movies = [{name:"Rocky", id: 1, poster_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/raveena-tandon-5136-24-03-2017-12-31-43.jpg'}, {name:"Srinidhi", id:5, poster_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/raveena-tandon-5136-24-03-2017-12-31-43.jpg'}, {name:"Raveena Tandon", id:5, poster_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/raveena-tandon-5136-24-03-2017-12-31-43.jpg'}, {name:"Sanjay Dutt", id:10, poster_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/raveena-tandon-5136-24-03-2017-12-31-43.jpg'}];  
    var name= "Rocky";
    //modify into useEffect
    artistDetails = {"movies": movies, "name":name};


    //useEffect to fetch genres

    return (
      <div>
          <div className="container text-left" style={{marginTop:"60px"}}>
            <div >
                <h3 style={{fontWeight:'bold'}}>Artist: {artistDetails.name}</h3>
                <h4><i className="nc-icon nc-minimal-right"></i>Movies List</h4>
                <div className='row' >                  
                          {
                              artistDetails.movies.map((movie)=>{
                                  return(
                                    <div className='col-3 text-left' style={{color: 'white', marginTop:'20px', paddingLeft: '30px'}}>
                                        <Link to={"/movie/"+ movie.id}>
                                            <Card>
                                                <CardBody className="setimg">                            
                                                    <img id="mov_img" src={movie.poster_img}></img>
                                                    <p id="list" className="text-center">{movie.name}</p>
                                                </CardBody>
                                            </Card>
                                        </Link>
                                    </div>

                                  );
                              })
                          }
                </div>
            </div>
        </div>
    </div>

    );
  }

export default ArtistDetails;
