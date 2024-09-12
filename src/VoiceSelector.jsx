/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import { useTheme } from './ThemeContext';

const VoiceSelector = ({ selectedVoice, setSelectedVoice, voices, isVoicesLoaded }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleVoiceChange = (voice) => {
    setSelectedVoice(voice);
    setIsOpen(false);
  };

  if (!isVoicesLoaded) {
    return <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>Loading voices...</p>;
  }

  if (voices.length === 0) {
    return (
      <div className={`mt-4 ${isDark ? 'bg-gray-700 bg-opacity-30' : 'bg-gray-200 bg-opacity-50'} backdrop-filter backdrop-blur-xl rounded-lg p-4`}>
        <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>No voices available. Using default voice.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-2 text-left ${isDark ? 'bg-gray-700 bg-opacity-50' : 'bg-gray-200 bg-opacity-50'} rounded-md shadow-md flex justify-between items-center`}
      >
        <span className={`truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {selectedVoice ? `${selectedVoice.name} (${selectedVoice.lang})` : 'Select a voice'}
        </span>
        <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'} ml-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}></i>
      </button>
      {isOpen && (
        <div 
          ref={dropdownRef}
          className={`absolute z-50 w-full mt-1 ${isDark ? 'bg-gray-700 bg-opacity-90' : 'bg-white bg-opacity-90'} backdrop-filter backdrop-blur-xl rounded-md shadow-lg max-h-48 overflow-auto scrollbar-style`}
        >
          {voices.map((voice) => (
            <div
              key={voice.name}
              className={`px-4 py-2 ${isDark ? 'hover:bg-gray-600 text-white' : 'hover:bg-gray-300 text-gray-900'} cursor-pointer text-sm`}
              onClick={() => handleVoiceChange(voice)}
            >
              {voice.name} ({voice.lang})
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VoiceSelector;