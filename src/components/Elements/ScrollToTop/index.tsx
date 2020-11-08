import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

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
  }, []);

  return <React.Fragment />;
}

export default withRouter(ScrollToTop);