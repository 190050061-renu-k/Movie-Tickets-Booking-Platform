import React, {useState} from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Switch, useLocation, Redirect } from "react-router-dom";

import DemoNavbar from "Components/Navbars/DemoNavbar.js";
import Sidebar from "Components/Sidebar/Sidebar.js";

import routes, { sidebar_display } from "Components/routes.js";

var ps;

function Dashboard(props) {
  const mainPanel = React.useRef();
  const location = useLocation();
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.body.classList.toggle("perfect-scrollbar-on");
      }
    };
  });
  React.useEffect(() => {
    mainPanel.current.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [location]);

  const [role, setRole] = useState("");
  function updateRole(role_name){
    console.log("Update role")
    setRole(role_name);
  }

  return (
    <div className="wrapper">
      <Sidebar
        {...props}
        role={role}
        routes={sidebar_display}
        bgColor={"black"}
        activeColor={"info"}
      />
      <div className="main-panel" ref={mainPanel}>
        <DemoNavbar {...props} />
        <Switch>
          {routes.map((prop, key) => {
            console.log(prop.component)
            return (
              <Route
                updateRole={updateRole}
                path={prop.layout + prop.path}
                component={prop.component}
                key={key}
              />
            );
          })}
          <Route render={() => <Redirect to={{ pathname: "/login" }} />} />
        </Switch>
      </div>
    </div>
  );
}

export default Dashboard;
