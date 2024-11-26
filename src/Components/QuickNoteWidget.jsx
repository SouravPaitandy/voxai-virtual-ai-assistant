/* eslint-disable react/prop-types */
import { useState } from 'react';
import QuickNote from './QuickNote';
import { X, ListTodo } from 'lucide-react';

const QuickNoteWidget = ({ isDark }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-40 lg:bottom-4 right-2 lg:right-4 z-30">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 lg:p-3 shadow-lg"
      >
        {isOpen ? <X/> : <ListTodo/>}
        {/* '📝' */}
      </button>

      {/* Quick Note Panel */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-96 shadow-xl rounded-lg">
          <QuickNote isDark={isDark} />
        </div>
      )}
    </div>
  );
};

export default QuickNoteWidget;