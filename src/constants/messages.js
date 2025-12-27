/**
 * User-facing messages and error messages
 */

export const ERROR_MESSAGES = {
  // Weather errors
  CITY_NOT_FOUND:
    "I couldn't identify the city name. Please try asking like 'What's the weather in London?' or 'How's the weather in New York?'",
  WEATHER_FETCH_ERROR:
    "I couldn't find weather information for that city. Please check the city name and try again.",
  WEATHER_GENERIC_ERROR:
    "I encountered an error while fetching the weather. Please try again later.",

  // General errors
  GENERIC_ERROR: "I apologize, but I encountered an error. Please try again.",
  NETWORK_ERROR: "Network error. Please check your connection and try again.",

  // Voice errors
  MICROPHONE_ERROR:
    "Microphone access denied. Please enable microphone permissions.",
  SPEECH_RECOGNITION_ERROR:
    "Speech recognition is not supported in your browser.",
  SPEECH_TIMEOUT: "Speech recognition timed out. Please try again.",
};

export const SUCCESS_MESSAGES = {
  SESSION_CLEARED: "Session cleared successfully!",
  SETTINGS_SAVED: "Settings saved successfully!",
  DATA_EXPORTED: "Data exported successfully!",
  DATA_IMPORTED: "Data imported successfully! Reloading...",
};

export const INITIAL_MESSAGES = {
  WELCOME: (name) =>
    `Hello ${name}! I'm VoxAI, your voice-activated AI assistant. How can I help you today?`,
  WEATHER_RESPONSE: (city, condition, temp) =>
    `The current weather in ${city} is ${condition} with a temperature of ${temp}°C.`,
  WEATHER_CACHED: (city, condition, temp) =>
    `The current weather in ${city} is ${condition} with a temperature of ${temp}°C. (Cached data)`,
};

export const NOTIFICATION_MESSAGES = {
  NEW_RESPONSE: "New response from VoxAI",
};

export const CONFIRMATION_MESSAGES = {
  CLEAR_SESSION: "Do you really want to remove?",
  DELETE_NOTE: "Are you sure you want to delete this note?",
};
