// Libraries
import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Navigate } from 'react-router';
import { IMusicItemTab } from '../../../../types';
import { updateMetas } from '../../../../utils';
import { assetUrl } from '../../../../utils/assets';

// Styling
import './index.scss';

// Data
import { releases } from '../../../../data';

// Components
import AdditionalInfo from '../../../Elements/Release/AdditionalInfo';
import FullscreenBackground from '../../../Elements/FullscreenBackground';
import SocialLinks from '../../../Elements/SocialLinks';
import YoutubeVideo from '../../../Elements/Release/YoutubeVideo';

const ReleasePage = () => {
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
  }, [
    currentItem,
    location,
    setCinemaMode
  ]);

  // If item not found redirect to home page
  if (!currentItem) {
    return <Navigate to="/" replace />;
  }

  const {
    id,
    background,
    buy,
    listen,
    logo,
    title
  } = currentItem;

  const backgroundImg = assetUrl(`releases/${id}/${background.image}`);
  const titleImg = assetUrl(`releases/${id}/title.png`);
  const artistLogoImg = logo && assetUrl(`releases/${id}/logo.png`);

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
