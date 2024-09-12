import axios from 'axios';

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
    
    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error calling chatbot API:', error);
    return 'Sorry, I encountered an error while processing your request.';
  }
};

export const speak = (text, voice, onEnd) => {
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  if (voice) utterance.voice = voice;
  utterance.onend = onEnd;
  window.speechSynthesis.speak(utterance);
};

export const formatMessage = (message) => {
  // Convert # to proper heading levels
  message = message.replace(/^(#{1,6})\s/gm, (match, p1) => `${'#'.repeat(p1.length)} `);
  
  // Convert *text* to **text** for bold
  message = message.replace(/\*(\w+)\*/g, '**$1**');
  
  return message;
};