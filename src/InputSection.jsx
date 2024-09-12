/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import VoiceSelector from './VoiceSelector';
import { useTheme } from './ThemeContext';

const InputSection = ({ 
  onVoiceInput, 
  isSpeaking, 
  setInputSectionClick, 
  selectedVoice, 
  setSelectedVoice,
  voices,
  isVoicesLoaded
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        console.log('Speech recognition started');
        setIsListening(true);
        setTranscript('');
      };

      recognition.onresult = (event) => {
        const lastResultIndex = event.results.length - 1;
        const transcriptResult = event.results[lastResultIndex][0].transcript;
        console.log('Speech recognized:', transcriptResult);
        setTranscript(transcriptResult);
        onVoiceInput(transcriptResult);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        console.log('Speech recognition ended');
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } else {
      console.log('Speech recognition not supported');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [onVoiceInput]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else if (!isSpeaking) {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        setIsListening(false);
      }
    }
  };

  useEffect(() => {
    setInputSectionClick(() => toggleListening);
  }, [setInputSectionClick]);

  return (
    <div className={`z-10 glassmorphism flex-1 flex flex-col items-center justify-center p-4 w-full max-w-md mx-auto ${isDark ? 'text-white' : 'text-gray-900'}`}>
      <h2 className={`text-xl sm:text-2xl font-bold mb-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>Voice Input</h2>
      <button
        onClick={toggleListening}
        className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-3xl sm:text-4xl ${
          isListening ? 'bg-red-500' : isSpeaking ? 'bg-green-500' : isDark ? 'bg-blue-500' : 'bg-blue-400'
        } hover:bg-opacity-80 transition-colors duration-200 shadow-lg`}
      >
        <i className={`fas ${isListening ? 'fa-microphone-alt' : isSpeaking ? 'fa-volume-up' : 'fa-microphone'}`}></i>
      </button>
      <p className={`mt-4 text-base sm:text-lg text-center ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
        {isListening ? 'Listening... (Tap to stop)' : isSpeaking ? 'Speaking...' : 'Tap to speak'}
      </p>
      {transcript && (
        <p className={`mt-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-full text-center break-words`}>{transcript}</p>
      )}
      <div className="w-full mt-4 relative z-50">
        <VoiceSelector 
          selectedVoice={selectedVoice} 
          setSelectedVoice={setSelectedVoice}
          voices={voices}
          isVoicesLoaded={isVoicesLoaded}
        />
      </div>
    </div>
  );
};

export default InputSection;
