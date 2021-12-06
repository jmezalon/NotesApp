import './App.css';
import Navbar from './Components/Navbar';
import Home from "./pages/Home";
import Login from './pages/Login';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const user = false;
  return (
    <BrowserRouter>
      <div>
        <Navbar user={user}/>
        <Routes>
          <Route path="/" element={user ? <Navigate to ="/home"/> : <Login />} />
          <Route path="/:user" element={user ? <Home/> : <Navigate to="/"/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
