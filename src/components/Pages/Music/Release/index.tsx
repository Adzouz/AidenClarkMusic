import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Redirect } from 'react-router-dom';
import { IMusicItemTab } from '../../../../types';
import './index.scss';

import { releases } from '../../../../data';
import { updateMetas } from '../../../../utils';
import SocialLinks from '../../../Elements/SocialLinks';
import AdditionalInfo from '../../../Elements/Release/AdditionalInfo';
import YoutubeVideo from '../../../Elements/Release/YoutubeVideo';

const Release = () => {
  const [cinemaMode, setCinemaMode] = useState<any>({});
  const { releaseId } = useParams();
  const location = useLocation();
  const releaseFound = releases.filter((item: IMusicItemTab) => item.slug === releaseId);

  if (releaseFound.length !== 1) {
    return <Redirect to="/" />;
  }

  const currentItem = releaseFound[0];

  const metas = {
    title: ` - Release - ${currentItem.title}`,
    description: currentItem.meta_description,
    path: location.pathname
  };

  useEffect(() => {
    updateMetas(metas);
  }, []);
  useEffect(() => {
    setCinemaMode({});
    updateMetas(metas);
  }, [releaseId]);

  const { background, buy, listen } = currentItem;

  const backgroundImg = require(`../../../../assets/releases/${releaseId}/${background.image}`);
  const titleImg = require(`../../../../assets/releases/${releaseId}/title.png`);
  const artistLogoImg = require(`../../../../assets/releases/${releaseId}/logo.png`);

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
      <YoutubeVideo cinemaMode={cinemaMode} setCinemaMode={setCinemaMode} release={currentItem} />
      <AdditionalInfo release={currentItem} />
      <div className="logo">
        <img src={artistLogoImg} alt="Artist(s) Logo(s)" />
      </div>
    </div>
  );
};

export default Release;
