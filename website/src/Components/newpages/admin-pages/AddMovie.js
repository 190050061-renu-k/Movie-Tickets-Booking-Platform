// Set 1 Usecase 6 - Movie Info Page
// TODO: fetch data from db
import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import { useReducer } from 'react';
import "./../../../Assets/css/login.css";

import {
    Card,
    CardHeader,
    CardBody,
    CardTitle, 
    Button
  } from "reactstrap";
import { Link } from 'react-router-dom';


const AddMovie = (props) => {
    const role = localStorage.getItem('role');
    const initialValues = {
        moviename: "",
        reldate:"",
        inputimg:"",
        inputdesc:"",
        errors: {
            moviename: "",
        },
    };

    const notificationAlert = React.useRef();
    const [formValues, setFormValues] = useReducer(
        (curVals, newVals) => ({ ...curVals, ...newVals }),
        initialValues
    );

    const { moviename, reldate, inputimg, inputdesc } = formValues;
    console.log(formValues);

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
          case "moviename":
            errors.moviename = value =="" ? "Required field"
              : "";
            break;
          default:
            break;
        }
    
        setFormValues({ errors, [name]: value });
      };
    
      const handleBlur = (event) => {
        event.preventDefault();
    
        const { name, value } = event.target;
        let errors = formValues.errors;
        switch (name) {
            case "moviename":
                errors.moviename = value =="" ? "Required field"
                  : "";
                break;
            default:
                break;
        }
    
        setFormValues({ errors, [name]: value });
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        let errors = formValues.errors;
        if (formValues.moviename.length == 0) {
          errors.moviename = "Required field";
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

      function handleChange2(event){
        event.preventDefault();
        const { name, value } = event.target;

        setFormValues({...formValues, [name]:value});
      }


    return (
        <div>
            {role==null ? <Redirect push to="/" /> : null}
        <div className="d-flex align-items-center auth px-0" style={{marginTop:"100px", marginLeft:"250px", width:"50%"}}>
          <div className="row w-100 mx-0">
            <div className={"mx-auto col-lg-4" }></div>
            <Card>
                    <CardHeader>
                        <CardTitle tag="h3">Add Movie</CardTitle>
                    </CardHeader>
                    
                    <CardBody>
                   
                {/* brand logo  */}
                {/* <h4>New here?</h4> */}
                {/* <h6 className="font-weight-light">Signing up is easy. It only takes a few steps</h6> */}
                    <form className="pt-3">
                        <div className='row'>

                    <div className={"form-group col-12" }>
                        Movie Name: <br/>
                        <input 
                        type="text" 
                        id="moviename" 
                        name="moviename"
                        value = {moviename}
                        onChange={handleFormChange}
                        onBlur={handleBlur}
                        className={
                        "input-box form-control form-control-lg " +
                        (formValues.errors.moviename.length > 0
                            ? "hasError"
                            : "")
                        }
                        />
                        <div
                            style={{ width: "100%", marginTop: "8px" }}
                            className={
                                formValues.errors.moviename.length > 0 ? "errorBar" : ""
                            }
                            >
                            {formValues.errors.moviename.length > 0 && (
                                <span className="error">
                                {formValues.errors.moviename}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className={"form-group col-12" }>
                        Release Date:<br/>
                        <input 
                        type="text" 
                        className="form-control form-control-lg" 
                        id="inputdate" 
                        name="reldate"
                        value={reldate} 
                        onChange={handleChange2}
                        />
                    </div>
                    <div className={"form-group col-12" }>
                      Image Path:<br/>
                        <input 
                        type="text" 
                        className="form-control 
                        form-control-lg" 
                        id="inputimg" 
                        name="inputimg"
                        value={inputimg}
                        onChange={handleChange2}
                        />
                    </div>
                    <div className={"form-group col-12" }>
                      Description: <br/>
                        <textarea 
                        className="form-control form-control-lg" 
                        id="inputdesc"  
                        name="inputdesc"
                        value={inputdesc}
                        onChange={handleChange2}
                        />
                    </div>
                    
                    
                    
                    <div className="mt-3">
                        <Button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" onClick={handleSubmit}>Add Movie</Button>
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

export default AddMovie;
