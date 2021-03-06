// Usecase 1 - Client signing up
// TODO: validation for age
// TODO: Check if session is in logged in state
import React, { useState, useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import "./../../../Assets/css/login.css";
import NotificationAlert from "react-notification-alert";
import { Multiselect } from "multiselect-react-dropdown";
import { Redirect } from "react-router-dom";
// import Select from "react-select"

import { Card, CardHeader, CardBody, CardTitle, Button } from "reactstrap";
import Preload from "Components/layouts/Preload";

const Signup = (props) => {
  var getcol = props.col ? props.col : 6;
  var getcard = props.card ? props.card : 8;
  var margin = props.margin ? props.margin : "100px";
  var dest = props.dest ? props.dest : "/login";

  var [cities, setCities] = useState({});
  var [genres, setGenres] = useState({});
  var [languages, setLanguages] = useState({});
  const [redirect, setRedirect] = useState(false);
  const [isLoading, setisLoading] = useState(0);
  const role = localStorage.getItem("role");
  useEffect(() => {
    getCategories();
  }, []);

  function getCategories() {
    setisLoading(1);
    fetch("http://localhost:3001/getCities", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCities(data);
      })
      .catch((err) => {
        console.log(err);
      });

    fetch("http://localhost:3001/getGenres", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setGenres(data);
      })
      .catch((err) => {
        console.log(err);
      });

    fetch("http://localhost:3001/getLanguages", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setLanguages(data);
        setisLoading(2);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const initialValues = {
    inputname: "",
    inputpswd1: "",
    inputpswd2: "",
    inputtel: "",
    inputcity: "",
    inputlang: [],
    inputgenre: [],
    age: 0,
    errors: {
      inputname: "",
      inputpswd1: "",
      inputpswd2: "",
      inputtel: "",
    },
  };

  const notificationAlert = React.useRef();
  const [formValues, setFormValues] = useReducer(
    (curVals, newVals) => ({ ...curVals, ...newVals }),
    initialValues
  );

  const {
    inputname,
    inputpswd1,
    inputpswd2,
    inputtel,
    inputcity,
    inputlang,
    inputgenre,
    inputage,
  } = formValues;

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
      case "inputname":
        errors.inputname = value == "" ? "Required field" : "";

        break;
      case "inputpswd1":
        errors.inputpswd1 =
          value == ""
            ? "Required field"
            : value.length < 8
            ? "Minimum length to be 8"
            : "";
        break;
      case "inputpswd2":
        errors.inputpswd2 =
          value == ""
            ? "Required field"
            : value.length < 8
            ? "Minimum length to be 8"
            : value !== formValues.inputpswd1
            ? "Password not matching"
            : "";
        break;
      case "inputtel":
        errors.inputtel = RegExp(
          "^([1-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9])$"
        ).test(value)
          ? ""
          : "Enter valid phone number";
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
      case "inputname":
        errors.inputname = value == "" ? "Required field" : "";

        break;
      case "inputpswd1":
        errors.inputpswd1 =
          value == ""
            ? "Required field"
            : value.length < 8
            ? "Minimum length to be 8"
            : "";
        break;
      case "inputpswd2":
        errors.inputpswd2 =
          value == ""
            ? "Required field"
            : value.length < 8
            ? "Minimum length to be 8"
            : value !== formValues.inputpswd1
            ? "Password not matching"
            : "";
        break;
      case "inputtel":
        errors.inputtel = RegExp(
          "^([1-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9])$"
        ).test(value)
          ? ""
          : "Enter valid phone number";
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
      console.log({
        useName: formValues.inputname,
        age: formValues.inputage,
        mobile_num: formValues.inputtel,
        pswd: formValues.inputpswd1,
        city_id: formValues.inputcity,
        language_ids: formValues.inputlang,
        genre_ids: formValues.inputgenre,
      });
      if(props.showsign){
        fetch("http://localhost:3001/signUp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: formValues.inputname,
            age: formValues.inputage,
            mobile_num: formValues.inputtel,
            pswd: formValues.inputpswd1,
            city_id: parseInt(formValues.inputcity),
            language_ids: formValues.inputlang.map((e) => e.language_id),
            genre_ids: formValues.inputgenre.map((e) => e.genre_id),
          }),
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setFormValues({});
            if (data) setRedirect(true);
            else {
              var options = {};
              options = {
                place: "tc",
                message: (
                  <div>
                    <div>
                      <b>Mobile number already in use</b>
                    </div>
                  </div>
                ),
                type: "danger",
                icon: "nc-icon nc-bell-55",
                autoDismiss: 7,
              };
              notificationAlert.current.notificationAlert(options);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else{
        fetch("http://localhost:3001/editProfile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: formValues.inputname,
            age: formValues.inputage,
            mobile_num: formValues.inputtel,
            pswd: formValues.inputpswd1,
            city_id: parseInt(formValues.inputcity),
            language_ids: formValues.inputlang.map((e) => e.language_id),
            genre_ids: formValues.inputgenre.map((e) => e.genre_id),
          }),
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            if (data) setRedirect(true);
            else {
              var options = {};
              options = {
                place: "tc",
                message: (
                  <div>
                    <div>
                      <b>Mobile number already in use</b>
                    </div>
                  </div>
                ),
                type: "danger",
                icon: "nc-icon nc-bell-55",
                autoDismiss: 7,
              };
              notificationAlert.current.notificationAlert(options);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }

    } else {
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
  if (isLoading == 2) {
    return (
      <div>
        {role != "user" ? <Redirect push to="/" /> : null}
        {redirect ? <Redirect push to={dest} /> : null}
        <NotificationAlert ref={notificationAlert} />

        <div className=" align-items-center " style={{ marginTop: margin }}>
          <div className="row">
            <div className={" col-lg-" + getcard}>
              <Card>
                <CardHeader>
                  <CardTitle tag="h3">
                    {props.showsign ? "Edit Profile" : "Register"}
                  </CardTitle>
                </CardHeader>

                <CardBody>
                  {/* brand logo  */}
                  {/* <h4>New here?</h4> */}
                  {/* <h6 className="font-weight-light">Signing up is easy. It only takes a few steps</h6> */}
                  <form className="pt-3" id="useReducer-form">
                    <div className="row">
                      <div className={"form-group col-" + 6}>
                        Username: <br />
                        <input
                          required
                          type="text"
                          id="inputname"
                          name="inputname"
                          value={inputname}
                          onChange={handleFormChange}
                          onBlur={handleBlur}
                          className={
                            "input-box form-control form-control-lg " +
                            (formValues.errors.inputname.length > 0
                              ? "hasError"
                              : "")
                          }
                        />
                        <div
                          style={{ width: "100%", marginTop: "8px" }}
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
                      <div className={"form-group col-" + 6}>
                        Age: <br />
                        <input
                          required
                          type="text"
                          id="inputage"
                          name="inputage"
                          value={inputage}
                          onChange={handleFormChange}
                          onBlur={handleBlur}
                          className={"input-box form-control form-control-lg "}
                        />
                        <div
                          style={{ width: "100%", marginTop: "8px" }}
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
                      {props.showsign ? (
                        <></>
                      ) : (
                        <div className={"form-group col-" + getcol}>
                          Password: <br />
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
                                : "")
                            }
                          />
                          <div
                            style={{ width: "100%", marginTop: "8px" }}
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
                        </div>
                      )}

                      {props.showsign ? (
                        <></>
                      ) : (
                        <div className={"form-group col-" + getcol}>
                          Re-enter Password: <br />
                          <input
                            required
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
                                : "")
                            }
                          />
                          <div
                            style={{ width: "100%", marginTop: "8px" }}
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
                      )}
                      {props.showsign ? (
                        <></>
                      ) : (
                        <div className={"form-group col-" + getcol}>
                          Phone Number : <br />
                          <input
                            required
                            type="tel"
                            id="inputtel"
                            name="inputtel"
                            value={inputtel}
                            onChange={handleFormChange}
                            onBlur={handleBlur}
                            className={
                              "input-box form-control form-control-lg " +
                              (formValues.errors.inputtel.length > 0
                                ? "hasError"
                                : "")
                            }
                          />
                          <div
                            style={{ width: "100%", marginTop: "8px" }}
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
                      )}
                      <div className={"form-group col-" + getcol}>
                        City: <br />
                        <select
                          id="inputcity"
                          name="inputcity"
                          value={inputcity}
                          onChange={handleFormChange}
                          onBlur={handleBlur}
                          className="input-box form-control form-control-lg"
                        >
                          {cities.length > 0
                            ? cities.map((i) => {
                                return (
                                  <option value={i.city_id}>{i.city}</option>
                                );
                              })
                            : null}
                        </select>
                      </div>

                      <div className={"form-group col-" + getcol}>
                        Language: <br />
                        <Multiselect
                          options={languages}
                          name="inputlang"
                          displayValue="name"
                          onSelect={(selectedValues, selectedItem) => {
                            setFormValues({
                              ...formValues,
                              inputlang: selectedValues,
                            });
                          }}
                          onRemove={(selectedValues, selectedItem) =>
                            setFormValues({
                              ...formValues,
                              inputlang: selectedValues,
                            })
                          }
                          className="input-box form-control form-control-lg"
                        />
                      </div>

                      <div className={"form-group col-" + getcol}>
                        Genre: <br />
                        <Multiselect
                          options={genres}
                          name="inputgenre"
                          displayValue="name"
                          onSelect={(selectedValues, selectedItem) => {
                            setFormValues({
                              ...formValues,
                              inputgenre: selectedValues,
                            });
                          }}
                          onRemove={(selectedValues, selectedItem) =>
                            setFormValues({
                              ...formValues,
                              inputgenre: selectedValues,
                            })
                          }
                          className="input-box form-control form-control-lg"
                        />
                      </div>
                    </div>
                    {props.showsign ? (
                      <div className="mt-3">
                        <Link
                          className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                          to="/profile"
                        >
                          Submit
                        </Link>
                      </div>
                    ) : (
                      <>
                        <div className="mt-3">
                          <Button
                            className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                            onClick={handleSubmit}
                          >
                            SIGN UP
                          </Button>
                        </div>
                        <div className="text-center mt-4 font-weight-light">
                          <p style={{ fontSize: "1.15em" }}>
                            Already have an account?{" "}
                            <Link
                              to="/login"
                              className="text-primary"
                              style={{ fontWeight: "bold" }}
                            >
                              Login
                            </Link>
                          </p>
                        </div>
                      </>
                    )}
                  </form>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  } else return <Preload></Preload>;
};

export default Signup;
