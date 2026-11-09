// Libraries
import React from 'react';
import { NavLink, useMatch } from 'react-router';
import { sendEvent } from '../../../utils';
import logoPath from '../../../assets/logo.svg';

// Styling
import './index.scss';

// Data
import { config, aboutPage, homePage, musicPage } from '../../../data';

const Header = () => {
  // useMatch tolerates trailing slashes (static hosts serve /about/)
  const isAbout = useMatch('/about');
  const isMusic = useMatch('/music');

  const headerClassName = `header ${isAbout ? 'left' : isMusic ? 'right' : 'center'}`;

  return (
    <div className={headerClassName}>
      <ul className="navigation">
        <li>
          <NavLink
            to="/about"
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
              src={logoPath}
              alt={`${config.title} Logo`}
            />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/music"
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
