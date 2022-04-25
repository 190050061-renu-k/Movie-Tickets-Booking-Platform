// Set 1 Usecase 6 - Movie Info Page
// TODO: fetch data from db
import React, { useState } from 'react';
import "./../../../Assets/css/movieDetails.css";
// import { Link } from 'react-router-dom';
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle, 
    Button
  } from "reactstrap";
import { Link } from 'react-router-dom';

const MovieDetails = (props) => {
    var [MovieDetails, setMovieDetails] = useState({});
  
    var artists = [{name:"Rocky", id: 1}, {name:"Srinidhi", id:5}, {name:"Raveena Tandon", id:5}, {name:"Sanjay Dutt", id:10}];  
    var genres= [{name:"Hype",id:1},{name: "Action", id:10}];
    var languages = [{name:"Hindi",id:1},{name: "English", id:10}];
    var isRelease = 1; // fetch from data
    var releaseDate = "14-Apr-2022";
    var name = "K.G.F. Chapter 2";
    var description = "The blood-soaked land of Kolar Gold Fields (KGF) has a new overlord now - Rocky whose name strikes fear in the heart of his foes. His allies look up to Rocky as their saviour, the government sees him as a threat to law and order; enemies are clamouring for revenge and conspiring for his downfall. Bloodier battles and darker days await as Rocky continues on his quest for unchallenged supremacy.";
    var poster_img = 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/raveena-tandon-5136-24-03-2017-12-31-43.jpg';
    //modify into useEffect
    MovieDetails = {"genres": genres, "languages":languages, "isRelease":isRelease, "releaseDate": releaseDate,
                    "description": description, "artists": artists, "name":name, "poster_img": poster_img};


    //useEffect to fetch genres

    return (
      <div>
        <div className="align-items-center  bg-dark" id = "info1" style={{marginTop:'60px'}}>
          <div className="container">
            <div >
              <img src={MovieDetails.poster_img} alt="Snow" className='center'/>

                <div className='row' >                  
                  <div className='col-9 text-left' style={{color: 'white', marginTop:'50px', paddingLeft: '30px'}}>
                      <h3 style={{fontWeight:'bold'}}>{MovieDetails.name}</h3>
                      {MovieDetails.isRelease ? <p>Release Date: {MovieDetails.releaseDate}</p> : <></>}
                      <Card>
                        <CardBody>
                        {MovieDetails.isRelease ? 
                          <>
                          <h5 style={{display:'inline', fontSize: '1.5em'}}>IMDB Rating: 00.00</h5>
                          <Button className='text-light float-right'>Rate Now</Button>
                          </>
                          :
                          <>
                          <h5 style={{display:'inline', fontSize: '1.5em'}}>Yet to be Released</h5>
                          <Button className='text-light float-right'>Notify me</Button>
                          </>
                        }
                        </CardBody>
                      </Card>
                      <div className='row'>
                        <div className='col-6'>
                          <Card>
                            <CardBody>
                              {MovieDetails.genres.map((i)=>{
                                return(
                                  <span style={{fontWeight:"bold"}}>{i.name} </span>
                                );
                              })}
                            </CardBody>
                          </Card>
                        </div>
                        <div className='col-6'>
                          <Card>
                            <CardBody>
                            {MovieDetails.languages.map((i)=>{
                                return(
                                  <span style={{fontWeight:"bold"}}>{i.name} </span>
                                );
                              })}
                            </CardBody>
                          </Card>
                        </div>
                      </div> 

                      <Button className='bg-primary' size='lg'>Book Tickets</Button>
                  </div>
                </div>
            </div>

                 
        </div>
        
        </div>
        <div className='container text-left' >
          <h4>Description</h4>
          <p style={{fontSize:"1.15em"}}>
            {MovieDetails.description}             
          </p>
          <hr/>
          <h4>Cast</h4>
          {MovieDetails.artists.map((artist)=>{
            var path = "artist/" + artist.id;
            return(
              <Link to={path} style={{padding:"5px"}}>
            <Button className='btn-outline-primary'>
               {artist.name}
            </Button>
            </Link>
            );
          })}
          <hr/>
        </div>
    </div>

    );
  }

export default MovieDetails;
