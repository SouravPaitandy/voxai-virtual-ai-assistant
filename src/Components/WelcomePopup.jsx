/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const WelcomePopup = ({ isDark, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Automatically close the popup after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 5000);

    // Clean up the timer if component unmounts
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm ${
        isDark ? 'bg-opacity-50' : 'bg-opacity-20'
      } transition-all duration-300 ease-in-out`}
    >
      <div 
        className={`relative w-80 p-6 rounded-lg shadow-2xl transform transition-all duration-500 ease-in-out 
        ${isDark 
          ? 'bg-gray-800 text-white border border-gray-700' 
          : 'bg-white text-gray-900 border border-gray-200'
        }`}
      >
        {/* Close button */}
        <button 
          onClick={() => {
            setIsVisible(false);
            onClose();
          }}
          className={`absolute top-2 right-2 ${
            isDark 
              ? 'text-gray-400 hover:text-white' 
              : 'text-gray-600 hover:text-black'
          } transition-colors`}
        >
          <X size={24} />
        </button>

        {/* Popup Content */}
        <div className="flex justify-center flex-col items-center text-center space-y-4">
        <div className="relative flex h-20 md:h-20 w-20 md:w-20 mr-1 md:mr-2">
          <div 
            className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${
              isDark 
                ? 'bg-blue-900 text-blue-300' 
                : 'bg-blue-100 text-blue-600'
            }`}
          >
            <img src="\Designer (2).png" alt="VoxAI"  width={50} height={50}/>
          </div>
          <span className='animate-ping absolute inline-flex h-20 w-20 rounded-full opacity-85 bg-blue-700'></span>
        </div>

          <h2 className="text-xl font-bold mb-2">
            Welcome to VoxAI!
          </h2>
          {/* <h4 className="text-base font-bold mb-2">
            Your voice activated intelligent companion
          </h4> */}

          <p className={`text-sm ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Discover the sidebar by hovering on the left side of the screen. 
          </p>
          <p className={`text-sm ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            <i><span className='font-bold'>For mobile users: </span>Press on our Logo. </i>
          </p>
          <p className={`text-sm font-bold ${
            isDark ? 'text-gray-100' : 'text-gray-800'
          }`}>
            Please have a look what&apos;s new in the latest update, you can find it on the sidebar.
          </p>

          {/* Progress Bar */}
          <div 
            className={`h-1 mt-4 w-full rounded-full overflow-hidden ${
              isDark ? 'bg-gray-700' : 'bg-gray-200'
            }`}
          >
            <div 
              className="h-full bg-blue-500 animate-shrink-progress"
              style={{ animationDuration: '5s' }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePopup;