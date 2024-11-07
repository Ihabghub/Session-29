import { useState, useEffect } from 'react';
import NoteItem from './NoteItem';

interface Note {
  text: string;
  priority: string;
  category: string;
}

interface NotesProps {
  username: string;
  onLogout: () => void;
}

const Notes: React.FC<NotesProps> = ({ username, onLogout }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteText, setNoteText] = useState('');
  const [priority, setPriority] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Placeholder for fetching notes from backend
    const fetchNotes = async () => {
      // Call backend API to get notes
      const response = await fetch(`/api/notes?user=${username}`);
      const data = await response.json();
      setNotes(data.notes);
    };
    
    fetchNotes();
  }, [username]);

  const handleCreateNote = async () => {
    if (!noteText || !priority || category === 'Select Category') {
      setError('Please fill out all fields.');
      return;
    }
    setError('');
    const newNote = { text: noteText, priority, category };

    // Placeholder for saving note to backend
    const response = await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: username, note: newNote })
    });
    const data = await response.json();
    setNotes([...notes, data.note]);

    setNoteText('');
    setPriority('');
    setCategory('');
  };

  const handleDeleteNote = async (noteText: string) => {
    // Placeholder for deleting note from backend
    await fetch(`/api/notes?user=${username}&text=${noteText}`, { method: 'DELETE' });
    setNotes(notes.filter(note => note.text !== noteText));
  };

  return (
    <div className="bg-gray-200 p-4 rounded-lg w-screen ">
      <div className="flex justify-between items-center mb-4">
        <h2>Welcome, {username}</h2>
        <button onClick={onLogout} className="text-red-500">Logout</button>
      </div>
      <textarea
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        placeholder="Enter note text"
        className="border p-2 w-full mb-2"
      />
      <div className="mb-2">
        <h3>Priority</h3>
        {['Very Low', 'Low', 'Medium', 'High', 'Very High'].map((p) => (
          <label key={p} className="mr-4">
            <input
              type="radio"
              name="priority"
              value={p}
              checked={priority === p}
              onChange={(e) => setPriority(e.target.value)}
            />
            {p}
          </label>
        ))}
      </div>
      <div className="mb-2">
        <h3>Category</h3>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 w-full"
        >
          <option>Select Category</option>
          <option>Home</option>
          <option>Password</option>
          <option>Work</option>
          <option>General</option>
        </select>
      </div>
      {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
      <button onClick={handleCreateNote} className="bg-blue-500 text-white px-4 py-2 rounded">
        Create Note
      </button>
      <div className="mt-4">
        {notes.map((note, idx) => (
          <NoteItem key={idx} note={note} onDelete={() => handleDeleteNote(note.text)} />
        ))}
      </div>
    </div>
  );
};

export default Notes;
