import { useEffect, useRef } from 'react';

const useForceScrollTop = () => {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      window.scrollTo(0, 0);
    }

    const preventScroll = (e) => {
      if (window.scrollY !== 0) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('scroll', preventScroll);

    const timeoutId = setTimeout(() => {
      window.removeEventListener('scroll', preventScroll);
    }, 100);

    return () => {
      window.removeEventListener('scroll', preventScroll);
      clearTimeout(timeoutId);
    };
  }, []);
};

export default useForceScrollTop;