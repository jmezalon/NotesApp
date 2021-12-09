import { useState } from "react";
import Google from "../img/google.png";
import Github from "../img/github.png";
const Login = ({
  loginFormData,
  handleLoginChange,
  setUser,
  getNotebooks,
  onLoginSubmit,
  setLoginFormData,
  throwErr,
  setThrowErr
}) => {
  const [newUser, setnewUser] = useState(false);
  

  const onSignupSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:9292/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: loginFormData.name,
        email: loginFormData.email,
        password: loginFormData.password,
      }),
    })
      .then((r) => r.json())
      .then((user) => {
        setUser(user);
        getNotebooks(user.id);
        setLoginFormData({ name: "", email: "", password: "" });
      });
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
              <form onSubmit={onSignupSubmit}>
                <input
                  name="name"
                  type="text"
                  placeholder="Username"
                  value={loginFormData.username}
                  onChange={handleLoginChange}
                />
                <input
                  name="password"
                  type="text"
                  placeholder="Password"
                  value={loginFormData.password}
                  onChange={handleLoginChange}
                />
                <input
                  name="email"
                  type="text"
                  placeholder="Email"
                  value={loginFormData.email}
                  onChange={handleLoginChange}
                />
                <button className="submit">Sign Up</button>
              </form>
              <p>Already have an account?</p>
              <button onClick={() => setnewUser(false)}>Sign In</button>
            </>
          ) : (
            <>
              <h2 className="form-header">Already a user</h2>
              <form onSubmit={onLoginSubmit}>
                <input
                  type="text"
                  placeholder="Username"
                  name="name"
                  value={loginFormData.name}
                  onChange={handleLoginChange}
                />
                <input
                  type="text"
                  placeholder="Password"
                  name="password"
                  value={loginFormData.password}
                  onChange={handleLoginChange}
                />
                <p className={`login_err ${throwErr ? "active" : "inactive"}`} >Please check credentials</p>
                <button className="submit">Login</button>
              </form>
              <p>Don't have an account?</p>
              <button onClick={() => {
                setnewUser(true) 
                setThrowErr(false)
              }}>Create account</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
