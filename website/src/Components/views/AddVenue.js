import React, { useReducer } from "react";
import "./../../Assets/css/addVenue.css";
import NotificationAlert from "react-notification-alert";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Button,
} from "reactstrap";

const AddVenue = () => {
  const initialValues = {
    venueName: "",
    cityName: "",
    countryName: "",
    capacity: 0,
    errors: {
      venueName: "",
      cityName: "",
      countryName: "",
      capacity: 0,
    },
  };
  const notificationAlert = React.useRef();

  const [formValues, setFormValues] = useReducer(
    (curVals, newVals) => ({ ...curVals, ...newVals }),
    initialValues
  );

  const { venueName, cityName, countryName, capacity } = formValues;

  function submitValues() {
    fetch("http://localhost:3001/addVenue", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        var options = {};
        options = {
          place: "tc",
          message: (
            <div>
              <div>
                <b>Added Venue - {formValues.venueName} Successfully</b>
              </div>
            </div>
          ),
          type: "success",
          icon: "nc-icon nc-bell-55",
          autoDismiss: 7,
        };
        notificationAlert.current.notificationAlert(options);
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
      case "venueName":
        errors.venueName = value == "" ? "Required field" : "";
        break;
      case "cityName":
        errors.cityName = value == "" ? "Required field" : "";
        break;
      case "countryName":
        errors.countryName = value == "" ? "Required field" : "";
        break;
      case "capacity":
        errors.capacity = RegExp("^(0|[1-9][0-9]*)$").test(value)
          ? ""
          : "Capacity should be >=0!";
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
      case "venueName":
        errors.venueName = value == "" ? "Required field" : "";
        break;
      case "cityName":
        errors.cityName = value == "" ? "Required field" : "";
        break;
      case "countryName":
        errors.countryName = value == "" ? "Required field" : "";
        break;
      case "capacity":
        errors.capacity = RegExp("^(0|[1-9][0-9]*)$").test(value)
          ? ""
          : "Capacity should be >=0!";
        break;
      default:
        break;
    }

    setFormValues({ errors, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let errors = formValues.errors;
    if (formValues.venueName.length == 0) {
      errors.venueName = "Required field";
    }
    if (formValues.cityName.length == 0) {
      errors.cityName = "Required field";
    }
    if (formValues.countryName.length == 0) {
      errors.countryName = "Required field";
    }
    setFormValues({ ...formValues, errors });

    if (validateForm(formValues.errors)) {
      submitValues();
    } else {
      var options = {};
      options = {
        place: "tc",
        message: (
          <div>
            <div>
              <b>Values Entered are invalid</b>
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
    <>
      <div className="content">
        <NotificationAlert ref={notificationAlert} />
        <Row>
          <Col md="10" style={{ marginLeft: "auto", marginRight: "auto" }}>
            <Card>
              <CardHeader>
                <CardTitle tag="h3">Add New Venue</CardTitle>
              </CardHeader>
              <CardBody>
                <form id="useReducer-form">
                  <Row
                    style={{
                      marginLeft: "auto",
                      marginRight: "auto",
                      width: "30%",
                    }}
                  >
                    <Col md="12" style={{ marginBottom: "20px" }}>
                      <label style={{ display: "block", fontSize: "1.25em" }}>
                        {"Venue name: "} <br />
                        <input
                          required
                          type="text"
                          name="venueName"
                          value={venueName}
                          onChange={handleFormChange}
                          onBlur={handleBlur}
                          className={
                            "input-box " +
                            (formValues.errors.venueName.length > 0
                              ? "hasError"
                              : "")
                          }
                        />
                      </label>
                      <div
                        className={
                          formValues.errors.venueName.length > 0
                            ? "errorBar"
                            : ""
                        }
                      >
                        {formValues.errors.venueName.length > 0 && (
                          <span className="error">
                            {formValues.errors.venueName}
                          </span>
                        )}
                      </div>
                    </Col>
                    <Col md="12" style={{ marginBottom: "20px" }}>
                      <label style={{ display: "block", fontSize: "1.25em" }}>
                        City name: <br />
                        <input
                          required
                          type="text"
                          name="cityName"
                          value={cityName}
                          onChange={handleFormChange}
                          onBlur={handleBlur}
                          className={
                            "input-box " +
                            (formValues.errors.cityName.length > 0
                              ? "hasError"
                              : "")
                          }
                        />
                      </label>
                      <div
                        className={
                          formValues.errors.cityName.length > 0
                            ? "errorBar"
                            : ""
                        }
                      >
                        {formValues.errors.cityName.length > 0 && (
                          <span className="error">
                            {formValues.errors.cityName}
                          </span>
                        )}
                      </div>
                    </Col>
                    <Col md="12" style={{ marginBottom: "20px" }}>
                      <label style={{ display: "block", fontSize: "1.25em" }}>
                        Country Name: <br />
                        <input
                          required
                          type="text"
                          name="countryName"
                          value={countryName}
                          onChange={handleFormChange}
                          onBlur={handleBlur}
                          className={
                            "input-box " +
                            (formValues.errors.countryName.length > 0
                              ? "hasError"
                              : "")
                          }
                        />
                      </label>
                      <div
                        className={
                          formValues.errors.countryName.length > 0
                            ? "errorBar"
                            : ""
                        }
                      >
                        {formValues.errors.countryName.length > 0 && (
                          <span className="error">
                            {formValues.errors.countryName}
                          </span>
                        )}
                      </div>
                    </Col>
                    <Col md="12" style={{ marginBottom: "20px" }}>
                      <label style={{ display: "block", fontSize: "1.25em" }}>
                        Capacity:
                        <br />
                        <input
                          required
                          type="number"
                          name="capacity"
                          value={capacity}
                          onChange={handleFormChange}
                          onBlur={handleBlur}
                          className={
                            "input-box " +
                            (formValues.errors.capacity.length > 0
                              ? "hasError"
                              : "")
                          }
                        />
                      </label>
                      <div
                        className={
                          formValues.errors.capacity.length > 0
                            ? "errorBar"
                            : ""
                        }
                      >
                        {formValues.errors.capacity.length > 0 && (
                          <span className="error">
                            {formValues.errors.capacity}
                          </span>
                        )}
                      </div>
                    </Col>
                    <Col md="8">
                      <Button
                        block
                        color="primary"
                        className="float-right"
                        style={{ width: "100%" }}
                        onClick={handleSubmit}
                        type="button"
                      >
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AddVenue;
