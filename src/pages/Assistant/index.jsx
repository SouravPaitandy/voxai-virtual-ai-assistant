/* eslint-disable no-unused-vars */
import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import { ChatInterface } from "./ChatInterface";
import { InputArea } from "./InputArea";
import { useStore } from "../../store";
import useSpeechRecognition from "../../hooks/useSpeechRecognition";
import useHybridTTS from "../../hooks/useHybridTTS";
import { useWeather } from "../../hooks/useWeather";
import { getChatbotResponse } from "../../utils/aiHelpers.js";
import { findCustomAnswer } from "../../utils/customAnswers.jsx";
import {
  detectAppCommand,
  openApp,
  getAppOpenResponse,
} from "../../utils/appOpener.js";

const AssistantPage = () => {
  // Get state directly - avoid custom selectors
  const conversations = useStore((state) => state.conversations);
  const activeConversationId = useStore((state) => state.activeConversationId);
  const addMessage = useStore((state) => state.addMessage);
  const userName = useStore((state) => state.userName);
  const settings = useStore((state) => state.settings);

  // Derive messages using useMemo to prevent recreating array
  const messages = useMemo(() => {
    const activeConv = conversations.find((c) => c.id === activeConversationId);
    return activeConv ? activeConv.messages : [];
  }, [conversations, activeConversationId]);

  // Local UI State
  const [isTyping, setIsTyping] = useState(false);

  // Ref to track if we've already submitted the current transcript
  const lastSubmittedTranscript = useRef("");

  // Hooks
  const {
    isListening,
    transcript,
    startListening,
    stopListening,
    clearTranscript,
    error: voiceError,
  } = useSpeechRecognition();

  const { speak, stopSpeaking, isSpeaking } = useHybridTTS();

  // Weather hook integration
  const addToMemory = (msg) => {
    addMessage({ role: msg.role, content: msg.content });
  };

  const { handleWeatherRequest } = useWeather(addToMemory, speak);

  // Core Logic
  const handleSendMessage = useCallback(
    async (text) => {
      if (!text || !text.trim()) return;

      // Clear voice transcript to prevent input box flickering/persistence
      clearTranscript();

      // 1. Add User Message
      addMessage({ role: "user", content: text });
      setIsTyping(true);

      // 2. Check for App Open Command
      const appCommand = detectAppCommand(text);
      if (appCommand) {
        const success = openApp(appCommand.url);
        const response = getAppOpenResponse(appCommand.appName, success);
        setIsTyping(false);
        addMessage({ role: "assistant", content: response });
        speak(response);
        return;
      }

      // 3. Check for Weather (Client-side intercept)
      if (text.toLowerCase().includes("weather")) {
        await handleWeatherRequest(text);
        setIsTyping(false);
        return;
      }

      // 4. Check for Custom Answers (avoid unnecessary API calls)
      const customAnswer = findCustomAnswer(text);

      if (customAnswer) {
        addMessage({ role: "assistant", content: customAnswer });
        setIsTyping(false);
        speak(customAnswer);
        return;
      }

      // 4. AI Response (Gemini API)
      try {
        // Prepare context (last few messages)
        const context = messages.slice(-5).map((m) => ({
          role: m.role,
          content: m.content,
        }));

        const response = await getChatbotResponse(text, context);

        addMessage({ role: "assistant", content: response });
        setIsTyping(false);
        speak(response);
      } catch (error) {
        console.error("AI Error:", error);
        setIsTyping(false);
        addMessage({
          role: "assistant",
          content:
            "I'm having trouble connecting to my brain right now. Please try again.",
        });
      }
    },
    [messages, addMessage, speak, handleWeatherRequest, clearTranscript]
  );

  // Handle Quick Prompts
  const handleQuickPrompt = useCallback(
    (prompt) => {
      handleSendMessage(prompt);
    },
    [handleSendMessage]
  );

  // Auto-submit voice transcript when listening stops (if enabled in settings)
  useEffect(() => {
    if (!isListening && transcript && transcript.trim()) {
      if (transcript !== lastSubmittedTranscript.current) {
        if (settings.autoSubmitVoice) {
          lastSubmittedTranscript.current = transcript;
          handleSendMessage(transcript);
          setTimeout(() => {
            clearTranscript();
            lastSubmittedTranscript.current = "";
          }, 100);
        }
      }
    }
  }, [
    isListening,
    transcript,
    settings.autoSubmitVoice,
    handleSendMessage,
    clearTranscript,
  ]);

  // Reset last submitted when listening starts
  useEffect(() => {
    if (isListening) {
      lastSubmittedTranscript.current = "";
    }
  }, [isListening]);

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full relative">
        <ChatInterface
          messages={messages}
          isTyping={isTyping}
          onQuickPrompt={handleQuickPrompt}
        />

        <InputArea
          onSendMessage={handleSendMessage}
          isListening={isListening}
          onToggleListening={isListening ? stopListening : startListening}
          isSpeaking={isSpeaking}
          onStopSpeaking={stopSpeaking}
          transcript={transcript}
          voiceError={voiceError}
        />
      </div>
    </DashboardLayout>
  );
};

export default AssistantPage;
