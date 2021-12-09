import { useState } from "react";
import Notes from "./Notes";
import Arrow from "../img/arrow.png";

const Notebook = ({
  notebook,
  setCurrentID,
  currentID,
  activeNote,
  setActiveNote,

  onDeleteNotebook,
}) => {
  const [notes, setNotes] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [text, setText] = useState("notebook.name");

  function handleAddNote() {
    fetch(`http://localhost:9292/${currentID}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Add title",
        content: "",
        notebook_id: currentID,
      }),
    })
      .then((r) => r.json())
      .then((note) => {
        setNotes([note, ...notes]);
        setActiveNote(note.id);
      });
  }

  const onDeleteNote = (idToDelete) => {
    setNotes(notes.filter((note) => note.id !== idToDelete));
    setActiveNote(false)
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

  // const sortedNotes = notes.sort((a, b) => b.last_modified - a.last_modified);

  // const setActiveNotebook = () => {
  //   getNotes(notebook.id);
  // };

  function getNotes(id) {
    fetch(`http://localhost:9292/${id}/notes`)
      .then((r) => r.json())
      .catch((e) => console.log(e))
      .then((notes) => {
        setNotes(notes);
      });
  }

  function handleDeleteNotebook() {
    fetch(`http://localhost:9292/notebooks/${notebook.id}`, {
      method: "DELETE",
    }).then(() => onDeleteNotebook(notebook.id));
  }

  // const handleDoubleClick = () => {
  //   // fetch(`http://localhost:9292/notebooks/${activeNote}`, {
  //   //   method: "PATCH",
  //   //   headers: {
  //   //     "Content-Type": "application/json",
  //   //   },
  //   //   body: JSON.stringify({ title: "Im changed" }),
  //   // });
  //   console.log(notebook.id)
  // }

  function toggleInput() {
    setToggle(false);
  }

  function handleChange(event) {
    setText(event.target.value);
  }

  // function onDeleteNote(obj) {
  //   const updatedNotes = notes.filter((note) => note.id !== obj.id);
  //   setNotes(updatedNotes);
  // }

  return (
    <div
      className={`app-sidebar-notebook ${
        notebook.id === currentID && "active"
      }`}
      onClick={() => {
        getNotes(notebook.id);
        setCurrentID(notebook.id);
      }}
    >
      <input type="checkbox" id="A" />
      <img src={Arrow} alt="" className="arrow" />
      {toggle ? (
        <p onDoubleClick={toggleInput}>{text}</p>
      ) : (
        <input type="text" value={text} onChange={handleChange} onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === 'Escape') {
          setToggle(true)
          event.preventDefault()
          event.stopPropagation()
    }
  }}
/>
      )}
      <label htmlFor="A">
        {notebook.title}
      </label>
      <button onClick={handleAddNote}>Add Note</button>
      <button onClick={handleDeleteNotebook}>Delete Notebook</button>
      <ul>
        {notes.length !== 0 &&
          notes.map((note) => (
            <Notes
              note={note}
              activeNote={activeNote}
              setActiveNote={setActiveNote}
              onDeleteNote={onDeleteNote}
            />
          ))}
      </ul>
    </div>
  );
};

export default Notebook;
