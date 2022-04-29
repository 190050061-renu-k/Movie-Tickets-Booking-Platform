// Set 1 Usecase 6 - Movie Info Page
import React, { useState, useEffect } from "react";

import { Card, CardHeader, CardBody, CardTitle, Button } from "reactstrap";

import { Link } from "react-router-dom";
const MainPage = (props) => {
    return (
      <div>
        <div className="container text-center" style={{ marginTop: "60px" }}>
            <h1 style={{ marginLeft: "150px" }}>Operate Website As </h1>
            <div>
                <Link to="/homepage"><Button style={{"margin": "10px"}} onClick={()=>{
                    localStorage.setItem("role", "user");
                }}>User</Button></Link>
                <Link to="/login"><Button style={{"margin": "10px"}} onClick={()=>{
                    localStorage.setItem("role", "theatre");
                }}>Theatre Admin</Button></Link>
                <Link to="/login"><Button style={{"margin": "10px"}} onClick={()=>{
                    localStorage.setItem("role", "admin");
                }}>Admin</Button></Link>
            </div>
        </div>
      </div>
    );
};

export default MainPage;
