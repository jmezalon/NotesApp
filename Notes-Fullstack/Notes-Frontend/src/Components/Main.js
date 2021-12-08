import ReactMarkdown from "react-markdown";
import {useEffect, useState} from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function Main({ activeNote, onUpdateNote }) {
  const [workingNote, setWorkingNote] = useState(false)
  
  const onEditField = (key, value) => {
    
    onUpdateNote({
      ...workingNote,
      [key]: value,
      last_modified: Date.now(),
      })
  };

  useEffect(() => {
    fetch(`http://localhost:9292/notes/${activeNote}`)
    .then((r) => r.json())
    .then((note) => setWorkingNote(workingNote))
  }, [activeNote]);

  

  if(!activeNote) {return <div className="no-active-note">No Note Selected</div>}


  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        <input
          type="text"
          id="title"
          value={activeNote.title}
          onChange={(e) => onEditField("title", e.target.value)}
          autoFocus
        />
        {/* <textarea
          id="content"
          placeholder="Write you notes here..."
          value={activeNote.content}
          onChange={(e) => onEditField("content", e.target.value)}
        /> */}
        <ReactQuill
          name="content"
          placeholder="Write you notes here..."
          theme="snow"
          value={activeNote.content}
          onChange={(e) => onEditField("content", e)}
          // value={formData.content}
          // onChange={handleChange}
        />
      </div>
      <div className="app-main-note-preview">
        <h1 className="preview-title">{activeNote.title}</h1>
        <ReactMarkdown className="markdown-preview">
          {/* {activeNote.content} */}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default Main;