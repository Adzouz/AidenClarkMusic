export interface IContent {
  [key: string]: any;
  config: IConfigTab;
  about: IAboutTab;
  social: ISocialTab;
  music: IMusicTab;
  mroyal: IMusicItemTab;
  keepcontrol: IMusicItemTab;
}

export interface IConfigTab {
  title?: string;
}

export interface IAboutTab {
  title?: string;
  about?: {
    description?: string;
  }
  follow?: {
    title?: string;
  }
  contact?: {
    title?: string;
    description?: string;
  }
}

export interface IMusicTab {
  title?: string;
  releases?: {
    tab: string;
    slug: string;
  }[]
}

export interface IMusicItemTab {
  slug?: string;
  title?: string;
  type?: string;
  cover?: string;
  background?: {
    image?: string;
    video?: string;
  };
  release_date?: string;
  listen?: {
    description?: string;
    links?: ILink[]
  },
  buy?: {
    description?: string;
    links?: ILink[]
  }
  youtube_video?: string;
  tracks?: {
    name?: string;
  }[]
  credits?: ICreditsItem[];
}

export interface ICreditsItem {
  title?: string;
  description?: string;
}

export interface ISocialTab {
  links: ILink[];
}

export interface ILink {
  title?: string;
  url?: string;
}
