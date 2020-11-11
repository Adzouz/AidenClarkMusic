// Libraries
import React from 'react';
import { ILink } from '../../../types';
import { sendEvent } from '../../../utils';

// Styling
import './index.scss';

// Component properties
interface ISocialLinksProps {
  links: ILink[],
  from: string
}

const SocialLinks = ({ links, from }: ISocialLinksProps) => {
  const fromSlug = from.toLowerCase().replace(/[ .()]/g, '').replace(/-/g, '_');
  const linksList = links.map((link: ILink, index: number) => {
    const linkSlug = link.title.toLowerCase().replace(/ /g, "-");
    const logoPath = require(`../../../assets/logos/${linkSlug}.svg`);
    return (
      <li key={`social_link_${fromSlug}_${index}`}>
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => sendEvent({
            category: 'Release',
            action: 'Social link click',
            label: from
          })}
        >
          <img
            src={logoPath.default}
            alt={link.title}
          />
        </a>
      </li>
    );
  });
  return (
    <ul className="links">
      {linksList}
    </ul>
  )
};

export default SocialLinks;
