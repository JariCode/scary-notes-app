import { useState } from "react";

// Lomake uuden muistiinpanon lisäämiseen
function NoteForm({ addNote }) {
  // Otsikon tila
  const [title, setTitle] = useState("");

  // Sisällön tila
  const [content, setContent] = useState("");

  // Käsittelee lomakkeen lähetyksen
  const handleSubmit = (e) => {
    if (e) e.preventDefault(); // Estää sivun uudelleenlatauksen

    // Ei lisätä tyhjää muistiinpanoa
    if (!title.trim() || !content.trim()) return;

    // Lisätään uusi muistiinpano parent-komponenttiin
    addNote({ title, content });

    // Tyhjennetään kentät lisäyksen jälkeen
    setTitle("");
    setContent("");
  };

  // ENTER lisää muistiinpanon
  // SHIFT + ENTER tekee rivinvaihdon textareassa
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Estää rivinvaihdon
      handleSubmit();
    }
  };

  return (
    // Lomake, joka kutsuu handleSubmit-funktiota submitissa
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Kirottu otsikko..."
        value={title}
        onChange={(e) => setTitle(e.target.value)} // Päivittää otsikon tilan
        onKeyDown={handleKeyDown}
      />

      <br />

      <textarea
        placeholder="Mitä synkkää mielessäsi liikkuu..."
        value={content}
        onChange={(e) => setContent(e.target.value)} // Päivittää sisällön tilan
        onKeyDown={handleKeyDown}
      />

      <br />

      {/* Lähetyspainike */}
      <button type="submit">Lisää</button>
    </form>
  );
}

export default NoteForm;
