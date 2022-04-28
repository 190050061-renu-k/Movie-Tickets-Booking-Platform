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


const PaymentPage = (props) => {
    var [PaymentInfo, setPaymentInfo] = useState({});
    // PaymentInfo= {"seats":['A1','B2','C3'], "theatre_id": 2, "theatre_name": "Ramya's INOX", "movie_name":"KGF Chapter Two", "movie_id":111, "price": 100, "date": new Date(20,1,2022)};
    if(props.location.state){
        PaymentInfo=props.location.state;
    }
    //useEffect to fetch genres

    return (
        <div>
            <div className="container text-left" style={{marginTop:"60px"}}>
                <Card>
                    <CardBody>
                        <div className='row'>
                        <div className='col-6'>
                            <p style={{fontSize:"1.2em"}}>Theatre Name: <b>{PaymentInfo.theatre_name}</b></p>
                        </div>
                        <div className='col-6'>
                            <p style={{fontSize:"1.2em"}}>Movie: <b>{PaymentInfo.movie_name}</b></p>
                        </div>
                        <div className='col-6'>
                            <p style={{fontSize:"1.2em"}}>Price: <b>{PaymentInfo.price}</b></p>
                        </div>
                        <div className='col-6'>
                            <p style={{fontSize:"1.2em"}}>Selected Seats:
                            {PaymentInfo.seats.map((seat)=>{
                                return(<b> {seat}</b>);
                            })}
                            </p>
                            
                        </div>
                        </div>
                        <Link style={{textDecoration:"none"}}>
                                <Button className="btn-dark">
                                    Pay Now
                                </Button>
                            </Link>
                    </CardBody>    
                </Card>                
            </div>
        </div>
    );
  }

export default PaymentPage;
