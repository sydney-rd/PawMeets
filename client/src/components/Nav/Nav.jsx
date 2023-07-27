import { NavLink } from "react-router-dom";
import logo from "../../assets/Logo/PawMeets-1.png";
import "./Nav.css";
// classnames keep?
function Nav() {
  return (
    <>
      <div className="nav-container">
        <nav className="nav">
          <div className="navPmLogo">
            <img src={logo} alt="Logo" />
          </div>
          <p>
            <NavLink to="/homepage">Home</NavLink>
          </p>
          <p>
            <NavLink to="/matches">Matches</NavLink>
          </p>
          <p>
            <NavLink to="/profile">Profile</NavLink>
          </p>
          <p>
            <NavLink to="/sign-out">Sign Out</NavLink>
          </p>
        </nav>
      </div>
    </>
  );
}

export default Nav;
