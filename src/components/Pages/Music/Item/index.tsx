import React, { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { ICreditsItem, IMusicItemTab } from '../../../../types';
import './index.scss';

import { config, releases } from '../../../../data';
import SocialLinks from '../../../Elements/SocialLinks';

const Item = () => {
  const [cinemaMode, setCinemaMode] = useState<any>({});
  const { releaseId } = useParams();
  const releaseFound = releases.filter((item: IMusicItemTab) => item.slug === releaseId);

  if (releaseFound.length !== 1) {
    return <Redirect to="/" />;
  }

  const currentItem = releaseFound[0];

  const updatePageTitle = () => {
    const pageTitle = `${config.title} - Release - ${currentItem.title}`;
    document.title = pageTitle;
    document.getElementById('og_title').setAttribute('content', pageTitle);
  };

  useEffect(() => {
    updatePageTitle();
  }, []);
  useEffect(() => {
    setCinemaMode({});
    updatePageTitle();
  }, [releaseId]);

  const { background, buy, credits, listen, release_date, youtube_video } = currentItem;

  const backgroundImg = require(`../../../../assets/releases/${releaseId}/${background.image}`);
  const titleImg = require(`../../../../assets/releases/${releaseId}/title.png`);
  const artistLogoImg = require(`../../../../assets/releases/${releaseId}/logo.png`);

  const creditsItems = credits.map((creditsItem: ICreditsItem, index: number) => (
    <React.Fragment key={`credits_${releaseId}_${index}`}>
      <p className="title" dangerouslySetInnerHTML={{ __html: creditsItem.title }} />
      <p dangerouslySetInnerHTML={{ __html: creditsItem.description }} />
    </React.Fragment>
  ));

  return (
    <div className={`release-item${cinemaMode[releaseId] ? ' cinema' : ''}`}>
      <div className="background-image">
        <img src={backgroundImg} alt="" />
      </div>
      {background.video && (
        <div className="video-container">
          <iframe src={background.video} frameBorder="0" allow="autoplay ; fullscreen" allowFullScreen />
        </div>
      )}
      <div className="title">
        <img src={titleImg} alt={currentItem.title} />
      </div>
      <div className="info">
        <div className="listen">
          <p dangerouslySetInnerHTML={{ __html: listen.description }} />
          {listen.links && (
            <SocialLinks links={listen.links} from={`listen_${releaseId}`} />
          )}
        </div>
        <div className="buy">
          <p dangerouslySetInnerHTML={{ __html: buy.description }} />
          {buy.links && (
            <SocialLinks links={buy.links} from={`buy_${releaseId}`} />
          )}
        </div>
      </div>
      {youtube_video && (
        <div className="youtube-video-container">
          <div className="youtube-video-wrapper">
            <div className="youtube-video">
              <iframe src={youtube_video} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            </div>
          </div>
          <div className="cinema-mode-trigger">
            <button onClick={() => setCinemaMode({...cinemaMode, [releaseId]: !cinemaMode[releaseId] })}>{cinemaMode[releaseId] ? 'Disable' : 'Enable'} cinema mode</button>
          </div>
        </div>
      )}
      <div className="additional-info">
        <p className="release-date small">Released on <span>{release_date}</span></p>
        <div className="credits">
          {creditsItems}
        </div>
      </div>
      <div className="logo">
        <img src={artistLogoImg} alt="Artist(s) Logo(s)" />
      </div>
    </div>
  );
};

export default Item;
