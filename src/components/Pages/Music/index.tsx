// Libraries
import React, { useEffect } from 'react';
import { NavLink, Routes, Route, useLocation, useMatch } from 'react-router';
import { IMusicItemTab } from '../../../types';
import { updateMetas, sendEvent } from '../../../utils';
import { assetUrl } from '../../../utils/assets';

// Styling
import './index.scss';

// Data
import { musicPage, releases } from '../../../data';

// Components
import Release from './Release';

const MusicPage = () => {
  const location = useLocation();
  // Derived from the URL so the prerendered markup matches the first client render
  const releaseId = useMatch('/music/:releaseId')?.params.releaseId;

  useEffect(() => {
    const metas = {
      title: ` - ${musicPage.title}`,
      description: musicPage.meta_description,
      path: location.pathname
    };

    if (!releaseId) {
      updateMetas(metas);
    }
  }, [location, releaseId]);

  const linksList = releases.map((item: IMusicItemTab, index: number) => {
    const coverImg = assetUrl(`releases/${item.id}/${item.cover}`);
    return (
      <li key={`music_${index}`}>
        <NavLink
          to={`/music/${item.slug}`}
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
      <Routes>
        <Route path=":releaseId" element={<Release />} />
      </Routes>
    </div>
  );
};

export default MusicPage;
