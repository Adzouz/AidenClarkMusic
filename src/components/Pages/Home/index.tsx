import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { updateMetas } from '../../../utils';
import { IMusicItemTab } from '../../../types';

// Data
import { homePage, releases } from '../../../data';

// Components
import FullscreenBackground from '../../Elements/FullscreenBackground';
import HighlightedRelease from '../../Elements/HighlightedRelease';

const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    const metas = {
      title: ` - ${homePage.title}`,
      description: homePage.meta_description,
      path: location.pathname
    };

    updateMetas(metas);
  }, [location]);

  const releaseId = homePage.highlighted_release;
  const releaseFound = releases.filter((item: IMusicItemTab) => item.slug === releaseId);
  if (releaseFound.length !== 1) {
    return <Redirect to="/about" />
  }

  const highlightedRelease = releaseFound[0];
  const {
    background,
    title
  } = highlightedRelease;

  const backgroundImg = require(`../../../assets/releases/${releaseId}/${background.image}`);

  return (
    <div className="home">
      <FullscreenBackground
        image={backgroundImg}
        video={background.video}
        videoTitle={`Background video - Homepage - ${title}`}
      >
        <HighlightedRelease release={highlightedRelease} />
      </FullscreenBackground>
    </div>
  );
};

export default HomePage;
