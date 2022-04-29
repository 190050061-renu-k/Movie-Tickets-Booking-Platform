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


const RegisterTheatre = (props) => {
    return (
        <div>
        <div className="d-flex align-items-center auth px-0" style={{marginTop:"100px"}}>
          <div className="row w-100 mx-0">
            <div className={"mx-auto col-lg-4" }></div>
            <Card>
                    <CardHeader>
                        <CardTitle tag="h3">Register Theatre</CardTitle>
                    </CardHeader>
                    
                    <CardBody>
                   
                {/* brand logo  */}
                {/* <h4>New here?</h4> */}
                {/* <h6 className="font-weight-light">Signing up is easy. It only takes a few steps</h6> */}
                    <form className="pt-3">
                        <div className='row'>

                    <div className={"form-group col-12" }>
                        <input type="text" className="form-control form-control-lg" id="inputname" placeholder="Theatre Name" />
                    </div>
                    
                    <div className={"form-group col-12" }>
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

                    <div className={"form-group col-12" }>
                        <input type="text" className="form-control form-control-lg" id="inputlongitude" placeholder="Longitude" />
                    </div>

                    <div className={"form-group col-12" }>
                        <input type="text" className="form-control form-control-lg" id="inputlatitude" placeholder="Latitude" />
                    </div>
                    <div className={"form-group col-12" }>
                        <input type="number" className="form-control form-control-lg" id="inputscreens" placeholder="Screens" min="1" />
                    </div>

                    <div className="mt-3">
                            <Link className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">Register Theatre</Link>
                    </div>

                    </div>                    
                    </form>
            
            
            </CardBody>
            </Card>
        
            </div>
            </div>
        </div>
    );
  }

export default RegisterTheatre;
