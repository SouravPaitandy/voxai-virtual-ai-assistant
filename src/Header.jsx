import './animations.css'
import { useTheme } from './ThemeContext';

const Header = () => {
  const { isDark } = useTheme();

  return (
    <>
      <div className="w-full flex items-center justify-center mb-8">
        <div className="relative w-32 h-32">
          <div className={`animate-pulse-ring ${isDark ? 'bg-blue-500' : 'bg-blue-400'}`}></div>
          <div className={`animate-pulse-ring animation-delay-1000 ${isDark ? 'bg-blue-500' : 'bg-blue-400'}`}></div>
          <img
            src='https://i.gifer.com/origin/38/38fda0376d860ff65bdbfd257ca672a4.gif'
              // src="https://i2.wp.com/i.gifer.com/MImN.gif" 
            alt="VoxAI"
            className={`w-full h-full rounded-full shadow-lg border-4 ${isDark ? 'border-blue-500' : 'border-blue-400'} z-10 relative`}
          />
        </div>
      </div>
      <h1 className={`${isDark ? 'text-blue-400' : 'text-blue-600'} text-center mb-4 text-5xl font-bold animate-float`}>
        <span className="inline-block">V</span>
        <span className="inline-block">o</span>
        <span className="inline-block">x</span>
        <span className="inline-block">A</span>
        <span className="inline-block">I</span>
      </h1>
      <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-center mb-10 text-lg`}>
        Your Voice-Activated AI Assistant. How may I assist you today?
      </p>
    </>
  );
};

export default Header;
