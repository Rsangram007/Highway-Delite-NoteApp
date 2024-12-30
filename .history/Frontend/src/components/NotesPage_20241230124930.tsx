import { useState, useEffect } from "react";
import axios from "axios";
import { NoteForm } from "./NoteForm";
import { NoteCard } from "./NoteCard";

interface Note {
  _id: string;
  content: string;
}

interface User {
  name: string;
  email: string;
}

export function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [user, setUser] = useState<User | null>(null);

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.get("http://localhost:5000/note/Notes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes(response.data);
    } catch (err) {
      console.error("Error fetching notes", err);
    }
  };

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.get(
        "https://highway-delite-noteapp-1.onrender.com/user/Getuser",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("user", response);
      setUser(response.data.data);
    } catch (err) {
      console.error("Error fetching user data", err);
    }
  };

  useEffect(() => {
    fetchNotes();
    fetchUserData();
  }, []);

  const handleNoteAdded = (newNote: Note) => {
    setNotes((prevNotes) => [...prevNotes, newNote]); // Add new note to state
  };

  const handleNoteDeleted = (noteId: string) => {
    setNotes(notes.filter((note) => note._id !== noteId)); // Remove note from state
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/"; // Redirect to login page
  };

  return (
    <div className="container mx-auto p-6">
      {/* Centered Box Container for User Info */}
      {user && (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg mb-8">
          <h1 className="text-3xl font-semibold text-gray-800 text-center">
            Welcome, {user.name}!
          </h1>
          <p className="text-xl text-gray-600 text-center mt-2">
            Email: {user.email}
          </p>
        </div>
      )}

      {/* Logout Button */}
      <div className="text-center mb-6">
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
        >
          Logout
        </button>
      </div>

      {/* Note Form */}
      <NoteForm onNoteAdded={handleNoteAdded} />

      {/* Notes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {notes.map((note) => (
          <NoteCard key={note._id} note={note} onDelete={handleNoteDeleted} />
        ))}
      </div>
    </div>
  );
}
