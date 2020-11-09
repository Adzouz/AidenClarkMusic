import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import ReactGA from 'react-ga';
import {
  Router,
  Switch,
  Route
} from "react-router-dom";

import ScrollToTop from './components/Elements/ScrollToTop';
import Header from './components/Elements/Header';
import About from './components/Pages/About';
import Home from './components/Pages/Home';
import Music from './components/Pages/Music';

const history = createBrowserHistory();

history.listen(location => {
  if (process.env.NODE_ENV === "production") {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  }
});

const App = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      ReactGA.set({ page: window.location.pathname });
      ReactGA.pageview(window.location.pathname);
    }
  }, []);
  return (
    <main>
      <Router history={history}>
        <ScrollToTop />
        <Header />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route path="/music">
              <Music />
            </Route>
            <Route path="*">
              <Redirect to={'/'} />
            </Route>
          </Switch>
        </div>
      </Router>
    </main>
  );
};

export default App;
