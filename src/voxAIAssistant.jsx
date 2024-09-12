import { useState, useEffect, useCallback } from 'react';
import BackgroundAnimation from './BackgroundAnimation';
import Header from './Header';
import InputSection from './InputSection';
import ConversationHistory from './ConversationHistory';
import Footer from './Footer';
import './glassmorphism.css';
// import './scrollbar.css';
import { getChatbotResponse, speak, formatMessage } from '../utils/aiHelpers';
import { customAnswers } from '../utils/customAnswers';
import { useTheme } from './ThemeContext';
import useForceScrollTop from './useForceScrollTop';

const MAX_MESSAGES = 50;

const VoxAIAssistant = () => {
  const [apiMessages, setApiMessages] = useState([]);
  const [typingText, setTypingText] = useState('');
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [userName, setUserName] = useState('');
  const [submittedName, setSubmittedName] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);
  const [inputSectionClick, setInputSectionClick] = useState(() => () => {});
  const [typingWords, setTypingWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [voices, setVoices] = useState([]);
  const [isVoicesLoaded, setIsVoicesLoaded] = useState(false);
  const { isDark, toggleTheme } = useTheme();


  useForceScrollTop();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      const englishVoices = availableVoices.filter(voice => voice.lang.startsWith('en-'));
      setVoices(englishVoices);
      if (englishVoices.length > 0 && !selectedVoice) {
        setSelectedVoice(englishVoices[0]);
      }
      setIsVoicesLoaded(true);
    };

    loadVoices();

    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    const timeoutId = setTimeout(loadVoices, 1000); // Fallback for mobile browsers

    return () => {
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = null;
      }
      clearTimeout(timeoutId);
    };
  }, [selectedVoice]);

  useEffect(() => {
    // Load session data from localStorage
    const savedSession = localStorage.getItem('voxAISession');
    if (savedSession) {
      const { name, messages } = JSON.parse(savedSession);
      setSubmittedName(name);
      setApiMessages(messages.slice(-MAX_MESSAGES)); // Only load the last MAX_MESSAGES
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (submittedName && !isInitialized) {
      initializeAssistant();
    }
  }, [submittedName, isInitialized]);

  useEffect(() => {
    // Save session data to localStorage whenever apiMessages changes
    if (submittedName && apiMessages.length > 0) {
      const sessionData = {
        name: submittedName,
        messages: apiMessages.slice(-MAX_MESSAGES), // Only save the last MAX_MESSAGES
      };
      localStorage.setItem('voxAISession', JSON.stringify(sessionData));
    }
  }, [submittedName, apiMessages]);

  const initializeAssistant = async () => {
    const initialMessage = `Hello ${submittedName}! I'm VoxAI, your voice-activated AI assistant. How can I help you today?`;
    setApiMessages([initialMessage]);
    setTypingText(initialMessage);
    speak(initialMessage, selectedVoice, () => {
      setIsSpeaking(false);
      setTypingText('');
    });
    setIsInitialized(true);
  };

  const handleVoiceInput = useCallback(async (transcript) => {
    console.log('Handling voice input:', transcript);
    if (isSpeaking) {
      console.log('Cannot process input while speaking');
      return;
    }

    // setApiMessages(prev => {
    //   const newMessages = [...prev, `You: ${transcript}`];
    //   return newMessages.slice(-MAX_MESSAGES);
    // });

    // Preprocess the transcript to handle punctuation and emotions
    const processedTranscript = preprocessTranscript(transcript);

    setApiMessages(prev => {
      const newMessages = [...prev, `You: ${processedTranscript}`];
      return newMessages.slice(-MAX_MESSAGES);
    });

    try {
      let response;
      const customAnswer = checkCustomAnswers(processedTranscript);
      if (customAnswer) {
        console.log('Using custom answer');
        response = customAnswer;
      } else {
        console.log('Getting chatbot response');
        response = await getChatbotResponse(processedTranscript);
      }

      console.log('Response received:', response);
      const formattedResponse = formatMessage(response);
      setApiMessages(prev => {
        const newMessages = [...prev, `VoxAI: ${formattedResponse}`];
        return newMessages.slice(-MAX_MESSAGES);
      });

      setIsSpeaking(true);
      console.log('Starting to speak');
      await new Promise((resolve) => {
        speak(formattedResponse, selectedVoice, () => {
          console.log('Finished speaking');
          setIsSpeaking(false);
          resolve();
        });
      });
    } catch (error) {
      console.error('Error processing voice input:', error);
    }
  }, [selectedVoice, isSpeaking]);

  const preprocessTranscript = (transcript) => {
    // Convert to lowercase for easier matching
    let processed = transcript.toLowerCase().trim();

    // Add question mark if the input seems like a question
    if (/^(who|what|when|where|why|how|is|are|can|could|would|will|do|does|did)/.test(processed) && !processed.endsWith('?')) {
      processed += '?';
    }

    // Add exclamation mark for certain phrases
    if (/^(wow|amazing|great|awesome|oh my god|oh no|hey|hi|hello)/.test(processed) && !processed.endsWith('!')) {
      processed += '!';
    }

    return processed;
  };

  const checkCustomAnswers = (input) => {
    const lowercaseInput = input.toLowerCase().trim();
    for (const [key, value] of Object.entries(customAnswers)) {
      if (lowercaseInput.includes(key.toLowerCase())) {
        return value;
      }
    }
    return null;
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    setSubmittedName(userName);
  };

  const handleClearSession = () => {
    localStorage.removeItem('voxAISession');
    setSubmittedName('');
    setApiMessages([]);
    setIsInitialized(false);
    setUserName('');
  };

  if (!submittedName) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <form onSubmit={handleNameSubmit} className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your name"
            className="bg-gray-700 text-white px-4 py-2 rounded-md w-full mb-4"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md w-full">
            Start
          </button>
        </form>
      </div>
    );
  }

  return (
    <section className={`min-h-screen w-full flex flex-col items-center justify-center font-['Roboto_Mono'] ${isDark ? 'text-white' : 'text-gray-900'} relative overflow-hidden`}>
      <BackgroundAnimation />
      <button 
        onClick={toggleTheme} 
        className="fixed z-50 bg-blue-600 top-4 left-4 p-2 rounded-full bg-opacity-50 backdrop-filter backdrop-blur-sm"
      >
        {isDark ? '☀️' : '🌙'}
      </button>
      <div className="flex-1 p-4 flex flex-col items-center justify-center w-full max-w-4xl">
        <Header />
        <div className="flex flex-col w-full gap-4">
          <InputSection
            onVoiceInput={handleVoiceInput}
            isSpeaking={isSpeaking}
            setInputSectionClick={setInputSectionClick}
            selectedVoice={selectedVoice}
            setSelectedVoice={setSelectedVoice}
            voices={voices}
            isVoicesLoaded={isVoicesLoaded}
          />
          <ConversationHistory
            apiMessages={apiMessages}
            typingWords={typingWords}
            currentWordIndex={currentWordIndex}
          />
        </div>
      </div>

      <div className="w-full overflow-hidden">
        <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="w-full h-32">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1E3A8A" />
              <stop offset="50%" stopColor="#3730A3" />
              <stop offset="100%" stopColor="#6B21A8" />
            </linearGradient>
          </defs>
          <path d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" className="fill-[url(#waveGradient)] stroke-none opacity-60">
            <animate attributeName="d" dur="20s" repeatCount="indefinite" values="
              M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z;
              M0.00,49.98 C149.99,-49.98 349.20,150.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z;
              M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z
            " calcMode="spline" keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"/>
          </path>
        </svg>
      </div>

      <Footer />
      <button 
        className="fixed z-50 bottom-4 right-4 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg"
        onClick={inputSectionClick}
      >
        <i className="fas fa-microphone-alt text-xl"></i>
      </button>
      {submittedName && (
        <button 
          className="fixed z-50 top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-md text-sm"
          onClick={handleClearSession}
        >
          Clear
        </button>
      )}
    </section>
  );
};

export default VoxAIAssistant;