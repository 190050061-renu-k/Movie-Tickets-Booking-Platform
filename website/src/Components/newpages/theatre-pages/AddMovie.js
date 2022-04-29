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
import {Tabs, Tab} from 'react-bootstrap';


var movies = [{"movie_id":1,"movie_name":"KgF Chapter-3"}, {"movie_id":2,"movie_name":"KgF Chapter-2"}]



const AddMovieShowPage = (props) => {
    var [ShowsInfo, setShowsInfo] = useState({});
    var [isMovieSelected, setIsMovieSelected] = useState(false);
     
    function isButtonDisabled(screen_num,day,show){
        if(ShowsInfo["screen"+screen_num]["date"+(day+1)+"na"].includes(show)) return true;
        else return false;
    }

    function isButtonActive(screen_num, day,show){
        if(ShowsInfo["screen"+screen_num]["date"+(day+1)+"s"].includes(show)) return true;
        else return false;
    }

    var showsInfo = {"movie_name":"KGF Chapter 2", "movie_id":2, "screen_numbers": [1,2,3], "screen1": {"date1na": [0], "date2na": [1], "date3na": [1,2], "date4na": [1,2], "date5na": [3], "date6na": [], "date7na": [1,2,3], "date1s": [0], "date2s": [1], "date3s": [1,2], "date4s": [1,2], "date5s": [3,4], "date6s": [], "date7s": [1,2,3]}, "screen2": {"date1na": [0], "date2na": [1], "date3na": [1,2], "date4na": [1,2], "date5na": [3], "date6na": [], "date7na": [1,2,3], "date1s": [0], "date2s": [1], "date3s": [1,2], "date4s": [1,2], "date5s": [3,4], "date6s": [], "date7s": [1,2,3]}, "screen3": {"date1na": [0], "date2na": [1], "date3na": [1,2], "date4na": [1,2], "date5na": [3], "date6na": [], "date7na": [1,2,3], "date1s": [0], "date2s": [1], "date3s": [1,2], "date4s": [1,2], "date5s": [3,4], "date6s": [], "date7s": [1,2,3]}};

    //modify into useEffect
    ShowsInfo = showsInfo
    var today = new Date();
    var i = -1;

    return (
        <>
            <div style={{ marginTop: "60px", marginBottom: "30px" }}>
                <div style={{ marginTop: "30px" }}>
                        {!isMovieSelected?
                        <>
                        <div className={"form-group" }>
                            <select className="form-control form-control-lg" id="inputmovie" style={{"width":"50%"}}>
                                <option value="-1">Movie</option>
                                {movies.map((i) => {
                                    return (
                                        <option value={i.movie_id} props = {{"movie_name":i.movie_name}} movie_id={i.movie_id} movie_name={i.movie_name}>{i.movie_name}</option>
                                    );
                                })}
                            </select>
                        </div>
                        <Button onClick={()=>{
                            if(document.getElementById('inputmovie').value!="-1") {
                                setIsMovieSelected(true);
                                showsInfo.movie_id = document.getElementById('inputmovie').value;
                                showsInfo.movie_name = movies.filter((movie)=>{
                                    if(movie.movie_id==showsInfo.movie_id) return true;
                                    else return false;
                                })[0].movie_name;
                                setShowsInfo(showsInfo);
                                console.log(ShowsInfo.movie_name);
                            }
                        }}>Select Movie</Button>
                        </>:
                        <>
                        <h2>{ShowsInfo.movie_name}</h2>
                        <div>

                    <Tabs defaultActiveKey={0}>{
                        showsInfo.screen_numbers.map((screen_num)=>{
                            i+=1;
                            return(
                                <Tab style={{marginTop:"30px"}} eventKey={i} title={"Screen"+screen_num}>
                                    {
                                        ([0,1,2,3,4,5,6]).map((day)=>{
                                            return(
                                                <>
                                                {/* <h3>{new Date(today.getTime()+day*86400000).getDate()}</h3> */}
                                                <h3>{new Date(today.getTime()+day*86400000).getDate()+"/"+new Date(today.getTime()+day*86400000).getMonth()+"/"+new Date(today.getTime()+day*86400000).getFullYear()}</h3>
                                                <div className='row' style={{"margin":"30px"}}>
                                                    <div className='col-3'>
                                                        <Button className='btn-outline-primary' onClick={()=>{
                                                            // if(showsInfo["date"+(day+1)+"s"].includes(0)) console.log(showsInfo["date"+(day+1)+"s"]);
                                                            showsInfo["screen"+screen_num]["date"+(day+1)+"s"].push(0);
                                                            setShowsInfo(showsInfo);
                                                            console.log(ShowsInfo);
                                                        }} disabled={isButtonDisabled(screen_num,day,0)} active={isButtonActive(screen_num,day,0)}>Morning Show</Button>
                                                    </div>
                                                    <div className='col-3'>
                                                        <Button className='btn-outline-primary' onClick={()=>{
                                                            showsInfo["screen"+screen_num]["date"+(day+1)+"s"].push(1);
                                                            setShowsInfo(showsInfo);
                                                            console.log(ShowsInfo);
                                                        }} disabled={isButtonDisabled(screen_num,day,1)} active={isButtonActive(screen_num,day,1)}>Afternoon Show</Button>
                                                    </div>
                                                    <div className='col-3'>
                                                    <Button className='btn-outline-primary' onClick={()=>{
                                                            showsInfo["screen"+screen_num]["date"+(day+1)+"s"].push(2);
                                                            setShowsInfo(showsInfo);
                                                            console.log(ShowsInfo);
                                                        }} disabled={isButtonDisabled(screen_num,day,2)} active={isButtonActive(screen_num,day,2)}>First Show</Button>
                                                    </div>
                                                    <div className='col-3'>
                                                    <Button className='btn-outline-primary' onClick={()=>{
                                                            showsInfo["screen"+screen_num]["date"+(day+1)+"s"].push(3);
                                                            setShowsInfo(showsInfo);
                                                            console.log(ShowsInfo);
                                                        }} disabled={isButtonDisabled(screen_num,day,3)} active={isButtonActive(screen_num,day,3)}>Second Show</Button>
                                                    </div>
                                                </div>
                                                </>
                                            );
                                        })
                                    }
                                    
                                </Tab>
                            )
                        })
                    }
                    </Tabs>
                </div>
                <div>
                    
                </div>
                        </>
                        }
                </div>
                
            </div>
        </>
    );
  }

export default AddMovieShowPage;
