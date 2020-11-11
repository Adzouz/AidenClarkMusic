// Libraries
import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Redirect } from 'react-router-dom';
import { IMusicItemTab } from '../../../../types';
import { updateMetas } from '../../../../utils';

// Styling
import './index.scss';

// Data
import { releases } from '../../../../data';

// Components
import AdditionalInfo from '../../../Elements/Release/AdditionalInfo';
import FullscreenBackground from '../../../Elements/FullscreenBackground';
import SocialLinks from '../../../Elements/SocialLinks';
import YoutubeVideo from '../../../Elements/Release/YoutubeVideo';

// Component properties
interface IReleasePageProps {
  setReleaseId: any;
}

const ReleasePage = ({ setReleaseId }: IReleasePageProps) => {
  const [cinemaMode, setCinemaMode] = useState<any>({});
  const { releaseId } = useParams();
  const location = useLocation();
  const releaseFound = releases.filter((item: IMusicItemTab) => item.slug === releaseId);

  const currentItem = releaseFound.length === 1 ? releaseFound[0] : null;

  useEffect(() => {
    const metas = {
      title: ` - Release${currentItem ? ` - ${currentItem.title}` : ''}`,
      description: currentItem ? currentItem.meta_description : '',
      path: location.pathname
    };

    setCinemaMode({});
    updateMetas(metas);
    setReleaseId(releaseId);

    return () => {
      setReleaseId(null);
    }
  }, [
    currentItem,
    location,
    releaseId,
    setCinemaMode,
    setReleaseId
  ]);

  // If item not found redirect to home page
  if (!currentItem) {
    return <Redirect to="/" />;
  }

  const {
    background,
    buy,
    listen,
    title
  } = currentItem;

  const backgroundImg = require(`../../../../assets/releases/${releaseId}/${background.image}`);
  const titleImg = require(`../../../../assets/releases/${releaseId}/title.png`);
  const artistLogoImg = require(`../../../../assets/releases/${releaseId}/logo.png`);

  return (
    <div className={`release-item${cinemaMode[releaseId] ? ' cinema' : ''}`}>
      <FullscreenBackground
        image={backgroundImg.default}
        video={background.video}
        videoTitle={`Background video - Release - ${title}`}
      >
        <div className="title">
          <img
            src={titleImg.default}
            alt={title}
          />
        </div>
        <div className="info">
          <div className="listen">
            <p dangerouslySetInnerHTML={{ __html: listen.description }} />
            {listen.links && (
              <SocialLinks
                links={listen.links}
                from={`${title} - Listen`}
              />
            )}
          </div>
          <div className="buy">
            <p dangerouslySetInnerHTML={{ __html: buy.description }} />
            {buy.links && (
              <SocialLinks
                links={buy.links}
                from={`${title} - Buy`}
              />
            )}
          </div>
        </div>
        <YoutubeVideo
          cinemaMode={cinemaMode}
          setCinemaMode={setCinemaMode}
          release={currentItem}
        />
        <AdditionalInfo release={currentItem} />
        <div className="logo">
          <img
            src={artistLogoImg.default}
            alt="Artist(s) Logo(s)"
          />
        </div>
      </FullscreenBackground>
    </div>
  );
};

export default ReleasePage;
