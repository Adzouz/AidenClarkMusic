import React from 'react';
import { withContent } from '../../hoc/withContext';
import { IContent } from '../../types';
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom';

import MRoyal from './MRoyal';

interface IContentProps {
  context?: IContent;
}

const Content = ({ context }: IContentProps) => {
  let { path, url } = useRouteMatch();
  return (
    <div className="content">
      <ul>
        <li>
          <Link to={`${url}/m-royal`}>M.ROYAL</Link>
        </li>
      </ul>
      <Switch>
        <Route path={`${path}/m-royal`}>
          <MRoyal />
        </Route>
      </Switch>
    </div>
  );
};

export default withContent(Content);
