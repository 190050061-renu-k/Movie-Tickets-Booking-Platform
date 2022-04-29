// Set 1 Usecase 6 - Movie Info Page
// TODO: fetch data from db
import React, { useState } from 'react';
import {scrollMenu} from 'react-horizontal-scrolling-menu';
// import { Link } from 'react-router-dom';
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle, 
    Button
  } from "reactstrap";
import { Link } from 'react-router-dom';


const AdminHomePage = (props) => {
    return (
        <>
            
            <div style={{ marginTop: "60px", marginBottom: "30px" }} className="text-center">
                <div style={{marginLeft: "160px"}}>
                <Button>Register Theatre</Button>
                </div>
                <div>
                <Button>Add Artist</Button>
                </div>
                <div>
                <Button>Add Movie</Button>
                </div>
                <div>
                <Button>View Analytics</Button>
                </div>
            </div>
        </>
    );
  }

export default AdminHomePage;
