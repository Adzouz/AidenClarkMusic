import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import './index.scss';

import { updateMetas, sendEvent } from '../../../utils';
import { homePage, releases } from '../../../data';
import { IMusicItemTab } from '../../../types';
import FullscreenBackground from '../../Elements/FullscreenBackground';

const HomePage = () => {
  const location = useLocation();
  const metas = {
    title: ` - ${homePage.title}`,
    description: homePage.meta_description,
    path: location.pathname
  };

  useEffect(() => {
    updateMetas(metas);
  }, []);

  const releaseId = homePage.highlighted_release;
  const releaseFound = releases.filter((item: IMusicItemTab) => item.slug === releaseId);
  if (releaseFound.length !== 1) {
    return <Redirect to="/about" />
  }

  const highlightedRelease = releaseFound[0];
  const { background, cover, meta_description, release_date, slug, title } = highlightedRelease;

  const backgroundImg = require(`../../../assets/releases/${releaseId}/${background.image}`);
  const titleImg = require(`../../../assets/releases/${releaseId}/title.png`);
  const coverImg = require(`../../../assets/releases/${slug}/${cover}`);

  return (
    <div className="home">
      <FullscreenBackground image={backgroundImg} video={background.video}>
        <div className="highlighted-release">
          <div className="release-cover">
            <NavLink to={`/music/${slug}`}>
              <img src={coverImg} alt={title} />
            </NavLink>
          </div>
          <div className="info">
            <div className="info-content">
              <h1>
                <span className="assistive-text">{title}</span>
                <img src={titleImg} alt="" />
              </h1>
              <div className="description">{meta_description}</div>
              <div className="release-date">Released on <span>{release_date}</span></div>
              <div className="actions">
                <NavLink
                  to={`/music/${slug}`}
                  className="button more-info"
                  title="What the f*ck is it?"
                  onClick={() => sendEvent({
                    category: 'Homepage',
                    action: 'Button click',
                    label: 'More info'
                  })}
                >
                  More info
                </NavLink>
                <NavLink
                  to={`/music`}
                  className="button more-info"
                  title="How much the f*ck are they?"
                  onClick={() => sendEvent({
                    category: 'Homepage',
                    action: 'Button click',
                    label: 'More releases'
                  })}
                >
                  More releases
                </NavLink>
                <NavLink
                  to={`/about`}
                  className="button more-info"
                  title="Who the f*ck is he?"
                  onClick={() => sendEvent({
                    category: 'Homepage',
                    action: 'Button click',
                    label: 'The artist'
                  })}
                >
                  The artist
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </FullscreenBackground>
    </div>
  );
};

export default HomePage;
