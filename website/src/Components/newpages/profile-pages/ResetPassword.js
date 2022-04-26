// Set 2 Usecase 1 - Client logging in 
// TODO: input validation, check if session is in logged in state
// (Check in database) error handling
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle
  } from "reactstrap";

const ResetPassword = (props) => {
    return (
      <div>
        <div className="d-flex align-items-center auth px-0" style={{marginTop:'30px'}}>
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle tag="h3">Reset Password</CardTitle>
                    </CardHeader>
                    <CardBody>
                {/* brand logo  */}
                {/* <h4>New here?</h4> */}
                {/* <h6 className="font-weight-light">Signing up is easy. It only takes a few steps</h6> */}
                    <form className="pt-3">
                    <div className="form-group">
                        <input type="password" className="form-control form-control-lg" id="inputoldpswd" placeholder="Old Password" />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control form-control-lg" id="inputnewpswd" placeholder="New Password" />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control form-control-lg" id="inputreenterpswd" placeholder="Re-enter New Password" />
                    </div>
                    <div className="mt-3">
                        <Link className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" to="/dashboard">Submit</Link>
                    </div>
                    </form>
            </CardBody>
            </Card>
            </div>
            </div>
            </div>
            </div>

    );
}

export default ResetPassword;
