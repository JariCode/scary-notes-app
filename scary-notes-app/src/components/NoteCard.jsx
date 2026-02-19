function NoteCard({ note, deleteNote }) {
  return (
    <div className="note-card">
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <button onClick={() => deleteNote(note.id)}>
        Poista
      </button>
    </div>
  );
}

export default NoteCard;
