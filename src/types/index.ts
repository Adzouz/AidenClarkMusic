export interface IMusicItemTab {
  slug?: string;
  title?: string;
  full_title?: string;
  meta_description?: string;
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
  };
  buy?: {
    description?: string;
    links?: ILink[];
  };
  youtube_video?: string;
  tracks?: {
    name?: string;
  }[];
  credits?: ICreditsItem[];
}

export interface ICreditsItem {
  title?: string;
  description?: string;
}

export interface ILink {
  title?: string;
  url?: string;
}
