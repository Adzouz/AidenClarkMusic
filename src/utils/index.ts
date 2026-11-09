import ReactGA from 'react-ga4';
import { config } from '../data';

interface IUpdateMetasProps {
  title: string;
  description: string;
  path: string;
}

const baseSiteURL = 'https://aidenclarkmusic.com';

const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
// Skip analytics in dev, without an ID, and while react-snap prerenders pages
const analyticsEnabled = import.meta.env.PROD && !!gaMeasurementId && navigator.userAgent !== 'ReactSnap';

export const initAnalytics = () => {
  if (analyticsEnabled) {
    // Page views are sent manually on each route change
    ReactGA.initialize(gaMeasurementId, { gtagOptions: { send_page_view: false } });
  }
};

export const sendPageview = (page: string) => {
  if (analyticsEnabled) {
    ReactGA.send({ hitType: 'pageview', page });
  }
};

export const updateMetas = ({ title, description, path }: IUpdateMetasProps) => {
  const pathParts = path.split('/');
  const imageName = pathParts[pathParts.length - 1] ? pathParts[pathParts.length - 1] + '.jpg' : 'default.png';

  document.title = config.title + title;

  document.getElementById('og_title').setAttribute('content', config.title + title);
  document.getElementById('og_description').setAttribute('content', description);
  document.getElementById('meta_description').setAttribute('content', description);
  document.getElementById('og_image').setAttribute('content', `${baseSiteURL}/facebook/${imageName}`);
  document.getElementById('og_url').setAttribute('content', `${baseSiteURL}${path}`);
};

interface ISendEventProps {
  category: string;
  action: string;
  label: string;
}

export const sendEvent = ({ category, action, label }: ISendEventProps) => {
  if (analyticsEnabled) {
    ReactGA.event({
      category,
      action,
      label
    });
  }
};
