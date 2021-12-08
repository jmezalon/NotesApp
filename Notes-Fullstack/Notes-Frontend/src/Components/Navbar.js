import { Link } from "react-router-dom";

const Navbar = ({ user }) => {
  return (
    <div className="navbar">
      <span className="logo">Notes App</span>
      {user ? (
        <ul className="list">
          <li className="listItem">
            <img src="" alt="" className="avatar" />
          </li>
          <li className="listItem, username">{user.name}</li>
          <li className="listItem">Logout</li>
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
