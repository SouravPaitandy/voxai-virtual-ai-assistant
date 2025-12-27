import { useState, useEffect, useRef, useCallback } from "react";

const useSpeechRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState(null);
  const recognitionRef = useRef(null);
  const silenceTimerRef = useRef(null);
  const finalTranscriptRef = useRef("");

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      console.warn("Speech recognition not supported");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
      finalTranscriptRef.current = "";
      setTranscript(""); // Clear previous transcript immediately
    };

    recognition.onend = () => {
      setIsListening(false);
      // Clear silence timer on end
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
        silenceTimerRef.current = null;
      }
    };

    recognition.onresult = (event) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      // Update final transcript accumulator
      if (finalTranscript) {
        finalTranscriptRef.current += finalTranscript + " ";
      }

      // Update transcript state (for display in input)
      const currentTranscript = finalTranscriptRef.current + interimTranscript;
      setTranscript(currentTranscript.trim());

      // Auto-stop after 2 seconds of silence (reset timer on each result)
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
      }

      silenceTimerRef.current = setTimeout(() => {
        if (recognitionRef.current) {
          console.log("Auto-stopping speech recognition due to silence");
          recognitionRef.current.stop();
        }
      }, 1000); // 1 second of silence
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      if (event.error === "not-allowed") {
        setError(
          "Microphone permission denied. Please allow access in browser settings."
        );
      } else if (event.error === "no-speech") {
        // Ignore no-speech error, just stop listening silently
      } else if (event.error === "network") {
        setError("Network error. Please check your connection.");
      } else {
        setError(`Error: ${event.error}`);
      }
      setIsListening(false);
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
        silenceTimerRef.current = null;
      }
    };

    recognitionRef.current = recognition;

    return () => {
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
      }
    };
  }, []);

  const startListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        finalTranscriptRef.current = "";
        setTranscript("");
        recognitionRef.current.start();
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
  }, []);

  const clearTranscript = useCallback(() => {
    setTranscript("");
    finalTranscriptRef.current = "";
  }, []);

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    clearTranscript,
    error,
  };
};

export default useSpeechRecognition;
