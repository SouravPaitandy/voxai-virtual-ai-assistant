/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';

const WelcomePopup = ({ isDark, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    // Animate progress bar and auto-close
    const startTime = Date.now();
    const duration = 5000; // 5 seconds

    const animateProgress = () => {
      const elapsed = Date.now() - startTime;
      const remainingProgress = Math.max(0, 100 - (elapsed / duration) * 100);
      
      if (remainingProgress > 0) {
        setProgress(remainingProgress);
        requestAnimationFrame(animateProgress);
      } else {
        setIsVisible(false);
        onClose();
      }
    };

    const timer = setTimeout(animateProgress, 0);

    // Clean up the timer if component unmounts
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center 
        ${isDark 
          ? 'bg-gray-900/50 backdrop-blur-sm' 
          : 'bg-gray-500/20 backdrop-blur-sm'
        } transition-all duration-300 ease-in-out`}
    >
      <div 
        className={`relative w-96 max-w-[95%] p-6 rounded-2xl shadow-2xl 
          transform transition-all duration-500 ease-in-out scale-100 hover:scale-[1.02]
          ${isDark 
            ? 'bg-gray-800 text-white border-2 border-gray-700 shadow-blue-900/30' 
            : 'bg-white text-gray-900 border-2 border-gray-200 shadow-blue-500/20'
          }`}
      >
        {/* Close button */}
        <button 
          onClick={() => {
            setIsVisible(false);
            onClose();
          }}
          className={`absolute top-3 right-3 rounded-full p-1 hover:bg-gray-600/20 
            ${isDark 
              ? 'text-gray-400 hover:text-white' 
              : 'text-gray-600 hover:text-black'
            } transition-colors group`}
          aria-label="Close welcome popup"
        >
          <X size={24} className="group-hover:rotate-90 transition-transform" />
        </button>

        {/* Popup Content */}
        <div className="flex justify-center flex-col items-center text-center space-y-4">
          {/* Logo Container with Pulse Effect */}
          <div className="relative mb-2">
            <div 
              className={`w-24 h-24 rounded-full flex items-center justify-center 
                border-4 transition-all duration-300
                ${isDark 
                  ? 'bg-blue-900/30 text-blue-300 border-blue-800' 
                  : 'bg-blue-100 text-blue-600 border-blue-200'
                } animate-pulse`}
            >
              <img 
                src="/Designer(2).png" 
                alt="VoxAI" 
                className="w-12 h-12 object-contain"
              />
            </div>
          </div>

          {/* Title and Subtitles */}
          <div className="space-y-2">
            <h2 className={`text-2xl font-bold 
              ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
              Welcome to VoxAI!
            </h2>
            <p className={`text-sm tracking-wide 
              ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Your intelligent companion is ready to assist
            </p>
          </div>

          {/* Guidance Text */}
          <div className={`p-4 rounded-xl text-sm space-y-2 
            ${isDark 
              ? 'bg-gray-700/30 text-gray-200' 
              : 'bg-blue-50 text-gray-700'
            }`}>
            <div className="flex items-center space-x-2">
              <ArrowRight size={18} className="text-blue-500" />
              <span>Hover sidebar on the left side</span>
            </div>
            <div className="flex items-center space-x-2">
              <ArrowRight size={18} className="text-blue-500" />
              <span>Mobile users: Tap the VoxAI logo</span>
            </div>
          </div>

          {/* Highlight Message */}
          <p className={`text-sm font-semibold px-4 py-2 rounded-lg
            ${isDark 
              ? 'bg-blue-900/30 text-blue-200' 
              : 'bg-blue-100 text-blue-800'
            }`}>
            Check out the latest updates in the sidebar!
          </p>

          {/* Progress Bar */}
          <div 
            className={`h-1.5 w-full rounded-full overflow-hidden 
              ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}
          >
            <div 
              className="h-full bg-blue-500 transition-all duration-300 ease-linear"
              style={{ 
                width: `${progress}%`,
                transformOrigin: 'left center'
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePopup;