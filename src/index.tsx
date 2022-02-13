import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import App from './App';
import './styles/index.scss';

ReactGA.initialize('UA-181884461-1');

const root = document.getElementById('root');

if (root.hasChildNodes()) {
  ReactDOM.hydrate(<App />, root);
} else {
  ReactDOM.render(<App />, root);
}
