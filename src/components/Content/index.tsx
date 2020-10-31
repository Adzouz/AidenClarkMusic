import React from 'react';
import { withContent } from '../../hoc/withContext';
import { IContent } from '../../types';

interface IContentProps {
  context?: IContent;
}

const Content = ({ context }: IContentProps) => {
  return (
    <div>
      test
    </div>
  );
};

export default withContent(Content);
