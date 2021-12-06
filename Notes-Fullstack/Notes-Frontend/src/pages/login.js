import { useState } from "react";
import Google from "../img/google.png";
import Github from "../img/github.png";
const Login = ({ loginFormData, handleLoginChange, onLoginSubmit }) => {
  const [newUser, setnewUser] = useState(true);
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:9292/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: loginFormData.name,
        // password: loginFormData.password,
      }),
    })
      .then((r) => r.json())
      .then((user) => console.log(user));
  };
  return (
    <div className="login">
      <h1 className="loginTitle">Choose a Login Method</h1>
      <div className="wrapper">
        <div className="left-side">
          <div className="loginButton google">
            <img src={Google} alt="" className="icon" />
            Google
          </div>
          <div className="loginButton github">
            <img src={Github} alt="" className="icon" />
            Github
          </div>
        </div>
        <div className="center">
          <div className="line" />
          <div className="centerText">OR</div>
        </div>
        <div className="right-side">
          {newUser ? (
            <>
              <h2 className="form-header">New User</h2>
              <form>
                <input type="text" placeholder="Username" />
                <input type="text" placeholder="Password" />
                <input type="text" placeholder="Email" />
                <button className="submit">Sign Up</button>
              </form>
              <p>Already have an account?</p>
              <button onClick={() => setnewUser(false)}>Sign In</button>
            </>
          ) : (
            <>
              <h2 className="form-header">Already a user</h2>
              <form onSubmit={handleLoginSubmit}>
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={loginFormData.username}
                  onChange={handleLoginChange}
                />
                <input
                  type="text"
                  placeholder="Password"
                  name="password"
                  value={loginFormData.password}
                  onChange={handleLoginChange}
                />
                <button className="submit">Login</button>
              </form>
              <p>Don't have an account?</p>
              <button onClick={() => setnewUser(true)}>Create account</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
