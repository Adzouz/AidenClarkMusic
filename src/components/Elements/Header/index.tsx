import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './index.scss';

const Header = () => {
  const logoPath = require("../../../assets/logo.svg");
  const location = useLocation();
  return (
    <div className={`header ${location.pathname === "/" ? "left" : "right"}`}>
      <ul className="navigation">
        <li className={location.pathname === "/" ? "active" : ""}><Link to="/" title="About">About</Link></li>
        <li><div className="logo"><img src={logoPath} alt="Aiden Clark Logo" /></div></li>
        <li className={location.pathname.indexOf("/music") > -1 ? "active" : ""}><Link to="/music" title="Music">Music</Link></li>
      </ul>
    </div>
  );
};

export default Header;
