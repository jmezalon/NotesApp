import {useState} from "react"
import Notes from "./Notes";
import Arrow from "../img/arrow.png";

const Notebook = ({
  notebook,
  setCurrentID,
  currentID,
  activeNote,
  setActiveNote,

}) => {
  const [notes, setNotes] = useState([]);
  // const onAddNote = () => {
  //   const newNote = {
  //     title: "Untitled Note",
  //     content: " ",
  //     last_modified: Date.now(),
  //   };
  //   setNotes([newNote, ...notes]);
  // };

  // const onDeleteNote = (idToDelete) => {
  //   setNotes(notes.filter((note) => note.id !== idToDelete));
  // };

  const onUpdateNote = (updatedNote) => {
    const updatedNotesArray = notes.map((note) => {
      if (note.id === activeNote) {
        return updatedNote;
      }
      return note;
    });
    setNotes(updatedNotesArray);
  };

  // const sortedNotes = notes.sort((a, b) => b.last_modified - a.last_modified);

  const setActiveNotebook = () => {
    getNotes(notebook.id);
  };

  function getNotes(id) {
    fetch(`http://localhost:9292/${id}/notes`)
      .then((r) => r.json())
      .catch((e) => console.log(e))
      .then((notes) => {
        setNotes(notes);
      });
  }

  return (
    <div
      className={`app-sidebar-notebook ${
        notebook.id === currentID && "active"
      }`}
      onClick={() => {
        setActiveNotebook();
        setCurrentID(notebook.id);
      }}
    >
      <input type="checkbox" id="A" />
      <img src={Arrow} alt="" className="arrow" />
      <label htmlfor="A">{notebook.title}</label>
      <ul>
        {notes.length !== 0 &&
          notes.map((note) => (
            <Notes
              note={note}
              activeNote={activeNote}
              setActiveNote={setActiveNote}
            />
          ))}
      </ul>
    </div>
  );
};

export default Notebook;
