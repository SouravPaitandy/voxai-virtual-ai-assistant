import axios from 'axios';
import { fetchWeatherApi } from 'openmeteo';

const API_URL = import.meta.env.VITE_API_URL
// console.log(API_URL);
export const getChatbotResponse = async (message) => {
  try {
    const response = await axios.post(API_URL, {
      contents: [{
        parts: [{
          text: message
        }]
      }]
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(response.data.candidates[0].content);
    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error calling chatbot API:', error);
    return 'Sorry, I encountered an error while processing your request.';
  }
};

// export const speak = (text, voice, onEnd) => {
//   window.speechSynthesis.cancel();
//   const utterance = new SpeechSynthesisUtterance(text);
//   if (voice) utterance.voice = voice;
//   utterance.onend = onEnd;
//   window.speechSynthesis.speak(utterance);
// };

export const speak = (text, voice, selectedVoicePitch, selectedVoiceRate, selectedVoiceVolume, onComplete) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = voice;
  // Check if the selectedVoicePitch is finite before setting it
  if (isFinite(selectedVoicePitch)) {
    utterance.pitch = selectedVoicePitch;
  }
  if (isFinite(selectedVoiceRate)) {
    // utterance.pitch = selectedVoicePitch;
    utterance.rate = selectedVoiceRate;
  }
  if (isFinite(selectedVoiceVolume)) {
    // utterance.pitch = selectedVoicePitch;
    utterance.volume = selectedVoiceVolume;
  }

  // Handle markdown formatting for speech
  utterance.text = text.replace(/^\s*#\s*(.*?)\s*$/gm, (match, content) => `${content}`); // # Heading
  utterance.text = utterance.text.replace(/^\s*##\s*(.*?)\s*$/gm, (match, content) => `${content}`); // ## Heading
  utterance.text = utterance.text.replace(/^\s*\*\*\*(.*?)\*\*\*\s*$/gm, (match, content) => `${content}`); // ***Emphasized***
  utterance.text = utterance.text.replace(/^\s*\*\s*(.*?)\s*\*\s*$/gm, (match, content) => `${content}`); // *Emphasized*
  utterance.text = utterance.text.replace(/^\s*\*\*(.*?)\*\*\s*$/gm, (match, content) => `${content}`); // **Bold**

  window.speechSynthesis.speak(utterance);
  utterance.onend = onComplete;
};

export const formatMessage = (message) => {
  message = message.replace(/^\s*##\s*(.*?)\s*$/gm, (match, content) => `<h3>${content}</h3>`); // ## Heading
  message = message.replace(/^\s*#\s*(.*?)\s*.\s*$/gm, (match, content) => `<h4>${content}</h4>`); // # Heading
  message = message.replace(/\*\*\*(.*?)\*\*\*/g, (match, content) => `<b><i>${content}</i></b>`); // ***Emphasized***
  message = message.replace(/\*\*(.*?)\*\*/g, (match, content) => `<b>${content}</b>`); // **Bold**
  message = message.replace(/\*(.*?)\*/g, (match, content) => `<i>${content}</i>`); // *Emphasized*
  message = message.replace(/\[(.*?)\]\((.*?)\)/g, (match, content, link) => `<a href="${link}" target="_blank">${content}</a>`); // [Link](URL)
  return message;
};
	

export const getWeatherInfo = async (cityName='London') => {
  if (!cityName) {
    throw new Error("City name is required");
  }

  // First, get coordinates from city name using the geocoding API
  const geocodingUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`;
  
  try {
    const geoResponse = await fetch(geocodingUrl);
    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      throw new Error(`City "${cityName}" not found`);
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    // Now get weather using these coordinates
    const params = {
      latitude,
      longitude,
      current: ["temperature_2m", "weather_code"]
    };
    
    const weatherUrl = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(weatherUrl, params);
    
    const response = responses[0];
    const current = response.current();
    
    // Convert weather code to condition description
    const getWeatherCondition = (code) => {
      const conditions = {
        0: 'Clear sky',
        1: 'Mainly clear',
        2: 'Partly cloudy',
        3: 'Overcast',
        45: 'Foggy',
        48: 'Depositing rime fog',
        51: 'Light drizzle',
        53: 'Moderate drizzle',
        55: 'Dense drizzle',
        61: 'Slight rain',
        63: 'Moderate rain',
        65: 'Heavy rain',
        71: 'Slight snow fall',
        73: 'Moderate snow fall',
        75: 'Heavy snow fall',
        77: 'Snow grains',
        80: 'Slight rain showers',
        81: 'Moderate rain showers',
        82: 'Violent rain showers',
        85: 'Slight snow showers',
        86: 'Heavy snow showers',
        95: 'Thunderstorm',
        96: 'Thunderstorm with slight hail',
        99: 'Thunderstorm with heavy hail'
      };
      return conditions[code] || 'Unknown';
    };

    const weatherData = {
      location: {
        city: name,
        country: country,
        coordinates: { latitude, longitude }
      },
      temperature: Number(current.variables(0).value().toFixed(2)), // Format to 2 decimal places
      weatherCode: current.variables(1).value(),
      condition: getWeatherCondition(current.variables(1).value())
    };

    return weatherData;

  } catch (error) {
    throw new Error(`Failed to get weather data: ${error.message}`);
  }
};