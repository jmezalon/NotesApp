import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function Main({ activeNote, onSavedNote }) {
  // const [workingNote, setWorkingNote] = useState(false);
  const [title, setTitle] = useState("Untitled");
  const [content, setContent] = useState("Hi");

  const handleSave = () => {
    fetch(`http://localhost:9292/notes/${activeNote}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: title, content: content }),
    }).then((r) => r.json());
    // .then((note) => onSavedNote(note));
  };

  useEffect(() => {
    fetch(`http://localhost:9292/notes/${activeNote}`)
      .then((r) => r.json())
      .then((note) => {
        // setWorkingNote(note);
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
          onBlur={title !== "Untitled" && handleSave}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
        <textarea
          id="content"
          placeholder="Write you notes here..."
          value={content}
          onBlur={content !== "Hi" && handleSave}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Main;
