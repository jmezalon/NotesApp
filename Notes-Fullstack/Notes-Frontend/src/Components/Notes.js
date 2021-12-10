import { FaTrash } from "react-icons/fa";

const Notes = ({
  note,
  onDeleteNote,
  activeNote,
  setHideSidebar,
  setActiveNote,
  pro_url,
}) => {
  function handleDeleteNote() {
    fetch(`${pro_url}/notes/${note.id}`, {
      method: "DELETE",
    }).then(() => onDeleteNote(note.id));
  }

  return (
    <li
      className={`app-sidebar-note ${note.id === activeNote && "active"}`}
      onClick={() => setActiveNote(note.id)}
    >
      <div className="sidebar-note-title" onClick={() => setHideSidebar(true)}>
        <strong>{note.title || "Untitled"}</strong>
        <button onClick={handleDeleteNote}>
          <FaTrash />
        </button>
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

export default Notes;
