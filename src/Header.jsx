import { useRef, useState } from 'react';
import { useTheme } from './ThemeContext';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { useGSAP } from "@gsap/react";
import './animations.css';

gsap.registerPlugin(TextPlugin);

const Header = () => {
  const { isDark } = useTheme();
  const headerRef = useRef(null);
  const imgRef = useRef(null);
  const paragraphRef = useRef(null);
  const letterRefs = useRef([]);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  console.log("Component mounted");
  console.log("Header ref:", headerRef.current);
  console.log("Paragraph ref:", paragraphRef.current);
  console.log("letterRefs:", letterRefs.current);

  const timeline = gsap.timeline();

  const handleMouseEnter = () => {
    gsap.to(imgRef.current, { scale: 1.1, duration: 0.3 });
  };

  const handleMouseLeave = () => {
    gsap.to(imgRef.current, { scale: 1, duration: 0.3 });
  };

  useGSAP(()=>{

    // if (imageLoaded) {
    //   gsap.from(imgRef.current, {
    //     scale: 0.5,
    //     opacity: 0,
    //     duration: 1,
    //     ease: "power2.out"
    //   });
    // }

    // Animate letters
    if(headerRef.current){
    letterRefs.current.forEach((letter, index) => {
      if (letter) {
        timeline.from(letter, {
          opacity: 0,
          y: 20,
          duration: 1.5,
          delay: 0.5,
          ease: "bounce.out",
          stagger: 0.5,
        }, index * 0.1);
      }
    });
    }
    if(headerRef.current){
      letterRefs.current.forEach((letter, index) => {
        if (letter) {
          gsap.from(letter, {
            // opacity: 0,
            y: 20,
            duration: 1.5,
            delay: 0.5,
            ease: "bounce.out",
            stagger: 0.5,
            repeat: -1
          }, index * 0.1);
        }
      });
      }

    //Animate paragraph
    if (paragraphRef.current) {
      timeline.from(paragraphRef.current, {
        opacity: 0,
        y: 40,
        duration: 1.5,
        // delay: .5,
        ease: "elastic.out"
      }, "-=0.5");
    }
  });

  const handleImageLoad = () => {
    console.log("Image loaded");
    setImageLoaded(true);
  };

  

  return (
    <div className="container mx-auto px-4">
      <div className="w-full flex items-center justify-center mb-10">
        <div className="relative w-32 h-32">
         <div className={`animate-pulse-ring ${isDark ? 'bg-blue-500' : 'bg-blue-400'}`}></div>
          <div className={`animate-pulse-ring animation-delay-1000 absolute inset-0 rounded-full animate-pulse ${isDark ? 'bg-blue-500/50' : 'bg-blue-400/50'}`}></div>
          <img
            ref={imgRef}
            src='https://i.gifer.com/origin/38/38fda0376d860ff65bdbfd257ca672a4.gif'
            alt="VoxAI"
            className={`w-full h-full rounded-full shadow-lg border-4 ${isDark ? 'border-blue-500' : 'border-blue-400'} z-10 relative`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onLoad={handleImageLoad}
            style={{ opacity: imageLoaded ? 1 : 0 }}
          />
        </div>
      </div>
      <h1 ref={headerRef} className={`${isDark ? 'text-blue-400' : 'text-blue-600'} text-center mt-4 mb-4 text-5xl font-bold`}>
        {'VoxAI'.split('').map((letter, index) => (
          <span key={index} ref={el => letterRefs.current[index] = el} className="inline-block opacity-100">
            {letter}
          </span>
        ))}
      </h1>
      <p ref={paragraphRef} className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-center mb-10 text-lg opacity-100`}>
        Your Voice-Activated AI Assistant. How may I assist you today?
      </p>
    </div>
  );
};

export default Header;