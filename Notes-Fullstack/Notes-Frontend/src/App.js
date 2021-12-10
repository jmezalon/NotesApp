import { useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [user, setUser] = useState("");
  const [notebooks, setNotebooks] = useState([]);
  const [throwErr, setThrowErr] = useState(false);
  const [loginFormData, setLoginFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const pro_url = "https://stark-brook-11354.herokuapp.com";
  // const dev_url = 'http://localhost:9292'

  function getNotebooks(id) {
    fetch(`${pro_url}/${id}/notebooks`)
      .then((r) => r.json())
      .catch((e) => console.log(e))
      .then((notebooks) => {
        if (notebooks.length === 0) {
          fetch(`${pro_url}/${id}/notebooks`, {
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
    fetch(pro_url + "/users/login", {
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
            setThrowErr(true);
          }
        } else {
          setThrowErr(true);
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
          setThrowErr={setThrowErr}
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
                  throwErr={throwErr}
                  setThrowErr={setThrowErr}
                  pro_url={pro_url}
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
                  pro_url={pro_url}
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
