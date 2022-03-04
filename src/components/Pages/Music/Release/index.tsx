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

  const currentItem: IMusicItemTab = releaseFound.length === 1 ? releaseFound[0] : null;

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
    id,
    background,
    buy,
    listen,
    logo,
    title
  } = currentItem;

  const backgroundImg = require(`../../../../assets/releases/${id}/${background.image}`);
  const titleImg = require(`../../../../assets/releases/${id}/title.png`);
  const artistLogoImg = logo && require(`../../../../assets/releases/${id}/logo.png`);

  return (
    <div className={`release-item${cinemaMode[releaseId] ? ' cinema' : ''}`}>
      <FullscreenBackground
        image={backgroundImg}
        video={background.video}
        videoTitle={`Background video - Release - ${title}`}
      >
        <div className="title">
          <img
            src={titleImg}
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
          {buy && buy.links && buy.description &&
            <div className="buy">
              <p dangerouslySetInnerHTML={{ __html: buy.description }} />
              {buy.links && (
                <SocialLinks
                  links={buy.links}
                  from={`${title} - Buy`}
                />
              )}
            </div>
          }
        </div>
        <YoutubeVideo
          cinemaMode={cinemaMode}
          setCinemaMode={setCinemaMode}
          release={currentItem}
        />
        <AdditionalInfo release={currentItem} />
        {artistLogoImg &&
          <div className="logo">
            <img
              src={artistLogoImg}
              alt="Artist(s) Logo(s)"
            />
          </div>
        }
      </FullscreenBackground>
    </div>
  );
};

export default ReleasePage;
