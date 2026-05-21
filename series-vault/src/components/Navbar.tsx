import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="nav-links">

        <NavLink to="/">
          Home
        </NavLink>

        <NavLink to="/series">
          Show Series
        </NavLink>

        <NavLink to="/add-series">
          Add Series
        </NavLink>

      </div>

    </nav>
  );
}

export default Navbar;