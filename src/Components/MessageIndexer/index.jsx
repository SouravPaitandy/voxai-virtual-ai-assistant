/* eslint-disable react/prop-types */
import { useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MessageIndexer = ({ messages, onMessageClick }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);

  const handleMessageClick = (index) => {
    setActiveIndex(index);
    onMessageClick(index);
  };

  const truncateText = (text, maxLength = 40) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <motion.div
      animate={{ width: isCollapsed ? 60 : 320 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="h-[calc(100vh-8rem)] bg-background/50 backdrop-blur-xl border-l border-white/10 flex flex-col relative transition-colors duration-200"
    >
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-white/5">
        <AnimatePresence>
          {!isCollapsed && (
            <motion.h3
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="font-bold text-sm"
            >
              Message Index
            </motion.h3>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-white/5 rounded-lg transition-colors"
          title={isCollapsed ? "Expand indexer" : "Collapse indexer"}
        >
          {isCollapsed ? (
            <ChevronLeft className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Search - Glassmorphic */}
      {!isCollapsed && (
        <div className="p-4 relative z-10">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
            <input
              type="text"
              placeholder="Search chat history..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/5 border border-primary/50 dark:border-white/10 focus:border-primary/50 focus:bg-white/10 focus:outline-none transition-all duration-300 text-sm placeholder:text-muted-foreground/50 shadow-sm"
            />
          </div>
        </div>
      )}

      {/* Message List - Timeline Style */}
      <div className="flex-1 overflow-y-auto px-4 py-2 relative scrollbar-none">
        {/* Timeline Line */}
        {!isCollapsed && messages.length > 0 && (
          <div className="absolute left-7 top-4 bottom-4 w-0.5 bg-gradient-to-b from-transparent via-white/10 to-transparent z-0 pointer-events-none" />
        )}

        {!isCollapsed ? (
          messages.length === 0 ? (
            <div className="text-center py-12 flex flex-col items-center gap-3 opacity-50">
              <Search className="w-8 h-8 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                No messages found
              </span>
            </div>
          ) : (
            <div className="space-y-4 relative z-10">
              {messages.map((msg, index) => {
                const isActive = activeIndex === index;

                // Filter logic
                if (searchQuery) {
                  const content = msg.content.toLowerCase();
                  const query = searchQuery.toLowerCase();
                  const indexStr = (index + 1).toString();
                  if (!content.includes(query) && !indexStr.includes(query)) {
                    return null;
                  }
                }

                return (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: index * 0.02,
                      duration: 0.2,
                      ease: "easeOut",
                    }}
                    key={msg.id || `msg-${index}`}
                    className="relative pl-8 group"
                  >
                    {/* Timeline Dot */}
                    <div
                      className={`
                            absolute left-1.5 top-3 w-3 h-3 rounded-full border-2 transition-colors duration-200 z-20 bg-background
                            ${
                              isActive
                                ? "border-primary bg-primary shadow-[0_0_10px_2px_rgba(59,130,246,0.3)] scale-110"
                                : "border-muted-foreground/30 group-hover:border-primary/50 group-hover:scale-110"
                            }
                        `}
                    />

                    <button
                      onClick={() => handleMessageClick(index)}
                      className={`
                            w-full text-left p-3 rounded-xl transition-colors duration-200 border backdrop-blur-sm
                            ${
                              isActive
                                ? "bg-primary/10 border-primary/30 shadow-lg shadow-primary/5"
                                : "bg-white/5 border-white/5 hover:border-white/10 hover:bg-white/10 hover:shadow-md"
                            }
                        `}
                    >
                      <div className="flex items-center gap-2 mb-1.5 opacity-70">
                        <span className="text-[10px] font-mono bg-white/5 px-1.5 py-0.5 rounded text-muted-foreground">
                          #{index + 1}
                        </span>
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider ${
                            msg.role === "user"
                              ? "text-blue-400"
                              : "text-purple-400"
                          }`}
                        >
                          {msg.role}
                        </span>
                      </div>

                      <p
                        className={`text-xs leading-relaxed line-clamp-2 ${
                          isActive
                            ? "text-foreground"
                            : "text-muted-foreground group-hover:text-foreground"
                        }`}
                      >
                        {truncateText(msg.content, 60)}
                      </p>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          )
        ) : (
          // Collapsed view - Minimal Timeline
          <div className="flex flex-col items-center gap-2 py-4 relative">
            <div className="absolute top-0 bottom-0 w-0.5 bg-black/10 dark:bg-white/5 z-0" />
            {messages.slice(0, 8).map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-black/20 dark:bg-white/20 z-10 my-1"
              />
            ))}
            {messages.length > 8 && (
              <div className="w-1 h-1 rounded-full bg-black/20 dark:bg-white/10 my-0.5" />
            )}

            <div className="mt-4 z-10 bg-background border border-border rounded-full px-2 py-1 text-[10px] font-bold">
              {messages.length}
            </div>
          </div>
        )}
      </div>

      {/* Stats Footer */}
      {!isCollapsed && messages.length > 0 && (
        <div className="p-3 border-t border-black/10 dark:border-white/5">
          <div className="text-xs text-muted-foreground text-center">
            {messages.filter((m) => m.role === "user").length} user •{" "}
            {messages.filter((m) => m.role === "assistant").length} AI
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default MessageIndexer;
