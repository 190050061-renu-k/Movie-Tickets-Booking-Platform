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
import { VisibilityContext } from "react-horizontal-scrolling-menu";

import { Link } from 'react-router-dom';
import { ScrollMenu } from "react-horizontal-scrolling-menu";


const HomePage = (props) => {
    var [MoviesList, setMoviesList] = useState([]);
  
    var moviesList = [{"name":"High Rated Movies", "mvs":[{name:"Rocky", id: 1, poster_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/raveena-tandon-5136-24-03-2017-12-31-43.jpg'}, {name:"Srinidhi", id:5, poster_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/raveena-tandon-5136-24-03-2017-12-31-43.jpg'}, {name:"Raveena Tandon", id:5, poster_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/raveena-tandon-5136-24-03-2017-12-31-43.jpg'}, {name:"Sanjay Dutt", id:10, poster_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/raveena-tandon-5136-24-03-2017-12-31-43.jpg'}, {name:"Rocky", id: 1, poster_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/raveena-tandon-5136-24-03-2017-12-31-43.jpg'}, {name:"Srinidhi", id:5, poster_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/raveena-tandon-5136-24-03-2017-12-31-43.jpg'}, {name:"Raveena Tandon", id:5, poster_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/raveena-tandon-5136-24-03-2017-12-31-43.jpg'}, {name:"Sanjay Dutt", id:10, poster_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/raveena-tandon-5136-24-03-2017-12-31-43.jpg'}, {name:"Rocky", id: 1, poster_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/raveena-tandon-5136-24-03-2017-12-31-43.jpg'}, {name:"Srinidhi", id:5, poster_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/raveena-tandon-5136-24-03-2017-12-31-43.jpg'}, {name:"Raveena Tandon", id:5, poster_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/raveena-tandon-5136-24-03-2017-12-31-43.jpg'}, {name:"Sanjay Dutt", id:10, poster_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/raveena-tandon-5136-24-03-2017-12-31-43.jpg'}]}
        ,{"name":"Upcoming Movies","mvs":[{name:"Rocky", id: 1, poster_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/raveena-tandon-5136-24-03-2017-12-31-43.jpg'},{name:"Srinidhi", id:5, poster_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/raveena-tandon-5136-24-03-2017-12-31-43.jpg'}, {name:"Raveena Tandon", id:5, poster_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/raveena-tandon-5136-24-03-2017-12-31-43.jpg'}, {name:"Sanjay Dutt", id:10, poster_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/raveena-tandon-5136-24-03-2017-12-31-43.jpg'}]}
        ,{"name":"Recommended Movies","mvs":[{name:"Rocky", id: 1, poster_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/raveena-tandon-5136-24-03-2017-12-31-43.jpg'}, {name:"Srinidhi", id:5, poster_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/raveena-tandon-5136-24-03-2017-12-31-43.jpg'}, {name:"Raveena Tandon", id:5, poster_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/raveena-tandon-5136-24-03-2017-12-31-43.jpg'}, {name:"Sanjay Dutt", id:10, poster_img: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/raveena-tandon-5136-24-03-2017-12-31-43.jpg'}]}
    ];
    var i = -1;

    //modify into useEffect
    MoviesList = moviesList


    //useEffect to fetch genres

    return (
        <div>
            <div className="container text-left" style={{marginTop:"60px"}}>
                {
                    moviesList.map((list)=>{
                        i=-1;
                        return(
                            <Card>
                                <CardBody>
                                    <h3>{list.name}</h3>
                                    <div>
                                        <ScrollMenu
                                            options={{
                                            ratio: 0.9,
                                            rootMargin: "5px",
                                            threshold: [0.01, 0.05, 0.5, 0.75, 0.95, 1]
                                            }}
                                            >
                                        {list.mvs.map((movie)=>{
                                            i+=1;
                                            return (
                                                <div itemID={i}
                                                key={i} className='text-left' style={{color: 'white', marginTop:'20px', paddingLeft: '30px', width: '200px'}}>
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
                                        })}
                                        </ScrollMenu>
                                    </div>
                                </CardBody>
                            </Card>
                        );
                    })
                }
                
            </div>
        </div>
    );
  }

export default HomePage;
