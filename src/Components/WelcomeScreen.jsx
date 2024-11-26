import React, { useState, useRef, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { 
  Sparkles, 
  UserPlus, 
  ArrowRight, 
  Wand2,
  Compass,
  Stars
} from 'lucide-react';

// Unique Greeting Messages with more context and personality
const GREETING_MESSAGES = [
  "Embark on a journey where intelligence meets imagination.",
  "Unlock the potential of AI-powered creativity and insight.",
  "Your digital companion is ready to transform possibilities.",
  "Where innovation meets intuition, VoxAI awaits.",
  "Bridging human creativity with artificial intelligence."
];

// Background Particles Component
const BackgroundParticles = React.memo(() => {
  const particles = useMemo(() => 
    [...Array(20)].map((_, index) => ({
      id: index,
      size: Math.random() * 10 + 5,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 10,
      duration: Math.random() * 20 + 10
    }))
  , []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(particle => (
        <div 
          key={particle.id}
          className="absolute bg-white/10 rounded-full animate-float"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`
          }}
        />
      ))}
    </div>
  );
});
BackgroundParticles.displayName = 'BackgroundParticles';

// Interactive Logo Component
const InteractiveLogo = React.memo(() => {
  return (
    <div 
      className="relative w-32 h-32 mx-auto transform transition-all duration-500 
      hover:scale-105 hover:rotate-6"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 
        rounded-full blur-lg opacity-70 animate-pulse"></div>
      
      <div className="relative z-10 w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 
        rounded-full flex items-center justify-center shadow-2xl">
        <Sparkles 
          size={64} 
          className="text-white opacity-90 group-hover:animate-spin" 
        />
        <div className="absolute -bottom-2 -right-2 bg-white/20 p-2 rounded-full 
          border border-white/30 backdrop-blur-sm">
          <Wand2 className="text-white" size={24} />
        </div>
      </div>
    </div>
  );
});
InteractiveLogo.displayName = 'InteractiveLogo';

const WelcomeScreen = ({ handleNameSubmit, userName, setUserName }) => {
  const [stage, setStage] = useState('intro');
  const [animationTrigger, setAnimationTrigger] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  // Memoized random greeting
  const randomGreeting = useMemo(() => 
    GREETING_MESSAGES[Math.floor(Math.random() * GREETING_MESSAGES.length)],
    []
  );

  // Handle name submission with validation
  const handleSubmitName = useCallback(() => {
    const trimmedName = inputValue.trim();
    
    if (trimmedName) {
      setUserName(trimmedName);
      setStage('ready');
    } else {
      // Trigger input shake animation
      setAnimationTrigger(true);
      setTimeout(() => setAnimationTrigger(false), 500);
      inputRef.current?.focus();
    }
  }, [inputValue, setUserName]);

  // Render different stages with unique interactions
  const renderStage = () => {
    switch(stage) {
      case 'intro':
        return (
          <div className="text-center space-y-6 relative">
            <InteractiveLogo />
            
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text 
              bg-gradient-to-r from-blue-400 to-purple-600 tracking-tight">
              VoxAI
            </h1>
            
            <p className="text-xl text-gray-300 max-w-md mx-auto">
              {randomGreeting}
            </p>

            <div className="space-y-4">
              <button
                onClick={() => setStage('name')}
                className="group w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 
                  text-white rounded-xl font-semibold hover:shadow-xl 
                  transition-all duration-300 ease-in-out 
                  transform hover:scale-105 flex items-center justify-center space-x-3"
                aria-label="Begin Your Journey"
              >
                <UserPlus size={20} className="group-hover:rotate-12 transition-transform" />
                <span>Begin Your Journey</span>
                <ArrowRight 
                  size={20} 
                  className="group-hover:translate-x-1 transition-transform" 
                />
              </button>
            </div>
          </div>
        );

      case 'name':
        return (
          <div className="space-y-6 relative">
            <InteractiveLogo />
            
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-transparent bg-clip-text 
                bg-gradient-to-r from-blue-400 to-purple-600 mb-2">
                Who are you?
              </h2>
              <p className="text-gray-300">
                Share your name and let our adventure begin
              </p>
            </div>

            <div className="relative group">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSubmitName();
                  }
                }}
                placeholder="Enter your name"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 
                  rounded-xl text-white placeholder-gray-400 
                  focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                  outline-none transition-all duration-300 
                  group-hover:bg-white/20"
                aria-label="Enter your name"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 
                text-purple-400 opacity-50 group-hover:opacity-100 transition-opacity">
                <Compass size={20} />
              </div>
            </div>

            <button
              onClick={handleSubmitName}
              disabled={!inputValue.trim()}
              className={`w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 
                text-white rounded-xl font-semibold 
                hover:opacity-90 transition-all duration-300 
                transform hover:scale-105 disabled:opacity-50 
                disabled:cursor-not-allowed flex items-center justify-center space-x-3 
                ${animationTrigger ? 'animate-shake' : ''}`}
              aria-label="Continue with name"
            >
              <span>Continue</span>
              <ArrowRight 
                size={20} 
                className="group-hover:translate-x-1 transition-transform" 
              />
            </button>
          </div>
        );

      case 'ready':
        return (
          <div className="text-center space-y-6 relative">
            <div className="absolute top-0 left-0 right-0 flex justify-center">
              <div className="w-1 h-1 bg-white/50 rounded-full animate-ping"></div>
            </div>
            
            <InteractiveLogo />
            
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-transparent bg-clip-text 
                bg-gradient-to-r from-blue-400 to-purple-600">
                Hello, {userName}!
              </h2>
              
              <p className="text-xl text-gray-300 max-w-md mx-auto">
                Your personalized AI journey begins now. 
                Creativity knows no bounds.
              </p>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={handleNameSubmit}
                className="group py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-500 
                  text-white rounded-xl font-semibold 
                  hover:shadow-xl transition-all duration-300 
                  transform hover:scale-105 flex items-center space-x-3"
                aria-label="Start Exploring"
              >
                <Stars size={20} className="group-hover:rotate-45 transition-transform" />
                <span>Start Exploring</span>
                <ArrowRight 
                  size={20} 
                  className="group-hover:translate-x-1 transition-transform" 
                />
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 
      overflow-hidden relative">
      {/* Dynamic Background Particles */}
      <BackgroundParticles />

      {/* Main Content Container */}
      <div className="w-full max-w-md mx-4 z-10 relative">
        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl 
          shadow-2xl border border-white/20 p-8 relative overflow-hidden">
          {/* Subtle Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 
            opacity-30 pointer-events-none"></div>
          
          {renderStage()}
        </div>
      </div>
    </div>
  );
};

// PropTypes for type checking
WelcomeScreen.propTypes = {
  handleNameSubmit: PropTypes.func.isRequired,
  userName: PropTypes.string,
  setUserName: PropTypes.func.isRequired
};

export default WelcomeScreen;