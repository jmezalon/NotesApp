import Google from "../img/google.png"
import Github from "../img/github.png"
const Login = () => {
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
          <h2 className="form-header">New User</h2>
          <input type="text" placeholder="Username" />
          <input type="text" placeholder="Password" />
          <input type="text" placeholder="Email" />
          <button className="submit">Sign Up</button>
          <h2 className="form-header">Already a user</h2>
          <input type="text" placeholder="Username" />
          <input type="text" placeholder="Password" />
          <button className="submit">Login</button>
        </div>
      </div>
    </div>
  );
}

export default Login
