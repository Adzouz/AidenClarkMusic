export default interface IContent {
  [key: string]: any;
  config: IConfigTab;
  social: ISocialTab;
}

export interface IConfigTab {
  title: string;
  description: string;
}

export interface ISocialTab {
  social_links: {
    name: string;
    link: string;
  }[];
}
