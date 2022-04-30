// Set 2 Usecase 1 - Client logging in
// TODO: input validation, check if session is in logged in state
// (Check in database) error handling
import React, { useReducer, useState } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import "./../../../Assets/css/login.css";
import NotificationAlert from "react-notification-alert";
import { Card, CardHeader, CardBody, CardTitle } from "reactstrap";

const Login = (props) => {
  const role = localStorage.getItem("role");
  const user = localStorage.getItem("user");
  console.log(role);
  var initialValues;

  if (role == "user") {
    initialValues = {
      inputtel: "",
      inputpswd: "",
      errors: {
        inputtel: "",
        inputpswd: "",
      },
    };
  } else if (role == "theatre") {
    initialValues = {
      inputpswd: "",
      inputid: "",
      errors: {
        inputpswd: "",
        inputid: "",
      },
    };
  } else {
    initialValues = {
      inputpswd: "",
      inputid: "",
      errors: {
        inputpswd: "",
        inputid: "",
      },
    };
  }

  const notificationAlert = React.useRef();
  const [formValues, setFormValues] = useReducer(
    (curVals, newVals) => ({ ...curVals, ...newVals }),
    initialValues
  );

  const { inputtel, inputpswd, inputid } = formValues;
  const [redirect, setRedirect] = useState(false);

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
      case "inputtel":
        errors.inputtel = RegExp(
          "^([1-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9])$"
        ).test(value)
          ? ""
          : "Enter valid phone number";
        break;
      case "inputpswd":
        errors.inputpswd =
          value == ""
            ? "Required field"
            : value.length < 8
            ? "Minimum length to be 8"
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
      case "inputtel":
        errors.inputtel = RegExp(
          "^([1-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9])$"
        ).test(value)
          ? ""
          : "Enter valid phone number";
        break;
      case "inputpswd":
        errors.inputpswd = value == "" ? "Required field" : "";
        break;
      default:
        break;
    }

    setFormValues({ errors, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let errors = formValues.errors;
    if (role == "user") {
      if (formValues.inputtel.length == 0) {
        errors.inputtel = "Required field";
      }
    } else {
      if (formValues.inputid.length == 0) {
        errors.inputid = "Required field";
      }
    }
    if (formValues.inputpswd.length == 0) {
      errors.inputpswd = "Required field";
      setFormValues({ ...formValues, errors });
      return;
    }

    if (validateForm(formValues.errors)) {
      if (role == "user") {
        fetch("http://localhost:3001/userLogin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mobile_number: formValues.inputtel,
            password: formValues.inputpswd,
          }),
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            if (data.accessToken) {
              localStorage.setItem("user", JSON.stringify(data));
              setRedirect(true);
            } else {
              var options = {};
              options = {
                place: "tc",
                message: (
                  <div>
                    <div>
                      <b>Invalid credentials</b>
                    </div>
                  </div>
                ),
                type: "danger",
                icon: "nc-icon nc-bell-55",
                autoDismiss: 7,
              };
              notificationAlert.current.notificationAlert(options);
            }
            return data;
          })
          .catch((err) => {
            console.log(err);
          });

        // in a function, do -  check if credentials are correct in database and redirect to homepage, store user id, city id in session
        console.log("Success");
      } else if (role == "theatre") {
        fetch("http://localhost:3001/theatreLogin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: formValues.inputid,
            password: formValues.inputpswd,
          }),
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            if (data.accessToken) {
              localStorage.setItem("user", JSON.stringify(data));
              setRedirect(true);
            } else {
              var options = {};
              options = {
                place: "tc",
                message: (
                  <div>
                    <div>
                      <b>Invalid credentials</b>
                    </div>
                  </div>
                ),
                type: "danger",
                icon: "nc-icon nc-bell-55",
                autoDismiss: 7,
              };
              notificationAlert.current.notificationAlert(options);
            }
            return data;
          })
          .catch((err) => {
            console.log(err);
          });

        // in a function, do -  check if credentials are correct in database and redirect to homepage, store user id, city id in session
        console.log("Success");
      } else if (role == "admin") {
        console.log(formValues.inputid, formValues.inputpswd);
        fetch("http://localhost:3001/adminLogin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            login_id: formValues.inputid,
            password: formValues.inputpswd,
          }),
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            if (data.accessToken) {
              localStorage.setItem("user", JSON.stringify(data));
              setRedirect(true);
            } else {
              var options = {};
              options = {
                place: "tc",
                message: (
                  <div>
                    <div>
                      <b>Invalid credentials</b>
                    </div>
                  </div>
                ),
                type: "danger",
                icon: "nc-icon nc-bell-55",
                autoDismiss: 7,
              };
              notificationAlert.current.notificationAlert(options);
            }
            return data;
          })
          .catch((err) => {
            console.log(err);
          });

        // in a function, do -  check if credentials are correct in database and redirect to homepage, store user id, city id in session
        console.log("Success");
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

  return (
    <div>
      {role == null ? <Redirect push to="/" /> : null}
      {user == null ? null : <>{} </>}
      {redirect ? (
        role == "user" ? (
          <Redirect push to="/homepage" />
        ) : (
          <>
            {role == "theatre" ? (
              <Redirect push to="/theatres/homepage" />
            ) : (
              <Redirect push to="/admin/homepage" />
            )}
          </>
        )
      ) : null}
      <NotificationAlert ref={notificationAlert} />
      <div
        className="d-flex align-items-center auth px-0"
        style={{ marginTop: "100px" }}
      >
        <div className="row w-100 mx-0">
          <div className="col-lg-4 mx-auto">
            <Card>
              <CardHeader>
                <CardTitle tag="h3">Login</CardTitle>
              </CardHeader>
              <CardBody>
                <form className="pt-3" id="useReducer-form">
                  {role == "user" ? (
                    <div className="form-group">
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
                  ) : (
                    <div className="form-group">
                      ID : <br />
                      <input
                        required
                        type="text"
                        id="inputid"
                        name="inputid"
                        value={inputid}
                        onChange={handleFormChange}
                        onBlur={handleBlur}
                        className={"input-box form-control form-control-lg "}
                      />
                      <div
                        style={{ width: "100%", marginTop: "8px" }}
                        className={
                          formValues.errors.inputid.length > 0 ? "errorBar" : ""
                        }
                      >
                        {formValues.errors.inputid.length > 0 && (
                          <span className="error">
                            {formValues.errors.inputid}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  <br />
                  <div className="form-group">
                    Password : <br />
                    <input
                      required
                      type="password"
                      id="inputpswd"
                      name="inputpswd"
                      value={inputpswd}
                      onChange={handleFormChange}
                      onBlur={handleBlur}
                      className={
                        "input-box form-control form-control-lg " +
                        (formValues.errors.inputpswd.length > 0
                          ? "hasError"
                          : "")
                      }
                      // placeholder="Password"
                    />
                    <div
                      style={{ width: "100%", marginTop: "8px" }}
                      className={
                        formValues.errors.inputpswd.length > 0 ? "errorBar" : ""
                      }
                    >
                      {formValues.errors.inputpswd.length > 0 && (
                        <span className="error">
                          {formValues.errors.inputpswd}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mt-3">
                    <Link
                      className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                      onClick={handleSubmit}
                      to="/dashboard"
                    >
                      LOGIN
                    </Link>
                  </div>
                  {role == "user" ? (
                    <p className="text-center">
                      Not yet Registered?{" "}
                      <Link to="/signup" style={{ fontWeight: "bold" }}>
                        Sign Up here
                      </Link>
                    </p>
                  ) : (
                    <></>
                  )}
                </form>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
