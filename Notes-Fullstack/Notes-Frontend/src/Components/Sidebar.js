import Notebook from "./Notebook";
import {useState} from "react"

function Sidebar({ onAddNote, onAddNotebook, notebooks }) 
{
  const [currentID, setCurrentID] = useState("")

  return (
    <div className="app-sidebar">
      <div className="app-sidebar-header">
        <h1>Your Notes</h1>
        <button onClick={() => console.log(currentID)}>Add Note</button>
        <button onClick={onAddNotebook}>Add Notebook</button>
      </div>
      <div className="nav">
        <div className="multi-level">
          {notebooks.length !== 0 && notebooks.map((notebook) => (
            <Notebook
              notebook={notebook}
              setCurrentID={setCurrentID}
              currentID={currentID}
            />
          ))}
        </div>
      </div>
    </div>
  );
}


export default Sidebar;

