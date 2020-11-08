import ReactGA from 'react-ga';
import { config } from '../data';

interface IUpdateMetasProps {
  title: string;
  description: string;
  path: string;
}

const baseSiteURL = 'https://aidenclarkmusic.com';

export const updateMetas = ({ title, description, path }: IUpdateMetasProps) => {
  const pathParts = path.split('/');
  const pageSlug = pathParts[pathParts.length - 1] || 'default';

  document.title = config.title + title;

  document.getElementById('og_title').setAttribute('content', config.title + title);
  document.getElementById('og_description').setAttribute('content', description);
  document.getElementById('meta_description').setAttribute('content', description);
  document.getElementById('og_image').setAttribute('content', `${baseSiteURL}/facebook/${pageSlug}.jpg`);
  document.getElementById('og_url').setAttribute('content', `${baseSiteURL}${path}`);
};

interface ISendEventProps {
  category: string;
  action: string;
  label: string;
}

export const sendEvent = ({ category, action, label }: ISendEventProps) => {
  console.log(category, action, label);
  if (process.env.NODE_ENV === 'production') {
    ReactGA.event({
      category,
      action,
      label
    });
  }
};
