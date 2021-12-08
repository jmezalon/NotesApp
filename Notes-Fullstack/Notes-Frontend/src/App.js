import { useState } from "react";
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
    email: "",
    password: "",
  });

  function getNotebooks(id) {
    fetch(`http://localhost:9292/${id}/notebooks`)
      .then((r) => r.json())
      .catch((e) => console.log(e))
      .then((notebooks) => {
        if (notebooks.length === 0) {
          fetch(`http://localhost:9292/${id}/notebooks`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: "new notebook", user_id: id }),
          })
            .then((r) => r.json())
            .catch((e) => console.log(e))
            .then((notebook) => setNotebooks([notebook]));
        } else {
          setNotebooks(notebooks);
        }
      });
  }

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
            getNotebooks(user.id);
            setUser(user);
            setLoginFormData({ name: "", email: "", password: "" });
          } else {
            console.log("You aint valid");
          }
        } else {
          console.log("We got em");
        }
      });
  }

  function onDeleteNotebook(id) {
    const updateNotebooks = notebooks.filter((nbk) => nbk.id !== id);
    setNotebooks(updateNotebooks);
  }
  return (
    <BrowserRouter>
      <div>
        <Navbar
          user={user}
          setNotebooks={setNotebooks}
          setUser={setUser}
          setLoginFormData={setLoginFormData}
        />
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
                  setUser={setUser}
                  getNotebooks={getNotebooks}
                  setLoginFormData={setLoginFormData}
                />
              )
            }
          />
          <Route
            path="/:id"
            element={
              user ? (
                <Home
                  notebooks={notebooks}
                  setNotebooks={setNotebooks}
                  user={user}
                  onDeleteNotebook={onDeleteNotebook}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
