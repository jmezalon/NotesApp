import { useState } from "react";
import uuid from "react-uuid";
import Main from "../Components/Main";
import Sidebar from "../Components/Sidebar";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(false);
  const [formData, setFormData] = useState({
    title: "Untitled Note",
    content: "",
  });
  const [activeNotebook, setActiveNotebook] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const getActiveNotebook = () => {
  //   return notebooks.find((notebook) => notebook.id === activeNote);
  // };

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "Untitled Note",
      content: " ",
      last_modified: Date.now(),
    };
    setNotes([newNote, ...notes]);
    
  };

  const onDeleteNote = (idToDelete) => {
    setNotes(notes.filter((note) => note.id !== idToDelete));
  };

  const onUpdateNote = (updatedNote) => {
    const updatedNotesArray = notes.map((note) => {
      if (note.id === activeNote) {
        return updatedNote;
      }
      return note;
    });

    setNotes(updatedNotesArray);
  };

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  };



  return (
    <div className="App">
      <Sidebar
        notes={notes}
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
      />
      <Main
        activeNote={getActiveNote()}
        onUpdateNote={onUpdateNote}
        handleChange={handleChange}
        formData={formData}
      />
    </div>
  );
};

export default Home;
