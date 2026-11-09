// Libraries
import React from 'react';
import { ICreditsItem, IMusicItemTab } from '../../../../types';

// Styling
import './index.scss';

// Component properties
interface IAdditionalInfoProps {
  release: IMusicItemTab
}

const AdditionalInfo = ({ release }: IAdditionalInfoProps) => {
  const { credits, release_date } = release;

  const creditsItems = credits.map((creditsItem: ICreditsItem, index: number) => (
    <React.Fragment key={`credits_${release.slug}_${index}`}>
      <p
        className="title"
        dangerouslySetInnerHTML={{ __html: creditsItem.title }}
      />
      {/* div, not p: descriptions may embed block elements (video iframes) */}
      <div className="paragraph" dangerouslySetInnerHTML={{ __html: creditsItem.description }} />
    </React.Fragment>
  ));

  return (
    <div className="additional-info">
      <p className="release-date small">
        Released on <span>{release_date}</span>
      </p>
      <div className="credits">
        {creditsItems}
      </div>
    </div>
  );
};

export default AdditionalInfo;
