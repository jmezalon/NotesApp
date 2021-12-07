import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [user, setUser] = useState("");
  const [notebooks, setNotebooks] = useState([]);
  const [loginFormData, setLoginFormData] = useState({
    name: "",
    password: "",
  });

  useEffect(() => {
    fetch(`http://localhost:9292/${user.id}/notebooks`)
      .then((r) => r.json())
      .catch((e) => console.log(e))
      .then((data) => setNotebooks(data));
  }, [user]);

  const handleLoginChange = (e) => {
    setLoginFormData({
      ...loginFormData,
      [e.target.name]: e.target.value,
    });
  };

  function onLoginSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:9292/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: loginFormData.name,
      }),
    })
      .then((r) => r.json())
      .catch((e) => {
        console.log(e);
        return <p>add password</p>;
      })
      .then((user) => {
        if (user) {
          if (user.password === loginFormData.password) {
            setUser(user);
          } else {
            console.log("You aint valid");
          }
        } else {
          console.log("We got em");
        }
      });
  }
  return (
    <BrowserRouter>
      <div>
        <Navbar user={user} />
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <Navigate to="/home" />
              ) : (
                <Login
                  onLoginSubmit={onLoginSubmit}
                  loginFormData={loginFormData}
                  handleLoginChange={handleLoginChange}
                />
              )
            }
          />
          <Route path="/:id" element={user ? <Home /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
