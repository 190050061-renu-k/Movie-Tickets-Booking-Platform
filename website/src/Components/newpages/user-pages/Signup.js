// Usecase 1 - Client signing up 
// TODO: Input validation, add entry to database
// TODO: Check if session is in logged in state
import React, { useReducer } from 'react';
import { Link } from 'react-router-dom';
import "./../../../Assets/css/login.css";
import NotificationAlert  from "react-notification-alert";
import { Multiselect } from "multiselect-react-dropdown";
import { Redirect } from "react-router-dom";
// import Select from "react-select"

import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Button
  } from "reactstrap";

var genres = [
    {id:16, name: "Animation"},
    {id:35, name: "Comedy"},
    {id:10751, name: "Family"},
    {id:12, name: "Adventure"},
    {id:14, name: "Fantasy"},
    {id:10749, name: "Romance"},
    {id:18, name: "Drama"},
    {id:28, name: "Action"},
    {id:80, name: "Crime"},
    {id:53, name: "Thriller"},
    {id:27, name: "Horror"},
    {id:36, name: "History"},
    {id:878, name: "Science Fiction"},
    {id:9648, name: "Mystery"},
    {id:10752, name: "War"},
    {id:10769, name: "Foreign"},
    {id:10402, name: "Music"},
    {id:99, name: "Documentary"},
    {id:37, name: "Western"},
    {id:10770, name: "TV Movie"}
]


const Signup =(props)=> {
    const role = localStorage.getItem('role');

    var getcol = props.col ? props.col : 6;
    var getcard = props.card ? props.card : 8;
    var margin = props.margin?props.margin:"100px";
    var dest = props.dest ? props.dest : "/login";
    var opt = ["Hyderabad","Bangalore","Mumbai"];

    const initialValues = {
        inputname: "",
        inputpswd1: "",
        inputpswd2: "",
        inputtel: "",
        inputcity: [],
        inputlang: "",
        inputgenre: "",
        errors: {
            inputname: "",
            inputpswd1: "",
            inputpswd2: "",
            inputtel: ""
        },
    };
    const notificationAlert = React.useRef();
    const [formValues, setFormValues] = useReducer(
        (curVals, newVals) => ({ ...curVals, ...newVals }),
        initialValues
      );
    
    const { inputname,inputpswd1,
        inputpswd2,inputtel,inputcity,inputlang,inputgenre} = formValues;
        console.log("Here",inputcity);

    
    const validateForm = (errors) => {
        let valid = true;
        Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
        return valid;
    };
        
    const handleFormChange = (event) => {
        event.preventDefault();
        
        const { name, value } = event.target;
        console.log(name,value);
        
        let errors = formValues.errors;
        switch (name) {
            case "inputname":
            errors.inputname = value =="" ? "Required field" : "";
            
            break;
            case "inputpswd1":
            errors.inputpswd1 = value =="" ? "Required field" : (value.length<8 ? "Minimum length to be 8" : "");
            break;
            case "inputpswd2":
            errors.inputpswd2 = value =="" ? "Required field" : (value.length<8 ? "Minimum length to be 8" : (value!==formValues.inputpswd1 ? "Password not matching" : ""));
            break;
            case "inputtel":
            errors.inputtel = RegExp("^([1-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9])$").test(value)
            ? "" :"Enter valid phone number";
            break;
            default:
            break;
        }
        if(name=="inputcity"){
            console.log(inputcity);
            if(inputcity.length==0 || inputcity.indexOf(value)==-1 ){
                inputcity.push(value);
                setFormValues(...prevState=>({...prevState,"errors":errors,  "inputcity": inputcity}));
                console.log("After", formValues.inputcity);
            }
            else{
                console.log("Clicker here");
                var newinputcity = [];
                for(var c in inputcity){
                    if(c["value"]!==value){
                        newinputcity.push(c);
                    }
                }
                setFormValues(...prevState=>({...prevState,"errors":errors, "inputcity": newinputcity}));
            }
            
        }
        // setFormValues({ errors, [name]: value });
        };
        
        const handleBlur = (event) => {
            event.preventDefault();
        
            const { name, value } = event.target;
            let errors = formValues.errors;
            switch (name) {
                case "inputname":
            errors.inputname = value =="" ? "Required field" : "";
            
            break;
            case "inputpswd1":
            errors.inputpswd1 = value =="" ? "Required field" : (value.length<8 ? "Minimum length to be 8" : "");
            break;
            case "inputpswd2":
            errors.inputpswd2 = value =="" ? "Required field" : (value.length<8 ? "Minimum length to be 8" : (value!==formValues.inputpswd1 ? "Password not matching" : ""));
            break;
                case "inputtel":
                errors.inputtel = RegExp("^([1-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9])$").test(value)
                ? "" :"Enter valid phone number";
                break;
                default:
                break;
            }
        
            setFormValues({ errors, [name]: value });
          };
        
        const handleSubmit = (event) => {
            event.preventDefault();
            let errors = formValues.errors;
            if (formValues.inputname.length == 0) {
                errors.inputname = "Required field";
                setFormValues({ ...formValues, errors });
                return;
            }
            if (formValues.inputpswd1.length == 0) {
                errors.inputpswd1 = "Required field";
                setFormValues({ ...formValues, errors });
                return;
            }
            if (formValues.inputpswd2.length == 0) {
                errors.inputpswd2 = "Required field";
                setFormValues({ ...formValues, errors });
                return;
            }
            if (formValues.inputtel.length == 0) {
              errors.inputtel = "Required field";
              setFormValues({ ...formValues, errors });
              return;
            }
            
            if (validateForm(formValues.errors)) {
                // in a function, do -  check if credentials are correct in database and redirect to homepage, store user id, city id in session 
                // let path = {dest} // variable ;
                // console.log(path);
                // this.props.history.push(path);
                console.log("Success");
            } 
            else {
                console.log("Failure");
                var options = {};
                options = {
                    place: "tc",
                    message: (
                    <div>
                        <div>
                        <b>Please enter valid entries</b>
                        </div>
                    </div>
                    ),
                    type: "danger",
                    icon: "nc-icon nc-bell-55",
                    autoDismiss: 7,
                };
                notificationAlert.current.notificationAlert(options);
            }
          };

    return (
      <div>
          {role==null ? <Redirect push to="/" /> : null}
        <NotificationAlert ref={notificationAlert} />

        <div className=" align-items-center " style={{marginTop:margin}}>
          <div className="row">
            <div className={" col-lg-" + getcard}>
                
                <Card>
                    <CardHeader>
                        <CardTitle tag="h3">{props.showsign ? "Edit Profile" : "Register"}</CardTitle>
                    </CardHeader>
                    
                    <CardBody>
                   
                {/* brand logo  */}
                {/* <h4>New here?</h4> */}
                {/* <h6 className="font-weight-light">Signing up is easy. It only takes a few steps</h6> */}
                    <form className="pt-3"  id="useReducer-form">
                        <div className='row'>

                    <div className={"form-group col-" + 12 }>
                        Username: <br/>
                        <input 
                        required
                        type="text" 
                        id="inputname" 
                        name = "inputname"
                        value = {inputname}
                        onChange={handleFormChange}
                        onBlur={handleBlur}
                        className={
                            "input-box form-control form-control-lg " +
                            (formValues.errors.inputname.length > 0
                            ? "hasError"
                            : "")}
                        />
                        <div style={{width:"100%", marginTop:"8px" }}
                            className={
                            formValues.errors.inputname.length > 0
                                ? "errorBar"
                                : ""
                            }
                        >
                            {formValues.errors.inputname.length > 0 && (
                            <span className="error">
                                {formValues.errors.inputname}
                            </span>
                            )}
                        </div>
                    </div>
                    {props.showsign ? <></> : 
                    <div className={"form-group col-"  + getcol }>
                        Password: <br/>
                        <input 
                        required
                        type="password" 
                        id="inputpswd1"
                        name="inputpswd1"
                        value={inputpswd1}
                        onChange={handleFormChange}
                        onBlur={handleBlur}
                        className={
                            "input-box form-control form-control-lg " +
                            (formValues.errors.inputpswd1.length > 0
                            ? "hasError"
                            : "")}
                        />
                         <div style={{width:"100%", marginTop:"8px" }}
                            className={
                            formValues.errors.inputpswd1.length > 0
                                ? "errorBar"
                                : ""
                            }
                        >
                            {formValues.errors.inputpswd1.length > 0 && (
                            <span className="error">
                                {formValues.errors.inputpswd1}
                            </span>
                            )}
                        </div>
                    </div>}
                    
                    {props.showsign ? <></> : 
                    <div className={"form-group col-" + getcol }>
                        Re-enter Password: <br/>
                        <input required
                        type="password" 
                        id="inputpswd2"
                        name="inputpswd2"
                        value={inputpswd2}
                        onChange={handleFormChange}
                        onBlur={handleBlur}
                        className={
                            "input-box form-control form-control-lg " +
                            (formValues.errors.inputpswd2.length > 0
                            ? "hasError"
                            : "")}
                        />
                         <div style={{width:"100%", marginTop:"8px" }}
                            className={
                            formValues.errors.inputpswd2.length > 0
                                ? "errorBar"
                                : ""
                            }
                        >
                            {formValues.errors.inputpswd2.length > 0 && (
                            <span className="error">
                                {formValues.errors.inputpswd2}
                            </span>
                            )}
                        </div>
                    </div>
                    }
                    {props.showsign ? <></> : 
                    <div className={"form-group col-"  + getcol }>
                        Phone Number : <br/>
                        <input 
                            required 
                            type="tel" 
                            id="inputtel"
                            name = "inputtel" 
                            value = {inputtel}
                            onChange={handleFormChange}
                            onBlur={handleBlur}
                            className={
                                "input-box form-control form-control-lg " +
                                (formValues.errors.inputtel.length > 0
                                ? "hasError"
                                : "")}
                            
                        /> 
                         <div style={{width:"100%", marginTop:"8px" }}
                            className={
                            formValues.errors.inputtel.length > 0
                                ? "errorBar"
                                : ""
                            }
                        >
                            {formValues.errors.inputtel.length > 0 && (
                            <span className="error">
                                {formValues.errors.inputtel}
                            </span>
                            )}
                        </div>   
                    </div>
                    }
                    <div className={"form-group col-" + getcol }>
                        
                        City: <br/>
                        <select 
                        id="inputcity"
                        name = "inputcity"
                        value = {inputcity}
                        onChange={handleFormChange}
                        onBlur={handleBlur}
                        multiple
                        className="input-box form-control form-control-lg"
                        // options = {opt}
                        // displayValue = "key"
                        >
                        {/* <option >None</option> */}
                        <option value = "Hyderabad">Hyderabad</option>
                        <option value="Bangalore">Bangalore</option>
                        {/* <option>Delhi</option> */}
                        <option value="Mumbai">Mumbai</option>
                        {/* <option>Kolkata</option>
                        <option>Kochi</option>
                        <option>Ahmedabad</option>
                        <option>Chennai</option> */}
                        </select>
                        {/* </Multiselect> */}
                    </div>
                    <div className={"form-group col-"  + getcol }>
                        Language: <br/>
                    <select 
                        id="inputlang"
                        name = "inputlang"
                        value = {inputlang}
                        onChange={handleFormChange}
                        onBlur={handleBlur}
                        className="input-box form-control form-control-lg"
                        >
                        <option>None</option>
                        <option>Telugu</option>
                        <option>Hindi</option>
                        <option>English</option>
                        <option>Marathi</option>
                        </select>
                    </div>
                    <div className={"form-group col-"  + getcol }>
                        Genre: <br/>
                        <select 
                        id="inputgenre"
                        name = "inputgenre"
                        value = {inputgenre}
                        onChange={handleFormChange}
                        onBlur={handleBlur}
                        className="input-box form-control form-control-lg"
                        >
                            <option>None</option>
                        {genres.map((i) => {
                            return (
                                <option>{i.name}</option>
                            );
                        })}
                        </select>
                    </div>
                    </div>
                    {props.showsign ?
                     <div className="mt-3">
                     <Link  className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" to="/profile">Submit</Link>
                     </div>
                      :
                    <>
                        <div className="mt-3">
                            <Button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" onClick={handleSubmit} >SIGN UP</Button>
                        </div>
                        <div className="text-center mt-4 font-weight-light">
                            <p style= {{fontSize:"1.15em"}}>Already have an account? <Link to="/login" className="text-primary" style={{fontWeight:'bold'}} >Login</Link></p>
                        </div>
                    </>
                    }
                    
                    </form>
            
            
            </CardBody>
            </Card>
            </div>
            </div>
            </div>
            </div>

    );
}

export default Signup;
