// Libraries
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { sendEvent } from '../../../utils';

// Styling
import './index.scss';

// Data
import { config, aboutPage, homePage, musicPage } from '../../../data';

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
            title={aboutPage.title}
            onClick={() => sendEvent({
              category: 'Header',
              action: 'Navigation click',
              label: aboutPage.title
            })}
          >
            {aboutPage.title}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            activeClassName="active"
            className="logo"
            title={homePage.title}
            onClick={() => sendEvent({
              category: 'Header',
              action: 'Navigation click',
              label: homePage.title
            })}
          >
            <span className="assistive-text">
              {homePage.title}
            </span>
            <img
              src={logoPath.default}
              alt={`${config.title} Logo`}
            />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/music"
            activeClassName="active"
            title={musicPage.title}
            onClick={() => sendEvent({
              category: 'Header',
              action: 'Navigation click',
              label: musicPage.title
            })}
          >
            {musicPage.title}
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Header;
