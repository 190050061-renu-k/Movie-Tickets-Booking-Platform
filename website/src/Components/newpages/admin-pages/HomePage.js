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
                <Link to={"/admin/registertheatre"}><Button>Register Theatre</Button></Link>
                </div>
                <div>
                <Link to="/admin/addartist"><Button>Add Artist</Button></Link>
                </div>
                <div>
                <Link to="/admin/addmovie"><Button>Add Movie</Button></Link>
                </div>
                <div>
                <Link to={"/admin/analytics"}><Button>View Analytics</Button></Link>
                </div>
            </div>
        </>
    );
  }

export default AdminHomePage;
