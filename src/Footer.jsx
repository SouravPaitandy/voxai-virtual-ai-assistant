import { useState } from 'react';
import { Link } from 'react-router-dom';
import './glassmorphism.css';
import { useTheme } from './ThemeContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const feedbackEmail = "souravtempmail1@gmail.com"; // Replace with your actual email address
  const [showWhatsNew, setShowWhatsNew] = useState(false);
  const { isDark } = useTheme();

  const toggleWhatsNew = () => setShowWhatsNew(!showWhatsNew);

  return (
    <footer className={`z-0 glassmorphism w-4/5 sm:w-4/5 mt-12 ${isDark ? 'text-gray-300' : 'text-gray-700'} text-sm 
       pt-10 pb-8 rounded-b-none shadow-2xl font-sans`}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 items-start">
            <div className="text-center sm:text-left">
              <h3 className={`text-2xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'} mb-3`}>VoxAI Assistant</h3>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4 text-base`}>Your voice-activated intelligent companion</p>
              <a href={`mailto:${feedbackEmail}?subject=Feedback%20for%20VoxAI%20Assistant`} 
                 className={`inline-flex items-center ${isDark ? 'text-blue-300 hover:text-blue-400' : 'text-blue-500 hover:text-blue-600'} transition duration-300`}>
                <span className="mr-2">Give your valuable feedback</span>
                <i className="fas fa-envelope"></i>
              </a>
            </div>
            <div className="text-center flex flex-col items-center">
              <h3 className={`text-xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'} mb-3`}>Connect With Us</h3>
              <div className="flex justify-center space-x-6 text-xl">
                <a href="https://x.com/PaitandySourav" target="_blank" rel="noopener noreferrer"
                    className='opacity-60 hover:opacity-100 transition-opacity duration-300'
                 >
                  <img src={isDark ? "https://img.icons8.com/?size=100&id=phOKFKYpe00C&format=png&color=FFFFFF" : "https://img.icons8.com/?size=100&id=phOKFKYpe00C&format=png&color=000000"} alt="X" 
                   className='w-[1.4rem] h-[1.4rem] mt-[0.2rem] '
                   />
                </a>
                <a href="https://github.com/SouravPaitandy" target="_blank" rel="noopener noreferrer"
                   className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'} transition-colors duration-300`}>
                  <i className="fab fa-github"></i>
                </a>
                <a href="https://www.linkedin.com/in/sourav-paitandy/" target="_blank" rel="noopener noreferrer" 
                   className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-blue-700'} transition-colors duration-300`}>
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
              <div className="mt-4">
                <Link to="/privacy-policy" className={`${isDark ? 'text-gray-400 hover:text-blue-300' : 'text-gray-600 hover:text-blue-500'} transition duration-300`}>Privacy Policy</Link>
              </div>
            </div>
            <div className="text-center sm:text-right flex flex-col items-center sm:items-end">
              <h3 className={`text-xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'} mb-3`}>About</h3>
              <a href="https://souravpaitandy.github.io/portfolio/" target="_blank" rel="noopener noreferrer" 
                 className={`inline-flex items-center ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'} transition duration-300 mb-3`}>
                <span className="mr-2">Created by Sourav Paitandy</span>
                <i className="fas fa-external-link-alt"></i>
              </a>
              <a href="https://ai.google.dev/gemini-api" target="_blank" rel="noopener noreferrer" 
                 className={`inline-flex items-center ${isDark ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-500'} transition duration-300 mb-3`}>
                <span className="mr-2">Powered by Gemini API</span>
                <i className="fas fa-code"></i>
              </a>
              <button 
                onClick={toggleWhatsNew}
                className={`${isDark ? 'text-gray-400 hover:text-blue-300' : 'text-gray-600 hover:text-blue-500'} transition duration-300`}
              >
                View latest updates
              </button>
            </div>
          </div>
          {showWhatsNew && (
            <div className={`mt-8 p-4 ${isDark ? 'bg-gray-800' : 'bg-gray-200'} rounded-lg`}>
              <h4 className={`text-lg font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'} mb-2`}>Latest Updates</h4>
              <ul className={`list-disc list-inside ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <li>Added voice selection feature</li>
                <li>Improved conversation history with word-by-word typing effect</li>
                <li>Implemented custom answers for frequently asked questions</li>
                <li>Enhanced user interface with glassmorphism design</li>
                <li className={isDark ? 'text-gray-200' : 'text-gray-800'}><span className={isDark ? 'text-blue-600' : 'text-blue-800'}>Newest:</span> Added Light theme for better user compatibility</li>
              </ul>
            </div>
          )}
          <div className="mt-12 text-center">
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-2xl sm:text-4xl font-[900] opacity-30`}>
              Made with <span className="text-red-400">❤️</span> and AI technology
            </p>
            <p className={`mt-4 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
              © {currentYear} VoxAI Assistant. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
  );
};

export default Footer;
