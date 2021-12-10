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
  setThrowErr,
  pro_url,
}) => {
  const [newUser, setnewUser] = useState(false);

  const onSignupSubmit = (e) => {
    e.preventDefault();
    setThrowErr(false);
    fetch(pro_url + "/users/signup", {
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
      .catch(() => {
        setThrowErr(true);
      })
      .then((user) => {
        if (user) {
          // if (throwErr) {
          setThrowErr(false);
          setUser(user);
          getNotebooks(user.id);
          setLoginFormData({ name: "", email: "", password: "" });
          // }
        } else {
          setThrowErr(true);
        }
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
                  type="password"
                  placeholder="Password"
                  value={loginFormData.password}
                  onChange={handleLoginChange}
                />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Email"
                  value={loginFormData.email}
                  onChange={handleLoginChange}
                />
                <p className={`login_err ${throwErr ? "active" : "inactive"}`}>
                  User already exist, please sign in!
                </p>
                <button className="submit">Sign Up</button>
              </form>
              <p>Already have an account?</p>
              <button
                onClick={() => {
                  setnewUser(false);
                  setThrowErr(false);
                }}
              >
                Sign In
              </button>
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
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={loginFormData.password}
                  onChange={handleLoginChange}
                />
                <p className={`login_err ${throwErr ? "active" : "inactive"}`}>
                  Please check credentials
                </p>
                <button className="submit">Login</button>
              </form>
              <p>Don't have an account?</p>
              <button
                onClick={() => {
                  setnewUser(true);
                  setThrowErr(false);
                }}
              >
                Create account
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
