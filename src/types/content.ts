export default interface IContent {
  [key: string]: any;
  config: IConfigTab;
  about: IAboutTab;
  mroyal: IMRoyalTab;
  social: ISocialTab;
}

export interface ILink {
  title: string;
  url: string;
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

export interface IMRoyalTab {
  listen?: {
    description?: string;
    links?: ILink[]
  },
  buy?: {
    description?: string;
    links?: ILink[]
  }
}

export interface ISocialTab {
  links?: ILink[];
}
