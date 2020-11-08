import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './index.scss';

import { aboutPage, homePage, musicPage } from '../../../data';

const Header = () => {
  const logoPath = require('../../../assets/logo.svg');
  const location = useLocation();

  const headerClassName = `header ${location.pathname === '/about' ? 'left' : location.pathname === '/music' ? 'right' : 'center'}`;

  return (
    <div className={headerClassName}>
      <ul className="navigation">
        <li>
          <NavLink
            to="/about"
            activeClassName="active"
            title="About"
          >
            {aboutPage.title}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            activeClassName="active"
            className="logo"
          >
            <span className="assistive-text">
              {homePage.title}
            </span>
            <img
              src={logoPath}
              alt="Aiden Clark Logo"
            />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/music"
            activeClassName="active"
            title="Music"
          >
            {musicPage.title}
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Header;
