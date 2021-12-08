import { useState, useEffect } from "react";
import Main from "../Components/Main";
import Sidebar from "../Components/Sidebar";

const Home = ({notebooks}) => {
  const [activeNote, setActiveNote] = useState(false);
  const [allNotes, setAllNotes] = useState([])
  const [note, setNote] = useState([])


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
      <Main activeNote={activeNote}/>
    </div>
  );
};

export default Home;
