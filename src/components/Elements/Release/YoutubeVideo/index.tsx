// Libraries
import React from 'react';
import { sendEvent } from '../../../../utils';
import { IMusicItemTab } from '../../../../types';

// Styling
import './index.scss';

// Component properties
interface IYoutubeVideoProps {
  cinemaMode: any;
  setCinemaMode: any;
  release: IMusicItemTab;
}

const YoutubeVideo = ({ cinemaMode, setCinemaMode, release }: IYoutubeVideoProps) => {
  const { slug, title, youtube_video } = release;
  const toggleCinemaMode = () => {
    const newValue = !cinemaMode[slug];
    sendEvent({
      category: 'Release',
      action: 'Toggle cinema mode',
      label: `${title} - ${newValue ? 'Enable' : 'Disable'}`
    });
    setCinemaMode({...cinemaMode, [slug]: newValue });
  };
  return (
    <div className="youtube-video-container">
      <div className="youtube-video-wrapper">
        <div className="youtube-video">
          <iframe
            src={youtube_video}
            frameBorder="0"
            allow="accelerometer; autoplay; fullscreen; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            title={`YouTube - Release - ${title}`}
          />
        </div>
      </div>
      <div className="cinema-mode-trigger">
        <button onClick={() => toggleCinemaMode()}>
          {cinemaMode[slug] ? 'Disable' : 'Enable'} cinema mode
        </button>
      </div>
    </div>
  );
};

export default YoutubeVideo;
