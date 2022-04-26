// Set 1 Usecase 7 - Artist Info Page
// TODO: fetch data from db
import React, { useState } from 'react';
import "./../../../Assets/css/artistDetails.css";
import ResetPassword from '../profile-pages/ResetPassword';
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle, 
    Button
  } from "reactstrap";
import { Link } from 'react-router-dom';
import Signup from '../user-pages/Signup';
import ViewHistory from '../profile-pages/ViewHistory';

const UserDetails = (props) => {
    var [userDetails, setUserDetails] = useState({});
    var [isEdit, setIsEdit] = useState(false);
    var [isPswd, setIsPswd] = useState(false);
    var [ishistory, setIsHistory] = useState(false);

  
    var genres= [{name:"Hype",genre_id:1},{name: "Action", genre_id:10}];
    var languages = [{name:"Hindi",language_id:1},{name: "English", language_id:10}];    
    //modify into useEffect
    userDetails = {"mobileNumber":"1000010000", "user_id": 1001, "city": "Paris", "userName":"Vineeth", "age": 20, "genres": genres, "languages":languages};


    //useEffect to fetch genres, languages, user details

    return (
      <div className='container' style={{marginTop:"60px"}}>
          <Button className='btn-outline-primary ' style={{marginRight:"30px"}} 
            
            onClick={() => {
                setIsEdit(!isEdit);
                if(isPswd)setIsPswd(false);
              }}
            >
                Edit Profile
            </Button>
          <Button className='btn-outline-primary ' 
          onClick={() => {
            setIsPswd(!isPswd);
            if(isEdit)setIsEdit(false);
          }}
          >Reset Password</Button>

          {isEdit ? <Signup col = {6} card = {8} margin = {"30px"} showsign = {true}></Signup> : <></>}
          {isPswd ? <ResetPassword col = {6} card = {8}></ResetPassword> : <></>}


          <Card >
              <CardHeader tag="h3">Personal Information</CardHeader>
              <CardBody className='text-center'>
                <div className='row'>
                    <div className='col-6'>
                        <p style={{fontSize:"1.2em"}}>Name: <b>{userDetails.userName}</b></p>
                    </div>
                    <div className='col-6'>
                        <p style={{fontSize:"1.2em"}}>Age: <b>{userDetails.age}</b></p>
                    </div>
                    <div className='col-6'>
                        <p style={{fontSize:"1.2em"}}>Phone Number: <b>{userDetails.mobileNumber}</b></p>
                    </div>
                    <div className='col-6'>
                        <p style={{fontSize:"1.2em"}}>City: <b>{userDetails.city}</b></p>
                    </div>
                    <div className='col-6'>
                        <p style={{fontSize:"1.2em"}}>Genre Preferences: 
                        {userDetails.genres.map((genre)=>{
                            return(<b> {genre.name} </b>);
                        })}
                        </p>
                    </div>
                    <div className='col-6'>
                        <p style={{fontSize:"1.2em"}}>Language Preferences:
                        {userDetails.languages.map((language)=>{
                            return(<b> {language.name}</b>);
                        })}
                        </p>
                    </div>
                </div>
              </CardBody>
          </Card>
          <Card>
              <CardBody>
                {ishistory?
                 <div className='text-left'>
                 <div 
                  onClick={() => {
                    setIsHistory(!ishistory);
                  }}
                 >
                    <b><i className='nc-icon nc-minimal-down'></i><p style={{display:"inline"}}>History</p></b>
                </div>
                <ViewHistory></ViewHistory>
                </div>
                
                :
                    <div className='text-left'>
                         <div 
                            onClick={() => {
                            setIsHistory(!ishistory);
                            }}
                            >
                            <b><i className='nc-icon nc-minimal-right'></i><p style={{display:"inline"}}>History</p></b>
                        </div>
                    </div>
                }
                
                
              </CardBody>
          </Card>
    </div>

    );
  }

export default UserDetails;
