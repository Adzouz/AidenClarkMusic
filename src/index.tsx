import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/index.scss';

import ReactGA from 'react-ga';
ReactGA.initialize('G-SWQ7WWQ7W2');
ReactGA.pageview(window.location.pathname + window.location.search);

const root = document.getElementById('root');

const Application = () => (<App />);

if (process.env.NODE_ENV === 'development') {
  ReactDOM.render(<Application />, root);
} else {
  ReactDOM.hydrate(<Application />, root);
}
