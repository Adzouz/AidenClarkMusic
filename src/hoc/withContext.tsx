import React from 'react';
import { IContent } from '../types';
import { ContentConsumer } from '../context/ContentProvider';

export const withContent = <P extends { context?: IContent }>(
  Component: React.ComponentClass<P> | React.StatelessComponent<P>
): React.FC<P> => {
  return function BoudComponent(props: P) {
    return (
      <ContentConsumer>
        {content => <Component {...props} context={content} />}
      </ContentConsumer>
    );
  };
};
