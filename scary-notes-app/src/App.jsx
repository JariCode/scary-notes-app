import { useState, useEffect } from "react";
import NoteForm from "./components/NoteForm";
import NoteCard from "./components/NoteCard";
import Header from "./components/Header";

import { auth, provider, db } from "./firebase";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
  query,
  orderBy
} from "firebase/firestore";

function App() {

  // ================= AUTH =================

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  // ================= FIRESTORE NOTES =================

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (!user) {
      setNotes([]);
      return;
    }

    const q = query(
      collection(db, "users", user.uid, "notes"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notesArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotes(notesArray);
    });

    return () => unsubscribe();
  }, [user]);

  // CREATE
  const addNote = async (note) => {
    if (!user) return;

    await addDoc(
      collection(db, "users", user.uid, "notes"),
      {
        ...note,
        createdAt: new Date()
      }
    );
  };

  // UPDATE
  const editNote = async (id, updatedNote) => {
    if (!user) return;

    await updateDoc(
      doc(db, "users", user.uid, "notes", id),
      updatedNote
    );
  };

  // DELETE
  const deleteNote = async (id) => {
    if (!user) return;

    await deleteDoc(
      doc(db, "users", user.uid, "notes", id)
    );
  };

  // Drag & Drop (vain UI)
  const reorderNotes = (draggedIndex, targetIndex) => {
    const newNotes = [...notes];
    const [draggedNote] = newNotes.splice(draggedIndex, 1);
    newNotes.splice(targetIndex, 0, draggedNote);
    setNotes(newNotes);
  };

  // ================= UI =================

  return (
    <div>

      <Header />

      <div className="auth-box">
        {user ? (
          <>
            <h3 className="user-name">
              {user.displayName}
            </h3>
            <button onClick={handleLogout}>
              Kirjaudu ulos
            </button>
          </>
        ) : (
          <button onClick={handleLogin}>
            Kirjaudu Googlella
          </button>
        )}
      </div>

      {user ? (
        <div className="container">

          <NoteForm addNote={addNote} />

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
      ) : (
        <p
          style={{
            textAlign: "center",
            marginTop: "2rem",
            color: "#39ff14"
          }}
        >
          Kirjaudu sisään nähdäksesi muistiinpanosi
        </p>
      )}

      <div className="zombie"></div>

    </div>
  );
}

export default App;