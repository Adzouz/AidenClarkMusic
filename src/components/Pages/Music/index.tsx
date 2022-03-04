// Libraries
import React, { useEffect, useState } from 'react';
import { NavLink, Switch, Route, useLocation } from 'react-router-dom';
import { IMusicItemTab } from '../../../types';
import { updateMetas, sendEvent } from '../../../utils';

// Styling
import './index.scss';

// Data
import { musicPage, releases } from '../../../data';

// Components
import Release from './Release';

const MusicPage = () => {
  const location = useLocation();
  const [releaseId, setReleaseId] = useState(null);

  useEffect(() => {
    const metas = {
      title: ` - ${musicPage.title}`,
      description: musicPage.meta_description,
      path: location.pathname
    };

    if (location.pathname === '/music') {
      updateMetas(metas);
    }
  }, [location]);

  const linksList = releases.map((item: IMusicItemTab, index: number) => {
    const coverImg = require(`../../../assets/releases/${item.id}/${item.cover}`);
    return (
      <li key={`music_${index}`}>
        <NavLink
          to={`/music/${item.slug}`}
          activeClassName={'active'}
          onClick={() => sendEvent({
            category: `Music${releaseId ? ' shrinked' : ''}`,
            action: 'Release click',
            label: item.title
          })}
        >
          <span className="release-cover">
            <img
              src={coverImg}
              alt={item.title}
            />
          </span>
          <span className="release-title">
            {item.title}
          </span>
          <span className="release-date">
            {item.release_date}
          </span>
        </NavLink>
      </li>
    );
  });

  return (
    <div className={`music${releaseId ? ' shrink' : ''}`}>
      <div className="releases-list-container">
        <h1
          title={musicPage.title}
          dangerouslySetInnerHTML={{ __html: musicPage.title }}
        />
        <ul className="releases-list">
          {linksList}
        </ul>
      </div>
      <Switch>
        <Route path={`/music/:releaseId`}>
          <Release setReleaseId={setReleaseId} />
        </Route>
      </Switch>
    </div>
  );
};

export default MusicPage;
