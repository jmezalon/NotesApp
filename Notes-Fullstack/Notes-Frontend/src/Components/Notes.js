

const Notes = ( {note, onDeleteNote, activeNote, setActiveNote} ) => {
  return (
    <li
      className={`app-sidebar-note ${note.id === activeNote && "active"}`}
      onClick={() => setActiveNote(note.id)}
    >
      <div className="sidebar-note-title">
        <strong>{note.title}</strong>
        <button onClick={() => onDeleteNote(note.id)}>Delete</button>
      </div>
      {/* <p>{note.content && note.content.substr(0, 40) + "..."}</p>
      <small classname="note-meta">
        Last modified{" "}
        {new Date(note.last_modified).toLocaleDateString("en-us", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </small> */}
    </li>
  );
};

export default Notes
