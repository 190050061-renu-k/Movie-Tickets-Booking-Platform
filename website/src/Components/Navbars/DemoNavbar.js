import React from "react";
import { useLocation } from "react-router-dom";
import { Navbar, NavbarBrand, Container } from "reactstrap";

function Header(props) {
  const sidebarToggle = React.useRef();
  const location = useLocation();

  const openSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    sidebarToggle.current.classList.toggle("toggled");
  };

  React.useEffect(() => {
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      sidebarToggle.current.classList.toggle("toggled");
    }
  }, [location]);

  return (
    <Navbar
      color="dark"
      expand="lg"
      className="navbar-absolute fixed-top navbar-transparent"
    >
      <Container fluid>
        <div className="navbar-wrapper">
          <div className="navbar-toggle">
            <button
              type="button"
              ref={sidebarToggle}
              className="navbar-toggler"
              onClick={() => openSidebar()}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>
          {/* <NavbarBrand href="/">IITB CricInfo</NavbarBrand> */}
        </div>
      </Container>
    </Navbar>
  );
}

export default Header;
