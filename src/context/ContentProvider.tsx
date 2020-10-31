import React from 'react';
import { IContent } from '../types/index';

const ContentContext = React.createContext<IContent | null>(null);
export const ContentProvider = ContentContext.Provider;
export const ContentConsumer = ContentContext.Consumer;

export default ContentContext;
