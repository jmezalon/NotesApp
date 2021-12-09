import { useState } from "react";
import Notes from "./Notes";
import Arrow from "../img/arrow.png";

const Notebook = ({
  notebook,
  setCurrentID,
  currentID,
  activeNote,
  setActiveNote,
  onUpdateTitle,
  onDeleteNotebook,
}) => {
  const [notes, setNotes] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [text, setText] = useState("");
  const [active, setActive] = useState(false)

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
    setActiveNote(false);
  };

  const onSavedNote = (updatedNote) => {
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

  const onNotebookTitleChange = () => {
    text &&
      fetch(`http://localhost:9292/notebooks/${notebook.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: text, user_id: notebook.id }),
      })
        .then((r) => r.json())
        .then((updateNotebook) => {
          onUpdateTitle(updateNotebook);
          setText("");
          setToggle(false);
        });
  };

  function handleChange(event) {
    setText(event.target.value);
  }

  function handleFocusChange() {
    if (text) {
      onNotebookTitleChange();
    } else {
      setToggle(false);
    }
  }

  const handleActive = () => {
    setActive(!active)
  }

  return (
    <div className={`app-sidebar-notebook ${active ?  "active" : "inactive"}`} >
        <img src={Arrow} alt="" className={`${active ?  "active" : "inactive"} arrow`} />
          {!toggle ? (
            <label
              onClick={() => {
                      getNotes(notebook.id); 
                      handleActive();
                    }}
              onDoubleClick={() => setToggle(!toggle)}
              htmlFor="notebook title"
            >{notebook.title}</label>
            ) : (
            <input
              id="notebook-title"
              type="text"
              name="text"
              autoFocus
              autoCapitalize
              onChange={handleChange}
              onBlur={handleFocusChange}
              onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === "Escape") {
                onNotebookTitleChange();
              }
              }}
              value={
              notebook.title !== "New notebook" ? text || notebook.title : text
              }
            />
        )}
      <button onClick={handleAddNote}>Add Note</button>
      <button onClick={handleDeleteNotebook}>Delete Notebook</button>
      <ul>
        {notes.length !== 0 &&
          notes.map((note) => (
            <Notes className="my_notes"
              key={note.id}
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
