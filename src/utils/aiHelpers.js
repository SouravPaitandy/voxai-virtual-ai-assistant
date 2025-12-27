import { CONFIG } from "../constants/config";
import { rateLimiter } from "./rateLimiter";

/**
 * Fetches specific answer/response from the Gemini AI
 */
export const getChatbotResponse = async (userMessage, contextMessages = []) => {
  if (!CONFIG.API_KEY) {
    throw new Error("Gemini API Key is missing");
  }

  // Construct context history for the API
  // Note: Gemini API format might differ (e.g. "contents": [{ "role": "user", "parts": [...] }])
  // This is a simplified implementation based on common Gemini REST usage

  const contents = contextMessages.map((msg) => ({
    role: msg.role === "assistant" ? "model" : "user",
    parts: [{ text: msg.content }],
  }));

  // Add current message
  contents.push({
    role: "user",
    parts: [{ text: userMessage }],
  });

  try {
    // Check rate limits before making request
    const limitCheck = rateLimiter.canMakeRequest();
    if (!limitCheck.allowed) {
      throw new Error(limitCheck.reason);
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${CONFIG.API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contents }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Failed to fetch AI response");
    }

    // Extract text from Gemini response structure
    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!aiText) {
      throw new Error("Empty response from AI");
    }

    // Record successful request (estimate ~1000 tokens)
    const estimatedTokens = (userMessage.length + aiText.length) * 0.75;
    rateLimiter.recordRequest(estimatedTokens);

    return aiText;
  } catch (error) {
    console.error("AI API Error:", error);
    throw error;
  }
};

/**
 * Fetches weather info for a city using Open-Meteo
 */
export const getWeatherInfo = async (city) => {
  try {
    // 1. Geocode the city
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      city
    )}&count=1&language=en&format=json`;
    const geoRes = await fetch(geoUrl);
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      throw new Error(`City '${city}' not found.`);
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    // 2. Fetch Weather
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&temperature_unit=celsius`;
    const weatherRes = await fetch(weatherUrl);
    const weatherData = await weatherRes.json();

    if (!weatherData.current) {
      throw new Error("Weather data unavailable");
    }

    const temp = weatherData.current.temperature_2m;
    const code = weatherData.current.weather_code;

    // Map WMO codes to text
    const condition = getWeatherCondition(code);

    return {
      city: name,
      country: country,
      temperature: `${Math.round(temp)}`,
      condition: condition,
    };
  } catch (error) {
    console.error("Weather API Error:", error);
    throw error;
  }
};

// Helper: Open-Meteo WMO code interpretation
const getWeatherCondition = (code) => {
  const codes = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    71: "Slight snow",
    73: "Moderate snow",
    75: "Heavy snow",
    95: "Thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail",
  };
  return codes[code] || "Variable";
};
