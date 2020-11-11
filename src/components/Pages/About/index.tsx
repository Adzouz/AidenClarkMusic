// Libraries
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { updateMetas } from '../../../utils';

// Styling
import './index.scss';

// Data
import { socialLinks as socialLinksData, aboutPage } from '../../../data';

// Components
import AboutPhotos from '../../Elements/AboutPhotos';
import SocialLinks from '../../Elements/SocialLinks';

const AboutPage = () => {
  const location = useLocation();

  useEffect(() => {
    const metas = {
      title: ` - ${aboutPage.title}`,
      description: aboutPage.meta_description,
      path: location.pathname
    };

    updateMetas(metas);
  }, [location]);

  return (
    <div className="about">
      <h1 title={aboutPage.title}>{aboutPage.title}</h1>
      <div className="description">
        <div dangerouslySetInnerHTML={{ __html: aboutPage.description }} />
        <AboutPhotos />
      </div>
      <div className="social">
        <p dangerouslySetInnerHTML={{ __html: aboutPage.follow.title }} />
        <SocialLinks links={socialLinksData} from={aboutPage.title} />
      </div>
      <div className="contact">
        <p dangerouslySetInnerHTML={{ __html: aboutPage.contact.title }} />
        <div dangerouslySetInnerHTML={{ __html: aboutPage.contact.description }} />
      </div>
    </div>
  );
};

export default AboutPage;
