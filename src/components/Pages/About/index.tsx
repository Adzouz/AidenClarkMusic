import React from 'react';
import { withContent } from '../../../hoc/withContext';
import { IContent } from '../../../types';
import './index.scss';

import SocialLinks from '../../Elements/SocialLinks';

interface IContentProps {
  context?: IContent;
}

const About = ({ context }: IContentProps) => {
  const { about, social } = context;

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
      <h1 title={about.title} dangerouslySetInnerHTML={{ __html: about.title }} />
      <div className="description">
        <div dangerouslySetInnerHTML={{ __html: about.about.description }} />
        <ul className="photos">
          {photosList}
        </ul>
      </div>
      <div className="social">
        <p dangerouslySetInnerHTML={{ __html: about.follow.title }} />
        {social.links && (
          <SocialLinks links={social.links} from="about" />
        )}
      </div>
      <div className="contact">
        <p dangerouslySetInnerHTML={{ __html: about.contact.title }} />
        <div dangerouslySetInnerHTML={{ __html: about.contact.description }} />
      </div>
    </div>
  );
};

export default withContent(About);
