// Libraries
import React from 'react';

// Styling
import './index.scss';

const AboutPhotos = () => {
  const photosPath = [
    require('../../../assets/photos/1.jpg'),
    require('../../../assets/photos/2.jpg'),
    require('../../../assets/photos/3.jpg')
  ];

  const photosList = photosPath.map((imagePath: any, index: number) => (
    <li key={`photo_${index}`}>
      <img
        src={imagePath.default}
        alt={`A handsome guy #${index + 1}`}
        title={`A handsome guy #${index + 1}`}
      />
    </li>
  ));

  return (
    <ul className="photos-list">
      {photosList}
    </ul>
  );
};

export default AboutPhotos;
