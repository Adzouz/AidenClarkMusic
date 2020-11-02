import React from 'react';
import { withContent } from '../../../hoc/withContext';
import { IContent } from '../../../types';
import { ILink } from '../../../types/content';
import './index.scss';

interface IContentProps {
  context?: IContent;
}

const Content = ({ context }: IContentProps) => {
  const { mroyal } = context;
  const { listen } = mroyal;
  const { buy } = mroyal;
  const titleImg = require('../../../assets/mroyal-title.png');
  const aidenClarkLogoImg = require('../../../assets/mroyal-aidenclark-logo.png');

  const listenLinks = listen.links.map((link: ILink, index: number) => {
    const linkSlug = link.title.toLowerCase().replace(/ /g, "-");
    const logoPath = require(`../../../assets/logos/${linkSlug}.svg`);
    return (
      <li key={`link_${index}`}>
        <a href={link.url} target="_blank">
          <img src={logoPath} alt={link.title} />
        </a>
      </li>
    );
  });

  const buyLinks = buy.links.map((link: ILink, index: number) => {
    const linkSlug = link.title.toLowerCase().replace(/ /g, "-");
    const logoPath = require(`../../../assets/logos/${linkSlug}.svg`);
    return (
      <li key={`link_${index}`}>
        <a href={link.url} target="_blank">
          <img src={logoPath} alt={link.title} />
        </a>
      </li>
    );
  });

  return (
    <div className="mroyal">
      {/*<div className="video-container">
        <iframe src="https://player.vimeo.com/video/474459746?autoplay=1&loop=1&autopause=1&autopause=0" frameBorder="0" allow="autoplay ; fullscreen" allowFullScreen></iframe>
      </div>*/}
      <div className="title">
        <img src={titleImg} alt="M.ROYAL" />
      </div>
      <div className="middle-content">
        <div className="listen">
          <p dangerouslySetInnerHTML={{ __html: listen.description }} />
          <ul className="links">
            {listenLinks}
          </ul>
        </div>
        <div className="buy">
          <p dangerouslySetInnerHTML={{ __html: buy.description }} />
          <ul className="links">
            {buyLinks}
          </ul>
        </div>
      </div>
      <div className="aidenclark-logo">
        <img src={aidenClarkLogoImg} alt="Aiden Clark" />
      </div>
    </div>
  );
};

export default withContent(Content);
