import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useForceScrollTop from './useForceScrollTop';

function ScrollToTop() {
  const { pathname } = useLocation();
  useForceScrollTop();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;