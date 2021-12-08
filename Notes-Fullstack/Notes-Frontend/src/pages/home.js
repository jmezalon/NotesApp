import { useState, useEffect } from "react";
import Main from "../Components/Main";
import Sidebar from "../Components/Sidebar";

const Home = ({notebooks}) => {
  const [activeNote, setActiveNote] = useState(false);
  const [allNotes, setAllNotes] = useState([])

  
  
  const getAllNotes = () => {
    setAllNotes([])
    notebooks.map((notebook) => 
    {
      fetch(`http://localhost:9292/${notebook.id}/notes`)
      .then((r) => r.json())
      .catch((e) => console.log(e))
      .then((notes) => {
        setAllNotes([notes, ...allNotes]);
      })
    })
    console.log(allNotes)
  }
  

  useEffect(()=>{
    getAllNotes()
  },[notebooks])
  
  // const getActiveNote = () => {
  //   return notes.find((note) => note.id === activeNote);
  // };


  // const onAddNotebook = () => {
  //   const newNotebook = {
  //     id: uuid(),
  //     title: "Untitled Note",
  //   };
  //   setNotebooks([newNotebook, ...notebooks]);
  // };
  return (
    <div className="App">
      <Sidebar notebooks={notebooks} activeNote={activeNote} setActiveNote={setActiveNote}/>
      <Main />
    </div>
  );
};

export default Home;
