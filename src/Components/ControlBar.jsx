/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Send, X } from "lucide-react";
import './Components.css'
import CommandSuggestions from './CommandSuggestions'
// import QuickNote from './QuickNote';

const ControlBar = ({
  isDark,
  isListening,
  toggleListening,
  isSpeaking,
  toggleSpeaking,
  onQuerySubmit
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef(null);
  const maxChars = 1000;

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onQuerySubmit(query);
      setQuery('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const clearInput = () => {
    setQuery('');
    textareaRef.current?.focus();
  };

  const remainingChars = maxChars - query.length;
  const isNearLimit = remainingChars <= 100;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 md:px-4 md:pb-4 font-inter">
      <div
        className={`control-bar mx-auto backdrop-blur-lg border
          dark:bg-gray-800/95 dark:border-gray-700
          bg-white/95 border-gray-200
          rounded-2xl shadow-2xl
          transition-all duration-300 ease-in-out
          py-4 md:p-2`}
      >
        {/* ${
            isDark
              ? "bg-gray-800/95 border-gray-700"
              : "bg-white/95 border-gray-200"
          } */}
        <div className={`have px-4 py-3 border-b transition-colors
          ${isDark ? "border-gray-700" : "border-gray-200"}
          ${isFocused ? "border-blue-500" : ""}`}
        >
          {/* <div className='flex justify-between'> */}
            <div className="hidden lg:block">
              <CommandSuggestions onSuggestionClick={onQuerySubmit} isDark={isDark}/>
            </div>
            {/* <QuickNote isDark={isDark}/> */}
          {/* </div> */}
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <TooltipUp
                text={isListening ? "Stop listening" : "Start listening"}
                position="top"
                isDark={isDark}
              >
                <button
                  type="button"
                  onClick={toggleListening}
                  className={`p-2 rounded-lg transition-all duration-200
                    font-jakarta font-medium active:scale-95
                    ${
                      isListening
                        ? "bg-red-500 hover:bg-red-600 text-white"
                        : `${isDark 
                            ? "bg-gray-700 hover:bg-gray-600 text-gray-300" 
                            : "bg-gray-100 hover:bg-gray-200 text-gray-700"}`
                    }`}
                  aria-label={isListening ? "Stop listening" : "Start listening"}
                >
                  {isListening ? (
                    <MicOff className="w-5 h-5" />
                  ) : (
                    <Mic className="w-5 h-5" />
                  )}
                </button>
              </TooltipUp>

              <TooltipUp
                text={isSpeaking ? "Stop speaking" : "Start speaking"}
                position="top"
                isDark={isDark}
              >
                <button
                  type="button"
                  onClick={toggleSpeaking}
                  className={`p-2 rounded-lg transition-all duration-200
                    font-jakarta font-medium active:scale-95
                    ${
                      isSpeaking
                        ? "bg-purple-500 hover:bg-purple-600 text-white"
                        : `${isDark 
                            ? "bg-gray-700 hover:bg-gray-600 text-gray-300" 
                            : "bg-gray-100 hover:bg-gray-200 text-gray-700"}`
                    }`}
                  aria-label={isSpeaking ? "Stop speaking" : "Start speaking"}
                >
                  {isSpeaking ? (
                    <Volume2 className="w-5 h-5" />
                  ) : (
                    <VolumeX className="w-5 h-5" />
                  )}
                </button>
              </TooltipUp>
            </div>

            <div className="h-6 w-px bg-gray-300 dark:bg-gray-700" />

            <div className="flex-1 relative">
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <div className="relative flex-1 flex">
                  <textarea
                    ref={textareaRef}
                    value={query}
                    onChange={(e) => setQuery(e.target.value.slice(0, maxChars))}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Type your message..."
                    rows={1}
                    className={`w-full px-3 py-1.5 rounded-lg
                      font-roboto-mono text-base tracking-[-0.01em] leading-6  
                    ${
                      isDark 
                        ? "bg-gray-800/95 text-white placeholder-gray-400"
                        : "bg-white/95 text-gray-900 placeholder-gray-500"
                    }
                      backdrop-blur-lg
                      border-none outline-none
                      resize-none overflow-hidden
                      transition-all duration-200`}
                    style={{
                      minHeight: '24px',
                      maxHeight: '120px'
                    }}

                    // ${
                    //   isDark 
                    //     ? "bg-gray-700 text-white placeholder-gray-400"
                    //     : "bg-gray-50 text-gray-900 placeholder-gray-500"
                    // }
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={clearInput}
                      className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full
                        ${isDark ? "hover:bg-gray-600 bg-gray-600/70" : "hover:bg-gray-200 bg-gray-200/70"}
                        transition-colors duration-200`}
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </button>
                  )}
                </div>
                
                <button
                  type="submit"
                  className={`p-2 rounded-lg transition-all duration-200 flex-shrink-0
                    font-jakarta font-medium
                    ${
                      isDark
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-blue-500 hover:bg-blue-600 text-white"
                    }
                    ${!query.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'}
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transform active:scale-95`}
                  disabled={!query.trim()}
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className={`px-4 py-2 flex justify-between items-center
          font-outfit text-xs tracking-wide
          ${isDark ? "text-gray-400" : "text-gray-500"}`}
        >
          <div className="flex gap-4">
            <span className="font-medium hidden md:inline">Shift + Enter for new line</span>
            <span className="font-medium hidden md:inline">Enter to send</span>
          </div>
          <div className={`transition-colors font-medium
            ${isNearLimit ? (isDark ? "text-red-400" : "text-red-500") : ""}`}>
            {remainingChars} characters remaining
          </div>
        </div>
      </div>
    </div>
  );
};

const TooltipUp = ({ children, text, position = "center", isDark }) => {
  const positionClasses = {
    left: "-translate-x-0",
    center: "-translate-x-1/2 left-1/2",
    right: "translate-x-0 right-0",
    top: "-translate-x-1/2 left-1/2",
  };

  return (
    <div className="group relative">
      {children}
      <div
        className={`absolute z-10 bottom-full mb-2 ${positionClasses[position]}
          pointer-events-none`}
      >
        <div className={`relative px-2 py-1 
          font-outfit text-xs font-medium tracking-wide whitespace-nowrap opacity-0
          group-hover:opacity-100 transition-opacity duration-200
          shadow-lg transform -translate-y-1 group-hover:translate-y-0 rounded-full
          ${isDark ? "bg-gray-700 text-white" : "bg-gray-800 text-white"}`}
        >
          {text}
          <div className={`absolute w-2 h-2 transform rotate-45
            left-1/2 -translate-x-1/2 translate-y-full bottom-0
            -mb-1 ${isDark ? "bg-gray-700" : "bg-gray-800"}`}
          />
        </div>
      </div>
    </div>
  );
};

export default ControlBar;