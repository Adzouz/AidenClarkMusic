import React from 'react';
import { ILink } from '../../../types';

interface ISocialLinksProps {
  links: ILink[],
  from: string
}

const SocialLinks = ({ links, from }: ISocialLinksProps) => {
  const linksList = links.map((link: ILink, index: number) => {
    const linkSlug = link.title.toLowerCase().replace(/ /g, "-");
    const logoPath = require(`../../../assets/logos/${linkSlug}.svg`);
    return (
      <li key={`social_link_${from}_${index}`}>
        <a href={link.url} target="_blank" rel="noopener noreferrer">
          <img src={logoPath} alt={link.title} />
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
