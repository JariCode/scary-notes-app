import { useState, useEffect } from "react";
import NoteForm from "./components/NoteForm";
import NoteCard from "./components/NoteCard";
import Header from "./components/Header";

function App() {

  // Muistiinpanot stateen.
  // Käytetään lazy initial statea, jotta localStorage luetaan vain kerran alussa.
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("scaryNotes");
    return saved ? JSON.parse(saved) : [];
  });

  // Tallennetaan muistiinpanot localStorageen aina kun notes muuttuu
  useEffect(() => {
    localStorage.setItem("scaryNotes", JSON.stringify(notes));
  }, [notes]);

  // Lisää uusi muistiinpano.
  // Luodaan uniikki id Date.now():lla.
  const addNote = (note) => {
    setNotes([...notes, { ...note, id: Date.now() }]);
  };

  //Muokkaa muistiinpanoa id:n perusteella.
  const editNote = (id, updatedNote) => {
    setNotes(notes.map(note => note.id === id ? { ...note, ...updatedNote } : note));
  }

  // Poistaa muistiinpanon id:n perusteella
  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  // Järjestää muistiinpanot uudelleen drag and drop:lla
  const reorderNotes = (draggedIndex, targetIndex) => {
    const newNotes = [...notes];
    const [draggedNote] = newNotes.splice(draggedIndex, 1);
    newNotes.splice(targetIndex, 0, draggedNote);
    setNotes(newNotes);
  };

  return (
    <div>
      {/* Sivun header (logo, kuu, sumu jne.) */}
      <Header />

      {/* Pääsisältökontti */}
      <div className="container">
        
        {/* Lomake uuden muistiinpanon lisäämiseen */}
        <NoteForm addNote={addNote} />

        {/* Listataan kaikki muistiinpanot */}
        {notes.map((note, index) => (
          <NoteCard
            key={note.id}
            note={note}
            index={index}
            editNote={editNote}
            deleteNote={deleteNote}
            reorderNotes={reorderNotes}
          />
        ))}

      </div>

      {/* Zombie taustaelementti - sisällön jälkeen */}
      <div className="zombie"></div>
    </div>
  );
}

export default App;
