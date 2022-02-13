// Libraries
import React from 'react';
import { NavLink } from 'react-router-dom';
import { sendEvent } from '../../../utils';
import { IMusicItemTab } from '../../../types';

// Styling
import './index.scss';

// Component properties
interface IHighlightedRelease {
  release: IMusicItemTab;
}

const HighlightedRelease = ({ release }: IHighlightedRelease) => {
  const {
    cover,
    full_title,
    meta_description,
    release_date,
    slug,
    title
  } = release;

  const titleImg = require(`../../../assets/releases/${slug}/title.png`);
  const coverImg = require(`../../../assets/releases/${slug}/${cover}`);

  return (
    <div className="highlighted-release">
      <div className="release-cover">
        <NavLink to={`/music/${slug}`}>
          <span className="assistive-text">
            {full_title}
          </span>
          <img
            src={coverImg}
            alt={title}
          />
        </NavLink>
      </div>
      <div className="info">
        <div className="info-content">
          <h1>
            <span className="assistive-text">
              {title}
            </span>
            <img
              src={titleImg}
              alt=""
            />
          </h1>
          <div className="description">
            {meta_description}
          </div>
          <div className="release-date">
            Released on <span>{release_date}</span>
          </div>
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
              More info<span className="assistive-text"> about {title}</span>
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
  );
};

export default HighlightedRelease;
