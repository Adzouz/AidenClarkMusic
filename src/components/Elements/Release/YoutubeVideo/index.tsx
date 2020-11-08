import React from 'react';
import { sendEvent } from '../../../../utils';
import './index.scss';

import { IMusicItemTab } from '../../../../types';

interface IYoutubeVideoProps {
  cinemaMode: any;
  setCinemaMode: any;
  release: IMusicItemTab;
}

const YoutubeVideo = ({ cinemaMode, setCinemaMode, release }: IYoutubeVideoProps) => {
  const toggleCinemaMode = () => {
    const newValue = !cinemaMode[release.slug];
    sendEvent({
      category: 'Release',
      action: 'Toggle cinema mode',
      label: `${release.title} - ${newValue ? 'Enable' : 'Disable'}`
    });
    setCinemaMode({...cinemaMode, [release.slug]: newValue });
  };
  return (
    <div className="youtube-video-container">
      <div className="youtube-video-wrapper">
        <div className="youtube-video">
          <iframe src={release.youtube_video} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
        </div>
      </div>
      <div className="cinema-mode-trigger">
        <button
          onClick={() => toggleCinemaMode()}
        >
          {cinemaMode[release.slug] ? 'Disable' : 'Enable'} cinema mode
        </button>
      </div>
    </div>
  );
};

export default YoutubeVideo;
