/* eslint-disable react/prop-types */
const CommandSuggestions = ({ onSuggestionClick, isDark }) => {
    const commonCommands = [
      "What's the current weather of Delhi?",
      "Open Calculator",
      "Give a sample executable Java code."
      // "Set a reminder",
      // "Clear history",
      // "Toggle dark mode"
    ];
  
    return (
      <div className="suggestion-chips flex flex-wrap gap-2 my-3">
        {commonCommands.map((command, index) => (
          <button 
            key={index}
            className={`px-3 py-1 rounded-full bg-opacity-20 hover:bg-opacity-30 transition-all
                       text-sm whitespace-nowrap
                      ${isDark ? "bg-blue-500 text-blue-100"
                       : "bg-blue-500 text-blue-900"}`}
            onClick={() => onSuggestionClick(command)}
          >
            {command}
          </button>
        ))}
      </div>
    );
  };
  
  export default CommandSuggestions;