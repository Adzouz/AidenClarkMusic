import React from 'react';
import { withContent } from '../../../../hoc/withContext';
import { IContent } from '../../../../types';
import { useParams } from 'react-router-dom';
import './index.scss';

import SocialLinks from '../../../Elements/SocialLinks';
import { ICreditsItem } from '../../../../types/content';

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
  const { background, buy, credits, listen, release_date, youtube_video } = currentItem;

  const backgroundImg = require(`../../../../assets/releases/${releaseId}/${background.image}`);
  const titleImg = require(`../../../../assets/releases/${releaseId}/title.png`);
  const artistLogoImg = require(`../../../../assets/releases/${releaseId}/logo.png`);

  const creditsItems = credits.map((creditsItem: ICreditsItem, index: number) => (
    <React.Fragment key={`credits_${releaseKey[0].tab}_${index}`}>
      <p className="title" dangerouslySetInnerHTML={{ __html: creditsItem.title }} />
      <p dangerouslySetInnerHTML={{ __html: creditsItem.description }} />
    </React.Fragment>
  ));

  return (
    <div className="release-item" style={{ backgroundImage: `url(${backgroundImg})` }}>
      {background.video && (
        <div className="video-container">
          <iframe src={background.video} frameBorder="0" allow="autoplay ; fullscreen" allowFullScreen />
        </div>
      )}
      <div className="title">
        <img src={titleImg} alt="M.ROYAL" />
      </div>
      <div className="info">
        <div className="listen">
          <p dangerouslySetInnerHTML={{ __html: listen.description }} />
          {listen.links && (
            <SocialLinks links={listen.links} from={`listen_${releaseKey[0].tab}`} />
          )}
        </div>
        <div className="buy">
          <p dangerouslySetInnerHTML={{ __html: buy.description }} />
          {buy.links && (
            <SocialLinks links={buy.links} from={`buy_${releaseKey[0].tab}`} />
          )}
        </div>
      </div>
      {youtube_video && (
        <div className="youtube-video-wrapper">
          <div className="youtube-video">
            <iframe src={youtube_video} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
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

export default withContent(Item);
