/* eslint-disable react/prop-types */
import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, User, Copy, ArrowDown } from "lucide-react";
import { useStore } from "../../store";
import MessageIndexer from "../../Components/MessageIndexer";
import { MarkdownRenderer } from "../../Components/ui/MarkdownRenderer";

export const ChatInterface = ({ messages, isTyping, onQuickPrompt }) => {
  const messagesEndRef = useRef(null);
  const messageRefs = useRef({});
  const chatContainerRef = useRef(null);
  const userName = useStore((state) => state.userName);
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Check scroll position to show/hide scroll button
  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        chatContainerRef.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShowScrollButton(!isNearBottom && messages.length > 0);
    }
  };

  // Scroll to bottom function
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Handle scroll to specific message from indexer
  const handleScrollToMessage = (index) => {
    console.log("Attempting to scroll to index:", index);
    console.log("Available refs:", Object.keys(messageRefs.current));
    console.log("Ref at index:", messageRefs.current[index]);

    const messageElement = messageRefs.current[index];
    if (messageElement) {
      // Scroll to message
      messageElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });

      // Highlight effect
      messageElement.classList.add(
        "ring-2",
        "ring-primary/50",
        "transition-all"
      );
      setTimeout(() => {
        messageElement.classList.remove(
          "ring-2",
          "ring-primary/50",
          "transition-all"
        );
      }, 2000);
    } else {
      console.warn(
        `Message ref not found for index ${index}`,
        messageRefs.current
      );
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  // Quick suggestion prompts
  const quickPrompts = [
    "What can you help me with?",
    "Tell me a joke",
    "What's the weather like?",
    "Help me brainstorm ideas",
  ];

  return (
    <div className="flex flex-1 overflow-hidden relative">
      {/* Main Chat Area */}
      <div
        ref={chatContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-4 py-8 space-y-8 pb-32 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
      >
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center p-8 min-h-[500px] space-y-8">
            <div className="text-center space-y-4">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-primary/20 to-purple-500/20 flex items-center justify-center mb-6 animate-float mx-auto">
                <Bot className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-2xl font-bold font-display">
                {userName ? `Hey ${userName}!` : "How can I help you today?"}
              </h3>
              <p className="text-muted-foreground">
                Try asking me anything or use one of these quick prompts:
              </p>
            </div>

            {/* Quick Prompts - Floating Glass Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl w-full px-4">
              {quickPrompts.map((prompt, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.05,
                    duration: 0.2,
                    ease: "easeOut",
                  }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onQuickPrompt?.(prompt)}
                  className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-white/10 hover:shadow-lg hover:shadow-primary/5 transition-colors duration-200 text-left group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <p className="text-sm font-medium group-hover:text-primary transition-colors relative z-10">
                    {prompt}
                  </p>
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        <AnimatePresence mode="popLayout">
          {messages.map((message, index) => {
            const isUser = message.role === "user";
            const messageKey = message.id || `msg-${index}`;

            return (
              <motion.div
                key={messageKey}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={`flex gap-4 mb-4 ${
                  isUser ? "justify-end" : "justify-start"
                } group`}
              >
                {!isUser && (
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-sm mt-1">
                    <Bot className="w-5 h-5 text-primary" />
                  </div>
                )}

                <div
                  ref={(el) => {
                    if (el) messageRefs.current[index] = el;
                  }}
                  className={`relative shadow-sm overflow-hidden ${
                    isUser
                      ? "max-w-[85%] md:max-w-[75%] rounded-3xl p-4 md:p-5 bg-gradient-to-br from-primary to-violet-600 text-white rounded-br-none"
                      : "w-full md:w-auto md:max-w-[75%] p-0 md:p-5 md:rounded-3xl md:bg-white/5 md:backdrop-blur-md md:border md:border-white/10 text-foreground md:rounded-bl-none hover:border-primary/20 transition-colors"
                  }`}
                >
                  {/* Subtle noise texture or gradient overlay for user messages */}
                  {isUser && (
                    <div className="absolute inset-0 bg-white/5 opacity-20 pointer-events-none" />
                  )}

                  <div className="flex items-start justify-between gap-4 relative z-10">
                    {isUser ? (
                      <p className="text-[15px] leading-relaxed whitespace-pre-wrap font-medium">
                        {message.content}
                      </p>
                    ) : (
                      <MarkdownRenderer content={message.content} />
                    )}
                  </div>

                  {/* Actions for AI messages */}
                  {!isUser && (
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        onClick={() => copyToClipboard(message.content)}
                        className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-muted-foreground hover:text-primary"
                        title="Copy message"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 flex items-center justify-center shrink-0 text-white font-bold shadow-md mt-1 ring-2 ring-white/10">
                    {userName ? (
                      userName.charAt(0).toUpperCase()
                    ) : (
                      <User className="w-5 h-5" />
                    )}
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="flex gap-4 pl-0"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center shrink-0">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl rounded-bl-none p-4 shadow-sm inline-flex items-center">
              <div className="flex gap-1.5">
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                  className="w-2 h-2 rounded-full bg-primary"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                  className="w-2 h-2 rounded-full bg-primary"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                  className="w-2 h-2 rounded-full bg-primary"
                />
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Scroll to Bottom Button */}
      <AnimatePresence>
        {showScrollButton && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToBottom}
            className="absolute bottom-36 left-1/2 -translate-x-1/2 z-10 border border-primary/30 hover:border-primary bg-transparent backdrop-blur-sm hover:bg-primary/30 text-primary dark:text-white p-3 rounded-full shadow-lg transition-all duration-200 flex items-center gap-2"
            title="Scroll to bottom"
          >
            <ArrowDown className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Message Indexer - Right Side Panel - Hidden on Mobile */}
      <div className="hidden md:block h-full">
        <MessageIndexer
          messages={messages}
          onMessageClick={handleScrollToMessage}
        />
      </div>
    </div>
  );
};
