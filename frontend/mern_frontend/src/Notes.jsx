import { useEffect, useState } from "react";
import axios from "axios";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:3000/api/notes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotes(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addNote = async (e) => {
    e.preventDefault();
    if (!title || !content) return;

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:3000/api/notes",
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      setContent("");
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNote = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:3000/api/notes/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-gray-800 min-h-screen w-screen text-white flex flex-col items-center py-6 overflow-hidden">
      <h1 className="text-3xl mb-4">Notes App</h1>

      {/* Add Note Form */}
      <form
        onSubmit={addNote}
        className="bg-gray-900 p-4 rounded w-96"
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-2 rounded bg-gray-700 outline-none break-words"
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 mb-2 rounded bg-gray-700 outline-none break-words whitespace-pre-wrap resize-none overflow-y-auto"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded"
        >
          Add Note
        </button>
      </form>

      {/* Notes List */}
      <div className="mt-6">
        {notes.map((note) => (
          <div
            key={note._id}
            className="bg-gray-900 p-4 rounded w-96 mt-4"
          >
            <h3 className="text-xl font-semibold break-words">
              {note.title}
            </h3>

            <p className="text-gray-300 break-words whitespace-pre-wrap max-h-32 overflow-y-auto">
              {note.content}
            </p>

            <button
              onClick={() => deleteNote(note._id)}
              className="mt-2 bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
