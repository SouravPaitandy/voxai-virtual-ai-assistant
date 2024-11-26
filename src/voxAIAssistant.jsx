/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback, useRef } from "react";
import {
  Sun,
  Moon,
  Trash2,
  Settings,
  X,
  CloudRain,
  Calculator,
  NetworkIcon,
  DownloadIcon,
  SidebarOpenIcon,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { getChatbotResponse, speak, getWeatherInfo } from "../utils/aiHelpers";
import { customAnswers } from "../utils/customAnswers";
import { openApp } from "../utils/appLauncher";
import SettingsDialog from "./Components/SettingsDialog.jsx";
import MainContent from "./Components/MainContent";
import WelcomeScreen from "./Components/WelcomeScreen";
import ControlBar from "./Components/ControlBar";
import SideNavbar from "./Components/SideNavbar";
import WelcomePopup from "./Components/WelcomePopup.jsx";
import QuickNoteWidget from "./Components/QuickNoteWidget.jsx";
import useTheme from "../context/ThemeContext"
import { useMemory } from '../context/MemoryContext';
import GestureController from '../utils/gestureController';
import contextualShortcuts from '../utils/contextualShortcuts';
import privacyManager from './Components/privacyManager.js';

const MAX_MESSAGES = 50;

const VoxAIAssistant = () => {
  // State Management
  const [apiMessages, setApiMessages] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [userName, setUserName] = useState("");
  const [submittedName, setSubmittedName] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);
  const [voices, setVoices] = useState([]);
  const [isVoicesLoaded, setIsVoicesLoaded] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [showSidebar, setShowSidebar] = useState(false);
  const [showWhatsNew, setShowWhatsNew] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showScrollDown, setShowScrollDown] = useState(false);
  const { state: memoryState, updateContext, addToMemory, getRecentTopics, clearMemory: clearContextMemory } = useMemory();
  const gestureControllerRef = useRef(null);
  // Refs
  const recognitionRef = useRef(null);

  // Handle scroll to show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle scroll to show/hide scroll to down button
  useEffect(() => {
    const handleScrollDown = () => {
      if (window.scrollY < 10) {
        setShowScrollDown(true);
      } else {
        setShowScrollDown(false);
      }
    };

    window.addEventListener('scroll', handleScrollDown);
    return () => window.removeEventListener('scroll', handleScrollDown);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToDown = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  };

  // 2. Initial Setup Effects

  // Load voices
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      const englishVoices = availableVoices.filter((voice) =>
        voice.lang.startsWith("en-")
      );
      setVoices(englishVoices);
      if (englishVoices.length > 0 && !selectedVoice) {
        setSelectedVoice(englishVoices[0]);
        console.log(englishVoices[0]);
      }
      setIsVoicesLoaded(true);
    };

    loadVoices();

    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    const timeoutId = setTimeout(loadVoices, 1000);

    return () => {
      window.speechSynthesis.cancel();
      clearTimeout(timeoutId);
    };
  }, []);

  // Load saved voice
  useEffect(() => {
    const voiceName = localStorage.getItem("selectedVoiceName");
    console.log("voiceName: ", voiceName);
    if (voiceName && voices) {
      console.log(voices);
      const voice = voices.find((v) => v.name === voiceName);
      console.log("voice: ", voice);
      // if (voice) {
      setSelectedVoice(voice);
      // }
    }
  }, [voices]);

  // Load conversation history
  useEffect(() => {
    const savedHistory = localStorage.getItem("VoxAISession");
    if (savedHistory) {
      setConversationHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Setup speech recognition
  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsSpeaking(false);
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const lastResultIndex = event.results.length - 1;
        const transcriptResult = event.results[lastResultIndex][0].transcript;
        // handleWeatherRequest(transcriptResult);
        handleVoiceInput(transcriptResult);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  // 3. Session Management Effects

  // Load saved session
  useEffect(() => {
    const savedSession = localStorage.getItem("voxAISession");
    console.log("savedSession", savedSession)
    if (savedSession) {
      const { name, messages } = JSON.parse(savedSession);
      setSubmittedName(name);
      setApiMessages(messages.slice(-MAX_MESSAGES));
      setIsInitialized(true);
    }
  }, []);

  // Initialize assistant when name is submitted
  useEffect(() => {
    if (submittedName && !isInitialized) {
      initializeAssistant();
    }
  }, [submittedName, isInitialized]);

  // Save session updates
  useEffect(() => {
    if (submittedName && apiMessages.length > 0) {
      const sessionData = {
        name: submittedName,
        messages: apiMessages.slice(-MAX_MESSAGES),
      };
      localStorage.setItem("voxAISession", JSON.stringify(sessionData));
      console.log("sessionData: ", sessionData)
    }
  }, [submittedName, apiMessages]);

  // Check notification permission
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "granted") {
      setIsNotificationsEnabled(true);
    }
  }, []);

  // 4. Utility Functions
  const preprocessTranscript = (transcript) => {
    let processed = transcript.toLowerCase().trim();
    if (
      /^(who|what|when|where|why|how|is|are|can|could|would|will|do|does|did)/.test(
        processed
      ) &&
      !processed.endsWith("?")
    ) {
      processed += "?";
    }
    if (
      /^(wow|amazing|great|awesome|oh my god|oh no|hey|hi|hello)/.test(
        processed
      ) &&
      !processed.endsWith("!")
    ) {
      processed += "!";
    }
    return processed;
  };

  const extractCityFromPrompt = (prompt) => {
    const keywords = [
      "weather",
      "temperature",
      "forecast",
      "current",
      "in",
      "at",
      "of",
      "for",
    ];
    const cleanPrompt = prompt.replace(/[?,.'!]/g, "");
    const words = cleanPrompt.split(" ");

    let cityStartIndex = -1;
    for (let i = 0; i < words.length; i++) {
      if (keywords.includes(words[i])) {
        cityStartIndex = i + 1;
      }
    }

    if (cityStartIndex === -1 || cityStartIndex >= words.length) {
      return null;
    }

    const cityWords = words.slice(cityStartIndex);
    return cityWords.join(" ");
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

  // 5. Event Handlers
  const toggleWhatsNew = () => setShowWhatsNew(!showWhatsNew);

  const handleExportHistory = () => {
    const historyText = conversationHistory.join("\n\n");
    const blob = new Blob([historyText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "conversation-history.txt";
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  const requestNotificationPermission = () => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          setIsNotificationsEnabled(true);
        }
      });
    }
  };

  const showNotification = (title, body) => {
    if (isNotificationsEnabled) {
      new Notification(title, { body });
    }
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    setSubmittedName(userName);
  };

  const handleClearSession = () => {
    if (confirm("Do you really want to remove?")) {
      localStorage.removeItem("voxAISession");
      setSubmittedName("");
      setApiMessages([]);
      setIsInitialized(false);
      setUserName("");
      clearContextMemory();
    }
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      recognitionRef.current?.start();
    }
    setIsListening(!isListening);
  };

  const toggleSpeaking = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Setup keyboard shortcuts
  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.ctrlKey && e.code === "Space") {
        toggleListening();
      } else if (e.ctrlKey && e.code === "KeyS") {
        setShowSettings(true);
      } else if (e.ctrlKey && e.shiftKey && e.code === "KeyC") {
        handleClearSession();
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [toggleListening, setShowSettings]);

  // 6. Core Business Logic
  const initializeAssistant = async () => {
    const initialMessage = `Hello ${submittedName}! I'm VoxAI, your voice-activated AI assistant. How can I help you today?`;
    setApiMessages([`VoxAI: ${initialMessage}`]);
    speak(initialMessage, selectedVoice, () => {
      setIsSpeaking(false);
    });
    setIsInitialized(true);
  };

  const [hasSeenWelcome, setHasSeenWelcome] = useState(
    // Check if user has seen welcome popup before
    // localStorage.getItem('hasSeenWelcome') === 'true'
    false
  );

  const handleWelcomeClose = () => {
    setHasSeenWelcome(true);
    // localStorage.setItem('hasSeenWelcome', 'true');
  };

  // Initialize gesture controls
  useEffect(() => {
    const mainElement = document.getElementById('main-content');
    if (mainElement) {
      gestureControllerRef.current = new GestureController(mainElement, {
        onSwipeLeft: () => setShowSidebar(false),
        onSwipeRight: () => setShowSidebar(true),
        onDoubleTap: () => toggleListening(),
        onPan: (ev) => {
          if (ev.deltaY < -50) {
            scrollToTop();
          }
        }
      });
    }

    return () => {
      if (gestureControllerRef.current) {
        gestureControllerRef.current.destroy();
      }
    };
  }, []);

  // Initialize contextual shortcuts
  useEffect(() => {
    const handleKeyboard = (event) => {
      const action = contextualShortcuts.handleKeyPress(event);
      if (action) {
        switch (action) {
          case 'toggleVoice':
            toggleListening();
            break;
          case 'clearChat':
            handleClearSession();
            break;
          case 'closeSettings':
            setShowSettings(false);
            break;
          case 'saveSettings':
            handleSaveSettings();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, []);

  // Add privacy manager integration
  const handleSaveSettings = (newSettings) => {
    privacyManager.updateSettings(newSettings);
    console.log("privacy updated: ", newSettings)
  };

  // Update SettingsDialog to include privacy settings
  const renderSettingsDialog = () => (
    <SettingsDialog
      showSettings={showSettings}
      setShowSettings={setShowSettings}
      isDark={theme === 'dark'}
      isNotificationsEnabled={isNotificationsEnabled}
      setIsNotificationsEnabled={setIsNotificationsEnabled}
      handleExportHistory={handleExportHistory}
      requestNotificationPermission={requestNotificationPermission}
      privacySettings={privacyManager.settings}
      onPrivacySettingsChange={handleSaveSettings}
      // className="max-w-[90vw] md:max-w-lg mx-auto"
    />
  );

  const handleWeatherRequest = async (processedTranscript) => {
    setApiMessages((prev) => {
      const newMessages = [...prev, `You: ${processedTranscript}`];
      return newMessages.slice(-MAX_MESSAGES);
    });

    try {
      const cityName = extractCityFromPrompt(processedTranscript);
      if (cityName) {
        const weather = await getWeatherInfo(cityName);
        const response = `The current weather of ${cityName} is ${weather.condition} with a temperature of ${weather.temperature}°C.`;
        // Add AI response to memory
        addToMemory({
          role: 'assistant',
          content: response,
          timestamp: new Date()
        });
        setApiMessages((prev) => [...prev, `VoxAI: ${response}`]);
        speak(response, selectedVoice);
      } else {
        setApiMessages((prev) => [
          ...prev,
          "VoxAI: I apologize, but I could not determine the city name from your request.",
        ]);
      }
    } catch (error) {
      console.error("Error getting weather information:", error);
      setApiMessages((prev) => [
        ...prev,
        "VoxAI: I apologize, but I encountered an error while getting the weather information.",
      ]);
    }
  };

  // App Launching
  const handleVoiceCommand = async (processedTranscript, appMatch) => {
    const appName = appMatch[1].toLowerCase();
    const success = await openApp(appName);
    console.log(submittedName);
    setApiMessages((prev) => {
      const newMessages = [...prev, `${"You"}: ${processedTranscript}`];
      return newMessages.slice(-MAX_MESSAGES);
    });

    if (success) {
      const response = `Opening ${appName}...`;
      // Add AI response to memory
      addToMemory({
        role: 'assistant',
        content: response,
        timestamp: new Date()
      });
      setApiMessages((prev) => [...prev, `VoxAI: ${response}`]);
      speak(response, selectedVoice);
    } else {
      const response = `Sorry, I couldn't open ${appName}. The app might not be installed or supported.`;
      setApiMessages((prev) => [...prev, `VoxAI: ${response}`]);
      speak(response, selectedVoice);
    }
    return;
  };

   // Update handleVoiceInput to use memory context
   const handleVoiceInput = useCallback(
    async (transcript) => {
      console.log("Transcript/Query: ", transcript);
      const processedTranscript = preprocessTranscript(transcript);
      // Update context memory
      updateContext(processedTranscript);
      // Add to conversation memory
      addToMemory({
        role: 'user',
        content: processedTranscript,
        timestamp: new Date()
      });

      // Add to conversation history with memory context
      const messageWithContext = {
        text: processedTranscript,
        timestamp: new Date(),
        context: memoryState.recentTopics
      };

      setConversationHistory(messageWithContext);
  
      //Check if it's a weather request
      if (processedTranscript.includes("weather")) {
        handleWeatherRequest(processedTranscript);
        return;
      }
      // Check if it's an app launch command
      const appMatch = processedTranscript.match(
        /(?:open|launch|start)\s+(\w+)/i
      );
      if (appMatch) {
        handleVoiceCommand(processedTranscript, appMatch);
        return;
      }
      // If not an app launch command, process it as a regular query
      setApiMessages((prev) => {
        const newMessages = [...prev, `You: ${processedTranscript}`];
        return newMessages.slice(-MAX_MESSAGES);
      });

      try {
        let response;
        const customAnswer = checkCustomAnswers(processedTranscript);

        if (customAnswer) {
          response = customAnswer;
        } else {
          response = await getChatbotResponse(processedTranscript);
        }

        // Add AI response to memory
        addToMemory({
          role: 'assistant',
          content: response,
          timestamp: new Date()
        });

        setApiMessages((prev) => {
          const newMessages = [...prev, `VoxAI: ${response}`];
          return newMessages.slice(-MAX_MESSAGES);
        });

        showNotification("New response from VoxAI", response);

        setIsSpeaking(true);
        speak(response, selectedVoice, () => {
          setIsSpeaking(false);
        });
        // setIsSpeaking(false);
      } catch (error) {
        console.error("Error processing voice input:", error);
        setApiMessages((prev) => [
          ...prev,
          "VoxAI: I apologize, but I encountered an error. Please try again.",
        ]);
      }
    },
    [selectedVoice, isSpeaking, updateContext, addToMemory, memoryState.recentTopics]
  );

  const onQuerySubmit = (query) => {
    console.log("Query: ", query);
    // handleWeatherRequest(query);
    if (isSpeaking) setIsSpeaking(false);
    handleVoiceInput(query);
  };


  // Update MainContent to use memory context
  const renderMainContent = () => (
    <MainContent
      isDark={theme === 'dark'}
      apiMessages={apiMessages}
      submittedName={submittedName}
      conversationContext={memoryState.recentTopics}
      recentTopics={getRecentTopics()}
      className="px-4 md:px-8 mt-16 md:mt-20"
    />
  );

  // Welcome Screen
  if (!submittedName) {
    return (
      <WelcomeScreen
        handleNameSubmit={handleNameSubmit}
        userName={userName}
        setUserName={setUserName}
      />
    );
  }

  // Main Application
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200 flex relative">
      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed hidden lg:inline bottom-24 right-4 z-30 p-2 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 transition-all duration-300"
        >
          <ArrowUp size={24} />
        </button>
      )}
      {showScrollDown && (
        <button
          onClick={scrollToDown}
          className="fixed hidden lg:inline bottom-24 right-4 z-30 p-2 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 transition-all duration-300"
        >
          <ArrowDown size={24} />
        </button>
      )}

      {/* Sidebar trigger - adjusted for mobile */}
      <div
        className={`w-12 md:w-32 h-screen fixed lg:flex flex-col-reverse items-center top-0 left-0 hidden z-40 ${
          showSidebar ? "hidden" : ""
        }`}
        onMouseEnter={() => setShowSidebar(true)}
      >
        <div
          className={`h-7 w-7 mb-8 ${
            theme ? "text-gray-400" : "text-gray-700"
          }`}
        >
          <SidebarOpenIcon />
        </div>
      </div>

      {/* Header - made responsive */}
      {/* Conditionally render welcome popup */}
      {!hasSeenWelcome && (
        <WelcomePopup isDark={theme === 'dark'} onClose={handleWelcomeClose} />
      )}
      <header className="hidden md:block cursor-pointer rounded-full active:scale-95 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-700 dark:to-purple-800 text-white fixed z-50 top-4 left-8">
        <div className="container px-4">
          <h1 className="text-2xl font-semibold">VoxAI</h1>
        </div>
      </header>
      {/* Mobile header */}
      <header className="md:hidden cursor-pointer rounded-full active:scale-95 
        bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-700 dark:to-purple-800
        text-white fixed z-50 top-2 left-4"
        onClick={()=> setShowSidebar(!showSidebar)}>
        <div className="container px-2">
          <h1 className="text-xl font-semibold">VoxAI</h1>
        </div>
      </header>

      {/* Floating Status Bar - improved mobile layout */}
      <div
        className={`fixed top-2 md:top-4 left-1/2 transform -translate-x-1/2 z-40 
        dark:bg-gray-800 bg-white
        rounded-full px-2 md:px-4 py-1 md:py-2 shadow-lg flex items-center space-x-2 md:space-x-3
        text-sm md:text-base`}
        // ${themeMode ? "bg-gray-800" : "bg-white"} 
      >
        <span
          className={`flex items-center ${
            isListening ? "text-red-400" : "text-green-400"
          }`}
        >
          <span className="relative flex h-2 md:h-3 w-2 md:w-3 mr-1 md:mr-2">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isListening ? "bg-red-400" : "bg-green-400"
              }`}
            ></span>
            <span
              className={`relative inline-flex rounded-full h-2 md:h-3 w-2 md:w-3 ${
                isListening ? "bg-red-500" : "bg-green-500"
              }`}
            ></span>
          </span>
          {isListening ? "Listening..." : "Ready"}
        </span>
        <div className="h-4 w-px bg-gray-300 hidden md:block"></div>
        <span
          className="hidden md:inline text-sm dark:text-gray-300 text-gray-600"
          // ${
          //   themeMode ? "text-gray-300" : "text-gray-600"
          // }`}
        >
          {isSpeaking ? "Speaking" : "Silent"}
        </span>
      </div>

      {/* Control buttons - made responsive */}
      <div
        className={`flex items-center space-x-1 md:space-x-3 fixed top-2 md:top-4 right-2 md:right-4 z-40 shadow-lg
        rounded-full p-1 md:p-2 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700`}
      >
        <Tooltip text="Toggle dark mode">
          <button
            onClick={toggleTheme}
            className="p-2 md:p-3 rounded-full transition-all duration-300 active:scale-95 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-opacity-80"
          >
            {theme === 'dark' ? (
              <Sun size={16} className="md:w-5 md:h-5" />
            ) : (
              <Moon size={16} className="md:w-5 md:h-5" />
            )}
          </button>
        </Tooltip>

        <Tooltip text="Open settings">
          <button
            onClick={() => setShowSettings(true)}
            className={`p-2 md:p-3 rounded-full transition-all duration-300 active:scale-95
            ${
              theme === 'dark' ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"
            }
            hover:bg-opacity-80`}
          >
            <Settings size={16} className="md:w-5 md:h-5" />
          </button>
        </Tooltip>

        <Tooltip text="Clear session">
          <button
            onClick={handleClearSession}
            className={`p-2 md:p-3 rounded-full transition-all duration-300 active:scale-95
            ${
              theme === 'dark' ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"
            }
            hover:bg-opacity-80`}
          >
            <Trash2 size={16} className="md:w-5 md:h-5" />
          </button>
        </Tooltip>
      </div>

      {/* Side navbar */}
      {/* {showSidebar && ( */}
      {showSidebar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:bg-opacity-0"></div>
      )}
      <SideNavbar
        isDark={theme === 'dark'}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        toggleWhatsNew={toggleWhatsNew}
        className="w-64 md:w-72"
      />
      {/* )} */}

      {/* Updated MainContent with memory context */}
      {renderMainContent()}

      {/* Control Bar */}
      <ControlBar
        isDark={theme === 'dark'}
        handleExportHistory={handleExportHistory}
        isListening={isListening}
        toggleListening={toggleListening}
        isSpeaking={isSpeaking}
        toggleSpeaking={toggleSpeaking}
        isNotificationsEnabled={isNotificationsEnabled}
        requestNotificationPermission={requestNotificationPermission}
        onQuerySubmit={onQuerySubmit}
        className="fixed bottom-4 left-0 right-0 px-4 md:px-8"
      />

      {/* Updated SettingsDialog with privacy settings */}
      {renderSettingsDialog()}

      <QuickNoteWidget isDark={theme === 'dark'} />

      {/* What's New Dialog - made responsive */}
      {showWhatsNew && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div
            className={`p-4 md:p-6 rounded-lg shadow-lg w-full max-w-[90vw] md:max-w-lg ${
              theme === 'dark' ? "text-white bg-gray-800" : "text-gray-800 bg-white"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h4
                className={`text-base md:text-lg font-bold ${
                  theme === 'dark' ? "text-blue-500" : "text-blue-600"
                }`}
              >
                What&apos;s New in VoxAI
              </h4>
              <button
                onClick={toggleWhatsNew}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-400"
              >
                <X size={18} className="md:w-5 md:h-5" />
              </button>
            </div>

            <div
              className={`space-y-3 text-sm md:text-base ${
                theme === 'dark' ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {/* What's new content items - made text responsive */}
              <div className="px-2 sm:max-h-none sm:overflow-y-hidden max-h-[60vh] overflow-y-auto">
                <div className="rounded-lg border-2 border-blue-500 p-2">
                  <h5 className="font-semibold">
                    <span
                      className={`${
                        theme === 'dark' ? "text-blue-500" : "text-blue-600"
                      } font-bold`}
                    >
                      New:
                    </span>{" "}
                    Customizable Text Styling
                  </h5>
                  <p>
                    You can now adjust the font size, font family, and line
                    height of the conversation in the Settings panel.
                  </p>
                </div>
                <div>
                  <h5 className="font-semibold">Modern and User-Friendly UI</h5>
                  <p>
                    We&apos;ve completely redesigned the user interface to
                    provide a more modern and intuitive experience.
                  </p>
                </div>
                <div>
                  <h5 className="font-semibold">
                    <Settings size={16} className="inline-block mr-2" />
                    Settings Panel
                  </h5>
                  <p>
                    You can now customize your voice preferences in the new
                    Settings panel.
                  </p>
                </div>
                <div>
                  <h5 className="font-semibold">
                    <CloudRain size={16} className="inline-block mr-2" />
                    Real-Time Weather Information
                  </h5>
                  <p>
                    Simply ask about the weather in a specific city, and VoxAI
                    will provide the current weather details.
                  </p>
                </div>
                <div>
                  <h5 className="font-semibold">
                    <Calculator size={16} className="inline-block mr-2" />
                    App Launching
                  </h5>
                  <p>
                    You can now open desktop applications like Calculator,
                    Facebook, and more right from VoxAI.
                    <p className="font-bold">
                      ** This feature is currently in progress for mobile
                      devices.
                    </p>
                  </p>
                </div>
                <div>
                  <h5 className="font-semibold">
                    <NetworkIcon size={16} className="inline-block mr-2" />
                    Enhanced Custom Answers
                  </h5>
                  <p>
                    VoxAI has been trained to provide more comprehensive and
                    tailored responses to your questions.
                  </p>
                </div>
                <div>
                  <h5 className="font-semibold">
                    <DownloadIcon size={16} className="inline-block mr-2" />
                    Export Conversation History
                  </h5>
                  <p>
                    You can now download your conversation history as a text
                    file for your records.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoxAIAssistant;

// / Notification badge component
// const NotificationBadge = () => (
//   <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
//     3
//   </div>
// );

// In-app notification component
// const NotificationTip = ({ message, type }) => (
//   <div
//     className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg shadow-lg z-50 ${
//       type === 'success'
//         ? 'bg-green-500 text-white'
//         : type === 'error'
//         ? 'bg-red-500 text-white'
//         : 'bg-gray-800 text-white'
//     }`}
//   >
//     {message}
//   </div>
// );

// / Tooltip component
const Tooltip = ({ children, text }) => (
  <div className="group relative">
    {children}
    <span className="absolute z-10 -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
      {text}
    </span>
  </div>
);

