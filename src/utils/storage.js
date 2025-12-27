/**
 * Storage keys constants for localStorage
 * Centralized to avoid typos and inconsistencies
 */

export const STORAGE_KEYS = {
  // Session data
  SESSION: "voxAISession",

  // User preferences
  WELCOME_SEEN: "hasSeenWelcome",
  SELECTED_VOICE: "selectedVoice",
  SETTINGS: "settings",

  // Conversation data
  CONVERSATION_HISTORY: "VoxAISession", // Legacy key, will migrate to SESSION

  // Notes
  NOTES: "voxai-notes",

  // Theme
  THEME: "theme",

  // Font settings
  FONT_SIZE: "fontSize",
  FONT_FAMILY: "fontFamily",
  LINE_HEIGHT: "lineHeight",
};

/**
 * Helper functions for localStorage operations
 */
export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading from localStorage (${key}):`, error);
      return defaultValue;
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing to localStorage (${key}):`, error);
      return false;
    }
  },

  getString: (key, defaultValue = "") => {
    try {
      return localStorage.getItem(key) || defaultValue;
    } catch (error) {
      console.error(`Error reading string from localStorage (${key}):`, error);
      return defaultValue;
    }
  },

  setString: (key, value) => {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.error(`Error writing string to localStorage (${key}):`, error);
      return false;
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing from localStorage (${key}):`, error);
      return false;
    }
  },

  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error("Error clearing localStorage:", error);
      return false;
    }
  },

  /**
   * Migrate old key to new key
   */
  migrate: (oldKey, newKey) => {
    try {
      const value = localStorage.getItem(oldKey);
      if (value) {
        localStorage.setItem(newKey, value);
        localStorage.removeItem(oldKey);
        return true;
      }
      return false;
    } catch (error) {
      console.error(
        `Error migrating localStorage (${oldKey} -> ${newKey}):`,
        error
      );
      return false;
    }
  },
};
