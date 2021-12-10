import Notebook from "./Notebook";

function Sidebar({
  onAddNotebook,
  notebooks,
  activeNote,
  setActiveNote,
  setNotebooks,
  onDeleteNotebook,
  user,
  forRender,
  setHideSidebar,
  hideSidebar,
}) {
  function handleAddNotebook() {
    fetch(`http://localhost:9292/${user.id}/notebooks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "New notebook",
        user_id: user.id,
      }),
    })
      .then((r) => r.json())
      .then((notebook) => onAddNotebook(notebook));
  }

  function onUpdateTitle(updateTitle) {
    const updatedNotebook = notebooks.map((title) => {
      if (title.id === updateTitle.id) {
        return updateTitle;
      } else {
        return title;
      }
    });
    setNotebooks(updatedNotebook);
  }

  return (
    <div className={hideSidebar && activeNote ? "temp-sidebar" : "app-sidebar"}>
      <div className="app-sidebar-header">
        <h1>Your Notes</h1>
        <button onClick={handleAddNotebook}>Add Notebook</button>
      </div>
      <div className="nav">
        <div className="multi-level">
          {notebooks.length !== 0 &&
            notebooks.map((notebook) => (
              <Notebook
                key={notebook.id}
                onDeleteNotebook={onDeleteNotebook}
                notebook={notebook}
                setHideSidebar={setHideSidebar}
                activeNote={activeNote}
                setActiveNote={setActiveNote}
                onUpdateTitle={onUpdateTitle}
                forRender={forRender}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
