import {useState} from "react"
import './App.css';
import Navbar from './Components/Navbar';
import Home from "./pages/Home";
import Login from './pages/Login';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [user, setUser] = useState(false);
  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: ""
  })

  const handleLoginChange = (e) => {
    setLoginFormData({
      ...loginFormData, [e.target.name] : e.target.value
    })
  }

  const onLoginSubmit = (user) => {
    setUser(user)
    console.log(user)
  }
  return (
    <BrowserRouter>
      <div>
        <Navbar user={user}/>
        <Routes>
          <Route path="/" element={user ? <Navigate to ="/home"/> : <Login onLoginSubmit={onLoginSubmit} loginFormData={loginFormData} handleLoginChange={handleLoginChange} />} />
          <Route path="/:id" element={user ? <Home/> : <Navigate to="/"/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
