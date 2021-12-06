import Google from "../img/google.png"
import Github from "../img/github.png"
const Login = () => {
  return (
    <div className="login">
      {/* <h1 classname="loginTitle">Choose a login</h1> */}
      <div className="wrapper">
        <div className="left-side">
          <div className="loginButton">
            <img src={Google} alt="" className="icon google" />
            Google
          </div>
          <div className="loginButton">
            <img src={Github} alt="" className="icon github" />
            Github
          </div>
        </div>
        <div className="right-side">
          <h2 className="form-header">New User</h2>
          <input type="text" placeholder="Username" />
          <input type="text" placeholder="Password" />
          <input type="text" placeholder="Email" />
          <button classname="submit">Sign Up</button>
          <h2 className="form-header">Already a user</h2>
          <input type="text" placeholder="Username" />
          <input type="text" placeholder="Password" />
          <button classname="submit">Login</button>
        </div>
      </div>
    </div>
  );
}

export default Login
