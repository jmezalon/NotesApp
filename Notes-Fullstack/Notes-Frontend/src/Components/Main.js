import ReactMarkdown from "react-markdown";
import {useState} from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function Main({ activeNote, onUpdateNote, formData, handleChange }) {
  const onEditField = (key, value) => {
    onUpdateNote({
      ...activeNote,
      [key]: value,
      last_modified: Date.now(),
      })
  };

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
        <textarea
          id="content"
          placeholder="Write you notes here..."
          value={activeNote.content}
          onChange={(e) => onEditField("content", e.target.value)}
        />
        {/* <ReactQuill
          name="content"
          placeholder="Write you notes here..."
          theme="snow"
          value={activeNote.content}
          onChange={(e) => onEditField("content", e.target.value)}
          // value={formData.content}
          // onChange={handleChange}
        /> */}
      </div>
      <div className="app-main-note-preview">
        <h1 className="preview-title">{activeNote.title}</h1>
        <ReactMarkdown className="markdown-preview">
          {activeNote.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default Main;