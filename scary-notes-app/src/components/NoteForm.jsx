import { useState } from "react";

function NoteForm({ addNote }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !content) return;

    addNote({ title, content });
    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Kirottu otsikko..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <textarea
        placeholder="Mitä synkkää mielessäsi liikkuu..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <br />
      <button type="submit">Lisää</button>
    </form>
  );
}

export default NoteForm;
