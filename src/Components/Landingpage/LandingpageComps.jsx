/* eslint-disable react/prop-types */
import { useState } from 'react';
// import { Link } from 'react-router-dom';
import {
//   Mic, MessageSquare, Shield, Keyboard, Moon, Zap, Globe, 
//   Brain, Sparkles, Code, Settings, Bot, X, ArrowRight,
  Plus, AudioWaveform, Play, Volume2, Command
} from 'lucide-react';

// Enhanced Feature Card with Audio Wave Animation
const EnhancedFeatureCard = ({ icon: Icon, title, description, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="p-8 rounded-2xl bg-white dark:bg-gray-800 hover:shadow-2xl 
        transition-all duration-500 transform hover:-translate-y-2 relative 
        overflow-hidden group cursor-pointer"
      style={{ 
        animationDelay: `${index * 150}ms`,
        background: `linear-gradient(135deg, 
          rgba(59, 130, 246, 0.05) 0%, 
          rgba(147, 51, 234, 0.05) 100%)`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 
            flex items-center justify-center transform group-hover:scale-110 
            transition-transform duration-500 relative">
            <Icon className="w-7 h-7 text-white" />
            {isHovered && (
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-0.5 h-2 bg-blue-600 rounded-full animate-soundwave"
                      style={{ 
                        animationDelay: `${i * 100}ms`,
                        height: `${Math.random() * 16 + 4}px`
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          <h3 className="text-2xl font-bold bg-clip-text text-transparent 
            bg-gradient-to-r from-blue-600 to-purple-600">
            {title}
          </h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

// Interactive Use Case Card
const EnhancedUseCaseCard = ({ icon: Icon, title, index }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div 
      className="p-8 rounded-2xl bg-white dark:bg-gray-800 hover:shadow-2xl 
        transition-all duration-500 transform hover:-translate-y-2 relative 
        overflow-hidden group cursor-pointer"
      style={{ animationDelay: `${index * 150}ms` }}
      onClick={() => setIsPlaying(!isPlaying)}
    >
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 
          flex items-center justify-center mb-6 group-hover:scale-110 
          transition-transform duration-500 relative">
          <Icon className="w-10 h-10 text-white" />
          {isPlaying && (
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
              <AudioWaveform className="w-6 h-6 text-blue-400 animate-pulse" />
            </div>
          )}
        </div>
        <h3 className="text-xl font-bold text-transparent bg-clip-text 
          bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
          {title}
        </h3>
        <button className="mt-4 p-2 rounded-full bg-blue-100 dark:bg-blue-900 
          text-blue-600 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 
          transition-colors duration-300">
          {isPlaying ? <Volume2 className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
};

// Animated Testimonial Card
const TestimonialCard = ({ name, role, avatar, quote }) => (
  <div className="p-8 rounded-2xl bg-white dark:bg-gray-800 hover:shadow-2xl 
    transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br 
      from-blue-600/10 to-purple-600/10 rounded-bl-full"></div>
    <div className="flex items-center gap-4 mb-6">
      <div className="relative">
        <img 
          src={avatar}
          alt={name} 
          className="h-16 rounded-2xl object-cover"
        />
        <div className="absolute -bottom-2 -right-1 w-6 h-6 rounded-full 
          bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
          <Command className="w-3 h-3 text-white" />
        </div>
      </div>
      <div>
        <h4 className="text-xl font-bold text-gray-900 dark:text-white">{name}</h4>
        <p className="text-blue-600 dark:text-blue-400">{role}</p>
      </div>
    </div>
    <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed relative">
      <span className="absolute -left-2 -top-2 text-4xl text-blue-600/20 dark:text-blue-400/50">&quot;</span>
      {quote}
      <span className="absolute -bottom-2 text-4xl text-blue-600/20 dark:text-blue-400/50">&quot;</span>
    </p>
  </div>
);

// Interactive FAQ Accordion
const FAQAccordion = ({ question, answer, isActive, onClick }) => (
  <div className="mb-6">
    <button
      className="w-full text-left p-6 rounded-2xl bg-white dark:bg-gray-800 
        hover:shadow-xl transition-all duration-300 group"
      onClick={onClick}
    >
      <div className="flex justify-between items-center gap-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 
          dark:group-hover:text-blue-400 transition-colors duration-300">
          {question}
        </h3>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center 
          transition-all duration-300 ${
            isActive 
              ? 'bg-blue-600 rotate-45' 
              : 'bg-gray-100 dark:bg-gray-700'
          }`}>
          <Plus className={`w-5 h-5 ${
            isActive 
              ? 'text-white' 
              : 'text-gray-600 dark:text-gray-300'
          }`} />
        </div>
      </div>
      <div className={`mt-4 text-gray-600 dark:text-gray-300 text-lg 
        transition-all duration-500 ${
          isActive 
            ? 'max-h-96 opacity-100' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
        {answer}
      </div>
    </button>
  </div>
);

// Add any other enhanced components and export them...

export { 
  EnhancedFeatureCard,
  EnhancedUseCaseCard,
  TestimonialCard,
  FAQAccordion
};

// Add custom CSS for animations
const style = document.createElement('style');
style.textContent = `
  @keyframes soundwave {
    0%, 100% { transform: scaleY(0.5); }
    50% { transform: scaleY(1); }
  }
  .animate-soundwave {
    animation: soundwave 1s ease-in-out infinite;
  }
`;
document.head.appendChild(style);