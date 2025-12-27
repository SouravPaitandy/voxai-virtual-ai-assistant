import { useEffect, useState } from "react";

/**
 * Custom hook for managing scroll buttons visibility
 */
export const useScrollButtons = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showScrollDown, setShowScrollDown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;

      // Show up arrow when scrolled down till 50% of the page
      if (scrollPosition > documentHeight * 0.5) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      // Show down arrow when at 50% above and there's more content below
      if (
        scrollPosition < documentHeight * 0.5 &&
        documentHeight > windowHeight
      ) {
        setShowScrollDown(true);
      } else {
        setShowScrollDown(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToDown = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  return {
    showScrollTop,
    showScrollDown,
    scrollToTop,
    scrollToDown,
  };
};
