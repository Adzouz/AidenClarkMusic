import React, { useEffect } from 'react';
import data from './data/content.json';
import { ContentProvider } from './context/ContentProvider';
import { IContent } from './types';
import { connect, ConnectedProps } from 'react-redux';
import { AppDispatch } from './store';
import { bindActionCreators } from 'redux';
import { fetchAppSetup } from './store/features/app/app';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Header from './components/Elements/Header';
import About from './components/Pages/About';
import Music from './components/Pages/Music';

const mapDisPatchToProps = (dispatch: AppDispatch) => ({
  fetchAppSetup: bindActionCreators(fetchAppSetup, dispatch)
});

const connector = connect(null, mapDisPatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type AppProps = PropsFromRedux & {
  localeId: string;
};

const App = ({ localeId, fetchAppSetup }: AppProps) => {
  const localizedContent: IContent = data.filter(
    locale => locale.lang === localeId
  )[0];

  useEffect(() => {
    fetchAppSetup();
  }, []);

  return (
    <main>
      <ContentProvider value={localizedContent}>
        <Router>
          <Header />
          <Switch>
            <Route path="/" exact>
              <About />
            </Route>
            <Route path="/music">
              <Music />
            </Route>
            <Route path="*">
              <About />
            </Route>
          </Switch>
        </Router>
      </ContentProvider>
    </main>
  );
};

export default connector(App);
