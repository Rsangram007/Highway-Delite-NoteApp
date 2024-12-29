import { useState } from "react";
import { Plus } from "lucide-react";
import axios from "axios";

interface Note {
  _id: string;
  content: string;
}

interface NoteFormProps {
  onNoteAdded: (note: Note) => void;
}

export function NoteForm({ onNoteAdded }: NoteFormProps) {
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.post(
        "http://localhost:5000/note/Createnotes",
        { content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setContent("");
      onNoteAdded(response.data); // Calling the function passed from the parent component
    } catch (err) {
      console.error("Error adding note", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-lg p-6 mb-8 max-w-lg mx-auto"
    >
      <textarea
        placeholder="Write your note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-24 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
      />
      <button
        type="submit"
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 ease-in-out flex items-center gap-2"
      >
        <Plus size={20} />
        Add Note
      </button>
    </form>
  );
}
