import { useCallback, useRef } from "react";
import { CONFIG, ERROR_MESSAGES, INITIAL_MESSAGES } from "../constants";
import { getWeatherInfo } from "../utils/aiHelpers";

/**
 * Custom hook for handling weather requests with caching
 * Refactored to work with Zustand (addMessage callback)
 */
export const useWeather = (addMessage, speak) => {
  const weatherCacheRef = useRef({});
  const WEATHER_CACHE_DURATION = CONFIG.WEATHER_CACHE_DURATION;

  const extractCityFromPrompt = useCallback((prompt) => {
    const lowerPrompt = prompt.toLowerCase();

    // Pattern 1: "weather in [city]"
    let match = lowerPrompt.match(
      /weather\s+(?:in|at|for|of)\s+([a-z\s]+?)(?:\s|$|\?)/i
    );
    if (match) return match[1].trim();

    // Pattern 2: "weather like in [city]"
    match = lowerPrompt.match(
      /weather like\s+(?:in|at|for|of)\s+([a-z\s]+?)(?:\s|$|\?)/i
    );
    if (match) return match[1].trim();

    // Pattern 3: "[city] weather"
    match = lowerPrompt.match(/([a-z\s]+?)\s+weather/i);
    if (match) return match[1].trim();

    // Pattern 4: "what's the weather in [city]"
    match = lowerPrompt.match(
      /what(?:'s|\sis)\s+(?:the\s+)?weather\s+(?:in|at|for)\s+([a-z\s]+?)(?:\s|$|\?)/i
    );
    if (match) return match[1].trim();

    // Pattern 5: "how's the weather in [city]"
    match = lowerPrompt.match(
      /how(?:'s|\sis)\s+(?:the\s+)?weather\s+(?:in|at|for)\s+([a-z\s]+?)(?:\s|$|\?)/i
    );
    if (match) return match[1].trim();

    return null;
  }, []);

  const handleWeatherRequest = useCallback(
    async (processedTranscript) => {
      // Note: User message should be added by the caller before calling this

      try {
        const cityName = extractCityFromPrompt(processedTranscript);

        if (!cityName) {
          const errorMsg = ERROR_MESSAGES.CITY_NOT_FOUND;
          addMessage({ role: "assistant", content: errorMsg });
          speak(errorMsg);
          return;
        }

        // Check cache first
        const cacheKey = cityName.toLowerCase();
        const cachedData = weatherCacheRef.current[cacheKey];
        const now = Date.now();

        if (cachedData && now - cachedData.timestamp < WEATHER_CACHE_DURATION) {
          const response = INITIAL_MESSAGES.WEATHER_CACHED(
            cityName,
            cachedData.weather.condition,
            cachedData.weather.temperature
          );

          addMessage({
            role: "assistant",
            content: response,
          });
          speak(response);
          return;
        }

        // Fetch fresh weather data
        const weather = await getWeatherInfo(cityName);

        // Cache the result
        weatherCacheRef.current[cacheKey] = {
          weather,
          timestamp: now,
        };

        const response = INITIAL_MESSAGES.WEATHER_RESPONSE(
          cityName,
          weather.condition,
          weather.temperature
        );

        addMessage({
          role: "assistant",
          content: response,
        });
        speak(response);
      } catch (error) {
        const errorMsg = error.message.includes("not found")
          ? ERROR_MESSAGES.WEATHER_FETCH_ERROR
          : ERROR_MESSAGES.WEATHER_GENERIC_ERROR;

        addMessage({ role: "assistant", content: errorMsg });
        speak(errorMsg);
      }
    },
    [extractCityFromPrompt, addMessage, speak]
  );

  return {
    handleWeatherRequest,
    extractCityFromPrompt,
  };
};
