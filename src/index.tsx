import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import { initAnalytics } from './utils';
import './styles/index.scss';

initAnalytics();

const root = document.getElementById('root');

// Pages prerendered by react-snap already contain markup to hydrate
if (root.hasChildNodes()) {
  hydrateRoot(root, <App />);
} else {
  createRoot(root).render(<App />);
}
