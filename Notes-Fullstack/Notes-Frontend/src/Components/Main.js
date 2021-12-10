import { useEffect, useState } from "react";

function Main({
  activeNote,
  setHideSidebar,
  hideSidebar,
  setForRender,
  forRender,
  pro_url,
}) {
  const [title, setTitle] = useState("Untitled");
  const [content, setContent] = useState("Hi");

  const handleSave = () => {
    fetch(`${pro_url}/notes/${activeNote}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: title, content: content }),
    });
    setForRender((forRender += 1));
  };

  useEffect(() => {
    fetch(`${pro_url}/notes/${activeNote}`)
      .then((r) => r.json())
      .then((note) => {
        setTitle(note.title);
        setContent(note.content);
      });
  }, [activeNote, pro_url]);

  if (!activeNote) {
    return <div className="no-active-note">No Note Selected</div>;
  }

  return (
    <div className={hideSidebar ? "app-main" : "hide-app-main"}>
      <div
        className={!hideSidebar ? "hide-back-button" : "back-button"}
        onClick={() => setHideSidebar(false)}
      >
        {" "}
        {"<"}{" "}
      </div>
      <div className="app-main-note-edit">
        <input
          type="text"
          id="title"
          placeholder="add title"
          value={title}
          onBlur={handleSave}
          maxLength={18}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
        <textarea
          id="content"
          placeholder="Write you notes here..."
          value={content}
          onBlur={handleSave}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Main;
