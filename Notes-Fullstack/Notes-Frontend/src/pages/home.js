import { useState } from "react";
import Main from "../Components/Main";
import Sidebar from "../Components/Sidebar";

const Home = ({ notebooks, onDeleteNotebook, setNotebooks, user }) => {
  const [activeNote, setActiveNote] = useState(false);

  // const getActiveNote = () => {
  //   return notes.find((note) => note.id === activeNote);
  // };

  const onAddNotebook = (newNotebook) => {
    setNotebooks([newNotebook, ...notebooks]);
  };
  return (
    <div className="App">
      <Sidebar
        notebooks={notebooks}
        setNotebooks={setNotebooks}
        user={user}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
        onAddNotebook={onAddNotebook}
        onDeleteNotebook={onDeleteNotebook}
      />
      <Main />
    </div>
  );
};

export default Home;
