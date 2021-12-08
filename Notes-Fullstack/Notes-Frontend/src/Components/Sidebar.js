import Notebook from "./Notebook";

function Sidebar({ notes, onAddNote, onDeleteNote, activeNote, setActiveNote, onAddNotebook, notebooks }) 
{

  return (
    <div className="app-sidebar">
      <div className="app-sidebar-header">
        <h1>Your Notes</h1>
        <button onClick={onAddNote}>Add Note</button>
        <button onClick={onAddNotebook}>Add Notebook</button>
      </div>
      <div className="nav">
        <div className="multi-level">
          {/* {notebooks.map((note) => (
            <Notebook
              note={note}
              onDeleteNote={onDeleteNote}
              activeNote={activeNote}
              setActiveNote={setActiveNote}
            />
          ))} */}
          <Notebook
            // notebook={notebook}
            notes={notes}
            onAddNote={onAddNote}
            onDeleteNote={onDeleteNote}
            activeNote={activeNote}
            setActiveNote={setActiveNote}
          />
          {/* {notebooks.map((notebook) => (
            <Notebook
              notebook={notebook}
              notes={notes}
              onAddNote={onAddNote}
              onDeleteNote={onDeleteNote}
              activeNote={activeNote}
              setActiveNote={setActiveNote}
            />
          ))} */}
        </div>
      </div>
    </div>
  );
}


export default Sidebar;

