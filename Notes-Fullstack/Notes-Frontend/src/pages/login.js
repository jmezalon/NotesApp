import Google from "../img/google.png"
import Github from "../img/github.png"
const Login = () => {
  return (
    <div className="login">
      <h1 classname="loginTitle">Choose a login</h1>
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
          <input type="text" placeholder="Username" />
          <input type="text" placeholder="Username" />
          <button classname="submit">Login</button>
        </div>
      </div>
    </div>
  );
}

export default Login
