import React from 'react';
import { withContent } from '../../../hoc/withContext';
import { IContent } from '../../../types';
import { Link, Switch, Route, useRouteMatch, useLocation } from 'react-router-dom';
import './index.scss';

import Item from './Item';

interface IContentProps {
  context?: IContent;
}

const Content = ({ context }: IContentProps) => {
  let { path, url } = useRouteMatch();
  const location = useLocation();
  const { music } = context;

  const linksList = music.releases.map((item: { tab: string; slug: string; }, index: number) => {
    const release = context[item.tab];
    const coverImg = require(`../../../assets/releases/${item.slug}/${release.cover}`);
    return (
      <li key={`music_${index}`}>
        <Link to={`${url}/${item.slug}`} className={location.pathname === `/music/${item.slug}` ? 'active' : ''}>
          <span className="release-cover"><img src={coverImg} alt={release.title} /></span>
          <span className="release-title">{release.title}</span>
          <span className="release-date">{release.release_date}</span>
        </Link>
      </li>
    );
  });

  return (
    <div className={`music${location.pathname !== '/music' ? ' shrink' : ''}`}>
      <div className="releases-list-container">
        <h1 title={music.title} dangerouslySetInnerHTML={{ __html: music.title }} />
        <ul className="releases-list">
          {linksList}
        </ul>
      </div>
      <Switch>
        <Route path={`${path}/:releaseId`}>
          <Item />
        </Route>
      </Switch>
    </div>
  );
};

export default withContent(Content);
