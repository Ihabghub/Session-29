interface Note {
  text: string;
  priority: string;
  category: string;
}

interface NoteItemProps {
  note: Note;
  onDelete: () => void;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, onDelete }) => {
  const priorityClass = {
    'Very Low': 'bg-gray-300',
    Low: 'bg-brown-300',
    Medium: 'bg-green-300',
    High: 'bg-yellow-300',
    'Very High': 'bg-red-300',
  }[note.priority];

  return (
    <div className={`${priorityClass} p-4 rounded mb-2`}>
      <div className="flex justify-between">
        <div>Category: {note.category}</div>
        <button onClick={onDelete} className="text-red-500">Delete</button>
      </div>
      <p>{note.text}</p>
    </div>
  );
};

export default NoteItem;
