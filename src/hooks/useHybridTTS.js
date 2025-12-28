import { useState, useCallback, useRef } from "react";
import { useStore } from "../store";
// import {
//   generateElevenLabsSpeech,
//   playAudioBlob,
//   usageTracker,
// } from "../utils/elevenLabsTTS";

/**
 * Hybrid TTS Hook
 * Uses ElevenLabs with automatic fallback to browser TTS
 */
const useHybridTTS = () => {
  const settings = useStore((state) => state.settings);
  // const updateSettings = useStore((state) => state.updateSettings);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioRef = useRef(null);
  const utteranceRef = useRef(null);

  /**
   * Speak using browser TTS
   */
  const speakWithBrowser = useCallback(
    (text) => {
      return new Promise((resolve, reject) => {
        if ("speechSynthesis" in window) {
          // Cancel any ongoing speech
          window.speechSynthesis.cancel();

          const utterance = new SpeechSynthesisUtterance(text);
          utteranceRef.current = utterance;

          // Use selected voice if available
          const voices = window.speechSynthesis.getVoices();
          const selectedVoice = voices.find(
            (v) => v.name === settings.selectedVoice
          );
          if (selectedVoice) {
            utterance.voice = selectedVoice;
          }

          utterance.onend = () => {
            setIsSpeaking(false);
            resolve();
          };

          utterance.onerror = (error) => {
            setIsSpeaking(false);
            reject(error);
          };

          setIsSpeaking(true);
          window.speechSynthesis.speak(utterance);
        } else {
          reject(new Error("Browser TTS not supported"));
        }
      });
    },
    [settings.selectedVoice]
  );

  /**
   * Speak using ElevenLabs
   */
  // const speakWithElevenLabs = useCallback(
  //   async (text) => {
  //     try {
  //       setIsSpeaking(true);
  //       const audioBlob = await generateElevenLabsSpeech(
  //         text,
  //         settings.elevenLabsVoice
  //       );
  //       await playAudioBlob(audioBlob);
  //       setIsSpeaking(false);
  //     } catch (error) {
  //       setIsSpeaking(false);

  //       if (
  //         error.message === "QUOTA_EXCEEDED" ||
  //         error.message === "UNAUTHORIZED"
  //       ) {
  //         console.warn(
  //           error.message === "UNAUTHORIZED"
  //             ? "ElevenLabs API unauthorized/blocked, falling back to browser TTS"
  //             : "ElevenLabs quota exceeded, falling back to browser TTS"
  //         );
  //         // Auto-switch to browser TTS
  //         updateSettings({ ttsEngine: "browser" });
  //         // Retry with browser
  //         return speakWithBrowser(text);
  //       }

  //       throw error;
  //     }
  //   },
  //   [settings.elevenLabsVoice, speakWithBrowser, updateSettings]
  // );

  /**
   * Main speak function with hybrid logic
   */
  const speak = useCallback(
    async (text) => {
      if (!text || !text.trim()) return;

      try {
        // if (settings.ttsEngine === "elevenlabs") {
        //   // Check if we have quota
        //   if (!usageTracker.canUse(text.length)) {
        //     console.warn("ElevenLabs quota exceeded, using browser TTS");
        //     return speakWithBrowser(text);
        //   }

        //   try {
        //     await speakWithElevenLabs(text);
        //   } catch (error) {
        //     // Fallback to browser on any ElevenLabs error
        //     console.warn(
        //       "ElevenLabs failed, falling back to browser:",
        //       error.message
        //     );
        //     await speakWithBrowser(text);
        //   }
        // } else {
        // Use browser TTS
        await speakWithBrowser(text);
        // }
      } catch (error) {
        console.error("TTS Error:", error);
        setIsSpeaking(false);
      }
    },
    [speakWithBrowser]
  );

  /**
   * Stop speaking
   */
  const stopSpeaking = useCallback(() => {
    // Stop browser TTS
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }

    // Stop audio playback
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    setIsSpeaking(false);
  }, []);

  /**
   * Get usage stats
  //  */
  // const getUsageStats = useCallback(() => {
  //   return usageTracker.getUsageStats();
  // }, []);

  return {
    speak,
    stopSpeaking,
    isSpeaking,
    // getUsageStats,
  };
};

export default useHybridTTS;
