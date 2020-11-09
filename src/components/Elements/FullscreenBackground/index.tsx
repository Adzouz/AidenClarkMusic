import React from 'react';
import './index.scss';

interface IFullscreenBackgroundProps {
  image: string;
  video: string;
  videoTitle: string;
  children: any;
}

const FullscreenBackground = ({ image, video, videoTitle, children }: IFullscreenBackgroundProps) => {
  return (
    <div className="fullscreen-background">
      <div className="background-image">
        <img src={image} alt="" />
      </div>
      {video && (
        <div className="video-container">
          <iframe src={video} frameBorder="0" allow="autoplay; fullscreen" title={videoTitle} />
        </div>
      )}
      {children}
    </div>
  );
};

export default FullscreenBackground;
