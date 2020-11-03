import React from 'react';
import { withContent } from '../../hoc/withContext';
import { IContent } from '../../types';
import { ILink } from '../../types/content';
import './index.scss';

interface IContentProps {
  context?: IContent;
}

const About = ({ context }: IContentProps) => {
  const { about, social } = context;

  const photo1Path = require('../../assets/photos/1.jpg');
  const photo2Path = require('../../assets/photos/2.jpg');
  const photo3Path = require('../../assets/photos/3.jpg');

  const socialLinks = social.links.map((link: ILink, index: number) => {
    const linkSlug = link.title.toLowerCase().replace(/ /g, "-");
    const logoPath = require(`../../assets/logos/${linkSlug}.svg`);
    return (
      <li key={`social_link_${index}`}>
        <a href={link.url} target="_blank">
          <img src={logoPath} alt={link.title} />
        </a>
      </li>
    );
  });
  return (
    <div className="about">
      <h1 title={about.title} dangerouslySetInnerHTML={{ __html: about.title }} />
      <div className="description">
        <div dangerouslySetInnerHTML={{ __html: about.about.description }}></div>
        <ul className="photos">
          <li><img src={photo1Path} alt="A handsome guy #1" title="A handsome guy #1" /></li>
          <li><img src={photo2Path} alt="A handsome guy #2" title="A handsome guy #2" /></li>
          <li><img src={photo3Path} alt="A handsome guy #3" title="A handsome guy #3" /></li>
        </ul>
      </div>
      <div className="social">
        <p dangerouslySetInnerHTML={{ __html: about.follow.title }} />
        <ul className="links">
          {socialLinks}
        </ul>
      </div>
      <div className="contact">
        <p dangerouslySetInnerHTML={{ __html: about.contact.title }} />
        <div dangerouslySetInnerHTML={{ __html: about.contact.description }}></div>
      </div>
    </div>
  );
};

export default withContent(About);
