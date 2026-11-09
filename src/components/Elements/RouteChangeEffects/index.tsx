// Libraries
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import { sendPageview } from '../../../utils';

// Tracks a page view on every navigation and scrolls back to top after the first one
const RouteChangeEffects = (): null => {
  const location = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    sendPageview(location.pathname);

    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.key, location.pathname]);

  return null;
};

export default RouteChangeEffects;
