/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { useTheme } from './ThemeContext';

const ConversationHistory = ({ apiMessages, typingWords, currentWordIndex }) => {
  const messagesEndRef = useRef(null);
  const { isDark } = useTheme();
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [apiMessages, typingWords]);

  return (
    <div className={`z-0 glassmorphism flex-1 min-w-[300px] lg:min-w-[500px] ${isDark ? 'text-white' : 'text-gray-900'}`}>
      <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>Conversation History</h2>
      <div className="space-y-4 overflow-y-auto h-[250px] pr-2 rounded-lg scrollbar-style">
        {apiMessages.map((msg, index) => (
          <div key={index} className={`${isDark ? 'bg-gray-700 bg-opacity-30' : 'bg-white bg-opacity-70'} backdrop-filter backdrop-blur-sm rounded-lg p-4 transition duration-300 ease-in-out hover:bg-opacity-50 border ${isDark ? 'border-gray-600' : 'border-gray-300'} shadow-lg`}>
            <ReactMarkdown className={`text-sm prose ${isDark ? 'prose-invert' : ''} max-w-none`}>
              {msg}
            </ReactMarkdown>
          </div>
        ))}
        {typingWords.length > 0 && (
          <div className="bg-gray-700 bg-opacity-30 backdrop-filter backdrop-blur-sm rounded-lg p-4 transition duration-300 ease-in-out hover:bg-opacity-50 border border-gray-600 shadow-lg">
            <p className="text-sm prose prose-invert max-w-none">
            {typingWords.slice(0, currentWordIndex + 1).join(' ')}
            <span className="animate-pulse">|</span>
            </p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ConversationHistory;