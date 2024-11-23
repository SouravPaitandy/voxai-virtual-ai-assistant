/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { MessageCircle, Copy, Share, MoreHorizontal, CheckCheckIcon } from "lucide-react";
import useSettingsStore from "../SettingsStore";
import ReactMarkdown from 'react-markdown';
import { MessageCategories, categorizeMessage } from './MessageCategories';
import './Components.css'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const MainContent = ({ isDark, apiMessages }) => {
  const { fontSize, lineHeight, fontFamily } = useSettingsStore();
  const messagesEndRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredMessage, setHoveredMessage] = useState(null);
  const [copied, setCopied] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [apiMessages]);

  const formatMessage = (message) => {
    return message.replace(/^You:\s*/, '').trim();
  };

  const isUserMessage = (message) => message.startsWith('You:');

  const filteredMessages = activeFilter === 'all' 
    ? apiMessages 
    : apiMessages.filter(msg => categorizeMessage(msg).id === activeFilter);

  const copyMessage = (message) => {
    navigator.clipboard.writeText(formatMessage(message));
    // Could add a toast notification here
  };

  // Improved custom renderers for better code block handling
  const customRenderers = {
    code({ inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      const language = match ? match[1] : '';
      const value = String(children).replace(/\n$/, '');
      
      if (!inline) {
        return (
          <div className="relative group my-4">
            <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(value);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className={`p-1.5 rounded-lg ${
                  isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                } transition-colors duration-200`}
                title="Copy code"
              >
                {copied ? (
                  <CheckCheckIcon className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
            <div className={`rounded-lg overflow-hidden border ${
              isDark ? 'border-gray-700' : 'border-gray-200'
            }`}>
              {language && (
                <div className={`px-4 py-1.5 text-xs font-mono border-b ${
                  isDark 
                    ? 'bg-gray-800 text-gray-400 border-gray-700' 
                    : 'bg-gray-100 text-gray-600 border-gray-200'
                }`}>
                  {language.toUpperCase()}
                </div>
              )}
              <SyntaxHighlighter
                language={language || 'text'}
                style={isDark ? oneDark : oneLight}
                customStyle={{
                  margin: 0,
                  padding: '1rem',
                  fontSize: '0.875rem',
                  lineHeight: '1.6',
                  backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
                }}
                showLineNumbers={true}
                wrapLines={true}
                wrapLongLines={true}
              >
                {value}
              </SyntaxHighlighter>
            </div>
          </div>
        );
      }

      // For inline code
      return (
        <code
          className={`px-1.5 py-0.5 rounded font-mono text-sm ${
            isDark 
              ? 'bg-gray-800 text-gray-200' 
              : 'bg-gray-100 text-gray-800'
          }`}
          {...props}
        >
          {value}
        </code>
      );
    }
  };

  // Calculate recent topics from messages using MessageCategories
  // const calculateRecentTopics = () => {
  //   const topicsMap = new Map();
    
  //   // Process messages in reverse to get most recent first
  //   [...apiMessages].reverse().forEach(message => {
  //     const category = categorizeMessage(message);
  //     if (category && category.id !== 'all') {
  //       // Store category with timestamp to track recency
  //       topicsMap.set(category.id, {
  //         id: category.id,
  //         label: category.label,
  //         icon: category.icon,
  //         timestamp: new Date()
  //       });
  //     }
  //   });

  //   // Convert map to array and take the 5 most recent unique topics
  //   return Array.from(topicsMap.values())
  //     .slice(0, 5)
  //     .map(topic => ({
  //       id: topic.id,
  //       label: topic.label,
  //       icon: topic.icon
  //     }));
  // };

  // Render recent topics section
  // const renderRecentTopics = () => {
  //   const recentTopics = calculateRecentTopics();
    
  //   if (recentTopics.length === 0) return null;

  //   return (
  //     <div className={`mb-6 p-4 rounded-lg ${
  //       isDark ? 'bg-gray-800' : 'bg-gray-100'
  //     }`}>
  //       <h3 className={`text-sm font-medium mb-2 ${
  //         isDark ? 'text-gray-300' : 'text-gray-600'
  //       }`}>
  //         Recent Conversation Topics
  //       </h3>
  //       <div className="flex flex-wrap gap-2">
  //         {recentTopics.map((topic, index) => (
  //           <div
  //             key={index}
  //             className={`px-3 py-1 rounded-full text-xs font-medium 
  //               ${isDark 
  //                 ? 'bg-gray-700 text-gray-300' 
  //                 : 'bg-gray-200 text-gray-600'
  //               } flex items-center gap-1 cursor-pointer hover:opacity-80`}
  //             onClick={() => setActiveFilter(topic.id)}
  //           >
  //             <span>{topic.icon}</span>
  //             <span>{topic.label}</span>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   );
  // };

  // Update message context to use MessageCategories
  // const getMessageContext = (message) => {
  //   const category = categorizeMessage(message);
  //   return category.id !== 'all' ? category : null;
  // };

  return (
    <main className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8 pt-16 md:pt-20 pb-48 md:pb-40">
      <div
        className="p-3 sm:p-10 md:p-10 rounded-lg shadow-lg w-full md:max-w-[85%] lg:max-w-[75%] mx-auto"
        style={{
          fontSize: `${Math.max(12, Math.min(fontSize, 24))}px`,
          lineHeight: lineHeight,
          fontFamily: fontFamily,
        }}
      >
        {/* Recent Topics Section */}
        {/* {renderRecentTopics()} */}

        {/* Category Filter */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2 hide-scrollbar">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
              ${activeFilter === 'all'
                ? 'bg-blue-500 text-white'
                : `${isDark ? "bg-gray-800 text-gray-300" : "text-gray-600 bg-gray-200"}`
              }`}
          >
            All
          </button>
          {Object.values(MessageCategories).map(category => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
                flex items-center gap-1 whitespace-nowrap
                ${activeFilter === category.id
                  ? 'bg-blue-500 text-white'
                  : `${isDark ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-600"}`
                }`}
            >
              <span>{category.icon}</span>
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        <div className="flex flex-col space-y-4 md:space-y-6">
          {filteredMessages.map((message, index) => {
            const isUser = isUserMessage(message);
            const category = categorizeMessage(message);
            // const messageContext = getMessageContext(message);
            
            return (
              <div
                key={index}
                className={`flex items-start space-x-2 sm:space-x-3 md:space-x-4 
                  ${isUser ? "justify-end fade-in" : "fade-out"}
                  animate-fade-in`}
                onMouseEnter={() => setHoveredMessage(index)}
                onMouseLeave={() => setHoveredMessage(null)}
              >
                {/* Assistant Avatar */}
                {!isUser && (
                  <div className={`shrink-0 rounded-full w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 
                    flex items-center justify-center transition-colors
                    ${isDark ? "bg-blue-500" : "bg-blue-200"}`}
                  >
                    <MessageCircle
                      size={16}
                      className={`sm:w-5 sm:h-5 md:w-6 md:h-6
                        ${isDark ? "text-white" : "text-blue-600"}`}
                    />
                  </div>
                )}

                {/* Message Content */}
                <div
                  className={`relative group max-w-[85%] sm:max-w-[80%] p-3 sm:p-4 
                    rounded-lg shadow-md break-words
                    ${isUser
                      ? "bg-blue-500 text-white"
                      : category.bgClass
                    }`}
                >
                  {/* Category Badge */}
                  {!isUser && (
                    <div className={`absolute -top-2 left-4 px-2 py-0.5 rounded-full text-xs 
                      font-medium border flex items-center gap-1 shadow-sm 
                      ${isDark ? "bg-gray-800 text-gray-300 border-gray-700" : "bg-white text-gray-600 border-gray-200"}`}>
                      <span>{category.icon}</span>
                      <span>{category.label}</span>
                    </div>
                  )}

                  <ReactMarkdown
                    components={customRenderers}
                    className={`prose prose-sm sm:prose max-w-none 
                      prose-p:leading-normal prose-pre:my-0 prose-pre:p
                      ${isDark ? "prose-invert prose-pre:bg-transparent" : "prose-pre:bg-transparent"}`}
                  >
                    {formatMessage(message)}
                  </ReactMarkdown>

                  {/* Message Actions */}
                  {hoveredMessage === index && (
                    <div className={`absolute right-2 top-2 flex items-center gap-1 
                      ${isDark ? "bg-gray-800" : "bg-white"} rounded-full shadow-md px-1`}>
                      <button
                        onClick={() => copyMessage(message)}
                        className={`p-1 rounded-full ${isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"}
                          ${isDark ? "text-gray-400" : "text-gray-500"} text-gray-500`}
                        title="Copy message"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      {/* <button
                        className={`p-1 rounded-full ${isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"}
                          ${isDark ? "text-gray-400" : "text-gray-500"} text-gray-500`}
                        title="Share message"
                      >
                        <Share className="w-4 h-4" />
                      </button> */}
                      {/* <button
                        className={`p-1 rounded-full ${isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"}
                          ${isDark ? "text-gray-400" : "text-gray-500"} text-gray-500`}
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button> */}
                    </div>
                  )}

                  {/* Timestamp
                  <div className="absolute -bottom-5 right-0 opacity-0 group-hover:opacity-100 
                    transition-opacity duration-200">
                    <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
                      {new Date().toLocaleTimeString()}
                    </span>
                  </div> */}
                </div>

                {/* User Avatar */}
                {isUser && (
                  <div className={`shrink-0 rounded-full w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 
                    flex items-center justify-center transition-colors
                    ${isDark ? "bg-gray-700" : "bg-gray-200"}`}
                  >
                    <span className="text-xs sm:text-sm font-semibold">You</span>
                  </div>
                )}
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Empty State */}
        {apiMessages.length === 0 && (
          <div className="text-center py-8">
            <p className={`text-sm sm:text-base ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}>
              Start a conversation by typing a message or using voice input.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default MainContent;