import { useState } from "react";
import uuid from "react-uuid";
import Main from "../Components/Main";
import Sidebar from "../Components/Sidebar";
import Notebook from "../Components/Notebook";

const Home = ({notebooks}) => {
  const [activeNote, setActiveNote] = useState(false);

  // const onAddNotebook = () => {
  //   const newNotebook = {
  //     id: uuid(),
  //     title: "Untitled Note",
  //   };
  //   setNotebooks([newNotebook, ...notebooks]);
  // };
  return (
    <div className="App">
      <Sidebar notebooks={notebooks}/>
      <Main />
    </div>
  );
};

export default Home;
