import React from 'react';
import './index.scss';

interface IFullscreenBackgroundProps {
  image: string;
  video: string;
  children: any;
}

const FullscreenBackground = ({ image, video, children }: IFullscreenBackgroundProps) => {
  return (
    <div className="fullscreen-background">
      <div className="background-image">
        <img src={image} alt="" />
      </div>
      {video && (
        <div className="video-container">
          <iframe src={video} frameBorder="0" allow="autoplay ; fullscreen" allowFullScreen />
        </div>
      )}
      {children}
    </div>
  );
};

export default FullscreenBackground;
