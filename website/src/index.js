
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "Assets/scss/paper-dashboard.scss?v=1.3.0";
import "Assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import AdminLayout from "Components/layouts/Admin.js";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" render={(props) => <AdminLayout {...props} />} />
      <Redirect to="/matches" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
