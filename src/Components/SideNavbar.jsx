/* eslint-disable react/prop-types */
// import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../glassmorphism.css';
import { MdFeedback, MdInfoOutline, MdClose } from 'react-icons/md';
import { FaGithub, FaLinkedin, FaCode } from 'react-icons/fa';
import { GiWorld } from 'react-icons/gi';
import './Components.css'

const SideNavbar = ({ isDark, showSidebar, setShowSidebar, toggleWhatsNew }) => {
  const currentYear = new Date().getFullYear();
  const feedbackEmail = "souravtempmail1@gmail.com";

  return (
    <div 
      className={`z-40 fixed inset-y-0 w-[80%] md:w-72 ${!showSidebar ? ' -left-[38rem] md:-left-72' : 'left-0'} transition-transform duration-300 
        ${isDark ? 'bg-slate-800/95' : 'bg-slate-100/95'} backdrop-blur-md
        md:rounded-r-xl md:h-[98%] md:top-2 md:inset-y-auto shadow-2xl font-sans`}
      onMouseLeave={() => setShowSidebar(false)}
    >
      {/* Close button for mobile/Tab */}
      <button
        onClick={() => setShowSidebar(false)}
        className={`cross-btn absolute top-1 right-4 p-2 rounded-full ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
      >
        <MdClose size={24} />
      </button>

      <div className="container h-full px-6 md:px-8 py-6 md:py-8 flex flex-col justify-between">
        {/* Top Section */}
        <div className="space-y-6 md:space-y-4 mt-8 md:mt-2">
          {/* Description */}
          <div className="text-left">
            <p className={`mb-4 text-sm md:text-base font-medium ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Your voice-activated intelligent companion
            </p>
            <a 
              href={`mailto:${feedbackEmail}?subject=Feedback%20for%20VoxAI%20Assistant`}
              className={`inline-flex items-center text-sm transition duration-300 
                hover:text-blue-600 dark:hover:text-blue-400 p-2 -ml-2`}
            >
              <MdFeedback size={18} className="mr-2" />
              <span>Give your valuable feedback</span>
            </a>
          </div>

          {/* Connect Section */}
          <div className="text-left">
            <h3 className={`text-lg md:text-xl font-bold mb-3 ${
              isDark ? 'text-blue-400' : 'text-blue-600'
            }`}>
              Connect With Us
            </h3>
            <div className="flex flex-col space-y-3">
              {/* Social Links */}
              <a 
                href="https://x.com/PaitandySourav" 
                target="_blank" 
                rel="noopener noreferrer"
                className="opacity-50 hover:opacity-100 transition-opacity duration-300 p-2 -ml-2"
              >
                <img 
                  src={isDark 
                    ? "https://img.icons8.com/?size=100&id=phOKFKYpe00C&format=png&color=FFFFFF" 
                    : "https://img.icons8.com/?size=100&id=phOKFKYpe00C&format=png&color=000000"
                  } 
                  alt="X" 
                  className="w-5 h-5 inline-block align-middle"
                />
                <span className="ml-2 text-sm md:text-base">X</span>
              </a>

              <a 
                href="https://github.com/SouravPaitandy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="opacity-50 hover:opacity-100 inline-flex items-center 
                  transition-colors duration-300 p-2 -ml-2"
              >
                <FaGithub size={18} className="mr-2" />
                <span className="text-sm md:text-base">GitHub</span>
              </a>

              <a 
                href="https://www.linkedin.com/in/sourav-paitandy/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center transition-colors duration-300 
                  opacity-50 hover:opacity-100 hover:text-blue-700 
                  dark:hover:text-gray-200 p-2 -ml-2"
              >
                <FaLinkedin size={18} className="mr-2" />
                <span className="text-sm md:text-base">LinkedIn</span>
              </a>
            </div>

            {/* Privacy Policy Link */}
            <div className="mt-4">
              <Link 
                to="/privacy-policy" 
                className="inline-flex items-center transition duration-300 
                  opacity-50 hover:opacity-100 hover:text-blue-600 
                  dark:hover:text-blue-400 p-2 -ml-2"
              >
                <MdInfoOutline size={18} className="mr-2" />
                <span className="text-sm md:text-base">Privacy Policy</span>
              </Link>
            </div>
          </div>

          {/* About Section */}
          <div className="text-left">
            <h3 className={`text-lg md:text-xl font-bold mb-3 ${
              isDark ? 'text-blue-400' : 'text-blue-600'
            }`}>
              About
            </h3>
            <div className="flex flex-col space-y-3 md:space-y-0">
              <a 
                href="https://portfolio-sourav-paitandy.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center transition duration-300 
                  hover:text-blue-600 dark:hover:text-blue-400 p-2 -ml-2"
              >
                <GiWorld size={18} className="mr-2" />
                <span className="text-sm md:text-base">Created by Sourav Paitandy</span>
              </a>

              {/* <a 
                href="https://ai.google.dev/gemini-api" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center transition duration-300 
                  hover:text-green-600 dark:hover:text-green-400 p-2 -ml-2"
              >
                <FaCode size={18} className="mr-2" />
                <span className="text-sm md:text-base">Powered by Gemini API</span>
              </a> */}

              <button 
                onClick={toggleWhatsNew}
                className="inline-flex items-center transition duration-300 
                  hover:text-blue-600 dark:hover:text-blue-400 p-2 -ml-2"
              >
                <MdInfoOutline size={18} className="mr-2" />
                <span className="text-sm md:text-base">View latest updates</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="text-left mt-8 md:mt-0">
          <p className={`text-6xl md:text-3xl font-[900] opacity-30 ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Made with <span className="text-red-400">❤️</span>
          </p>
          <p className={`mt-4 text-base md:text-xs ${
            isDark ? 'text-gray-500' : 'text-gray-600'
          }`}>
            © {currentYear} VoxAI Assistant. <br/>All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SideNavbar;