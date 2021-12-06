
const Navbar = () => {
  return (
    <div className="navbar">
      <span className="logo">Notes App</span>
      <ul className="list">
        <li className="listItem">
          <img src="" alt="" className="avatar" />
        </li>
        <li className="listItem, username">
          Username
        </li>
        <li className="listItem">Logout</li>
      </ul>
    </div>
  );
};

export default Navbar;
