/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const SplashScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(onComplete, 500);
    }
  }, [progress, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black text-white overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-primary/20 rounded-full blur-[150px] animate-pulse-slow" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-purple-500/20 rounded-full blur-[150px] animate-pulse-slow delay-700" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Container */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative mb-8"
        >
          {/* Pulsing Rings */}
          <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping-slow" />
          <div className="absolute inset-[-10px] rounded-full border border-primary/20 animate-spin-slow" />

          {/* <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-primary to-purple-600 flex items-center justify-center shadow-[0_0_50px_rgba(124,58,237,0.5)]">
            <Bot className="w-12 h-12 text-white" />
          </div> */}
          <img
            src="/Designer(2).png"
            alt="VoxAI Logo"
            fetchPriority="high"
            loading="eager"
            className="w-24 h-24"
          />
        </motion.div>

        {/* Text */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-4xl font-bold font-display tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-2"
        >
          VoxAI
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-muted-foreground/80 text-sm tracking-widest uppercase mb-12"
        >
          Virtual Assistant
        </motion.p>

        {/* Loading Bar */}
        <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden relative">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-purple-500"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </div>

        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground font-mono h-4">
          {progress < 100 ? (
            <>
              <span className="animate-pulse">INITIALIZING CORE SYSTEMS</span>
              <span>{progress}%</span>
            </>
          ) : (
            <span className="text-green-400">SYSTEMS ONLINE</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};
