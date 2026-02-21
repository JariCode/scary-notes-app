import { useState } from "react";

// Yksittäinen muistiinpanokortti.
// Saa propsina:
// - note: muistiinpanon tiedot (title, content, id)
// - deleteNote: funktio muistiinpanon poistamiseen
// - editNote: funktio muistiinpanon muokkaamiseen
// - index: muistiinpanon indeksi listassa
// - reorderNotes: funktio muistiinpanojen järjestyksen vaihtamiseen
function NoteCard({ note, deleteNote, editNote, index, reorderNotes }) {
  // Tieto siitä, onko muistiinpano muokkaustilassa
  const [isEditing, setIsEditing] = useState(false);
  
  // Tieto siitä, onko muistiinpano drag over -tilassa
  const [isDragOver, setIsDragOver] = useState(false);
  
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

  // Drag and Drop handlerit
  const handleDragStart = (e) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("draggedIndex", index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const draggedIndex = parseInt(e.dataTransfer.getData("draggedIndex"));
    if (draggedIndex !== index) {
      reorderNotes(draggedIndex, index);
    }
    setIsDragOver(false);
  };

  const handleDragEnd = () => {
    setIsDragOver(false);
  };

  return (
    // Kortin ulompi säiliö
    <div 
      className={`note-card ${isDragOver ? 'drag-over' : ''}`}
      draggable="true"
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onDragEnd={handleDragEnd}
      style={{ cursor: 'move' }}
    >
      
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
