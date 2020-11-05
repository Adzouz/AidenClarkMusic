import React from 'react';
import { Redirect } from 'react-router-dom';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Header from './components/Elements/Header';
import About from './components/Pages/About';
import Music from './components/Pages/Music';

const App = () => {
  return (
    <main>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <About />
          </Route>
          <Route path="/music">
            <Music />
          </Route>
          <Route path="*">
            <Redirect to={'/'} />
          </Route>
        </Switch>
      </Router>
    </main>
  );
};

export default App;
