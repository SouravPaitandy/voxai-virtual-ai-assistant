import { useState, useEffect, useCallback } from "react";
import { useStore } from "../store";

const useSpeechSynthesis = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState([]);

  // Get selected voice from store if available, else default
  // Note: We might need to sync this with the store's selectedVoice
  const selectedVoice = useStore((state) => state.selectedVoice);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const speak = useCallback(
    (text) => {
      if (!text) return;

      // Cancel current speaking
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);

      // Set voice if selected
      if (selectedVoice) {
        const voice = voices.find((v) => v.name === selectedVoice.name);
        if (voice) utterance.voice = voice;
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    },
    [voices, selectedVoice]
  );

  const stopSpeaking = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  return { isSpeaking, speak, stopSpeaking, voices };
};

export default useSpeechSynthesis;
