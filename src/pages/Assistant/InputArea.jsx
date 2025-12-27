import { useState, useRef, useEffect } from "react";
import { Mic, Send, StopCircle, Sparkles } from "lucide-react";
import { VoiceVisualizer } from "../../Components/ui/VoiceVisualizer";
// import { Button } from "../../components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";

/* eslint-disable react/prop-types */
export const InputArea = ({
  onSendMessage,
  isListening,
  onToggleListening,
  isSpeaking,
  onStopSpeaking,
  transcript,
  voiceError,
}) => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  // Sync transcript to input when listening updates
  useEffect(() => {
    if (isListening || transcript !== "") {
      setInputValue(transcript);
    }
  }, [isListening, transcript]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    onSendMessage(inputValue);
    setInputValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 z-20">
      {/* Gradient fade for content below */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto relative">
        {/* Floating Capsule Container */}
        <motion.div
          initial={false}
          animate={{
            boxShadow: isListening
              ? "0 0 30px rgba(59, 130, 246, 0.2)"
              : "0 10px 30px rgba(0,0,0,0.1)",
            borderColor: isListening
              ? "rgba(59, 130, 246, 0.3)"
              : "rgba(255,255,255,0.1)",
          }}
          transition={{ duration: 0.2 }}
          className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden group focus-within:bg-white/10 focus-within:border-primary/30"
        >
          {/* Input Field */}
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything..."
            rows={1}
            autoFocus
            className="w-full bg-transparent px-6 py-5 pr-32 text-lg resize-none focus:outline-none placeholder:text-muted-foreground/50 max-h-40 font-medium leading-relaxed scrollbar-thin scrollbar-thumb-white/10"
            style={{ minHeight: "72px" }}
          />

          {/* Right Actions */}
          <div className="absolute right-3 bottom-3 flex items-center gap-2">
            {/* Voice Toggle */}
            <motion.button
              whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
              whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
              onClick={isSpeaking ? onStopSpeaking : onToggleListening}
              className={`
                 p-3 rounded-2xl transition-all duration-200 flex items-center justify-center relative overflow-hidden
                 ${
                   isListening
                     ? "bg-red-500/20 text-red-400 ring-1 ring-red-500/50"
                     : isSpeaking
                     ? "bg-amber-500/20 text-amber-400 ring-1 ring-amber-500/50"
                     : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-primary"
                 }
              `}
            >
              <AnimatePresence mode="wait">
                {isListening ? (
                  <motion.div
                    key="listening"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <Mic className="w-5 h-5" />
                  </motion.div>
                ) : isSpeaking ? (
                  <motion.div
                    key="speaking"
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: "linear",
                    }}
                  >
                    <StopCircle className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <Mic className="w-5 h-5" />
                )}
              </AnimatePresence>
            </motion.button>

            {/* Send Button */}
            <motion.button
              whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
              whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
              disabled={!inputValue.trim() && !isListening}
              onClick={handleSend}
              className={`
                p-3 rounded-2xl flex items-center justify-center transition-all duration-200
                ${
                  inputValue.trim()
                    ? "bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary/90"
                    : "bg-white/5 text-muted-foreground/50 cursor-not-allowed"
                }
              `}
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Voice Visualizer Overlay - Integrated */}
          <AnimatePresence>
            {isListening && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="w-full bg-black/20 border-t border-white/5"
              >
                <div className="w-full h-24 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent" />
                  <VoiceVisualizer isActive={isListening} lineColor="#3b82f6" />

                  {/* Status Pill */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary tracking-widest uppercase backdrop-blur-md">
                    Listening
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error Indicator overlay */}
          <AnimatePresence>
            {voiceError && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="w-full bg-red-500/10 border-t border-red-500/20 px-6 py-2 flex items-center justify-center gap-2"
              >
                <span className="text-xs font-bold text-red-500 tracking-wider">
                  {voiceError}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <p className="text-center text-xs text-muted-foreground mt-4 flex items-center justify-center gap-2 opacity-60">
          <Sparkles className="w-3 h-3 text-primary" />
          <span>Powered by VoxAI Intelligence v2.0</span>
        </p>
      </div>
    </div>
  );
};
