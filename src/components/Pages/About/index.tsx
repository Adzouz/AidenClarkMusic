import React, { useEffect } from 'react';
import './index.scss';

import { socialLinks as socialLinksData, aboutPage, config } from '../../../data';
import SocialLinks from '../../Elements/SocialLinks';

const About = () => {
  useEffect(() => {
    const pageTitle = config.title + " - " + aboutPage.title;
    document.title = pageTitle;
    document.getElementById('og_title').setAttribute('content', pageTitle);
  }, []);

  const photosPath = [
    require('../../../assets/photos/1.jpg'),
    require('../../../assets/photos/2.jpg'),
    require('../../../assets/photos/3.jpg')
  ];

  const photosList = photosPath.map((imagePath: string, index: number) => (
    <li key={`photo_${index}`}><img src={imagePath} alt={`A handsome guy #${index + 1}`} title={`A handsome guy #${index + 1}`} /></li>
  ));

  return (
    <div className="about">
      <h1 title={aboutPage.title}>{aboutPage.title}</h1>
      <div className="description">
        <div dangerouslySetInnerHTML={{ __html: aboutPage.description }} />
        <ul className="photos">
          {photosList}
        </ul>
      </div>
      <div className="social">
        <p dangerouslySetInnerHTML={{ __html: aboutPage.follow.title }} />
        <SocialLinks links={socialLinksData} from="about" />
      </div>
      <div className="contact">
        <p dangerouslySetInnerHTML={{ __html: aboutPage.contact.title }} />
        <div dangerouslySetInnerHTML={{ __html: aboutPage.contact.description }} />
      </div>
    </div>
  );
};

export default About;
