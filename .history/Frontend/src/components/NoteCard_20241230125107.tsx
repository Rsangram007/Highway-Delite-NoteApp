import { Trash2 } from "lucide-react";
import axios from "axios";

interface Note {
  _id: string;
  content: string;
}

interface NoteCardProps {
  note: Note;
  onDelete: (noteId: string) => void;
}

export function NoteCard({ note, onDelete }: NoteCardProps) {
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await axios.delete(
        `https://highway-delite-noteapp-1.onrender.com/note/notes/${note._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onDelete(note._id);
    } catch (err) {
      console.error("Error deleting note", err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg text-gray-800">{note.content}</h3>
        <button
          onClick={handleDelete}
          className="text-gray-500 hover:text-red-500 transition-colors"
        >
          <Trash2 size={20} />
        </button>
      </div>
      <p className="text-gray-600 mt-2 whitespace-pre-wrap">{note.content}</p>
    </div>
  );
}
