import React from "react";

import logo from "./logo.jpg";
import title from "./TNRTitle.png";

const CustomNav = __ => (
  <nav className="nav">
    <a className="skipNav" href="#main">
      skip navigation{" "}
    </a>
    <i className="fas fa-bars fa-2x hamburgerIcon" />
    <img className="logo" alt="TNR logo" src={logo} />
    <img className="header" alt="The New Republic" src={title} />
    <a
      href="https://newrepublic.com/magazine"
      className="nav__link nav__link--mag"
    >
      {" "}
      MAGAZINE{" "}
    </a>
    <a href="/imaginary-subscription-page" className="nav__link nav__link--sub">
      {" "}
      SUBSCRIBE{" "}
    </a>
  </nav>
);

export default CustomNav