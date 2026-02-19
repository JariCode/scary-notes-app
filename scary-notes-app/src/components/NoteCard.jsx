// Yksittäinen muistiinpanokortti.
// Saa propsina:
// - note: muistiinpanon tiedot (title, content, id)
// - deleteNote: funktio muistiinpanon poistamiseen
function NoteCard({ note, deleteNote }) {
  return (
    // Kortin ulompi säiliö
    <div className="note-card">
      
      {/* Muistiinpanon otsikko */}
      <h3>{note.title}</h3>

      {/* 
        Muistiinpanon sisältö.
        whiteSpace: "pre-line" näyttää \n rivinvaihdot oikein.
      */}
      <p style={{ whiteSpace: "pre-line" }}>
        {note.content}
      </p>

      {/* Poistopainike, joka kutsuu deleteNote-funktiota id:n kanssa */}
      <button onClick={() => deleteNote(note.id)}>
        Poista
      </button>

    </div>
  );
}

export default NoteCard;
