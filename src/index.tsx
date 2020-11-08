import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import App from './App';
import './styles/index.scss';

ReactGA.initialize('UA-181884461-1');

const root = document.getElementById('root');

const Application = () => (<App />);

if (process.env.NODE_ENV === 'development') {
  ReactDOM.render(<Application />, root);
} else {
  ReactDOM.hydrate(<Application />, root);
}
