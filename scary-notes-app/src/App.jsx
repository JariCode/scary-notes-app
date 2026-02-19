import { useState, useEffect } from "react";
import NoteForm from "./components/NoteForm";
import NoteCard from "./components/NoteCard";
import Header from "./components/Header";

function App() {

  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("scaryNotes");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("scaryNotes", JSON.stringify(notes));
  }, [notes]);

  const addNote = (note) => {
    setNotes([...notes, { ...note, id: Date.now() }]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div>
      <Header />
      
      {/* Zombie taustaelementti */}
      <div className="zombie"></div>

      <div className="container">
        <NoteForm addNote={addNote} />

        {notes.map(note => (
          <NoteCard
            key={note.id}
            note={note}
            deleteNote={deleteNote}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
