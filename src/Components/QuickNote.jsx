/* eslint-disable react/prop-types */
import { XIcon, CheckCircle} from 'lucide-react';
import { useState } from 'react';
// import { } from 'react-icons/gi';

const QuickNote = ({ isDark }) => {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('voxai-notes');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentNote, setCurrentNote] = useState('');

  const saveNote = () => {
    if (!currentNote.trim()) return;
    
    const newNote = {
      id: Date.now(),
      text: currentNote,
      timestamp: new Date().toISOString()
    };
    
    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);
    localStorage.setItem('voxai-notes', JSON.stringify(updatedNotes));
    setCurrentNote('');
  };

  return (
    <div className={`quick-note-widget p-4 rounded-lg ${
      isDark ? 'bg-gray-800' : 'bg-white'
    } shadow-lg`}>
      <h3 className="text-lg font-semibold mb-2">Quick Notes</h3>
      <div className="flex gap-2">
        <textarea
          value={currentNote}
          onChange={(e) => setCurrentNote(e.target.value)}
          className={`w-full p-2 rounded-md resize-none overflow-hidden ${
            isDark ? 'bg-gray-700 text-white' : 'bg-gray-100'
          }`}
          placeholder="Take a quick note..."
          rows="1"
        />
        <button
          onClick={saveNote}
          className="px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          <CheckCircle/>
        </button>
      </div>
      
      {/* Recent Notes */}
      <div className="mt-4 space-y-2 max-h-40 overflow-y-auto">
        {notes.map(note => (
          <div 
            key={note.id}
            className={`p-2 rounded flex justify-between items-center ${
              isDark ? 'bg-gray-700' : 'bg-gray-100'
            }`}
          >
            <div>
              <p className="text-sm">{note.text}</p>
              <small className="text-gray-500">
                {new Date(note.timestamp).toLocaleString()}
              </small>
            </div>
            <button
              onClick={() => {
                const updatedNotes = notes.filter(n => n.id !== note.id);
                setNotes(updatedNotes);
                localStorage.setItem('voxai-notes', JSON.stringify(updatedNotes));
              }}
              className="ml-2 px-1 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              <XIcon/>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickNote;