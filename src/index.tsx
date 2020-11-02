import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import './styles/index.scss';

const root = document.getElementById('root');
const localeId = root.getAttribute('data-locale');

const Application = () => (
  <Provider store={store}>
    <App localeId={localeId} />
  </Provider>
);

if (process.env.NODE_ENV === 'development') {
  ReactDOM.render(<Application />, root);
} else {
  ReactDOM.hydrate(<Application />, root);
}
