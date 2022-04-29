// Set 1 Usecase 6 - Movie Info Page
// TODO: fetch data from db
import React, { useState } from 'react';
import { Redirect } from "react-router-dom";

import {scrollMenu} from 'react-horizontal-scrolling-menu';
// import { Link } from 'react-router-dom';
import {
    Button
  } from "reactstrap";
import { Link } from 'react-router-dom';
import RegisterTheatre from './RegisterTheatre';
import AddArtist from './AddArtist';
import AddMovie from './AddMovie';
import TheatreLiveOnline from './TheatresLiveOnline';


const AdminHomePage = (props) => {
  var [regTheatre, setRegTheatre] = useState(false);
  var [addArtist, setAddArtist] = useState(false);
  var [addMovie, setAddMovie] = useState(false);
  var [viewstats, setViewStats] = useState(false);

  function handleChange(name){
    switch(name){
      case "theatre":
        if(!regTheatre) setRegTheatre(!regTheatre);
        if (addArtist) setAddArtist(!addArtist);
        if (addMovie) setAddMovie(!addMovie);
        if (viewstats) setViewStats(!viewstats);
        break;
      case "artist":
        if(regTheatre) setRegTheatre(!regTheatre);
        if (!addArtist) setAddArtist(!addArtist);
        if (addMovie) setAddMovie(!addMovie);
        if (viewstats) setViewStats(!viewstats);
        break;

      case "movie":
        if(regTheatre) setRegTheatre(!regTheatre);
        if (addArtist) setAddArtist(!addArtist);
        if (!addMovie) setAddMovie(!addMovie);
        if (viewstats) setViewStats(!viewstats);
        break;

      case "stats":
        if(regTheatre) setRegTheatre(!regTheatre);
        if (addArtist) setAddArtist(!addArtist);
        if (addMovie) setAddMovie(!addMovie);
        if (!viewstats) setViewStats(!viewstats);
        break;

      default:
        break;
    }
  }

    

  const role = localStorage.getItem('role');
    return (
        <div className='container'>
            
        {role==null ? <Redirect push to="/" /> : null}
            <div style={{ marginTop: "60px", marginBottom: "30px" }} className="text-center row">
                <div style={{marginLeft: "160px"}} className="col-3">
                <Button onClick={()=>handleChange("theatre")}>Register Theatre</Button>
                </div>
                <div className='col-3'>
                <Button onClick={()=>handleChange("artist")}>Add Artist</Button>
                </div>
                <div className='col-3'>
                <Button onClick={()=>handleChange("movie")}>Add Movie</Button>
                </div>
                <div className='col-3'>
                <Button onClick={()=>handleChange("stats")}>View Analytics</Button>
                </div>
            </div>

            <div>
              {regTheatre ? <RegisterTheatre></RegisterTheatre> : <></>}
              {addArtist ? <AddArtist></AddArtist> : <></>}
              {addMovie ? <AddMovie></AddMovie> : <></>}
              {viewstats ? <TheatreLiveOnline></TheatreLiveOnline> : <></>}
            </div>

        </div>
    );
  }

export default AdminHomePage;
