import React, { useEffect } from 'react';
import './App.scss';
import data from './data/content.json';
import { ContentProvider } from './context/ContentProvider';
import { IContent } from './types';
import './App.scss';
import { connect, ConnectedProps } from 'react-redux';
import { AppDispatch } from './store';
import { bindActionCreators } from 'redux';
import { fetchAppSetup } from './store/features/app/app';

import Content from './components/Content';

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
    <main id="application-id">
      <ContentProvider value={localizedContent}>
        <Content />
      </ContentProvider>
    </main>
  );
};

export default connector(App);
