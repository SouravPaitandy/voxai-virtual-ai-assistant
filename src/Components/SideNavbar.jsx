/* eslint-disable react/prop-types */
// import React from 'react';
// import { Link } from 'react-router-dom';
import { 
  MdFeedback, 
  MdInfoOutline, 
  MdClose
} from 'react-icons/md';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { GiWorld } from 'react-icons/gi';

const SideNavbar = ({ 
  isDark, 
  showSidebar, 
  setShowSidebar, 
  toggleWhatsNew
}) => {
  const currentYear = new Date().getFullYear();
  const feedbackEmail = "souravpaitandy.work@gmail.com";

  // Accessibility: Add keyboard support for closing sidebar
  const handleKeyClose = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setShowSidebar(false);
    }
  };

  return (
    <>
      {/* Mobile Hamburger Button */}
      {/* <button 
        onClick={() => setShowSidebar(true)}
        aria-label="Open sidebar menu"
        className={`
          fixed z-50 top-4 left-4 p-2 rounded-full shadow-lg 
          transition-all duration-300 ease-in-out
          ${showSidebar ? 'opacity-0 invisible' : 'opacity-100 visible'}
          ${isDark ? 'bg-slate-700 text-white' : 'bg-white text-black'}
          md:hidden hover:scale-110
        `}
      >
        <MdMenu size={24} />
      </button> */}

      {/* Overlay for mobile */}
      {showSidebar && (
        <div 
          className={`
            fixed inset-0 z-30 bg-black/50 md:hidden
            transition-opacity duration-300 ease-in-out
            backdrop-blur-md
            ${showSidebar ? 'opacity-100' : 'opacity-0'}
          `}
          onClick={() => setShowSidebar(false)}
          aria-hidden="true"
        />
      )}

      {/* Side Navbar */}
      <div 
        className={`
          fixed inset-y-0 w-[80%] z-40 
          transition-all duration-300 ease-in-out
          ${!showSidebar 
            ? '-left-[38rem] md:-left-72 ' 
            : 'left-0'}
          md:w-72 md:left-4 md:top-2 md:bottom-4
          ${isDark ? 'bg-slate-800' : 'bg-white'}
          rounded-r-xl md:rounded-xl
          shadow-2xl overflow-hidden
        `}
        role="navigation"
        aria-label="Side Navigation"
        aria-hidden={!showSidebar}
        onMouseLeave={()=> setShowSidebar(false)}
      >
        {/* Close Button */}
        <button
          onClick={() => setShowSidebar(false)}
          onKeyDown={handleKeyClose}
          aria-label="Close sidebar"
          tabIndex={showSidebar ? 0 : -1}
          className={`
            lg:hidden absolute top-4 right-4 z-50 p-2 rounded-full
            transition-all duration-300 ease-in-out
            ${showSidebar 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-75'}
            ${isDark 
              ? 'hover:bg-slate-700 text-gray-300 hover:text-white' 
              : 'hover:bg-gray-100 text-gray-600 hover:text-black'}
          `}
        >
          <MdClose size={24} />
        </button>

        {/* Navbar Content */}
        <div className="h-full flex flex-col overflow-y-auto">
          <div className="p-6 space-y-6 flex-grow">
            {/* App Description */}
            <div>
              {/* <h2 className={`
                text-2xl font-bold mb-2
                ${isDark ? 'text-blue-300' : 'text-blue-700'}
              `}>
                VoxAI Assistant
              </h2> */}
              <p className={`
                text-sm mt-4 mb-4
                ${isDark ? 'text-gray-400' : 'text-gray-600'}
              `}>
                Your intelligent voice-activated companion
              </p>

              <a 
                href={`mailto:${feedbackEmail}?subject=VoxAI%20Feedback`}
                className={`
                  inline-flex items-center text-sm py-2 px-3 rounded-lg
                  transition duration-300 group
                  ${isDark 
                    ? 'hover:bg-slate-700 text-gray-300' 
                    : 'hover:bg-blue-50 text-blue-600'}
                `}
              >
                <MdFeedback className="mr-2 group-hover:animate-bounce" size={18} />
                Give Feedback
              </a>
            </div>

            {/* Social & Connect Section */}
            <div>
              <h3 className={`
                text-lg font-semibold mb-3
                ${isDark ? 'text-blue-300' : 'text-blue-700'}
              `}>
                Connect
              </h3>
              <div className="space-y-2">
                {[
                  { 
                    Icon: FaTwitter, 
                    href: "https://x.com/PaitandySourav", 
                    label: "X (Twitter)" 
                  },
                  { 
                    Icon: FaGithub, 
                    href: "https://github.com/SouravPaitandy", 
                    label: "GitHub" 
                  },
                  { 
                    Icon: FaLinkedin, 
                    href: "https://www.linkedin.com/in/sourav-paitandy/", 
                    label: "LinkedIn" 
                  }
                ].map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      flex items-center py-2 px-3 rounded-lg group
                      transition duration-300
                      ${isDark 
                        ? 'hover:bg-slate-700 text-gray-300' 
                        : 'hover:bg-gray-100 text-gray-700'}
                    `}
                  >
                    <Icon 
                      className={`
                        mr-2 group-hover:scale-110 transition
                        ${isDark ? 'text-gray-400' : 'text-gray-600'}
                      `} 
                      size={18} 
                    />
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {/* About & More Section */}
            <div>
              <h3 className={`
                text-lg font-semibold mb-3
                ${isDark ? 'text-blue-300' : 'text-blue-700'}
              `}>
                About
              </h3>
              <div className="space-y-2">
                {[
                  { 
                    Icon: GiWorld, 
                    action: () => window.open("https://portfolio-sourav-paitandy.vercel.app/", "_blank"),
                    label: "Created by Sourav Paitandy" 
                  },
                  { 
                    Icon: MdInfoOutline, 
                    action: toggleWhatsNew,
                    label: "What's New" 
                  },
                  { 
                    Icon: MdInfoOutline, 
                    action: () => {/* Navigate to privacy policy */},
                    label: "Privacy Policy" 
                  }
                ].map(({ Icon, action, label }) => (
                  <button
                    key={label}
                    onClick={action}
                    className={`
                      w-full text-left flex items-center py-2 px-3 rounded-lg group
                      transition duration-300
                      ${isDark 
                        ? 'hover:bg-slate-700 text-gray-300' 
                        : 'hover:bg-gray-100 text-gray-700'}
                    `}
                  >
                    <Icon 
                      className={`
                        mr-2 group-hover:scale-110 transition
                        ${isDark ? 'text-gray-400' : 'text-gray-600'}
                      `} 
                      size={18} 
                    />
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className={`
            p-6 border-t
            ${isDark 
              ? 'bg-slate-900/50 border-slate-700 text-gray-500' 
              : 'bg-gray-50 border-gray-200 text-gray-600'}
          `}>
            <p className="text-sm mb-2">
              Made with <span className="text-red-500">❤️</span> by Sourav
            </p>
            <p className="text-xs">
              © {currentYear} VoxAI Assistant. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNavbar;