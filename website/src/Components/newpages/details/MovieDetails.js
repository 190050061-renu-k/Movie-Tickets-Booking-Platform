// Set 2 Usecase 1 - Client logging in 
// TODO: input validation, check if session is in logged in state
// (Check in database) error handling
import React, { Component } from 'react';
import "./../../../Assets/css/MovieDetails.css";
// import { Link } from 'react-router-dom';
// import {
//     Card,
//     CardHeader,
//     CardBody,
//     CardTitle
//   } from "reactstrap";

export class MovieDetails extends Component {
  render() {
    return (
      <div>
        <div className="align-items-center  " style={{marginTop:'60px'}}>
          <div className="container">
            <div id = "info1">
                <div className='top-left'>
                    <h3>KGF2</h3>
                </div>
            </div>

                
                {/* <Card>
                    <CardHeader>
                        <CardTitle tag="h3">Movie: <textbf>KGF2</textbf></CardTitle>
                    </CardHeader>
                    <CardBody> */}
                {/* brand logo  */}
                {/* <h4>New here?</h4> */}
                {/* <h6 className="font-weight-light">Signing up is easy. It only takes a few steps</h6> */}
                   
            {/* </CardBody>
            </Card> */}
        </div>
        </div>
    </div>

    )
  }
}

export default MovieDetails;
