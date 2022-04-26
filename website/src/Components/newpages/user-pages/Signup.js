// Usecase 1 - Client signing up 
// TODO: Input validation, add entry to database
// TODO: Check if session is in logged in state
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle
  } from "reactstrap";

var genres = [
    {id:16, name: "Animation"},
    {id:35, name: "Comedy"},
    {id:10751, name: "Family"},
    {id:12, name: "Adventure"},
    {id:14, name: "Fantasy"},
    {id:10749, name: "Romance"},
    {id:18, name: "Drama"},
    {id:28, name: "Action"},
    {id:80, name: "Crime"},
    {id:53, name: "Thriller"},
    {id:27, name: "Horror"},
    {id:36, name: "History"},
    {id:878, name: "Science Fiction"},
    {id:9648, name: "Mystery"},
    {id:10752, name: "War"},
    {id:10769, name: "Foreign"},
    {id:10402, name: "Music"},
    {id:99, name: "Documentary"},
    {id:37, name: "Western"},
    {id:10770, name: "TV Movie"}
]


const Signup =(props)=> {

    var getcol = props.col ? props.col : 12;
    var getcard = props.card ? props.card : 4;
    var margin = props.margin?props.margin:"100px";
    return (
      <div>
        <div className="d-flex align-items-center auth px-0" style={{marginTop:margin}}>
          <div className="row w-100 mx-0">
            <div className={"mx-auto col-lg-" + getcard}>
                
                <Card>
                    <CardHeader>
                        <CardTitle tag="h3">{props.showsign ? "Edit Profile" : "Register"}</CardTitle>
                    </CardHeader>
                    
                    <CardBody>
                   
                {/* brand logo  */}
                {/* <h4>New here?</h4> */}
                {/* <h6 className="font-weight-light">Signing up is easy. It only takes a few steps</h6> */}
                    <form className="pt-3">
                        <div className='row'>

                    <div className={"form-group col-" + getcol }>
                        <input type="text" className="form-control form-control-lg" id="inputname" placeholder="Username" />
                    </div>
                    {props.showsign ? <></> : 
                    <div className={"form-group col-"  + getcol }>
                        <input type="password" className="form-control form-control-lg" id="inputpswd1" placeholder="Password" />
                    </div>}
                    
                    {props.showsign ? <></> : 
                    <div className={"form-group col-" + getcol }>
                        <input type="password" className="form-control form-control-lg" id="inputpswd2" placeholder="Re-enter Password" />
                    </div>
                    }
                    {props.showsign ? <></> : 
                    <div className={"form-group col-"  + getcol }>
                        <input type="tel" className="form-control form-control-lg" id="inputtel" placeholder="Phone Number" />
                    </div>
                    }
                    <div className={"form-group col-" + getcol }>
                        <select className="form-control form-control-lg" id="inputcity">
                        <option>City</option>
                        <option>Hyderabad</option>
                        <option>Bangalore</option>
                        <option>Delhi</option>
                        <option>Mumbai</option>
                        <option>Kolkata</option>
                        <option>Kochi</option>
                        <option>Ahmedabad</option>
                        <option>Chennai</option>
                        </select>
                    </div>
                    <div className={"form-group col-"  + getcol }>
                    <select className="form-control form-control-lg" id="inputlang">
                        <option>Language</option>
                        <option>Telugu</option>
                        <option>Hindi</option>
                        <option>English</option>
                        <option>Marathi</option>
                        </select>
                    </div>
                    <div className={"form-group col-"  + getcol }>
                        <select className="form-control form-control-lg" id="inputgenre">
                            <option>Genre</option>
                        {genres.map((i) => {
                            return (
                                <option>{i.name}</option>
                            );
                        })}
                        </select>
                    </div>
                    </div>
                    {props.showsign ?
                     <div className="mt-3">
                     <Link className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" to="/profile">Submit</Link>
                     </div>
                      :
                    <>
                        <div className="mt-3">
                            <Link className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" to="/login">SIGN UP</Link>
                        </div>
                        <div className="text-center mt-4 font-weight-light">
                            Already have an account? <Link to="/login" className="text-primary">Login</Link>
                        </div>
                    </>
                    }
                    
                    </form>
            
            
            </CardBody>
            </Card>
            </div>
            </div>
            </div>
            </div>

    );
}

export default Signup;
