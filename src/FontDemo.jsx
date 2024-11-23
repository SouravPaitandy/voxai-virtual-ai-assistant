import React from 'react';

const FontDemo = () => {
  // Sample text for demonstration
  const sampleInput = "Type your message...";
  const sampleButton = "Send Message";
  
  return (
    <div className="space-y-12 p-6">
      {/* Option 1: Inter + System UI */}
      <div className="space-y-4">
        <div className="pb-2 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-1 font-inter">Option 1: Inter (Modern & Clean)</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 font-inter">
            Primary: Inter | Fallback: system-ui, sans-serif
          </p>
        </div>
        
        <div className="space-y-2">
          <input 
            type="text" 
            value={sampleInput}
            readOnly
            className="w-full px-4 py-2 rounded-lg border border-gray-200 
              dark:border-gray-700 dark:bg-gray-800
              font-inter text-base"
          />
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg 
              font-inter font-medium">
              {sampleButton}
            </button>
            <span className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 
              font-inter">
              Press Enter to send
            </span>
          </div>
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-300 font-inter">
          CSS Implementation:
          <pre className="mt-2 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
            {`font-family: 'Inter', system-ui, -apple-system, sans-serif;
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');`}
          </pre>
        </div>
      </div>

      {/* Option 2: Plus Jakarta Sans */}
      <div className="space-y-4">
        <div className="pb-2 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-1 font-jakarta">Option 2: Plus Jakarta Sans (Premium Feel)</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 font-jakarta">
            Primary: Plus Jakarta Sans | Fallback: system-ui, sans-serif
          </p>
        </div>
        
        <div className="space-y-2">
          <input 
            type="text" 
            value={sampleInput}
            readOnly
            className="w-full px-4 py-2 rounded-lg border border-gray-200 
              dark:border-gray-700 dark:bg-gray-800
              font-jakarta text-base"
          />
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg 
              font-jakarta font-medium">
              {sampleButton}
            </button>
            <span className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 
              font-jakarta">
              Press Enter to send
            </span>
          </div>
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-300 font-jakarta">
          CSS Implementation:
          <pre className="mt-2 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
            {`font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600&display=swap');`}
          </pre>
        </div>
      </div>

      {/* Option 3: Outfit */}
      <div className="space-y-4">
        <div className="pb-2 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-1 font-outfit">Option 3: Outfit (Modern & Geometric)</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 font-outfit">
            Primary: Outfit | Fallback: system-ui, sans-serif
          </p>
        </div>
        
        <div className="space-y-2">
          <input 
            type="text" 
            value={sampleInput}
            readOnly
            className="w-full px-4 py-2 rounded-lg border border-gray-200 
              dark:border-gray-700 dark:bg-gray-800
              font-outfit text-base"
          />
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg 
              font-outfit font-medium">
              {sampleButton}
            </button>
            <span className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 
              font-outfit">
              Press Enter to send
            </span>
          </div>
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-300 font-outfit">
          CSS Implementation:
          <pre className="mt-2 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
            {`font-family: 'Outfit', system-ui, -apple-system, sans-serif;
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600&display=swap');`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default FontDemo;