// Set 1 Usecase  - Theatre Detail page
// TODO: fetch data from db
// add route links to show timings
import React, { useState, useEffect } from 'react';
import {
    Card,
    CardBody,
    Button,
  } from "reactstrap";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {Tabs, Tab} from 'react-bootstrap';

const TheatreDetails = (props) => {
    let { theatre_id } = useParams();
    var [theatreDetails, setTheatreDetails] = useState({});
    const [isLoading, setisLoading] = useState(0);

    var shows = [{  "date": new Date(2022,4,26), "movies": [{"name": "K.G.F. Chapter 2", id:1, "show_timings": ["Morning", "Evening"]}, {"name": "K.G.F. Chapter 2",id:1, "show_timings": ["Morning", "Evening"]}]},{"date": new Date(2022,4,27), "movies": [{"name": "K.G.F. Chapter 2",id:1, "show_timings": ["Morning", "Evening"]}]},{"date": new Date(2022,4,28), "movies": [{"name": "K.G.F. Chapter 2",id:1,"show_timings": ["Morning", "Evening"]}]}];  
    var name= "Ramya's INOX";
    var city = "Las Vegas"
    //modify into useEffect
    theatreDetails = {"shows": shows, "name":name, "id": id, "city": city};
    var movie_obj = new Object();
    var date_obj = new Object();
    for(i=0; i<theatreDetails["shows_info"].length; i++){
        if(!(movie_data.hasOwnProperty(theatreDetails["shows_info"][i].show_date))){
            movie_data[theatreDetails["shows_info"][i].show_date] = []
        }

    }
    var i = -1;

    useEffect(() => {
        getTheatreDetails();
      }, [theatre_id]);
    
      function getTheatreDetails() {
        setisLoading(1);
        fetch("http://localhost:3001/getTheatreShows", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ theatre_id }),
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setTheatreDetails(data);
            setisLoading(2);
          })
          .catch((err) => {
            console.log(err);
          });
      }


    //useEffect to fetch genres

    return (
        console.log(theatreDetails)
    //   <div>
    //       <div className="container text-left" style={{marginTop:"60px"}}>
    //         <div >
    //             <Card>
    //                 <CardBody>
    //                     <div>
    //                         <h1 style={{display: "inline"}}>{theatreDetails.name}</h1>
    //                         <Button className='text-light float-right'>Rate Now</Button>
    //                     </div>
    //                     <div >
    //                         <i className='nc-icon nc-pin-3'></i>
    //                         <h4 style={{display: "inline"}}>{theatreDetails.city}</h4>
    //                     </div>
    //                 </CardBody>
    //             </Card>
    //         </div>
    //     </div>
    //     <div className="container text-left" style={{marginTop:"30px"}}>
    //         <Card>
    //             <CardBody>
                    
    //                 <Tabs defaultActiveKey={0}>{
    //                     shows.map((show)=>{
    //                         i+=1;
    //                         return(
    //                             <Tab style={{marginTop:"30px"}} eventKey={i} title={show.date.getDate()}>
    //                                 {
    //                                     show.movies.map((movie)=>{
    //                                         return(
    //                                             <>
    //                                             <div className='row'>
    //                                                 <div className='col-4'>
    //                                                     <Link to={"/movies/"+movie.id} >{movie.name}</Link>
    //                                                 </div>
    //                                                 <div className='col-8'>
    //                                                     {
    //                                                         movie.show_timings.map((show_)=>{
    //                                                             return(
    //                                                                 <Button className='btn-outline-primary'>
    //                                                                     {show_}
    //                                                                 </Button>
    //                                                             )
    //                                                         })
    //                                                     }
    //                                                 </div>
                                                    
    //                                             </div>
    //                                                 <hr style={{color:"black"}}/>
    //                                                 </>
    //                                         )
    //                                     })
    //                                 }
                                    
    //                             </Tab>
    //                         )
    //                     })
    //                 }
    //                 </Tabs>
    //             </CardBody>
    //         </Card>
    //     </div>
    // </div>

    );
  }

export default TheatreDetails;
