import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  MessageSquare,
  Settings,
  ChevronLeft,
  ChevronRight,
  History,
  Moon,
  Sun,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { useStore } from "../../store";
// import { Button } from '../ui/Button';

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const theme = useStore((state) => state.theme);
  const toggleTheme = useStore((state) => state.toggleTheme);
  const userName = useStore((state) => state.userName);

  // Conversation state
  const conversations = useStore((state) => state.conversations);
  const activeConversationId = useStore((state) => state.activeConversationId);
  const createConversation = useStore((state) => state.createConversation);
  const switchConversation = useStore((state) => state.switchConversation);
  const deleteConversation = useStore((state) => state.deleteConversation);

  // Get recent conversations (last 5) - use useMemo to prevent recreating array
  const recentConversations = useMemo(
    () => conversations.slice(-5).reverse(),
    [conversations]
  );

  const menuItems = [
    { icon: MessageSquare, label: "Chat", path: "/app" },
    { icon: History, label: "History", path: "/app/history" },
    { icon: Settings, label: "Settings", path: "/app/settings" },
  ];

  const handleNewChat = () => {
    createConversation();
  };

  const handleSwitchConversation = (id) => {
    switchConversation(id);
  };

  const mobileMenuOpen = useStore((state) => state.mobileMenuOpen);
  const setMobileMenuOpen = useStore((state) => state.setMobileMenuOpen);

  const sidebarVariants = {
    desktop: {
      width: collapsed ? 90 : 280,
      x: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    mobile: {
      width: 280,
      x: mobileMenuOpen ? 0 : -300,
      transition: { duration: 0.3, ease: "circOut" },
    },
  };

  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      setMobileMenuOpen(false);
    }
  };

  const handleDeleteConversation = (e, id) => {
    e.stopPropagation();
    if (conversations.length > 1) {
      deleteConversation(id);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="md:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      <motion.div
        variants={sidebarVariants}
        initial="mobile"
        animate={window.innerWidth >= 768 ? "desktop" : "mobile"}
        className={`
        fixed md:relative inset-y-0 left-0 z-50 
        h-[calc(100vh-2rem)] m-4 
        shrink-0
      `}
      >
        <div className="w-full h-full rounded-3xl bg-white/80 dark:bg-black/80 md:bg-white/40 md:dark:bg-black/40 backdrop-blur-3xl md:backdrop-blur-2xl border border-black/5 dark:border-white/10 flex flex-col overflow-hidden shadow-2xl relative">
          {/* Logo Area */}
          <div className="h-20 flex items-center justify-between px-6 border-b border-black/5 dark:border-white/5 shrink-0">
            <div className="flex items-center">
              <img
                src="/Designer(2).png"
                alt="VoxAI Logo"
                className="w-10 h-10 shrink-0"
              />

              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="ml-4 font-display font-bold text-xl tracking-tight whitespace-nowrap"
                  >
                    VoxAI
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Close Button */}
            <button
              className="md:hidden p-2 -mr-2 text-muted-foreground hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* New Chat Button */}
          {!collapsed && (
            <div className="px-4 pt-4">
              <button
                onClick={handleNewChat}
                className="w-full flex items-center justify-center gap-2 h-10 px-4 rounded-xl bg-primary hover:bg-primary/90 text-white transition-all duration-200 font-medium"
              >
                <Plus className="w-4 h-4" />
                New Chat
              </button>
            </div>
          )}

          {/* Navigation */}
          <div className="flex-1 py-4 px-4 flex flex-col gap-2 overflow-y-auto overflow-x-hidden">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              return (
                <Link key={item.path} to={item.path} onClick={handleLinkClick}>
                  <div
                    className={`
                        flex items-center h-12 px-3 mx-2 my-1 rounded-xl transition-colors duration-200 group relative overflow-hidden
                        ${
                          isActive
                            ? "bg-gradient-to-r from-primary/20 via-primary/10 to-transparent border border-primary/20 text-primary shadow-lg shadow-primary/5"
                            : "text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground"
                        }
                    `}
                    aria-label={item.label}
                    title={item.label}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute left-0 w-1 h-6 bg-primary rounded-full shadow-[0_0_10px_2px_rgba(124,58,237,0.5)]"
                      />
                    )}

                    <Icon
                      className={`w-5 h-5 shrink-0 transition-transform duration-200 ${
                        isActive
                          ? "text-primary scale-110"
                          : "group-hover:scale-110"
                      }`}
                    />

                    {!collapsed && (
                      <span
                        className={`ml-4 font-medium truncate ${
                          isActive ? "text-primary" : ""
                        }`}
                      >
                        {item.label}
                      </span>
                    )}

                    {/* Hover Tooltip for Collapsed Mode
                {collapsed && (
                  <div className="absolute left-16 bg-card border border-border px-3 py-1 rounded-md text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-[60]">
                    {item.label}
                  </div>
                )} */}
                  </div>
                </Link>
              );
            })}

            {/* Recent Conversations */}
            {!collapsed && recentConversations.length > 0 && (
              <div className="mt-4">
                <p className="text-xs text-muted-foreground px-4 mb-2 font-medium">
                  RECENT CHATS
                </p>
                {recentConversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => handleSwitchConversation(conv.id)}
                    className={`flex items-center justify-between h-10 px-4 rounded-xl cursor-pointer transition-all duration-200 group ${
                      conv.id === activeConversationId
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-white/5"
                    }`}
                  >
                    <span className="text-sm truncate flex-1">{conv.name}</span>
                    {conversations.length > 1 && (
                      <button
                        onClick={(e) => handleDeleteConversation(e, conv.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/20 rounded transition-opacity"
                        title="Delete conversation"
                      >
                        <Trash2 className="w-3 h-3 text-red-400" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <div className="px-4 py-2 border-t border-black/5 dark:border-white/5">
            <button
              onClick={toggleTheme}
              className="w-full flex items-center gap-3 h-12 px-4 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-200 group"
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-blue-400" />
              )}
              {!collapsed && (
                <span className="text-sm font-medium">
                  {theme === "dark" ? "Light Mode" : "Dark Mode"}
                </span>
              )}
            </button>
          </div>

          {/* User Profile / Footer - Floating Card Style */}
          <div className="p-4 mt-auto">
            <Link to="/app/settings" onClick={handleLinkClick}>
              <div
                className={`
               relative overflow-hidden group
               flex items-center ${
                 collapsed ? "justify-center p-2" : "gap-3 p-3"
               } 
               rounded-2xl transition-colors duration-300 cursor-pointer
               bg-gradient-to-b from-gray-100/50 to-transparent dark:from-white/5 dark:to-white/0 border border-black/5 dark:border-white/5 hover:border-black/10 dark:hover:border-white/20 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20
             `}
              >
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-[-100%] group-hover:translate-x-[100%]" />

                <div
                  className={`
              relative w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shrink-0 shadow-lg
              bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 ring-2 ring-white/10 group-hover:scale-105 transition-transform duration-300
            `}
                >
                  {userName ? userName.charAt(0).toUpperCase() : "U"}
                  {/* Online indicator */}
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-black rounded-full shadow-md"></div>
                </div>

                {!collapsed && (
                  <div className="flex-1 min-w-0 relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                    <p className="text-sm font-bold truncate text-foreground/90 group-hover:text-primary transition-colors">
                      {userName || "User"}
                    </p>
                    <p className="text-[10px] text-muted-foreground font-medium tracking-wide uppercase">
                      Premium Plan
                    </p>
                  </div>
                )}

                {!collapsed && (
                  <Settings className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" />
                )}
              </div>
            </Link>
          </div>
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden absolute -right-3 top-24 w-6 h-6 z-50 bg-card border border-border rounded-full md:flex items-center justify-center hover:bg-muted transition-colors shadow-sm"
        >
          {collapsed ? (
            <ChevronRight className="w-3 h-3" />
          ) : (
            <ChevronLeft className="w-3 h-3" />
          )}
        </button>
      </motion.div>
    </>
  );
};
