import React from "react";

import logo from "./logo.jpg";
import title from "./TNRTitle.png";

/*
 the hidden-until-focus skipNav link is primarily for
 users who rely exclusively or primarily on keyboard 
 navigation. it's less relevant in this particular
 scenario, since the hamburger menu is non functioning, 
 but in the real world can save these users time and 
 frustration 
*/

const CustomNav = __ => (
  <nav className="nav">
    <a className="skipNav" href="#main">
      skip navigation{" "}
    </a>
    <i
      alt="a non functioning hamburger menu"
      className="fas fa-bars fa-2x hamburgerIcon"
    />
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

export default CustomNav;
