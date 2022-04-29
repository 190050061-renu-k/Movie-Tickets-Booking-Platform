// Set 1 Usecase 6 - Movie Info Page
// TODO: fetch data from db
import React, { useReducer } from 'react';
import "./../../../Assets/css/login.css";
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Button 
  } from "reactstrap";


const AddArtist = (props) => {
    const initialValues = {
        artistname: "",
        errors: {
            artistname: "",
        },
    };

    const notificationAlert = React.useRef();
    const [formValues, setFormValues] = useReducer(
        (curVals, newVals) => ({ ...curVals, ...newVals }),
        initialValues
    );

    const { artistname } = formValues;

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
          case "artistname":
            errors.artistname = value =="" ? "Required field"
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
            case "artistname":
                errors.artistname = value =="" ? "Required field"
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
        if (formValues.artistname.length == 0) {
          errors.artistname = "Required field";
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
            <div className="d-flex align-items-center auth px-0" style={{marginTop:"100px", marginRight:"300px"}}>
            <div className="row w-100 mx-0">
                <div className={"mx-auto col-lg-4" }></div>
                    <Card>
                        <CardHeader>
                            <CardTitle tag="h3">Add Artist</CardTitle>
                        </CardHeader>
                        
                        <CardBody>
                
                            <form className="pt-3">
                                <div className='row'>

                            <div className={"form-group col-12" }>
                                Artist Name: <br/>
                                <input 
                                type="text" 
                                id="artistname" 
                                name = "artistname"
                                value = {artistname}
                                onChange={handleFormChange}
                                onBlur={handleBlur}
                                className={
                                "input-box form-control form-control-lg " +
                                (formValues.errors.artistname.length > 0
                                    ? "hasError"
                                    : "")
                                }
                                />
                                <div
                                    style={{ width: "100%", marginTop: "8px" }}
                                    className={
                                        formValues.errors.artistname.length > 0 ? "errorBar" : ""
                                    }
                                    >
                                    {formValues.errors.artistname.length > 0 && (
                                        <span className="error">
                                        {formValues.errors.artistname}
                                        </span>
                                    )}
                                </div>
                            </div>
                            
                            <div className="mt-3">
                                <Button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" onClick={handleSubmit}>Add Artist</Button>
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

export default AddArtist;
