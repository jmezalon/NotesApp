import { useState } from "react";
import Notes from "./Notes";
import Arrow from "../img/arrow.png";

const Notebook = ({
  notebook,
  activeNote,
  setActiveNote,
  onUpdateTitle,
  onDeleteNotebook,
  forRender,
  setHideSidebar,
}) => {
  const [notes, setNotes] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [text, setText] = useState("");
  const [active, setActive] = useState(false);
  const [doRender, setDoRender] = useState(1);

  function handleAddNote() {
    fetch(`http://localhost:9292/${notebook.id}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Add title",
        content: "",
        notebook_id: notebook.id,
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

  // const sortedNotes = notes.sort((a, b) => b.last_modified - a.last_modified);

  // const setActiveNotebook = () => {
  //   getNotes(notebook.id);
  // };
  if (doRender !== forRender) {
    setDoRender(forRender);
    getNotes(notebook.id);
  }

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

  function validatteTitle(input) {
    const alpha = Array.from(Array(26)).map((e, i) => i + 65);
    const alphabet = alpha.map((x) => String.fromCharCode(x).toLowerCase());
    return alphabet.includes(input[0].toLowerCase());
  }

  const onNotebookTitleChange = () => {
    validatteTitle(text) &&
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
    setActive(!active);
  };

  return (
    <div className={`app-sidebar-notebook ${active ? "active" : "inactive"}`}>
      <img
        src={Arrow}
        alt=""
        className={`${active ? "active" : "inactive"} arrow`}
      />
      {!toggle ? (
        <label
          onClick={() => {
            getNotes(notebook.id);
            handleActive();
          }}
          onDoubleClick={() => setToggle(!toggle)}
          htmlFor="notebook title"
        >
          <div className="app_sidebar_notebook--buttons">
            {notebook.title}
            <button className="bye_notebook" onClick={handleDeleteNotebook}>
              Delete Notebook
            </button>
          </div>
        </label>
      ) : (
        <input
          id="notebook-title"
          type="text"
          name="text"
          maxLength={20}
          placeholder={notebook.title}
          autoFocus
          onChange={handleChange}
          onBlur={handleFocusChange}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === "Escape") {
              onNotebookTitleChange();
            }
          }}
          value={text}
        />
      )}
      {/* <hr /> */}
      <ul>
        {notes.length !== 0 &&
          notes.map((note) => (
            <Notes
              className="my_notes"
              key={note.id}
              note={note}
              activeNote={activeNote}
              setActiveNote={setActiveNote}
              onDeleteNote={onDeleteNote}
              setHideSidebar={setHideSidebar}
            />
          ))}
        <button
          className={`${active ? "active" : "inactive"} add_button`}
          onClick={handleAddNote}
        >
          Create Note
        </button>
      </ul>
    </div>
  );
};

export default Notebook;
