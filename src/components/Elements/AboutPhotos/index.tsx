// Libraries
import React from 'react';

// Styling
import './index.scss';

// Assets
import photo1 from '../../../assets/photos/1.jpg';
import photo2 from '../../../assets/photos/2.jpg';
import photo3 from '../../../assets/photos/3.jpg';

const AboutPhotos = () => {
  const photosPath = [photo1, photo2, photo3];

  const photosList = photosPath.map((imagePath: string, index: number) => (
    <li key={`photo_${index}`}>
      <img
        src={imagePath}
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
