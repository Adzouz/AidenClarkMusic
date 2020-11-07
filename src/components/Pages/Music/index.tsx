import React, { useEffect } from 'react';
import { NavLink, Switch, Route, useLocation } from 'react-router-dom';
import './index.scss';

import { musicPage, releases, config } from '../../../data';
import Item from './Item';
import { IMusicItemTab } from '../../../types';

const Content = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/music') {
      const pageTitle = config.title + " - " + musicPage.title;
      document.title = pageTitle;
      document.getElementById('og_title').setAttribute('content', pageTitle);
    }
  }, []);

  const linksList = releases.map((item: IMusicItemTab, index: number) => {
    const coverImg = require(`../../../assets/releases/${item.slug}/${item.cover}`);
    return (
      <li key={`music_${index}`}>
        <NavLink
          to={`/music/${item.slug}`}
          activeClassName={'active'}
        >
          <span className="release-cover"><img src={coverImg} alt={item.title} /></span>
          <span className="release-title">{item.title}</span>
          <span className="release-date">{item.release_date}</span>
        </NavLink>
      </li>
    );
  });

  return (
    <div className={`music${location.pathname !== '/music' ? ' shrink' : ''}`}>
      <div className="releases-list-container">
        <h1 title={musicPage.title} dangerouslySetInnerHTML={{ __html: musicPage.title }} />
        <ul className="releases-list">
          {linksList}
        </ul>
      </div>
      <Switch>
        <Route path={`/music/:releaseId`}>
          <Item />
        </Route>
      </Switch>
    </div>
  );
};

export default Content;
