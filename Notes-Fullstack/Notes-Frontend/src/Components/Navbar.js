import { Link } from "react-router-dom";

const Navbar = ({ user, setNotebooks, setLoginFormData, setUser, setThrowErr }) => {
  function handleLogout() {
    setUser("");
    setNotebooks([]);
    setLoginFormData({ name: "", email: "", password: "" });
    setThrowErr(false)
  }
  return (
    <div className="navbar">
      <span className="logo">Notes App</span>
      {user ? (
        <ul className="list">
          <li className="listItem, username">{user.name}</li>
          <li onClick={handleLogout} className="listItem">
            Logout
          </li>
        </ul>
      ) : (
        <Link className="link username" to="/">
          Login
        </Link>
      )}
    </div>
  );
};

export default Navbar;
