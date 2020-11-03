import React, { useEffect } from 'react';
import { withContent } from '../../../hoc/withContext';
import { IContent } from '../../../types';
import { ILink } from '../../../types/content';
import { useParams } from 'react-router-dom';
import './index.scss';

interface IContentProps {
  context?: IContent;
}

const Item = ({ context }: IContentProps) => {
  const { releaseId } = useParams();
  const { music } = context;

  const releaseKey = music.releases.filter((item: { tab: string; slug: string; }) => item.slug === releaseId);

  if (releaseKey.length !== 1) {
    return null;
  }

  const currentItem = context[releaseKey[0].tab];
  const { background, buy, listen, youtube_video } = currentItem;

  const backgroundImg = require(`../../../assets/releases/${releaseId}/${background.image}`);
  const titleImg = require(`../../../assets/releases/${releaseId}/title.png`);
  const aidenClarkLogoImg = require(`../../../assets/releases/${releaseId}/logo.png`);

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
    <div className="release-item" style={{ backgroundImage: `url(${backgroundImg})` }}>
      {background.video && (
        <div className="video-container">
          <iframe src={background.video} frameBorder="0" allow="autoplay ; fullscreen" allowFullScreen></iframe>
        </div>
      )}
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
      {youtube_video && (
        <div className="youtube-video-wrapper">
          <div className="youtube-video">
            <iframe src={youtube_video} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </div>
        </div>
      )}
      <div className="logo">
        <img src={aidenClarkLogoImg} alt="Artist(s) Logo(s)" />
      </div>
    </div>
  );
};

export default withContent(Item);
