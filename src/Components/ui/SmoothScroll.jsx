import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";

export const SmoothScroll = () => {
  const location = useLocation();

  useEffect(() => {
    // Only enable smooth scrolling on Landing Page and Privacy Policy
    const isPublicPage =
      location.pathname === "/" || location.pathname === "/privacy-policy";

    if (!isPublicPage) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Handle anchor links
    const handleAnchorClick = (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;

      e.preventDefault();
      const id = link.getAttribute("href");
      if (id === "#") return;

      const element = document.querySelector(id);
      if (element) {
        lenis.scrollTo(element, { offset: -80 }); // Offset for fixed navbar
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
    };
  }, [location.pathname]);

  return null;
};
