import Notes from "./Notes";
import Arrow from "../img/arrow.png";

const Notebook = ({
  notes,
  onDeleteNote,
  activeNote,
  setActiveNote,
}) => {
  const sortedNotes = notes.sort((a, b) => b.last_modified - a.last_modified);

  return (
    <div
      className={`app-sidebar-note ${notebook.id === activeNote && "active"}`}
      onClick={() => setActiveNote(notebook.id)}
    >
      <input type="checkbox" id="A" />
      <img src={Arrow} alt="" className="arrow" />
      <label htmlfor="A">{notebook.id}</label>
      <ul>
        {sortedNotes.map((note) => (
          <Notes
            note={note}
            onDeleteNote={onDeleteNote}
            activeNote={activeNote}
            setActiveNote={setActiveNote}
          />
        ))}
      </ul>
    </div>
  );
};

export default Notebook;
