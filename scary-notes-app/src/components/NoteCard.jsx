import { useState } from "react";

// Yksittäinen muistiinpanokortti.
// Saa propsina:
// - note: muistiinpanon tiedot (title, content, id)
// - deleteNote: funktio muistiinpanon poistamiseen
// - editNote: funktio muistiinpanon muokkaamiseen
function NoteCard({ note, deleteNote, editNote }) {
  // Tieto siitä, onko muistiinpano muokkaustilassa
  const [isEditing, setIsEditing] = useState(false);
  
  // Väliaikaiset arvot muokkausta varten
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedContent, setEditedContent] = useState(note.content);

  // Tallentaa muokatut tiedot
  const handleSave = () => {
    editNote(note.id, { title: editedTitle, content: editedContent });
    setIsEditing(false);
  };

  // Peruuttaa muokkauksen ja palaa alkuperäisiin arvoihin
  const handleCancel = () => {
    setEditedTitle(note.title);
    setEditedContent(note.content);
    setIsEditing(false);
  };

  // Aloittaa muokkauksen
  const handleEdit = () => {
    setEditedTitle(note.title);
    setEditedContent(note.content);
    setIsEditing(true);
  };

  return (
    // Kortin ulompi säiliö
    <div className="note-card">
      
      {isEditing ? (
        // Muokkaustila
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            placeholder="Otsikko"
          />
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            placeholder="Kirjoita muistiinpanosi tähän..."
            rows="5"
          />
          <button onClick={handleSave}>Tallenna</button>
          <button onClick={handleCancel}>Peruuta</button>
        </>
      ) : (
        // Normaali näkymä
        <>
          {/* Muistiinpanon otsikko */}
          <h3>{note.title}</h3>

          {/* 
            Muistiinpanon sisältö.
            whiteSpace: "pre-line" näyttää \n rivinvaihdot oikein.
          */}
          <p style={{ whiteSpace: "pre-line" }}>
            {note.content}
          </p>

          {/* Muokkauspainike */}
          <button onClick={handleEdit}>
            Muokkaa
          </button>

          {/* Poistopainike, joka kutsuu deleteNote-funktiota id:n kanssa */}
          <button onClick={() => deleteNote(note.id)}>
            Poista
          </button>
        </>
      )}

    </div>
  );
}

export default NoteCard;
