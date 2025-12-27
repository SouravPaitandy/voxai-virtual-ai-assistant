/**
 * Application configuration constants
 */

export const CONFIG = {
  // Message limits
  MAX_MESSAGES: 50,

  // Cache durations (in milliseconds)
  WEATHER_CACHE_DURATION: 5 * 60 * 1000, // 5 minutes

  // Speech recognition
  SPEECH_TIMEOUT: 30000, // 30 seconds

  // API endpoints
  API_URL: import.meta.env.VITE_API_URL || "",
  API_KEY: import.meta.env.VITE_API_KEY || "",

  // Weather API
  WEATHER_API_URL: "https://api.open-meteo.com/v1/forecast",
};

export const KEYBOARD_SHORTCUTS = {
  TOGGLE_LISTENING: { ctrl: true, key: "Space" },
  OPEN_SETTINGS: { ctrl: true, key: "KeyS" },
  CLEAR_SESSION: { ctrl: true, shift: true, key: "KeyC" },
};

export const VOICE_SETTINGS = {
  DEFAULT_LANGUAGE: "en-US",
  PREFERRED_VOICES: ["Google US English", "Microsoft David", "Alex"],
};
