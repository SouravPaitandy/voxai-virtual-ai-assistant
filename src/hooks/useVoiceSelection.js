import { useState, useEffect, useCallback } from "react";
import { STORAGE_KEYS, storage } from "../utils/storage";

/**
 * Custom hook for managing voice selection with proper persistence
 * Fixes voice selection persistence issues
 */
const useVoiceSelection = () => {
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isVoicesLoaded, setIsVoicesLoaded] = useState(false);

  // Load voices with retry logic
  const loadVoices = useCallback(() => {
    const availableVoices = window.speechSynthesis.getVoices();

    if (availableVoices.length === 0) {
      return false; // Voices not loaded yet
    }

    const englishVoices = availableVoices.filter((voice) =>
      voice.lang.startsWith("en-")
    );

    setVoices(englishVoices);
    setIsVoicesLoaded(true);

    // Load saved voice from localStorage
    const savedVoiceData = storage.get(STORAGE_KEYS.SELECTED_VOICE);

    if (savedVoiceData) {
      const { voiceURI, name } = savedVoiceData;

      // Try to find by voiceURI first (most reliable)
      let voice = englishVoices.find((v) => v.voiceURI === voiceURI);

      // Fallback to name if voiceURI doesn't match
      if (!voice) {
        voice = englishVoices.find((v) => v.name === name);
      }

      // Set the found voice or fallback to first available voice
      setSelectedVoice(voice || englishVoices[0]);
    } else {
      // No saved voice, use first available
      setSelectedVoice(englishVoices[0]);
    }

    return true;
  }, []);

  // Initialize voices
  useEffect(() => {
    // Try loading immediately
    if (loadVoices()) {
      return;
    }

    // Set up voice change listener
    const handleVoicesChanged = () => {
      loadVoices();
    };

    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = handleVoicesChanged;
    }

    // Retry after a delay
    const timeoutId = setTimeout(() => {
      loadVoices();
    }, 1000);

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
      clearTimeout(timeoutId);
    };
  }, [loadVoices]);

  // Save voice selection to localStorage
  const selectVoice = useCallback((voice) => {
    if (!voice) return;

    setSelectedVoice(voice);

    // Save voice data for reliable restoration
    const voiceData = {
      voiceURI: voice.voiceURI,
      name: voice.name,
      lang: voice.lang,
    };

    storage.set(STORAGE_KEYS.SELECTED_VOICE, voiceData);
  }, []);

  return {
    voices,
    selectedVoice,
    selectVoice,
    isVoicesLoaded,
  };
};

export default useVoiceSelection;
