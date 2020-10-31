import Content from './content';

export type IContent = Content;

export interface IAppSlice {
  initialized: boolean;
  loading: boolean;
  config: IAppSliceConfig;
}

export interface IAppSliceConfig {
  localeId: string;
}
