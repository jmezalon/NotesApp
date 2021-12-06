import {useState} from 'react';
import uuid from "react-uuid";
import './App.css';
import Main from './Components/Main';
import AppNavbar from './Components/AppNavbar';
import Sidebar from './Components/Sidebar';
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  const [notes, setNotes] = useState([])
  const [activeNote, setActiveNote] = useState(false)

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "Untitled Note",
      body: "",
      lastModified: Date.now(),
    }
    setNotes([newNote, ...notes])
  }

  const onDeleteNote = (idToDelete) => {
    setNotes(notes.filter((note) => note.id !== idToDelete));
  }

  const onUpdateNote = (updatedNote) => {
    const updatedNotesArray = notes.map((note) => {
      if(note.id === activeNote) {
        return updatedNote;
      }
      return note;
    })

    setNotes(updatedNotesArray)
  }

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  }

  return (
    <>
      <AppNavbar sticky="top" />
      <div className="App">
        <Sidebar
          notes={notes}
          onAddNote={onAddNote}
          onDeleteNote={onDeleteNote}
          activeNote={activeNote}
          setActiveNote={setActiveNote}
        />
        <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
      </div>
    </>
  );
}

export default App;
