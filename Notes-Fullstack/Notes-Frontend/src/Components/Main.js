import { useEffect, useState } from "react";


function Main({ activeNote, setForRender, forRender }) {

  const [title, setTitle] = useState("Untitled");
  const [content, setContent] = useState("Hi");

  const handleSave = () => {
    fetch(`http://localhost:9292/notes/${activeNote}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: title, content: content }),
    })
    setForRender(forRender += 1 )
  };

  useEffect(() => {
    fetch(`http://localhost:9292/notes/${activeNote}`)
      .then((r) => r.json())
      .then((note) => {
        setTitle(note.title);
        setContent(note.content);
      });
  }, [activeNote]);

  if (!activeNote) {
    return <div className="no-active-note">No Note Selected</div>;
  }

  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        <input
          type="text"
          id="title"
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
