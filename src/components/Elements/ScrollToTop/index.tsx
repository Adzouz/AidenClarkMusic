// Libraries
import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

// Component properties
interface IScrollToTopProps {
  history: any;
}

const ScrollToTop = ({ history }: IScrollToTopProps) => {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    }
  }, [history]);

  return <React.Fragment />;
};

export default withRouter(ScrollToTop);
