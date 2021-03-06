// Set 1 Usecase 6 - Movie Info Page
// TODO: fetch data from db
import React, { useReducer } from "react";
import { Redirect } from "react-router-dom";
import NotificationAlert from "react-notification-alert";
import "./../../../Assets/css/login.css";
import { Card, CardHeader, CardBody, CardTitle, Button } from "reactstrap";

const AddArtist = (props) => {
  const role = localStorage.getItem("role");
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
        errors.artistname = value == "" ? "Required field" : "";
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
        errors.artistname = value == "" ? "Required field" : "";
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
      fetch("http://localhost:3001/addArtist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          artist_name: formValues.artistname,
        }),
      }).then((response) => {
        return response.json();
      });

      var options = {};
      options = {
        place: "tc",
        message: (
          <div>
            <div>
              <b>Artist added successfully!</b>
            </div>
          </div>
        ),
        type: "success",
        icon: "nc-icon nc-bell-55",
        autoDismiss: 7,
      };
      notificationAlert.current.notificationAlert(options);

      setFormValues(initialValues);
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
      <NotificationAlert ref={notificationAlert} />
      <div
        className="d-flex align-items-center auth px-0"
        style={{ marginTop: "100px", marginRight: "300px" }}
      >
        <div className="row w-100 mx-0">
          <div className={"mx-auto col-lg-4"}></div>
          <Card>
            <CardHeader>
              <CardTitle tag="h3">Add Artist</CardTitle>
            </CardHeader>

            <CardBody>
              <form className="pt-3">
                <div className="row">
                  <div className={"form-group col-12"}>
                    Artist Name: <br />
                    <input
                      type="text"
                      id="artistname"
                      name="artistname"
                      value={artistname}
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
                        formValues.errors.artistname.length > 0
                          ? "errorBar"
                          : ""
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
                    <Button
                      className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                      onClick={handleSubmit}
                    >
                      Add Artist
                    </Button>
                  </div>
                </div>
              </form>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddArtist;
