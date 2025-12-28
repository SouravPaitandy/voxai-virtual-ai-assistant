import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "./toastStore";

/**
 * Centralized Zustand store for VoxAI application
 * Now supports multi-conversation system
 */
export const useStore = create(
  persist(
    (set, get) => ({
      // ========================================
      // Theme State
      // ========================================
      theme: "dark", // Default to dark theme
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        })),
      setTheme: (theme) => set({ theme }),

      // ========================================
      // Settings State
      // ========================================
      settings: {
        fontSize: 16,
        fontFamily: "System-ui",
        lineHeight: 1.5,
        autoSave: true,
        notifications: false,
        autoSubmitVoice: false,
        ttsEngine: "elevenlabs", // 'elevenlabs' or 'browser'
        elevenLabsVoice: "EXAVITQu4vr4xnSDxMaL", // Rachel voice
      },
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
      resetSettings: () =>
        set({
          settings: {
            fontSize: 16,
            fontFamily: "System-ui",
            lineHeight: 1.5,
            autoSave: true,
            notifications: false,
            autoSubmitVoice: false,
            ttsEngine: "elevenlabs",
            elevenLabsVoice: "EXAVITQu4vr4xnSDxMaL",
          },
        }),

      // ========================================
      // Voice State
      // ========================================
      selectedVoice: null,
      setSelectedVoice: (voice) => set({ selectedVoice: voice }),

      // ========================================
      // UI State
      // ========================================
      showSettings: false,
      setShowSettings: (show) => set({ showSettings: show }),
      toggleSettings: () =>
        set((state) => ({ showSettings: !state.showSettings })),

      showSidebar: false,
      setShowSidebar: (show) => set({ showSidebar: show }),
      toggleSidebar: () =>
        set((state) => ({ showSidebar: !state.showSidebar })),

      showWhatsNew: false,
      setShowWhatsNew: (show) => set({ showWhatsNew: show }),
      toggleWhatsNew: () =>
        set((state) => ({ showWhatsNew: !state.showWhatsNew })),

      mobileMenuOpen: false,
      setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
      toggleMobileMenu: () =>
        set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),

      // ========================================
      // Multi-Conversation State
      // ========================================
      conversations: [],
      activeConversationId: null,
      maxConversations: 5,

      // Create new conversation
      createConversation: () => {
        const state = get();

        // Check limit
        if (state.conversations.length >= state.maxConversations) {
          toast({
            title: "Limit Reached",
            description: `You've reached the maximum of ${state.maxConversations} conversations. Please delete some to create new ones.`,
            variant: "warning",
          });
          return null;
        }

        const id = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const newConversation = {
          id: `conv_${id}`,
          name: `Conversation ${id.substr(0, 10)}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          messages: [],
          messageCount: 0,
        };

        set((state) => ({
          conversations: [...state.conversations, newConversation],
          activeConversationId: newConversation.id,
        }));

        return newConversation.id;
      },

      // Delete conversation
      deleteConversation: (id) => {
        const state = get();
        const filtered = state.conversations.filter((c) => c.id !== id);

        // If deleting active conversation, switch to first available
        let newActiveId = state.activeConversationId;
        if (state.activeConversationId === id) {
          newActiveId = filtered.length > 0 ? filtered[0].id : null;
        }

        set({
          conversations: filtered,
          activeConversationId: newActiveId,
        });
      },

      // Rename conversation
      renameConversation: (id, newName) => {
        set((state) => ({
          conversations: state.conversations.map((c) =>
            c.id === id
              ? { ...c, name: newName, updatedAt: new Date().toISOString() }
              : c
          ),
        }));
      },

      // Switch active conversation
      switchConversation: (id) => {
        set({ activeConversationId: id });
      },

      // Add message to active conversation
      addMessage: (message) => {
        const state = get();
        const activeId = state.activeConversationId;

        if (!activeId) {
          console.warn("No active conversation");
          return;
        }

        set((state) => ({
          conversations: state.conversations.map((c) =>
            c.id === activeId
              ? {
                  ...c,
                  messages: [
                    ...c.messages,
                    { ...message, id: `msg_${Date.now()}` },
                  ],
                  messageCount: c.messageCount + 1,
                  updatedAt: new Date().toISOString(),
                }
              : c
          ),
        }));
      },

      // Clear messages in active conversation
      clearMessages: () => {
        const state = get();
        const activeId = state.activeConversationId;

        if (!activeId) return;

        set((state) => ({
          conversations: state.conversations.map((c) =>
            c.id === activeId
              ? {
                  ...c,
                  messages: [],
                  messageCount: 0,
                  updatedAt: new Date().toISOString(),
                }
              : c
          ),
        }));
      },

      // Get active conversation messages (helper)
      getActiveMessages: () => {
        const state = get();
        const activeConv = state.conversations.find(
          (c) => c.id === state.activeConversationId
        );
        return activeConv ? activeConv.messages : [];
      },

      // ========================================
      // User State
      // ========================================
      userName: "",
      setUserName: (name) => set({ userName: name }),

      isInitialized: false,
      setIsInitialized: (initialized) => set({ isInitialized: initialized }),
    }),
    {
      name: "voxai-storage",
      // Only persist specific parts of the state
      partialize: (state) => ({
        theme: state.theme,
        settings: state.settings,
        selectedVoice: state.selectedVoice,
        userName: state.userName,
        conversations: state.conversations,
        activeConversationId: state.activeConversationId,
      }),
      // Initialize with first conversation if none exist
      onRehydrateStorage: () => (state) => {
        if (state && state.conversations.length === 0) {
          const firstConversation = {
            id: `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            name: "Conversation 1",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            messages: [],
            messageCount: 0,
          };
          state.conversations = [firstConversation];
          state.activeConversationId = firstConversation.id;
        }
      },
    }
  )
);

// Selectors for better performance
export const useTheme = () => useStore((state) => state.theme);
export const useThemeActions = () =>
  useStore((state) => ({
    toggleTheme: state.toggleTheme,
    setTheme: state.setTheme,
  }));

export const useSettings = () => useStore((state) => state.settings);
export const useSettingsActions = () =>
  useStore((state) => ({
    updateSettings: state.updateSettings,
    resetSettings: state.resetSettings,
  }));

export const useVoice = () => useStore((state) => state.selectedVoice);
export const useVoiceActions = () =>
  useStore((state) => ({
    setSelectedVoice: state.setSelectedVoice,
  }));

export const useUIState = () =>
  useStore((state) => ({
    showSettings: state.showSettings,
    showSidebar: state.showSidebar,
    showWhatsNew: state.showWhatsNew,
  }));

export const useUIActions = () =>
  useStore((state) => ({
    setShowSettings: state.setShowSettings,
    toggleSettings: state.toggleSettings,
    setShowSidebar: state.setShowSidebar,
    toggleSidebar: state.toggleSidebar,
    setShowWhatsNew: state.setShowWhatsNew,
    toggleWhatsNew: state.toggleWhatsNew,
    mobileMenuOpen: state.mobileMenuOpen,
    setMobileMenuOpen: state.setMobileMenuOpen,
    toggleMobileMenu: state.toggleMobileMenu,
  }));

// Conversation selectors
export const useConversations = () => useStore((state) => state.conversations);
export const useActiveConversationId = () =>
  useStore((state) => state.activeConversationId);
export const useActiveConversation = () =>
  useStore((state) =>
    state.conversations.find((c) => c.id === state.activeConversationId)
  );
export const useActiveMessages = () => {
  const activeConv = useActiveConversation();
  return activeConv ? activeConv.messages : [];
};

export const useConversationActions = () =>
  useStore((state) => ({
    createConversation: state.createConversation,
    deleteConversation: state.deleteConversation,
    renameConversation: state.renameConversation,
    switchConversation: state.switchConversation,
    addMessage: state.addMessage,
    clearMessages: state.clearMessages,
  }));

export const useUser = () =>
  useStore((state) => ({
    userName: state.userName,
    isInitialized: state.isInitialized,
  }));

export const useUserActions = () =>
  useStore((state) => ({
    setUserName: state.setUserName,
    setIsInitialized: state.setIsInitialized,
  }));
