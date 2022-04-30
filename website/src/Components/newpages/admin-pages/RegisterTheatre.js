// Set 1 Usecase 6 - Movie Info Page
// TODO: fetch data from db
import React, { useState, useReducer } from 'react';
import { Redirect } from "react-router-dom";

import {
    Card,
    CardHeader,
    CardBody,
    CardTitle, 
    Button
  } from "reactstrap";


const RegisterTheatre = (props) => {
    const role = localStorage.getItem('role');
    const initialValues = {
        theatrename: "",
        cityname:"",
        longitude: "", 
        latitude:"",
        screens:"",
        errors: {
            theatrename: "",
            longitude: "", 
            latitude:"",
            screens:"",
        },
    };

    const notificationAlert = React.useRef();
    const [formValues, setFormValues] = useReducer(
        (curVals, newVals) => ({ ...curVals, ...newVals }),
        initialValues
    );

    const { theatrename, cityname, longitude, latitude, screens } = formValues;
    
    const validateForm = (errors) => {
        let valid = true;
        Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
        return valid;
    };
    
    const handleFormChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = formValues.errors;
        switch (name) {
          case "theatrename":
            errors.theatrename = value =="" ? "Required field"
              : "";
            break;
            case "longitude":
                errors.longitude = value =="" ? "Required field"
                : "";
                break;
            case "latitude":
                errors.latitude = value =="" ? "Required field"
                : "";
                break;
            case "screens":
                errors.screens = value =="" ? "Required field"
                : "";
                errors.screens = (parseInt(value)<=0) ? "Number of screens has to be positive" : "";

            break;
          default:
            break;
        }
    
        setFormValues({ errors, [name]: value });
      };
    
      const handleBlur = (event) => {
        event.preventDefault();
    
        const { name, value } = event.target;
        if(name==="cityname"){
            setFormValues({ errors, [name]: value });
            return;
        }
        let errors = formValues.errors;
        switch (name) {
            case "theatrename":
            errors.theatrename = value =="" ? "Required field" 
              : "";
            break;
            case "longitude":
                errors.longitude = value =="" ? "Required field"
                : "";
                break;
            case "latitude":
                errors.latitude = value =="" ? "Required field"
                : "";
                break;
            case "screens":
                errors.screens = value =="" ? "Required field"
                : "";
                errors.screens = parseInt(value)<=0 ? "Number of screens has to be positive" : "";
                break;
            default:
                break;
        }
    
        setFormValues({ errors, [name]: value });
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        let errors = formValues.errors;
        if (formValues.theatrename.length == 0) {
          errors.theatrename = "Required field";
          setFormValues({ ...formValues, errors });
          return;
        }
        if (formValues.longitude.length == 0) {
            errors.longitude = "Required field";
            setFormValues({ ...formValues, errors });
            return;
        }
        if (formValues.latitude.length == 0) {
            errors.latitude = "Required field";
            setFormValues({ ...formValues, errors });
            return;
        }
        if (formValues.screens.length == 0) {
            errors.screens = "Required field";
            setFormValues({ ...formValues, errors });
            return;
        }
    
        //need to be modified
        if (validateForm(formValues.errors)) {
        //   fetch("http://localhost:3001/userLogin", {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //       mobile_number: formValues.inputtel,
        //       password: formValues.inputpswd,
        //     }),
        //   })
        //     .then((response) => {
        //       return response.json();
        //     })
        //     .then((data) => {
        //       if (data.accessToken) {
        //         localStorage.setItem("user", JSON.stringify(data));
        //         setRedirect(true);
        //       } else {
        //         var options = {};
        //         options = {
        //           place: "tc",
        //           message: (
        //             <div>
        //               <div>
        //                 <b>Invalid credentials</b>
        //               </div>
        //             </div>
        //           ),
        //           type: "danger",
        //           icon: "nc-icon nc-bell-55",
        //           autoDismiss: 7,
        //         };
        //         notificationAlert.current.notificationAlert(options);
        //       }
        //       return data;
        //     })
        //     .catch((err) => {
        //       console.log(err);
        //     });
    
        //   // in a function, do -  check if credentials are correct in database and redirect to homepage, store user id, city id in session
          console.log("Success");
        // } else {
        //   console.log("Failure");
        //   var options = {};
        //   options = {
        //     place: "tc",
        //     message: (
        //       <div>
        //         <div>
        //           <b>Please enter valid entries</b>
        //         </div>
        //       </div>
        //     ),
        //     type: "danger",
        //     icon: "nc-icon nc-bell-55",
        //     autoDismiss: 7,
        //   };
        //   notificationAlert.current.notificationAlert(options);
        }
      };
    
    return (
        <div>
        {role==null ? <Redirect push to="/" /> : null}
        <div className="d-flex align-items-center auth px-0" style={{marginTop:"100px"}}>
          <div className="row w-100 mx-0">
            <div className={"mx-auto col-lg-4" }></div>
            <Card>
                    <CardHeader>
                        <CardTitle tag="h3">Register Theatre</CardTitle>
                    </CardHeader>
                    
                    <CardBody>
                   
                    <form className="pt-3">
                        <div className='row'>

                    <div className={"form-group col-6" }>
                        Theatre Name: <br/>
                        <input 
                        type="text" 
                        id="theatrename"
                        name="theatrename"
                        value = {theatrename} 
                        onChange={handleFormChange}
                        onBlur={handleBlur}
                        className={
                        "input-box form-control form-control-lg " +
                        (formValues.errors.theatrename.length > 0
                            ? "hasError"
                            : "")
                        }
                        />
                        <div
                            style={{ width: "100%", marginTop: "8px" }}
                            className={
                                formValues.errors.theatrename.length > 0 ? "errorBar" : ""
                            }
                            >
                            {formValues.errors.theatrename.length > 0 && (
                                <span className="error">
                                {formValues.errors.theatrename}
                                </span>
                            )}
                        </div>
                    </div>
                    
                    <div className={"form-group col-6" }>
                        City:<br/>
                        <select 
                        className="form-control form-control-lg" 
                        id="cityname"
                        name="cityname"
                        value= {cityname}
                        onChange={handleFormChange}
                        >
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

                    <div className={"form-group col-6" }>
                    Longitude: <br/>
                    <input 
                        type="text" 
                        id="longitude"
                        name="longitude"
                        value = {longitude} 
                        onChange={handleFormChange}
                        onBlur={handleBlur}
                        className={
                        "input-box form-control form-control-lg " +
                        (formValues.errors.longitude.length > 0
                            ? "hasError"
                            : "")
                        }
                        />
                        <div
                            style={{ width: "100%", marginTop: "8px" }}
                            className={
                                formValues.errors.longitude.length > 0 ? "errorBar" : ""
                            }
                            >
                            {formValues.errors.longitude.length > 0 && (
                                <span className="error">
                                {formValues.errors.longitude}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className={"form-group col-6" }>
                        Latitude: <br/>
                        <input 
                            type="text" 
                            id="latitude"
                            name="latitude"
                            value = {latitude} 
                            onChange={handleFormChange}
                            onBlur={handleBlur}
                            className={
                            "input-box form-control form-control-lg " +
                            (formValues.errors.latitude.length > 0
                                ? "hasError"
                                : "")
                            }
                        />
                        <div
                            style={{ width: "100%", marginTop: "8px" }}
                            className={
                                formValues.errors.latitude.length > 0 ? "errorBar" : ""
                            }
                            >
                            {formValues.errors.latitude.length > 0 && (
                                <span className="error">
                                {formValues.errors.latitude}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className={"form-group col-6" }>
                        Screens: <br/>
                        <input 
                        type="number" 
                        id="inputscreens"
                        name ="screens"
                        value = {screens} 
                        min="1" 
                        onChange={handleFormChange}
                        onBlur={handleBlur}
                        className={
                        "input-box form-control form-control-lg " +
                        (formValues.errors.screens.length > 0
                            ? "hasError"
                            : "")
                        }
                        />
                        <div
                            style={{ width: "100%", marginTop: "8px" }}
                            className={
                                formValues.errors.screens.length > 0 ? "errorBar" : ""
                            }
                            >
                            {formValues.errors.screens.length > 0 && (
                                <span className="error">
                                {formValues.errors.screens}
                                </span>
                            )}
                        </div>
                        <br/>
                    </div>
                    </div>
                    
                    <div className="mt-2 text-center col-6 float-right">
                        <Button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" onClick={handleSubmit}>Register Theatre</Button>
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
