// Set 2 Usecase 1 - Client logging in
// TODO: input validation, check if session is in logged in state
// (Check in database) error handling
import React, { useReducer } from "react";
import "./../../../Assets/css/login.css";
import NotificationAlert from "react-notification-alert";
import { Card, CardHeader, CardBody, CardTitle, Button } from "reactstrap";

const ResetPassword = (props) => {
  const user_id = JSON.parse(localStorage.getItem("user")).user_id;
  const initialValues = {
    oldpswd: "",
    newpswd1: "",
    newpswd2: "",
    errors: {
      oldpswd: "",
      newpswd1: "",
      newpswd2: "",
    },
  };
  const notificationAlert = React.useRef();
  const [formValues, setFormValues] = useReducer(
    (curVals, newVals) => ({ ...curVals, ...newVals }),
    initialValues
  );

  const { oldpswd, newpswd1, newpswd2 } = formValues;

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
      case "oldpswd":
        errors.oldpswd =
          value == ""
            ? "Required field"
            : value.length < 8
            ? "Minimum length to be 8"
            : "";
        break;
      case "newpswd1":
        errors.newpswd1 =
          value == ""
            ? "Required field"
            : value.length < 8
            ? "Minimum length to be 8"
            : "";
        break;
      case "newpswd2":
        errors.newpswd2 =
          value == ""
            ? "Required field"
            : value.length < 8
            ? "Minimum length to be 8"
            : value != formValues.newpswd1
            ? "Passwords don't match"
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
      case "oldpswd":
        errors.oldpswd =
          value == ""
            ? "Required field"
            : value.length < 8
            ? "Minimum length to be 8"
            : "";
        break;
      case "newpswd1":
        errors.newpswd1 =
          value == ""
            ? "Required field"
            : value.length < 8
            ? "Minimum length to be 8"
            : "";
        break;
      case "newpswd2":
        errors.newpswd2 =
          value == ""
            ? "Required field"
            : value.length < 8
            ? "Minimum length to be 8"
            : value != formValues.newpswd1
            ? "Passwords don't match"
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
    if (formValues.oldpswd.length == 0) {
      errors.oldpswd = "Required field";
      setFormValues({ ...formValues, errors });
      return;
    }
    if (formValues.newpswd1.length == 0) {
      errors.newpswd1 = "Required field";
      setFormValues({ ...formValues, errors });
      return;
    }
    if (formValues.newpswd2.length == 0) {
      errors.newpswd2 = "Required field";
      setFormValues({ ...formValues, errors });
      return;
    }

    if (validateForm(formValues.errors)) {
      console.log(formValues);
      fetch("http://localhost:3001/changePassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          old_password: formValues.oldpswd,
          new_password: formValues.newpswd1,
          user_id: user_id,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data) {
            setFormValues(initialValues);
            var options = {};
            options = {
              place: "tc",
              message: (
                <div>
                  <div>
                    <b>Password Changed Successfully!</b>
                  </div>
                </div>
              ),
              type: "success",
              icon: "nc-icon nc-bell-55",
              autoDismiss: 7,
            };
            notificationAlert.current.notificationAlert(options);
          } else {
            var options = {};
            options = {
              place: "tc",
              message: (
                <div>
                  <div>
                    <b>Incorrect current password</b>
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

      // in a function, do -  check if credentials are correct in database and redirect to homepage, store user id, city id in session
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
      <NotificationAlert ref={notificationAlert} />
      <div
        className="d-flex align-items-center auth px-0"
        style={{ marginTop: "30px" }}
      >
        <div className="row w-100 mx-0">
          <div className="col-lg-4 mx-auto">
            <Card>
              <CardHeader>
                <CardTitle tag="h3">Reset Password</CardTitle>
              </CardHeader>
              <CardBody>
                <form className="pt-3" id="useReducer-form">
                  <div className="form-group">
                    Password: <br />
                    <input
                      type="password"
                      id="inputoldpswd"
                      name="oldpswd"
                      value={oldpswd}
                      onChange={handleFormChange}
                      onBlur={handleBlur}
                      className={
                        "input-box form-control form-control-lg " +
                        (formValues.errors.oldpswd.length > 0 ? "hasError" : "")
                      }
                    />
                    <div
                      style={{ width: "100%", marginTop: "8px" }}
                      className={
                        formValues.errors.oldpswd.length > 0 ? "errorBar" : ""
                      }
                    >
                      {formValues.errors.oldpswd.length > 0 && (
                        <span className="error">
                          {formValues.errors.oldpswd}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="form-group">
                    New Password: <br />
                    <input
                      type="password"
                      id="inputnewpswd"
                      name="newpswd1"
                      value={newpswd1}
                      onChange={handleFormChange}
                      onBlur={handleBlur}
                      className={
                        "input-box form-control form-control-lg " +
                        (formValues.errors.newpswd1.length > 0
                          ? "hasError"
                          : "")
                      }
                    />
                    <div
                      style={{ width: "100%", marginTop: "8px" }}
                      className={
                        formValues.errors.newpswd1.length > 0 ? "errorBar" : ""
                      }
                    >
                      {formValues.errors.newpswd1.length > 0 && (
                        <span className="error">
                          {formValues.errors.newpswd1}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="form-group">
                    Re-enter New Password: <br />
                    <input
                      type="password"
                      id="inputnewpswd"
                      name="newpswd2"
                      value={newpswd2}
                      onChange={handleFormChange}
                      onBlur={handleBlur}
                      className={
                        "input-box form-control form-control-lg " +
                        (formValues.errors.newpswd2.length > 0
                          ? "hasError"
                          : "")
                      }
                    />
                    <div
                      style={{ width: "100%", marginTop: "8px" }}
                      className={
                        formValues.errors.newpswd2.length > 0 ? "errorBar" : ""
                      }
                    >
                      {formValues.errors.newpswd2.length > 0 && (
                        <span className="error">
                          {formValues.errors.newpswd2}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mt-3">
                    <Button
                      className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  </div>
                </form>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
